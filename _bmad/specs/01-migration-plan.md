# Spec: React Migration Plan

## Phases
1. Foundation — Vite + React scaffold, routing, theme system
2. Data Layer — Zustand stores, LocalStorage persistence
3. Components — Catalog, Cart, Checkout, Account, Loyalty
4. PWA — Service worker, offline fallback, manifest
5. Polish — Animations, i18n, performance, QA

## Migration Strategy
Incremental — build React app alongside current HTML, then swap

## Checkpoint - 2026-06-10

Estado observado con CodeGraph:
- Fase 0 Foundation: completada funcionalmente. Hay Vite, React 19, TS, rutas, layout, tema, Biome, Vitest y PWA plugin.
- Fase 1 Data Layer: completada en frontend y extendida con stores API-backed. Pendiente QA integral y migracion formal de legacy localStorage.
- Fase 2 Components: completada a nivel de estructura y componentes principales. Pendiente hardening responsive/a11y y cobertura visual.
- Fase 3 PWA: implementada parcialmente. Hay manifest/SW/offline hooks, falta Lighthouse y prueba offline formal.
- Fase 4 WhatsApp: implementada parcialmente via utilidades/deep links/templates. Falta cerrar operacion real de pedidos, reservas y comprobantes.
- Fase 5 Payments: sigue futuro, con SINPE manual como flujo operativo proximo.
- Fase 6 Admin: adelantada. Existe `/admin` con branding, notificaciones, contenido, carrusel, 2FA, campanas, rewards e inventario/proyeccion.
- Fase 7 Operacion: ahora es el foco activo. Priorizar stock/reservas, OTP real, alertas y QA responsive.

Siguiente bloque recomendado:
1. Correr gates de calidad: Biome, typecheck, tests y build.
2. Cerrar flujo pedido real: crear orden `pending_payment`, reserva TTL, alerta admin, confirmacion/rechazo.
3. Endurecer auth: registro minimo + OTP WhatsApp antes de sesion.
4. Ejecutar auditoria responsive 320px-1536px y corregir desbordes.
