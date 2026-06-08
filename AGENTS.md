# NEKO STORE — SpecDD + BMAD

## VIBE
Gothic fashion e-commerce. Costa Rica. Dark UI, alt/goth/cyber aesthetic.

## METHODOLOGY
SpecDD (Specification-Driven Development) via BMAD method.
- Write specs before code
- All specs in `_bmad/specs/`
- All documentation in `docs/`

## CURRENT (LEGACY)
Vanilla HTML + CSS + JS in `src/app.js` + `index.html`. No backend.

## TARGET (MIGRATION)
React 19 + TypeScript + Vite 6 + TailwindCSS v4 + Zustand + PWA.

Migration plan: `docs/roadmap.md`
Component tree: `docs/components.md`
Data flow: `docs/data-flow.md`

## STRUCTURE
```
src/app.js            — legacy monolithic app logic
index.html            — legacy entry point (inline CSS + HTML shell)
_bmad/                — BMAD method specs
  specs/              — SpecDD specifications
docs/                 — Architecture, roadmap, backlog, specs
```

## DATA (LEGACY)
Products hardcoded as `PRODUCTS` array in `src/app.js`.
Categories: vestidos, tops, accesorios, conjuntos.
Cart, customers, notifications in LocalStorage.

## ROLES (when prompted)
- **Senior Web Dev**: component architecture, state management, PWA, performance, a11y
- **Senior Backend Dev**: data modeling, WhatsApp integration, order flow, validation
- **Senior QA**: Playwright E2E, Vitest unit, Lighthouse audits, visual regression

## RULES
- SpecDD first: write spec → implement → test
- All text in Spanish (CR dialect) for UI
- Prices in USD ($) configurable via currencySymbol
- Mobile-first responsive (320px+)
- Gothic aesthetic: dark/light theme, gold accents, Megasord/Cormorant/Space Mono fonts

## PWA REQUIREMENTS
- vite-plugin-pwa with Workbox
- Offline catalog fallback
- Web manifest with dark/light theme_color
- Install prompt handling

## KEY INTEGRATIONS
- WhatsApp deep links (wa.me) for order confirmation
- Email for international inquiries
- SINPE Móvil / PayPal (future)
