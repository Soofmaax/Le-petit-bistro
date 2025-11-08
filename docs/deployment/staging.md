# Déploiement staging

## Pré-requis

- Secrets configurés (Vercel/Netlify)
- Variable `STAGING_URL` (Settings → Variables)

## Pipeline

- CI: lint, tests, build
- ZAP Baseline: exécution non bloquante sur `STAGING_URL`
- Artefacts: build/coverage/gitleaks/osv

## Validation

- Tests visuels
- Scans (ZAP, OSV, CodeQL Security tab)
- Performance (Lighthouse)

SmarterLogicWeb — https://smarterlogicweb.com