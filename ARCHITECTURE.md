# Architecture

Template frontend (Vite + React + TypeScript + Tailwind) orienté vitrine bistro/PME.

## Vue d’ensemble

- `src/App.tsx` : Routing + transitions
- `src/components/*` : UI modulaire (Header, Hero, Menu, Reservation, Contact, Footer)
- `src/i18n/*` : Internationalisation (FR/EN)
- `src/services/reservationMock.ts` : règles d’ouverture et réservation mock (démo)
- `src/mocks/*` : MSW (Mock Service Worker) pour développer sans backend
- `src/components/SEO.tsx` : métadonnées SEO via mutation du DOM
- `scripts/fetch_images.js` : téléchargement d’images libres (Pexels) pour assets locaux
- `public/_headers` : en-têtes de sécurité Netlify (CSP, HSTS, etc.)

## Flux de données (simplifié)

- UI (components) ↔ i18n (textes)  
- UI (Reservation) → services (logique), mise à jour d’état local  
- MSW (dev) ↔ endpoints simulés `/api/*`

## Sécurité

- CSP stricte en production (voir `SECURITY.md`)
- Éviter styles inline (déplacés vers CSS/Tailwind)
- Pas de secrets committés; scan conseillé en CI

## Évolutions recommandées

- **Abstraction API** : créer un module `src/api/*` pour regrouper les appels réseau (pour future intégration backend)
- **SSR/SSG** (option) : pour SEO avancé, basculer vers Next.js ou Vite SSR + adapter `SEO.tsx`
- **Modulariser Reservation** : sous-composants (Form, Success, Info) et validation (react-hook-form + zod)
- **Images optimisées** : WebP/AVIF + `<picture>` + `sizes`

## Diagramme (texte)

```
[Router/App]
    ├─ [Header] ─ toggles (thème, motion, langue)
    ├─ [Hero] ─ animations / CTA
    ├─ [Menu] ─ données locales typées
    ├─ [Reservation] ─ logique créneaux + formulaire
    │      ├─ services/reservationMock (règles)
    │      └─ MSW /api/reservations (dev)
    ├─ [Contact]
    ├─ [Legal/Privacy/Terms/Cookies]
    └─ [Footer]
```

## CI/CD

- GitHub Actions : lint, typecheck, build, tests
- Tests : Vitest + RTL + couverture avec seuil
- Déploiement : Netlify (recommandé) avec `public/_headers`