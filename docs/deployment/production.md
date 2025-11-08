# Déploiement production

## Pré-requis

- Branch protection et approvals (Environment: production)
- Secrets hébergeur (Vercel/Netlify)

## Étapes

- Push sur `main` → déploiement conditionnel
- Approvals (si configurées) avant publication

## Post-déploiement

- Monitoring (APM, logs)
- Alerting (erreurs, latence)
- Rollback: utiliser l'historique de déploiements

SmarterLogicWeb — https://smarterlogicweb.com