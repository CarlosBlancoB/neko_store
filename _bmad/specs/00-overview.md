# NEKO STORE — SpecDD Overview

## Domain
Gothic fashion e-commerce for Costa Rica market.

## Core Features
- Product catalog with categories
- Shopping cart with LocalStorage persistence
- WhatsApp order confirmation + notification system (admin & customer)
- Loyalty/rewards program with tiers
- Contact form persisted to admin dashboard
- Dark/light theme
- Admin dashboard for store configuration
- PWA offline support (target)
- Social Media Campaign Manager (Facebook + Instagram organic posting)
- Branding System (logo, QR, branded OG images, campaign branding)

## Migration Target
React 19 + TypeScript + Vite + TailwindCSS v4 + Zustand + PWA

## Regla de desarrollo - fuente de verdad

- API + PostgreSQL son la fuente de verdad de todo dato operativo.
- No se acepta data hardcoded para productos, stock, precios, clientes, ordenes, rewards, CMS, branding, carrusel, WhatsApp config, notificaciones o campanas en funcionalidades productivas.
- Zustand solo cachea datos de API y maneja estado UI. Toda mutacion de negocio debe ir por API y resincronizar desde DB.
- Los archivos en `src/data/` quedan limitados a tests, opciones UI estaticas, placeholders o fallback offline read-only.
- NEKO no es un POC: no existe categoria `demo` ni UI que trate productos como falsos.
- Datos iniciales/staging (`demo-*`, cuenta Valentina, ordenes/notificaciones de prueba) son solo para QA local/staging y deben eliminarse antes de migrar al servicio final de produccion.
- Los IDs `demo-*` solo pueden usarse como identificadores tecnicos para limpieza; no como badge, categoria o copy visible.

## Estado actual — 2026-06-10

Analisis con CodeGraph:
- Indice sano: 158 archivos, 1084 nodos, 1798 edges.
- Frontend migrado a React/TypeScript con rutas lazy en `src/App.tsx`.
- Componentes principales presentes: catalogo, carrito, checkout, cuenta, loyalty, contacto, admin, shared.
- Stores Zustand presentes y persistentes: auth, cart, ui, config, loyalty, notifications, branding, cms, products, social, waConfig, loyaltyData.
- Backend Fastify/PostgreSQL presente en `backend/` con 15 migraciones y rutas API/admin registradas.
- PWA presente con vite-plugin-pwa, `offline.html`, hooks de instalacion y actualizacion.
- Tests Vitest presentes para stores, utils y componentes principales.

Brechas abiertas:
- Validar con QA real: `npx biome check src/`, `npm run typecheck`, `npm run test:run`, build y smoke manual.
- OTP WhatsApp real y flujo passwordless aun no quedan cerrados en todos los puntos.
- Reserva temporal de stock y confirmacion manual SINPE siguen como flujo parcial/pendiente de prueba end-to-end.
- Social/branding tienen UI/store/backend parcial, pero Graph API real, OG generator y branding overlay completo siguen pendientes.

## Handoff de continuidad - 2026-06-10

No continuar con auditoria de paginas/rutas hasta cerrar la base operativa:

1. Admin login + 2FA obligatorio.
2. Admin estilo WordPress para productos, stock y pedidos.
3. Cliente API-only con OTP y dashboard desde DB.
4. Checkout real con `pending_payment`, reserva de stock, alertas y confirmacion SINPE.
5. Luego revisar paginas/rutas/CTAs; preguntar antes de construir features grandes o paginas legales.

Estado parcial ya iniciado:
- Migracion `016_normalize_auth_customers.sql` agrega columnas esperadas por rutas.
- Seed `007_seed_admin.sql` crea admin local de desarrollo.
- `auth.js`, `admin/2fa.js` y `customerAuth.js` fueron ajustados para admin/2FA/OTP.
- `AdminLogin`, `AdminHome` y `OrdersManager` existen, pero falta terminar QA/UX.
- Typecheck pasa; Biome queda pendiente por formato en 4 archivos.
