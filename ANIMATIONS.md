# Animations Refactor Plan (CSP-friendly)

Goal: remove reliance on inline style mutations (e.g., `style={{ transform: ... }}`) to allow a strict CSP without `style-src 'unsafe-inline'`.

## Context

- Framer Motion often sets transforms via inline `style`.
- Current CSP allows `'unsafe-inline'` for styles to accommodate animations.
- Long-term: prefer a strict CSP without `'unsafe-inline'`.

## Strategy

1. Audit Animated Components
   - `Hero.tsx`: parallax background (`motion.div`), magnetic buttons (`motion.button`).
   - Reservation transitions (if any) and page route transitions.

2. Replace Inline Transforms with CSS Classes
   - Use Tailwind utilities for transitions/animations where feasible.
   - For parallax effects, use `transform` driven by CSS variables updated via JS with a nonce-based style tag or class toggles.

3. CSS Variables + Nonce Style (Optional)
   - Inject a single `<style nonce="...">` tag (SSR/SSG) that defines keyframes and maps CSS variables.
   - Update variables via class toggles rather than direct `style`.

4. Reduce Motion
   - Keep `useMotionPreference()` to disable/simplify animations.
   - Ensure all animations read from a shared `reduce-motion` gate (CSS class/data attribute).

5. Test & Validate
   - A/B test with CSP strict (remove `'unsafe-inline'`) and verify no layout flicker.
   - Add tests that assert absence of inline styles for critical components.

## Milestones

- M1 (1–2 days): Identify all inline style usages, prototype CSS-class versions for Hero.
- M2 (1–2 days): Migrate remaining components, align motion gating with Tailwind classes.
- M3 (0.5 day): Update CSP to remove `'unsafe-inline'` and run CI checks.
- M4 (0.5 day): Document approach and add tests.

## Trade-offs

- Slight reduction in animation fidelity (e.g., complex spring physics).
- Simpler code and stronger security posture (strict CSP).