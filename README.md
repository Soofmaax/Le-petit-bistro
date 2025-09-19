# Le Petit Coin — Vite + React + TypeScript

Un site vitrine type bistro conçu pour un portfolio développeur. Il met en avant une stack moderne, une architecture propre, l’internationalisation, des animations fluides, un thème sombre et une CI prête à l’emploi.

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

Remplacez OWNER/REPO par votre namespace GitHub.

## Démo

- Dev local: `npm run dev` (http://localhost:5173)
- Déploiement conseillé: Vercel ou Netlify

## Fonctionnalités

- Routing côté client (React Router 6) avec URLs propres
- Internationalisation (react-i18next) FR/EN + sélecteur de langue persistant
- Thème sombre (Tailwind dark mode) avec toggle persistant
- Animations de pages et de contenus (Framer Motion)
- Données de carte externalisées (JSON + types TypeScript)
- CI GitHub Actions (lint, typecheck, build, artefact)

## Prérequis

- Node.js 18+ (recommandé LTS)
- npm 9+ (ou pnpm/yarn si vous préférez adapter)

## Installation

- Installer:
  - `npm install`
- Lancer en développement:
  - `npm run dev`
- Lint:
  - `npm run lint`
- Build de production:
  - `npm run build`
- Prévisualiser le build:
  - `npm run preview`

## Scripts

- `dev`: démarre Vite en mode développement
- `build`: build de production Vite (sortie dans `dist/`)
- `preview`: sert `dist/` en local
- `lint`: exécute ESLint

## Configuration et Structure

- Vite: `vite.config.ts`
- Tailwind: `tailwind.config.js` (darkMode: 'class')
- Entrée: `index.html`, `src/main.tsx`
- Routage et transitions: `src/App.tsx`
- Composants UI: `src/components/`
  - Header (nav + langue + thème), Hero, Menu, About, Reservation, Contact, Footer
- Données:
  - `src/data/menu.json` (contenu de la carte)
  - `src/types/menu.ts` (types TS)
- Internationalisation:
  - `src/i18n/index.ts` (config i18next)
  - `src/i18n/locales/fr.json`, `src/i18n/locales/en.json`

## Internationalisation

- Langues disponibles: FR (par défaut), EN
- Changement de langue: sélecteur dans le Header (persisté via localStorage)
- HTML `lang` synchronisé
- Pour ajouter/éditer des textes, modifiez les JSON dans `src/i18n/locales/`

Exemple d’usage:
```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
return <h1>{t('menu.title')}</h1>;
```

## Thème sombre

- Toggle dans le Header: ajoute/retire la classe `dark` sur `<html>`
- Persistance via localStorage (`theme`)

## CI – GitHub Actions

Workflow: `.github/workflows/ci.yml`
- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Upload de l’artefact `dist/`

Badge:
```
[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
```

## Déploiement

- Vercel
  - Import du repo
  - Framework: Vite
  - Build: `npm run build`
  - Output: `dist`

- Netlify
  - Build command: `npm run build`
  - Publish directory: `dist`

- GitHub Pages (optionnel, SPA)
  - Recommandé: passer par Vercel/Netlify pour une SPA
  - Sinon: configurer un workflow de déploiement dédié (ex: actions-gh-pages)

## Accessibilité et Performance

- Styles de focus visibles
- Contraste amélioré en thème sombre
- Animations légères et non bloquantes
- Optimisations Vite/Tailwind (purge des classes)

## Roadmap (suggestions)

- Formulaire de réservation:
  - react-hook-form + zod, messages d’erreur, masques
  - Envoi email (Resend/EmailJS) ou stockage Supabase
- SEO:
  - Balises OG par route/langue, Schema.org Restaurant
  - Images optimisées (WebP/AVIF + tailles responsives)
- Tests:
  - Vitest + React Testing Library (+ mocks i18n)
- PWA:
  - Manifest + Service Worker

## Dépannage

- Problème de modules après un pull:
  - `rm -rf node_modules package-lock.json && npm install`
- Erreurs de types:
  - `npx tsc --noEmit` pour localiser les erreurs TypeScript
- Problème Tailwind:
  - Vérifier `content` dans `tailwind.config.js` et l’import de `index.css`

## Licence

MIT