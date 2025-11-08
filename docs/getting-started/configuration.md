# Configuration

## Variables d'environnement

Créez un fichier `.env` (voir `.env.example`).

Frontend:
- `VITE_PLAUSIBLE_DOMAIN`: domaine pour analytics (optionnel)
- `VITE_ENABLE_COOKIE_BANNER_IN_TEST`: afficher la bannière en mode test (false par défaut)

Backend (optionnel):
- `CORS_ALLOWLIST`: liste des origins autorisés
- `JWT_SECRET`: secret pour JWT
- `RATE_LIMIT_WINDOW_MS`: fenêtre de rate limit
- `RATE_LIMIT_MAX`: requêtes max par fenêtre
- `COOKIE_SECURE`: cookies secure en production

## CSP & Sécurité

- Les en-têtes de sécurité sont fournis via `public/_headers`.
- Voir `SECURITY.md` pour les détails (CSP, COOP/COEP, HSTS, etc.).

SmarterLogicWeb — https://smarterlogicweb.com