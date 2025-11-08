# Architecture Overview

## Frontend

- SPA React + TypeScript, Vite
- Routing, i18n, dark mode
- Components modulaires
- Tests unitaires et d'intégration
- Sécurité: CSP stricte visée (voir ANIMATIONS.md)

## Backend (optionnel)

- Express ESM
- Helmet, CORS allowlist, rate limit, cookies+CSRF, logging (pino)
- Endpoints de base (health/ready, auth démo, reservations)

## CI/CD

- GitHub Actions: lint, tests, build, artefacts
- Scans sécurité: Gitleaks, CodeQL, OSV (non bloquant), ZAP Baseline (staging)
- Déploiements Vercel/Netlify conditionnés par secrets

SmarterLogicWeb — https://smarterlogicweb.com