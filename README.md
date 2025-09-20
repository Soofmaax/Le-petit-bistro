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

<p>A small bistro showcase built for a <strong>developer portfolio</strong>: polished UI, <strong>i18n (FR/EN)</strong>, <strong>dark mode</strong>, <strong>animations</strong>, <strong>routing</strong>, and <strong>CI</strong>.</p>

<p>
  <a href="#-demo">Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-project-structure">Project structure</a> •
  <a href="#-internationalization">Internationalization</a> •
  <a href="#-assets-local-images">Assets (local images)</a> •
  <a href="#-accessibility--motion-preferences">Accessibility & Motion</a> •
  <a href="#-ci--deployment">CI & Deployment</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

## 🚀 Demo

- Local dev: `npm run dev` (http://localhost:5173)
- Suggested hosting: Vercel or Netlify

Replace `REPO` with your actual GitHub repository name (owner: <a href="https://github.com/Soofmax">Soofmax</a>).

---

## ✨ Features

- Client-side routing (React Router 6) — shareable URLs
- Internationalization (react-i18next) — FR/EN with persistence
- Dark mode (Tailwind `dark`) — toggle with persistence
- Animations (Framer Motion) — page and content transitions
- Externalized data (menu as JSON) — fully typed with TypeScript
- GitHub Actions CI — lint, typecheck, build, artifact upload

---

## 📦 Installation

Requirements:
- Node.js 18+ (LTS recommended)
- npm 9+

Steps:
- Install deps: `npm install`
- Fetch curated images: `npm run setup:images`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Production build: `npm run build`
- Preview build: `npm run preview`

Scripts:
- `dev` — Vite dev server
- `build` — Production build (dist/)
- `preview` — Serve dist/ locally
- `lint` — ESLint
- `setup:images` — Downloads curated free images (Pexels) into `public/images`

---

## 🗂️ Project structure

```
public/
  images/               # Local images (filled by setup:images)
src/
  App.tsx               # Routes + page transitions
  main.tsx              # Bootstrap React + Router + i18n
  index.css             # Tailwind + global styles
  components/           # Header, Hero, Menu, About, Reservation, Contact, Footer
  data/
    menu.fr.json        # Menu data (FR)
    menu.en.json        # Menu data (EN)
  hooks/
    useMotionPreference.ts
  i18n/
    index.ts            # i18next config
    locales/
      fr.json
      en.json
  types/
    menu.ts             # Menu TS types
scripts/
  fetch_images.js       # Image curation/downloader
tailwind.config.js      # Dark mode enabled (class)
vite.config.ts
```

---

## 🌍 Internationalization

- Languages: FR (default) and EN
- Language selector in the Header (persisted via localStorage)
- `<html lang="...">` is kept in sync

Add/edit text:
- `src/i18n/locales/fr.json`
- `src/i18n/locales/en.json`

Example:
```tsx
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
return <h1>{t('menu.title')}</h1>;
```

---

## 🖼️ Assets (local images)

- Local images live in `public/images`
- Auto-fetch them with: `npm run setup:images`
- Curated, free-to-use Pexels images to match the rustic/friendly style
- Credits: see `CREDITS.md`

---

## 🌓 Dark mode

- Toggle in the Header
- `dark` class is applied to `<html>` (persisted via localStorage)
- Tailwind `dark:` variants are already in place

---

## ♿ Accessibility & Motion preferences

- Respects both system and user motion preferences:
  - If the OS has “Reduce motion” enabled, animations are simplified automatically.
  - A Header toggle lets visitors switch animations On/Reduced without touching OS settings.
  - Preference is persisted in localStorage (`motion=reduce|auto`).
- Visible focus states, good contrast, keyboard-accessible interactive elements.
- Images have meaningful `alt`, and pages use semantic structure.

---

## 🧪 CI & Deployment

GitHub Actions: `.github/workflows/ci.yml`
- `npm install`
- `npm run setup:images` (download images for the build)
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Upload the `dist/` artifact

Badge:
```
[![CI](https://github.com/Soofmax/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/Soofmax/REPO/actions/workflows/ci.yml)
```

Suggested hosting:
- Vercel
  - Build: `npm run build`
  - Output: `dist`
- Netlify
  - Build: `npm run build`
  - Publish: `dist`

---

## 🧭 Roadmap

- [ ] Reservation form: react-hook-form + zod (validation, errors, masks)
- [ ] Email sending (Resend/EmailJS) or storage (Supabase)
- [ ] SEO: dynamic OG tags, Schema.org (Restaurant), optimized images (WebP/AVIF)
- [ ] Tests: Vitest + React Testing Library (with i18n mocks)
- [ ] PWA: manifest + service worker
- [ ] Screenshots/GIFs in this README

---

## 🔒 License

MIT