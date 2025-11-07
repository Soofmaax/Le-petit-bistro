# Changelog

Toutes les modifications notables de ce template sont documentées ici.

## [Unreleased]
- Ajout bannière de consentement (option) – à planifier
- Optimisations images (WebP/AVIF, `<picture>`) – à planifier
- Refactor Reservation en sous-composants

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