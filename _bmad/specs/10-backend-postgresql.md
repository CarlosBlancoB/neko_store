# Spec: Backend + PostgreSQL Migration

## Description
Migrar la lógica de negocio de las stores Zustand (localStorage) a una base de datos PostgreSQL con API REST backend. Esto permite persistencia real, consultas complejas, autenticación segura y escalabilidad.

## Core Features

### 1. Base de Datos
- PostgreSQL con schema completo en `backend/migrations/`
- 13 tablas: customers, categories, products, orders, order_items, loyalty_tiers, rewards, reward_redemptions, social_campaigns, social_posts, assets, notifications, config
- Sistema de migraciones con tracking (`_migrations` table)
- Seeds para datos demo (55 productos, demo customer, tiers, rewards)

### 2. API REST
- **Framework**: Express.js o Fastify
- **Autenticación**: JWT con refresh tokens + WhatsApp OTP
- **Validación**: Zod schemas compartidos con frontend

#### Endpoints
```
GET    /api/products         — catálogo (filtros: categoría, precio, búsqueda)
GET    /api/products/:id     — detalle de producto
POST   /api/auth/login       — login vía WhatsApp OTP
POST   /api/auth/register    — registro
POST   /api/auth/verify      — verificar OTP
GET    /api/customers/me     — perfil del cliente
PUT    /api/customers/me     — actualizar perfil
POST   /api/orders           — crear orden
GET    /api/orders           — historial de órdenes
GET    /api/orders/:id       — detalle de orden
GET    /api/loyalty          — estado de lealtad (puntos, tier, rewards)
POST   /api/loyalty/redeem   — canjear recompensa
GET    /api/admin/products   — CRUD productos (admin)
POST   /api/admin/products   — crear producto
PUT    /api/admin/products/:id — actualizar producto
DELETE /api/admin/products/:id — eliminar producto
GET    /api/admin/orders     — lista de pedidos (admin)
PUT    /api/admin/orders/:id/status — cambiar estado
GET    /api/admin/metrics    — dashboard analytics
GET    /api/admin/posts      — social posts CRUD
POST   /api/admin/posts      — crear post
PUT    /api/admin/posts/:id/publish — publicar post vía Graph API
GET    /api/admin/campaigns  — campañas CRUD
```

### 3. Autenticación
- WhatsApp OTP: generar código de 6 dígitos, enviar por deep link
- JWT access token (15min) + refresh token (7 días)
- Roles: `customer` y `admin`
- Middleware de autenticación en rutas protegidas

### 4. Migración de Datos
- Script para migrar datos de localStorage a PostgreSQL
- Mantener compatibilidad con stores Zustand durante transición
- Estrategia: stores → API calls → PostgreSQL

### 5. WhatsApp Integration (Server-side)
- Usar `wa-js` o `@whiskeysockets/baileys` para enviar mensajes reales
- O usar WhatsApp Business API oficial
- Webhook para recibir confirmaciones de lectura/entrega

### 6. Rate Limiting & Seguridad
- `express-rate-limit` en endpoints de API
- CORS configurado solo para origen del frontend
- Helmet para headers de seguridad
- Input sanitization con Zod

## Technical Architecture

### Estructura de directorios
```
backend/
  migrations/          — SQL migration files
  seeds/               — SQL seed files
  src/
    index.js           — entry point
    routes/            — route handlers
    middleware/        — auth, validation, error handling
    services/         — business logic
    models/           — database queries
    validators/       — Zod schemas
  run-migrations.js   — migration runner
  run-seeds.js        — seed runner
  .env                — environment variables
  package.json
```

### Tecnologías
- **Runtime**: Node.js 22
- **Framework**: Fastify (más rápido que Express, schema validation nativa)
- **ORM/Query**: `pg` raw queries + helper functions
- **Auth**: `jsonwebtoken`, `bcrypt`
- **Validation**: Zod
- **WhatsApp**: `@whiskeysockets/baileys` (fase 2)

## Acceptance Criteria
- [ ] Migrations crean todas las tablas correctamente
- [ ] Seeds insertan datos demo (55 productos, customer demo, tiers)
- [ ] API CRUD para productos funcionando
- [ ] Autenticación con JWT + WhatsApp OTP
- [ ] Órdenes se guardan en DB y se recuperan en historial
- [ ] Panel admin puede gestionar productos, órdenes, posts
- [ ] Datos de localStorage se migran a PostgreSQL sin pérdida
- [ ] Rate limiting y seguridad implementados

## Estado de checklist - 2026-06-10

- [x] Migrations existen para schema base y extensiones actuales (15 archivos SQL en `backend/migrations/`)
- [x] Seeds existen para categorias, productos, loyalty, customer demo, ordenes y config
- [~] Seed demo minimo `backend/seeds/008_seed_demo_min_catalog.sql` cubre 3 productos por categoria para QA local; pendiente purga pre-produccion `DATA-001`
- [x] API CRUD para productos implementada en rutas publicas y admin
- [~] Autenticacion con JWT implementada; WhatsApp OTP vive en flujo separado y requiere QA/endurecimiento
- [~] Ordenes tienen rutas backend y store/API cliente; falta prueba e2e del flujo `pending_payment` -> confirmacion/rechazo
- [~] Panel admin gestiona productos, ordenes, posts, campanas, branding, CMS, carrusel, notificaciones, WA config y 2FA; falta QA integral
- [ ] Datos de localStorage se migran a PostgreSQL sin perdida
- [ ] Rate limiting y seguridad implementados como politica completa

CodeGraph detecta backend Fastify con rutas publicas/admin, 15 migraciones a nivel de archivos y frontend sincronizando datos por `useInitApp`. El foco pendiente ya no es scaffold; es confiabilidad operativa: auth OTP, reservas de stock, transiciones de orden, rate limiting y QA de integracion.

## Technical Notes
- Las stores Zustand seguirán existiendo como cache cliente, pero la fuente de verdad será la DB
- Estrategia de caché: SWR (stale-while-revalidate) con React Query
- Las imágenes seguirán siendo URLs de Unsplash (sin file storage propio)
- Para producción: usar Connection Pooling (pgBouncer) en la DB
