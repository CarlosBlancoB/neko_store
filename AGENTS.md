# NEKO STORE — SpecDD + BMAD

## VIBE
Gothic fashion e-commerce. Costa Rica. Dark UI, alt/goth/cyber aesthetic.

## METHODOLOGY
SpecDD (Specification-Driven Development) via BMAD method.
- Write specs before code
- All specs in `_bmad/specs/`
- All documentation in `docs/`

## STACK
React 19 + TypeScript 5 + Vite 6 + TailwindCSS v4 + Zustand + PWA.
Routing: React.lazy + Suspense. State: Zustand (10 stores). Testing: Vitest.

## STRUCTURE
```
src/
  main.tsx              — entry point
  App.tsx               — root shell (layout + lazy routes)
  pages/                — 10 page components (lazy loaded)
  components/
    layout/             — Navbar, Footer, CartSidebar, etc.
    catalog/            — Carousel, ProductCard, ProductGrid, etc.
    checkout/           — CheckoutForm, OrderSummary, CheckoutModal
    account/            — AccountLogin, CustomerOTPLogin, OrderHistory, LoyaltyCard, etc.
    contact/            — IntlForm, ContactCard, WhatsAppButton
    admin/              — BrandingConfig, ContentEditor, CarouselEditor, TwoFactorSetup,
                          ProductImageManager, SalesProjection, SocialConnect, etc.
    loyalty/            — RewardsGrid, TierGrid, RewardCard, LoyaltyCard
    shared/             — Modal, Toast, Badge, Button, Toggle, etc.
  stores/               — Zustand stores (auth, cart, ui, config, loyalty, loyaltyData,
                          notifications, social, waConfig, branding, cms, products)
  types/                — TypeScript type definitions (product, customer, cart, loyalty,
                          cms, social, config, notification)
  data/                 — static fallback data (products, tiers, rewards, config)
  utils/                — formatters, storage, waUrl, rewardEngine
  hooks/                — useInitApp, usePageMeta, useTimer
_bmad/                  — BMAD method specs
docs/                   — Architecture, roadmap, backlog, specs, rewards-system
```

## DATA
Products in `src/data/products.ts` (55 items, 4 categories) and `src/stores/productStore.ts` (API-backed with local fallback).
Tiers and Rewards in `src/stores/loyaltyDataStore.ts` (API-backed with local fallback).
Cart, customers, notifications: Zustand stores with localStorage persistence.
Demo account: Valentina Neko (24247171, 1620 pts, tier ECLIPSE).
Prices in colones (₡). 1 punto por cada ₡500 de compra.

## SOURCE OF TRUTH RULE
- API + PostgreSQL are the source of truth for all operational site data.
- No customer-facing or admin-facing production feature may depend on hardcoded products, customer accounts, orders, stock, rewards, carousel content, site copy, branding, notifications, campaigns, or WhatsApp config.
- Local/static data is allowed only for empty states, compile-time UI options, tests, and emergency offline read-only fallbacks. Any fallback must be visibly non-operational and must not create sessions, orders, inventory changes, or admin changes.
- Zustand is a client cache/UI state layer only. Mutations that affect business data must go through API endpoints and then re-sync from the database.

## ROLES (when prompted)
- **Senior Web Dev**: component architecture, state management, PWA, performance, a11y
- **Senior Backend Dev**: data modeling, WhatsApp integration, order flow, validation
- **Senior QA**: Playwright E2E, Vitest unit, Lighthouse audits, visual regression

## RULES
- SpecDD first: write spec → implement → test
- All text in Spanish (CR dialect) for UI
- Prices in colones (₡) via currencySymbol
- Mobile-first responsive (320px+)
- Gothic aesthetic: dark/light theme, gold accents, Megasord/Cormorant/Space Mono fonts

## CODE QUALITY (REQUIRED)
- **Biome**: 0 errores (lint + format). Corre con `npx biome check src/`
- **TypeScript**: `tsc --noEmit` must pass con 0 errores (strict mode)
- **a11y**: todos los labels con `htmlFor`, botones accesibles, roles semánticos
- **No `dangerouslySetInnerHTML`**: reemplazar con JSX seguro
- **No array index keys**: usar IDs estables únicos
- **Componentes puros**: props > store reads cuando sea posible
- **Commits frecuentes**: por bloque funcional probado, sin push hasta tener remote

## PWA REQUIREMENTS
- vite-plugin-pwa with Workbox
- Offline catalog fallback
- Web manifest with dark/light theme_color
- Install prompt handling

## KEY INTEGRATIONS
- WhatsApp deep links (wa.me) for order confirmation
- Email for international inquiries
- SINPE Móvil / PayPal (future)
- Admin 2FA via TOTP (otplib, Google Authenticator / Authy)
- Customer OTP via WhatsApp
- Image uploads via `@fastify/multipart` + `@fastify/static`
- CMS site content + carousel with CRUD endpoints

## CRITICAL CONTEXT
- Backend: Fastify + PostgreSQL on `nestDB`. 15 migrations applied. 18 route files registered.
- Frontend: `npx vite --host` (5173). Backend: `cd backend && node src/index.js` (4000).
- All stores use Zustand persist with localStorage backup.
- `useInitApp` fetches config, products, loyalty data on mount; fetches user-specific data when JWT token present.
- `src/utils/rewardEngine.ts` implements full reward scoring, budget, tier access, and financial protection logic.
