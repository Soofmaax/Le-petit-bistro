# SSR/SSG Migration Plan

Goal: Improve SEO and social share metadata reliability by rendering critical pages on the server or at build time.

## Option A: Next.js (Recommended)

- Pages:
  - `/` (Home/Hero)
  - `/menu`
  - `/reservation`
  - `/contact`
  - `/legal`, `/privacy`, `/terms`, `/cookies`
- Internationalization: next-i18next or built-in Next.js i18n routing.
- Metadata: Next.js `metadata` API for OG/Twitter/canonical/hreflang.
- CSP: headers via `next.config.js` + Vercel headers configuration.

### Steps

1. Scaffold Next.js app (`create-next-app` TypeScript).
2. Port UI components and Tailwind config.
3. Integrate i18n and reuse locale JSONs.
4. Implement metadata per route using Next.js conventions.
5. Optional: Edge middleware for security headers, or Vercel `headers` in `next.config.js`.
6. Keep MSW only for local dev if needed or switch to Next.js API routes for mocks.

## Option B: Vite SSR

- Use `vite-plugin-ssr` to render pages with React.
- Control CSP via hosting configuration (Netlify/Vercel).
- Manual handling of metadata injection.

## Open Questions

- Hosting preference (Netlify/Vercel).
- Need for dynamic data from backend (then SSR becomes more valuable).
- Analytics CSP and consent remain opt-in.

## Effort Estimate

- Next.js migration: 3–5 days for full port with i18n, metadata, and CI.
- Vite SSR: 2–4 days but requires more manual work for routing/meta.

## Rollout

- Maintain current SPA as baseline.
- Provide a `template-ssr` branch for clients needing SEO guarantees.
- Document differences and deployment instructions.