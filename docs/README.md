# NEKO STORE — Documentación Técnica

Migración de vanilla JS → React + TypeScript + Vite + TailwindCSS v4 + Zustand + PWA.

## Estado actual - 2026-06-10

Fuente: revision CodeGraph + BMAD.

- React/TypeScript/Vite/Zustand/PWA ya estan implementados como base funcional.
- Backend Fastify/PostgreSQL existe con migraciones, seeds y rutas publicas/admin.
- Admin, social mock, branding, CMS, carrusel, 2FA y configuracion WhatsApp estan adelantados.
- Foco inmediato: QA gates, auth OTP cliente, reservas de stock, confirmacion manual SINPE, alertas internas y responsive hardening.
- Para tareas activas, revisar primero `docs/backlog.md` -> "TODO activo inmediato".
- Para estado real por feature, revisar `feature-audit.md`.

## Stack Objetivo
| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript |
| Build | Vite 6 |
| Estilos | TailwindCSS v4 |
| Estado | Zustand + persist (LocalStorage) |
| PWA | vite-plugin-pwa + Workbox |
| Testing | Vitest + Playwright |
| QA | Lighthouse + axe-core |

## Documentos
- `roadmap.md` — Plan de migración por fases
- `backlog.md` — Backlog priorizado de tareas
- `feature-audit.md` — Auditoria actual de features, riesgos y siguientes acciones
- `architecture.md` — Arquitectura objetivo
- `components.md` — Árbol de componentes
- `data-flow.md` — Flujo de datos y stores
- `pwa.md` — Especificación PWA
- `whatsapp-integration.md` — Integración WhatsApp
- `rewards-system.md` — Sistema de recompensas
- `visual-design.md` — Sistema de diseño
- `qa-plan.md` — Estrategia de QA
