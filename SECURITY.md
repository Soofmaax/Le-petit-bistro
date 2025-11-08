# Politique de Sécurité — SmarterLogicWeb

Ce projet est un template frontend (Vite + React + TypeScript). Même sans backend, il doit respecter des bonnes pratiques de sécurité pour être prêt en production.

## En-têtes HTTP (hébergement)

Configurez les en-têtes suivants sur l’hébergeur (Netlify/Vercel/Nginx). Netlify `public/_headers` est fourni.

- Strict-Transport-Security: `max-age=31536000; includeSubDomains; preload`
- X-Frame-Options: `DENY`
- X-Content-Type-Options: `nosniff`
- Referrer-Policy: `no-referrer`
- Permissions-Policy: `camera=(), geolocation=(), microphone=(), interest-cohort=()`
- Cross-Origin-Resource-Policy: `same-origin`
- Cross-Origin-Opener-Policy: `same-origin`
- Cross-Origin-Embedder-Policy: `require-corp`
- Origin-Agent-Cluster: `?1`
- X-DNS-Prefetch-Control: `off`
- Content-Security-Policy (CSP) adaptée au runtime:
  ```
  default-src 'self';
  img-src 'self' https: data:;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  script-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  ```
  - Justification: Framer Motion applique des styles (transform, y, etc.) via attribut `style`. À défaut d’un refactor complet des animations, `'unsafe-inline'` côté styles est nécessaire. Les scripts restent stricts (`script-src 'self'`).
  - Plan de retrait `'unsafe-inline'`: voir ANIMATIONS.md (M1 → M4). Objectif: migration vers classes/utilitaires Tailwind et/ou CSS variables pour transitions, puis suppression de `'unsafe-inline'`.
  - Polices: désormais auto‑hébergées via `@fontsource` (Inter, Pacifico). Aucun domaine externe requis.

- Cache-Control (assets): `public, max-age=31536000, immutable` pour `/images/*`, `/assets/*`, `/fonts/*`.

## Versions supportées

- Frontend: Node.js 18/20 (CI matrix), React 18, TypeScript 5, Vite 5
- CI: GitHub Actions
- Backend baseline (optionnel): Node.js 18/20

## Secrets et variables d’environnement

- Ne **committez jamais** de clés sensibles, tokens ou credentials.
- Ne **placez jamais** de clés “service role” côté frontend (ex: Supabase).
- Utilisez un fichier `.env` local (non committé) uniquement pour des valeurs non sensibles destinées au build.
- Ajoutez un **scan de secrets** en CI:
  - Action Gitleaks incluse (job “Gitleaks Secret Scan” dans la pipeline): scanne push/PR/hebdo; examine l’historique complet.

## Dépendances et CVE

- **Dependabot** actif (mise à jour automatisée).
- Job hebdomadaire `npm audit --production` inclus; option: Snyk/OSV-Scanner supplémentaire.
- Politique OSV (non bloquante) et artefacts:
  - OSV Scanner s’exécute à chaque push/PR/schedule, non-bloquant (continue-on-error).
  - Artefacts: `osv-results/results.json` (machine-readable) et `osv-results/results.sarif`.
  - Remédiation:
    - High/Critical: corriger sous 48h.
    - Medium/Low: corriger sous 1–2 semaines (bump de dépendances, régénération du lockfile).
  - Workflow “Update Lockfile” (Actions → Update Lockfile) permet de régénérer `package-lock.json` après bumps et committer le fichier pour aligner le graphe de dépendances scanné.

## Logs et mode production

- Ne pas afficher de logs verbeux en production.
- Vérifiez que les mocks MSW ne sont **activés que** en développement (déjà le cas).
- Lorsque le backend est présent: logs structurés en JSON (pino/winston), aucun PII/secrets, rotation et rétention contrôlées.

## Cookies, Analytics et RGPD

- Bannière de consentement: `src/components/CookieConsent.tsx`. En test, la bannière est désactivée (override possible via `VITE_ENABLE_COOKIE_BANNER_IN_TEST`).
- Analytics (Plausible) **opt-in** uniquement:
  - Script proxy `/js/script.js` → plausible.io (Netlify `_redirects`), events `/api/event` → plausible.io.
  - CSP préservée (`script-src 'self'; connect-src 'self'`), chargement après consentement.
  - `VITE_PLAUSIBLE_DOMAIN` peut fixer le domaine (voir `.env.example`).
- Politique cookies/privée: mise à jour sous `src/components/legal/*`.
- DPA & conformité:
  - Plausible propose un Data Processing Agreement (DPA) et une politique de conservation minimaliste (sans IPs et PII par défaut). Référez-vous à leur DPA et configurez les options conformes.
  - Rétention: privilégier une rétention courte (90 jours max) et aucun identifiant utilisateur persistant côté client.
  - Droit au retrait: bouton “Gérer mes préférences cookies” disponible sur la page Cookies.

## Backend (lorsqu’il sera présent)

- Authentification:
  - JWT (access court, refresh avec rotation) ou sessions cookies httpOnly/sameSite=strict/secure.
  - CSRF token si cookies.
- Autorisation:
  - RBAC/ABAC granulaire (least privilege).
- Validation & sanitization:
  - Zod/Joi sur body/params/query/headers, filtrage des champs, protection contre XSS/Path traversal/Mass assignment.
- Sécurité API:
  - CORS en allowlist stricte; rate limiting par IP/user/endpoint.
  - Vérification strict du Content-Type; upload sécurisé (MIME+extension+magic bytes) si applicable.
- Observabilité:
  - Health `/health`, readiness `/ready`, metrics Prometheus, APM (Sentry/DataDog), logs JSON.
- Chiffrement & secrets:
  - TLS 1.2+, chiffrement at-rest, rotation des credentials, gestion des secrets via Vault/AWS Secrets Manager.

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité, merci d’ouvrir un ticket privé ou de contacter SmarterLogicWeb.

- Email: [email]
- Détails: version, reproduction, impact; PoC minimal; mitigation temporaire

Engagements:
- Accuser réception rapidement
- Évaluer la sévérité
- Corriger selon l’impact (SLA interne)

SmarterLogicWeb — https://smarterlogicweb.com