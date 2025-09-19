# Le Petit Coin — Vite + React + TS + Tailwind

Un site vitrine type bistro, conçu pour un portfolio développeur. Stack moderne, architecture propre, i18n, animations, dark mode, routing, et CI.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (dark mode activé)
- React Router 6 (URLs propres)
- Framer Motion (transitions/micro-interactions)
- react-i18next (internationalisation FR/EN)
- lucide-react (icônes)

## Démarrer

- Installer les dépendances:
  - `npm install`
- Lancer en dev:
  - `npm run dev`
- Linter:
  - `npm run lint`
- Build de production:
  - `npm run build`
- Preview du build:
  - `npm run preview`

## Structure

- `src/App.tsx`: routing et transitions de pages
- `src/components/*`: Header, Hero, Menu, About, Reservation, Contact, Footer
- `src/data/menu.json`: données de la carte (maintenables)
- `src/types/menu.ts`: types des données de menu
- `src/i18n/*`: configuration i18n + traductions FR/EN
- `tailwind.config.js`: configuration Tailwind (darkMode: 'class')
- `vite.config.ts`: config Vite + plugin React

## Internationalisation (react-i18next)

- Langues: FR (par défaut), EN
- Sélecteur de langue dans le Header (persisté via localStorage)
- Clé HTML `lang` mise à jour dynamiquement
- Pour ajouter des traductions: modifier `src/i18n/locales/fr.json` et `src/i18n/locales/en.json`

## Dark Mode

- Toggle dans le Header (persisté via localStorage)
- Classe `dark` appliquée sur `<html>` (tailwind)

## Animations

- Transitions de pages et de catégories du menu via Framer Motion
- Micro-interactions (hover/scale) via Tailwind + Motion

## CI — GitHub Actions

Un workflow CI minimal est inclus: `.github/workflows/ci.yml`

- Installe (`npm ci`)
- Lint (`npm run lint`)
- Typecheck (`npx tsc --noEmit`)
- Build (`npm run build`)
- Upload de l'artefact `dist/`

Badge (ajoutez à votre README après premier run sur `main`):
```
[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
```
Remplacez OWNER/REPO par vos valeurs GitHub.

## Déploiement

- Vercel: import du repo, Framework: Vite, commande build `npm run build`, output `dist`
- Netlify: build `npm run build`, publish `dist`
- GitHub Pages: via `peaceiris/actions-gh-pages` ou Netlify/Vercel recommandé pour SPA

## Améliorations futures (portfolio)

- Formulaire Réservation: react-hook-form + zod, envoi via Email (Resend/EmailJS) ou stockage Supabase
- SEO: balises OG dynamiques, Schema.org (Restaurant), images optimisées (WebP/AVIF + sizes)
- Tests: Vitest + React Testing Library, snapshots i18n
- PWA: manifest + service worker

## Licence

MIT