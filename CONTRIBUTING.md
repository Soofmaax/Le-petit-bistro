# Guide de contribution — SmarterLogicWeb

Merci de contribuer à ce template professionnel. Notre objectif: qualité enterprise-grade, sécurité, maintenabilité.

## Prérequis

- Node.js 18+ (LTS recommandé)
- npm 9+
- OS: Linux/macOS/Windows

## Installation & démarrage

```
npm install
npm run setup:images
npm run dev
```

## Qualité & style

- TypeScript strict (`tsconfig.app.json`)
- ESLint (`npm run lint`) avant tout commit
- Prettier (`npm run format`) pour uniformiser le style
- Respectez la structure du projet (composants modulaires, i18n, data)
- N’ajoutez pas de styles inline (CSP stricte visée)

## Tests

- Vitest + React Testing Library + jest-axe
- Lancer: `npm run test` (CI) ou `npm run test:watch` (dev)
- Couverture: seuils en CI; ajoutez des tests pour toute nouvelle feature

## Sécurité

- Aucun secret committé (.env, tokens)
- CSP stricte (voir SECURITY.md); évitez scripts/styles inline
- Documentez tout provider externe et ajustement CSP requis
- Dépendances: surveillez OSV/CodeQL/Gitleaks

## Processus de Pull Request

- Branche: `feature/xxx` ou `fix/xxx`
- Description: contexte, solution, impacts (sécurité/perf)
- Checklist: lint/tests/build/doc/scans
- Revue: CODEOWNERS; approbations requises si branches protégées

## Code de conduite

Consultez `CODE_OF_CONDUCT.md` pour les attentes et processus de signalement.

## Versioning & Changelog

- Format Keep a Changelog (CHANGELOG.md)
- Semantic Versioning (major/minor/patch)

## Questions

Contact: [email] — SmarterLogicWeb

Merci pour votre contribution !