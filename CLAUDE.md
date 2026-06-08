# NEKO STORE — opencode Context

## Project
Gothic fashion e-commerce migration: vanilla JS → React 19 + TS + Vite 6 + TailwindCSS v4 + Zustand + PWA.

## Critical Files
- `_bmad/specs/` — BDD specs (write before implementing)
- `docs/roadmap.md` — migration phases
- `docs/backlog.md` — prioritized tasks
- `docs/architecture.md` — target architecture
- `docs/components.md` — React component tree
- `docs/data-flow.md` — Zustand stores
- `docs/qa-plan.md` — testing strategy

## Workflow
1. Read spec from `_bmad/specs/`
2. Check backlog in `docs/backlog.md`
3. Implement with strict TypeScript, no `any`
4. Test with Vitest (unit) + Playwright (E2E)
5. Verify PWA via Lighthouse

## Conventions
- Spanish UI, English code comments
- Mobile-first (320px+), gothic aesthetic
- WhatsApp wa.me links for orders
- Zustand persist middleware for LocalStorage
