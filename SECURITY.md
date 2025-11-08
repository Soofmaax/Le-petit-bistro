# Politique de Sécurité

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
- Origin-Agent-Cluster: `?1`
- X-DNS-Prefetch-Control: `off`
- Content-Security-Policy (CSP) adaptée au runtime:
  ```
  default-src 'self';
  img-src 'self' https: data:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  script-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  ```
  - Justification: Framer Motion applique des styles (transform, y, etc.) via attribut `style`. À défaut d’un refactor complet des animations, `'unsafe-inline'` côté styles est nécessaire. Les scripts restent stricts (`script-src 'self'`).
  - Option long terme: refactor animations pour supprimer les styles inline et retirer `'unsafe-inline'`.

- Cache-Control (assets): `public, max-age=31536000, immutable` pour `/images/*`, `/assets/*`, `/fonts/*`.

## Secrets et variables d’environnement

- Ne **committez jamais** de clés sensibles, tokens ou credentials.
- Ne **placez jamais** de clés “service role” côté frontend (ex: Supabase).
- Utilisez un fichier `.env` local (non committé) uniquement pour des valeurs non sensibles destinées au build.
- Ajoutez un **scan de secrets** en CI:
  - Action Gitleaks incluse (`.github/workflows/gitleaks.yml`): scanne push/PR et hebdo; examine l’historique complet.

## Dépendances et CVE

- Activez **Dependabot** (déjà configuré) pour les mises à jour.
- Ajoutez un job hebdomadaire `npm audit --production` (déjà inclus) ou Snyk/OSS Index en complément.
- Review des mises à jour majeures et compatibilité.

## Logs et mode production

- Ne pas afficher de logs verbeux en production.
- Vérifiez que les mocks MSW ne sont **activés que** en développement (déjà le cas).

## Cookies, Analytics et RGPD

- Bannière de consentement: `src/components/CookieConsent.tsx`.
- Analytics (Plausible) **opt-in** uniquement:
  - Script proxy `/js/script.js` → plausible.io (Netlify `_redirects`), events `/api/event` → plausible.io.
  - CSP préservée (`script-src 'self'; connect-src 'self'`), chargement après consentement.
  - `VITE_PLAUSIBLE_DOMAIN` peut fixer le domaine (voir `.env.example`).
- Politique cookies/privée: mise à jour sous `src/components/legal/*`.

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité, merci d’ouvrir un ticket privé ou de contacter le mainteneur. Décrivez:
- La version, la reproduction et l’impact
- Un proof-of-concept minimal si possible
- Toute mesure de mitigation temporaire

Nous nous engageons à:
- Accuser réception rapidement
- Évaluer la sévérité
- Corriger dans des délais raisonnables selon l’impact