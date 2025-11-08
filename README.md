<div align="center">
  <h1>🚀 Le Petit Coin</h1>
  <p><strong>Solutions web intelligentes, sécurisées et sur‑mesure – par SmarterLogicWeb</strong></p>

  <p>
    <a href="https://github.com/Soofmaax/Le-petit-bistro/actions/workflows/pipeline.yml">
      <img alt="CI" src="https://img.shields.io/github/actions/workflow/status/Soofmaax/Le-petit-bistro/pipeline.yml?branch=main&label=CI&logo=github" />
    </a>
    <a href="https://codecov.io/gh/Soofmaax/Le-petit-bistro">
      <img alt="Coverage" src="https://codecov.io/gh/Soofmaax/Le-petit-bistro/branch/main/graph/badge.svg" />
    </a>
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/Soofmaax/Le-petit-bistro" />
    <img alt="Issues" src="https://img.shields.io/github/issues/Soofmaax/Le-petit-bistro" />
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
    <img alt="Made by SmarterLogicWeb" src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F-by%20SmarterLogicWeb-blue" />
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#documentation">Docs</a> •
    <a href="#support">Support</a>
  </p>
</div>

---

## 🎯 Pourquoi ce projet ?

Un template SPA professionnel (Vite + React + TypeScript + Tailwind) entièrement prêt pour la production, sécurisé (CSP/HSTS/headers), et outillé (CI/CD, tests, couverture). Idéal pour démontrer une vitrine gastronomique et la qualité d’un delivery enterprise-ready.

Tagline projet: “Template SPA gastronomique, sécurisé et prêt pour la production.”

---

## ✨ Features

- ⚡ Vite + React 18 + TypeScript strict
- 🧭 Routing client (React Router 6)
- 🌍 i18n FR/EN (react-i18next), persistance des préférences
- 🌗 Dark mode (Tailwind `dark`) avec toggle
- 🎞️ Animations (Framer Motion) – plan CSP strict fourni
- 🧪 Tests (Vitest + RTL + jest-axe), couverture CI
- 🔒 Sécurité: CSP/HSTS/XFO, COOP/COEP, opt-in analytics via proxy
- 🛠️ CI unifiée: lint, typecheck, tests, build, CodeQL, Gitleaks, OSV
- 🖼️ Images optimisées (WebP/AVIF) via script `sharp`
- 📄 Docs complètes (Security, Architecture, API, Deployment)

---

## 🎥 Demo

- Dev local: `npm run dev` → http://localhost:5173
- Demo (Netlify): https://le-petit-bistro.netlify.app

---

## 🚀 Quick Start

1. Installer:
   ```
   npm install
   ```
2. (Optionnel) Images:
   ```
   npm run setup:images
   npm run optimize:images
   ```
3. Démarrer:
   ```
   npm run dev
   ```

Backend baseline (optionnel):
```
npm run server:start
```

---

## 📚 Documentation

- [SECURITY.md](./SECURITY.md) – Politique de sécurité, CSP, scans
- [ARCHITECTURE.md](./ARCHITECTURE.md) – Structure et bonnes pratiques
- [API.md](./API.md) – Abstraction API et schémas Zod
- [DEPLOYMENT.md](./DEPLOYMENT.md) – Déploiement Vercel/Netlify, ZAP
- [CONTRIBUTING.md](./CONTRIBUTING.md) – Contribution & style
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) – Comportement
- [CHANGELOG.md](./CHANGELOG.md) – Historique
- Docs étendues: `docs/` (Getting Started, API, Architecture, Deployment, Troubleshooting)

---

## 🛠️ Tech Stack

- Frontend: Vite, React 18, TypeScript, TailwindCSS, Framer Motion
- Tests: Vitest, React Testing Library, jest-axe
- CI/CD: GitHub Actions (pipeline unifiée)
- Sécurité: CodeQL, Gitleaks, OSV Scanner, ZAP Baseline (staging)
- Backend (optionnel): Express + Helmet + Rate Limit + CORS + CSRF + Pino

---

## 🔒 CI & Security Scans

- NPM Audit (prod-only) weekly
- Gitleaks: secret scan (full history), SARIF artefacts
- CodeQL: analysis (Security tab)
- OSV Scanner (non bloquant):
  - Artefacts: `osv-results/results.json`, `osv-results/results.sarif`
  - Bumps + “Update Lockfile” workflow pour réduire findings

---

## 🤝 Contributing

Voir [CONTRIBUTING.md](./CONTRIBUTING.md). PRs bienvenues.

---

## 📝 License

MIT – © 2025 SmarterLogicWeb.

---

## 📧 Support

- Website: https://smarterlogicweb.com
- Contact: [email]
- LinkedIn: https://linkedin.com/company/smarterlogicweb

---

<div align="center">
  <p>Made with ❤️ by <strong>SmarterLogicWeb</strong></p>
  <p>
    🌐 <a href="https://smarterlogicweb.com">Website</a> •
    📧 <a href="mailto:[email]">Contact</a> •
    💼 <a href="https://linkedin.com/company/smarterlogicweb">LinkedIn</a>
  </p>
  <p>
    <sub>© 2025 SmarterLogicWeb. All rights reserved.</sub>
  </p>
</div>