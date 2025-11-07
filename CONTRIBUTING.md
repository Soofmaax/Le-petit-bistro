# Guide de contribution

Merci de contribuer à ce template. Voici les bonnes pratiques pour maintenir une qualité “production-grade”.

## Prérequis

- Node.js 18+ (LTS recommandé)
- npm 9+
- OS : Linux/macOS/Windows

## Installation et démarrage

```
npm install
npm run setup:images
npm run dev
```

## Qualité et style

- TypeScript strict (`tsconfig.app.json`)
- ESLint (`npm run lint`) avant tout commit
- Ajoutez **Prettier** (optionnel) si vous contribuez aux styles
- Respectez la structure du projet (composants modulaires, i18n dans `src/i18n`, données dans `src/data`)

## Tests

- Framework : Vitest + React Testing Library
- Lancer les tests :
  ```
  npm run test
  ```
- Couverture en CI : un seuil est appliqué. Ajoutez des tests conséquents pour toute nouvelle fonctionnalité.
- Évitez les tests flakys (dépendants du temps ou du réseau)

## Sécurité

- Ne commitez **aucun secret** (.env, clés, tokens)
- Respectez la **CSP** et évitez les styles inline
- Si vous ajoutez des providers externes, documentez leur origine et l’ajustement CSP

## PRs

- Créez une branche feature
- Ajoutez un résumé clair (contexte, changements, impact)
- Ajoutez des tests et mettez à jour la doc si nécessaire
- Assurez-vous que CI passe (lint, build, tests, coverage)

## Versioning / Changelog

- Mises à jour et corrections documentées dans `CHANGELOG.md`
- Respectez le semantic versioning si vous publiez un dérivé (major/minor/patch)

Merci pour votre contribution !