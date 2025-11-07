# Politique de Sécurité

Ce projet est un template frontend (Vite + React + TypeScript). Même sans backend, il doit respecter des bonnes pratiques de sécurité pour être prêt en production.

## En-têtes HTTP (hébergement)

Configurez les en-têtes suivants sur l’hébergeur (Netlify/Vercel/Nginx):

- Strict-Transport-Security: `max-age=31536000; includeSubDomains; preload`
- X-Frame-Options: `DENY`
- X-Content-Type-Options: `nosniff`
- Referrer-Policy: `no-referrer`
- Permissions-Policy: `camera=(), geolocation=(), microphone=(), interest-cohort=()`
- Content-Security-Policy (CSP) stricte:
  ```
  default-src 'self';
  img-src 'self' https: data:;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  script-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  ```

Note: Évitez les styles inline pour garder une CSP stricte sans `'unsafe-inline'`. Les styles ont été déplacés vers `src/index.css`.

## Secrets et variables d’environnement

- Ne **committez jamais** de clés sensibles, tokens ou credentials.
- Ne **placez jamais** de clés “service role” côté frontend (ex: Supabase).
- Utilisez un fichier `.env` local (non committé) uniquement pour des valeurs non sensibles destinées au build.
- Ajoutez un **scan de secrets** en CI (ex: gitleaks/trufflehog) et bloquez les PR contenant des fuites.

## Dépendances et CVE

- Activez **Dependabot** (déjà configuré) pour les mises à jour.
- Ajoutez un job hebdomadaire `npm audit --production` (ou Snyk/OSS Index) en CI.
- Review des mises à jour majeures et compatibilité.

## Logs et mode production

- Ne pas afficher de logs verbeux en production.
- Vérifiez que les mocks MSW ne sont **activés que** en développement (déjà le cas).

## Cookies et RGPD

- Actuellement, pas de cookies d’analytics/marketing.
- Si vous ajoutez des analytics: installez une **bannière de consentement** et mettez à jour `src/components/legal/*`.
- Documentez vos bases légales et durées de conservation dans la politique de confidentialité.

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité, merci d’ouvrir un ticket privé ou de contacter le mainteneur. Décrivez:
- La version, la reproduction et l’impact
- Un proof-of-concept minimal si possible
- Toute mesure de mitigation temporaire

Nous nous engageons à:
- Accuser réception rapidement
- Évaluer la sévérité
- Corriger dans des délais raisonnables selon l’impact