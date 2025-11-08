# Changelog

Toutes les modifications notables de ce template sont documentées ici. Format: Keep a Changelog. Versioning: Semantic Versioning.

## [Unreleased]
- Refactor animations pour CSP stricte (plan M1→M4)
- OpenAPI v1 + génération des types front
- E2E Playwright (réservation, i18n, consent)

## [0.2.0] - 2025-11-08
### Branding & Documentation
- README professionnalisé (branding SmarterLogicWeb, badges, sections pro)
- DEPLOYMENT: ajout politique OSV non bloquante, ZAP Baseline
- SECURITY: ajout COEP, politique OSV, RGPD, backend guidelines, contact
- RUNBOOK: ajouté (incidents)
- CODEOWNERS: ajouté
- Docs scaffold (`docs/`): getting-started, api, architecture, deployment, troubleshooting

### CI/CD & Security
- OSV reporter: inputs corrigés (args)
- ZAP Baseline (staging) job ajouté (non bloquant)
- Workflow “Update Lockfile” (manual) pour régénération `package-lock.json`

### Backend (baseline)
- Express ESM sécurisé (helmet, rate limit, CORS, CSRF, pino)
- Script `server:start`

### Frontend
- Intégration `useReservation` dans Reservation
- Tests SEO (twitter metas, JSON-LD)
- CookieConsent utils externalisés (fast refresh warnings supprimés)

## [0.1.0] - 2025-11-07
### Sécurité
- Ajout `public/_headers` pour Netlify (CSP, HSTS, XFO, etc.)
- Suppression des styles inline dans `index.html` pour CSP stricte
- Ajout `SECURITY.md` (politique de sécurité)

### CI/Tests
- Couverture Vitest (provider v8, reporters lcov+text) avec seuils
- Upload rapport de couverture dans CI

### Dépendances
- Suppression `@supabase/supabase-js` (non utilisée)

### Documentation
- Ajout `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `ARCHITECTURE.md`, `CHANGELOG.md`