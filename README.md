<div align="center">

<h1>Le Petit Coin</h1>
<p><strong>Vite + React + TypeScript + Tailwind</strong></p>

<p>
<a href="https://github.com/Soofmax/REPO/actions/workflows/ci.yml">
<img alt="CI" src="https://img.shields.io/github/actions/workflow/status/Soofmax/REPO/ci.yml?branch=main&label=CI&logo=github" />
</a>
<img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=061d2f" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
<img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white" />
<img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
</p>

<p>Un site vitrine type bistro, pensé pour un <strong>portfolio développeur</strong> : UI soignée, <strong>i18n FR/EN</strong>, <strong>dark mode</strong>, <strong>animations</strong>, <strong>routing</strong>, et <strong>CI</strong>.</p>

<p>
  <a href="#-demo">Démo</a> •
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-structure">Structure</a> •
  <a href="#-internationalisation">Internationalisation</a> •
  <a href="#-ci--déploiement">CI & Déploiement</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

## 🚀 Démo

- Dev local: `npm run dev` (http://localhost:5173)
- Déploiement conseillé: Vercel ou Netlify

Remplacez `REPO` par le nom réel de votre dépôt GitHub (propriétaire: <a href="https://github.com/Soofmax">Soofmax</a>).

---

## ✨ Fonctionnalités

- Routing client (React Router 6) — URLs partageables
- Internationalisation (react-i18next) — FR/EN + persistance
- Thème sombre (Tailwind dark mode) — toggle persistant
- Animations (Framer Motion) — transitions de pages & contenus
- Données externalisées (menu.json) — typées en TypeScript
- CI GitHub Actions — lint, typecheck, build, artefact

---

## 📦 Installation

Prérequis:
- Node.js 18+ (LTS recommandé)
- npm 9+

Étapes:
- Installer les deps: `npm install`
- Lancer en dev: `npm run dev`
- Linter: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build prod: `npm run build`
- Prévisualiser: `npm run preview`

Scripts:
- `dev` — Vite dev server
- `build` — Build de production (dist/)
- `preview` — Serve dist/
- `lint` — ESLint

---

## 🗂️ Structure

```
src/
  App.tsx                # Routes + transitions
  main.tsx               # Bootstrap React + Router + i18n
  index.css              # Tailwind + styles globaux
  components/            # UI (Header, Hero, Menu, About, Reservation, Contact, Footer)
  data/
    menu.json            # Données de la carte
  i18n/
    index.ts             # Config i18next
    locales/
      fr.json
      en.json
  types/
    menu.ts              # Types TS du menu
tailwind.config.js       # Dark mode activé (class)
vite.config.ts
```

---

## 🌍 Internationalisation

- FR (par défaut) et EN
- Sélecteur dans le Header (persisté via localStorage)
- Attribut `<html lang="...">` synchronisé

Ajouter/modifier des textes:
- `src/i18n/locales/fr.json`
- `src/i18n/locales/en.json`

Exemple:
```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
return <h1>{t('menu.title')}</h1>;
```

---

## 🌓 Thème sombre

- Toggle dans le Header
- Classe `dark` appliquée sur `<html>` (persistée via localStorage)
- Styles Tailwind `dark:` déjà intégrés

---

## 🧪 CI & Déploiement

CI GitHub Actions: `.github/workflows/ci.yml`
- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Upload de l’artefact `dist/`

Badge:
```
[![CI](https://github.com/Soofmax/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/Soofmax/REPO/actions/workflows/ci.yml)
```

Déploiement conseillé:
- Vercel
  - Build: `npm run build`
  - Output: `dist`
- Netlify
  - Build: `npm run build`
  - Publish: `dist`

---

## 🧭 Roadmap

- [ ] Formulaire Réservation: react-hook-form + zod (validations, erreurs, masques)
- [ ] Envoi email (Resend/EmailJS) ou stockage Supabase
- [ ] SEO avancé: OG dynamiques, Schema.org (Restaurant), images optimisées (WebP/AVIF)
- [ ] Tests: Vitest + React Testing Library (+ mocks i18n)
- [ ] PWA: manifest + service worker
- [ ] Screenshots/GIFs dans ce README

---

## 🔒 Licence

MIT