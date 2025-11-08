<div align="center">

<h1>Le Petit Coin</h1>
<p><strong>Vite + React + TypeScript + Tailwind</strong></p>

<p>
<a href="https://github.com/Soofmaax/Le-petit-bistro/actions/workflows/pipeline.yml">
<img alt="Pipeline" src="https://img.shields.io/github/actions/workflow/status/Soofmaax/Le-petit-bistro/pipeline.yml?branch=main&label=Pipeline&logo=github" />
</a>
<a href="https://github.com/Soofmaax/Le-petit-bistro/actions/workflows/pipeline.yml">
<img alt="OSV Scanner" src="https://img.shields.io/github/actions/workflow/status/Soofmaax/Le-petit-bistro/pipeline.yml?branch=main&label=OSV%20Scanner&logo=security" />
</a>
<a href="https://codecov.io/gh/Soofmaax/Le-petit-bistro">
<img alt="Coverage" src="https://codecov.io/gh/Soofmaax/Le-petit-bistro/branch/main/graph/badge.svg" />
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
- Demo (Netlify): https://le-petit-bistro.netlify.app
- Suggested hosting: Vercel or Netlify

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
  main.tsx              # Bootstrap React + Router + i18n + @fontsource fonts
  index.css             # Tailwind + global styles
  components/           # Header, Hero, Menu, About, Reservation, Contact, Footer
  api/                  # Client + schemas + adapters (future backend)
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
- Optimize them (WebP/AVIF) with: `npm run optimize:images` (génère `.webp` et `.avif` pour chaque `.jpg/.png`)
- Components utilisent `<picture>` avec sources AVIF/WebP (fallback JPG) et `sizes` adaptés (ex: `sizes="(max-width: 640px) 100vw, 100vw"`)
- Curated, free-to-use Pexels images to match the rustic/friendly style
- Credits: see `CREDITS.md`

Note (fonts): précharger des fontes auto‑hébergées via `@fontsource` nécessite de connaître les chemins hashés générés en build; utilisez un plugin (ex: `vite-plugin-fonts`) si vous souhaitez des `<link rel="preload" as="font">` automatiques.

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

GitHub Actions: `.github/workflows/pipeline.yml`
- Tests + Lint + Build (matrix Node 18/20)
- Security: npm audit (prod), Gitleaks secret scan, OSV Scanner, CodeQL analysis
- Coverage upload to Codecov

Badges:
```
[![Pipeline](https://github.com/Soofmaax/Le-petit-bistro/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Soofmaax/Le-petit-bistro/actions/workflows/pipeline.yml)
[![codecov](https://codecov.io/gh/Soofmaax/Le-petit-bistro/branch/main/graph/badge.svg)](https://codecov.io/gh/Soofmaax/Le-petit-bistro)
```

Suggested hosting:
- Vercel
  - Build: `npm run build`
  - Output: `dist`
- Netlify
  - Build: `npm run build`
  - Publish: `dist`
  - Security headers: `public/_headers` (CSP/HSTS/XFO, CORP/COOP/OAC, cache)

---

## 📸 Captures & Démos

Ajoutez vos captures/GIFs pour la vitrine:
- Placez vos assets sous `public/` (ex: `public/screens/hero.png`, `public/screens/menu.gif`)
- Référencez-les ici:
  - ![Hero](./public/screens/hero.png)
  - ![Menu](./public/screens/menu.gif)
- Conseil: exportez en WebP/AVIF si possible, ou utilisez `npm run optimize:images` pour optimiser.

## 🧭 Roadmap

- [ ] Reservation form: react-hook-form + zod (validation, errors, masks)
- [ ] Email sending (Resend/EmailJS) or storage (Supabase)
- [ ] SEO: dynamic OG tags, Schema.org (Restaurant), optimized images (WebP/AVIF)
- [ ] Tests: Vitest + React Testing Library (with i18n mocks)
- [ ] PWA: manifest + service worker
- [ ] Screenshots/GIFs in this README

---

## 🚀 Déploiement Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Headers de sécurité: le fichier `public/_headers` est fourni et appliquera automatiquement CSP, HSTS, X-Frame-Options, etc.
- Analytics (facultatif, opt-in par consentement):
  - `public/_redirects` fournit deux proxys:
    - `/js/script.js` → `https://plausible.io/js/script.js`
    - `/api/event` → `https://plausible.io/api/event`
  - Cela permet de charger le script et d’émettre les events en “same-origin” pour rester compatible avec la CSP (`script-src 'self'`, `connect-src 'self'`).

## 📊 Couverture de tests (CI)

- Tests via Vitest exécutés en CI (GitHub Actions)
- Rapports de couverture générés (text + lcov) et uploadés comme artifacts
- Upload vers Codecov:
  - Sur `push`: tokenless (selon configuration Codecov)
  - Sur `pull_request` vers branches protégées: ajoutez `CODECOV_TOKEN` dans Secrets du repo
- Seuils appliqués (lignes/fonctions/branches/statements) afin de maintenir la qualité

## 🧪 Tests & Troubleshooting

- Lancer la suite:
  - `npm run test` (CI)
  - `npm run test:watch` (dev)
- Environnement: jsdom + @testing-library/react. Les animations (Lottie/confetti) sont mockées dans `vitest.setup.ts`.
- Timers:
  - En mode test, la latence de la réservation est nulle; sinon utilisez `vi.useFakeTimers()` et `vi.advanceTimersByTime()` pour simuler les délais.
- Couverture:
  - Seuils: lignes 75%, fonctions 75%, statements 75%, branches 65%.
- Cookies:
  - La bannière de consentement est désactivée en mode test (`import.meta.env.MODE === 'test'`).
  - En prod/dev, pour rouvrir la modale, utilisez dans la console:
    ```js
    window.dispatchEvent(new CustomEvent('cookie:open'));
    ```
- i18n:
  - Si un test dépend des libellés, attendez les éléments via `findBy*` et regex FR/EN.
- Réseau:
  - Les appels réseau réels sont inexistants; la logique réservation est mockée en local.

## 📚 Ressources & Documentation

- [SECURITY.md](./SECURITY.md) — Politique de sécurité, CSP, gestion des secrets, RGPD
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Guide de contribution, CI, tests
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — Code de conduite
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Vue d’ensemble, flux, évolutions recommandées
- [API.md](./API.md) — Abstraction API, schémas Zod, endpoints et usage
- [ANIMATIONS.md](./ANIMATIONS.md) — Plan de refactor animations pour CSP strict
- [SSR-PLAN.md](./SSR-PLAN.md) — Plan de migration SSR/SSG (Next.js recommandé)
- [CHANGELOG.md](./CHANGELOG.md) — Journal des changements
- [CREDITS.md](./CREDITS.md) — Crédits images (Pexels)

## 🔒 License

MIT