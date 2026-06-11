# NEKO STORE - Auditoria de Features

Fecha: 2026-06-10  
Fuente: CodeGraph + lectura de rutas/stores/componentes.

## Regla de fuente de verdad

Todo dato operativo debe venir de API + PostgreSQL:
- Productos, stock, precios, costos, imagenes y categorias.
- Clientes, sesiones, OTP, ordenes, puntos, tiers y rewards.
- Admin: productos, pedidos, CMS, carrusel, branding, WhatsApp config, notificaciones, campanas y 2FA.
- El frontend puede cachear con Zustand, pero no decidir datos de negocio desde arrays locales.
- Fallback local solo puede ser read-only/offline o test/demo aislado, nunca flujo operativo.

## Estado por feature

| Feature | Estado | Hallazgo | Siguiente accion |
|---|---|---|---|
| Catalogo publico | Parcial | `productStore` ya consume API, pero antes arrancaba con `src/data/products.ts` y casteaba snake_case sin mapear. | Mantener API-first, eliminar dependencia operativa de `src/data/products.ts`, validar imagenes reales desde DB/uploads. |
| Productos + stock admin | Parcial/riesgo alto | Admin tenia solo `SalesProjection`; no habia gestor claro tipo WordPress. Backend admin no persistia todos los campos de stock/costo/badge. | Completar CRUD visual: crear producto, editar descripcion/imagenes/tallas, historial de stock, filtros, busqueda, paginacion. |
| Dashboard admin | Parcial | Es una lista de tabs tecnicos; no hay home operativo con resumen de pedidos, stock bajo, ventas pendientes y tareas. | Crear dashboard inicial estilo WordPress con menu lateral, cards de estado y accesos a Productos, Pedidos, Clientes, Contenido, Marketing, Ajustes. |
| 2FA admin | Parcial/riesgo alto | Existe setup/verificacion, pero no esta integrado como guard obligatorio para entrar al admin. | Crear login admin real: password/rol + challenge 2FA si esta activo; proteger `/admin` en frontend y backend. |
| Auth cliente OTP | Parcial/riesgo alto | Existia OTP backend, pero UI permitia login local/demo por telefono y descartaba token de API. | Flujo cliente debe ser solo OTP/API; agregar registro minimo nombre/apellidos/edad/telefono antes de activar cuenta nueva. |
| Dashboard cliente | Parcial | Mostraba cache local/demo; no hidrataba siempre perfil/ordenes desde API. | Completar perfil editable desde API, direcciones, preferencias, historial real, puntos y redenciones reales. |
| Checkout + ordenes | Parcial/riesgo alto | API crea orden `pending`, no `pending_payment`; no reserva stock ni genera alerta admin obligatoria. | Implementar `pending_payment`, reserva TTL, liberacion, confirmacion/rechazo SINPE y alertas internas. |
| Inventario/reservas | Pendiente | No hay tabla/flujo de stock reservado ni auditoria de movimientos. | Agregar `stock_reservations` o campos equivalentes, transacciones y job de expiracion. |
| Loyalty/rewards | Parcial | Tiers/rewards tienen API-backed store, pero aun hay fallback local y dashboard cliente no esta cerrado contra API. | Hacer rewards/tier 100% DB, redenciones con orden/cliente real y auditoria admin. |
| CMS contenido | Parcial | Hay rutas/admin para site content y carrusel, pero paginas aun tienen texto/imagenes importadas en algunos lugares. | Pasar Home/About/Contact/Carousel a contenido publico API; dejar hardcoded solo textos de empty/error. |
| Branding | Parcial | Store/admin existe, pero modelo actual no separa logo texto/isotipo como pide spec; OG/social overlay pendiente. | Separar logos oficiales, guardar en DB/uploads, generar QR/OG desde config API. |
| WhatsApp config/templates | Parcial | Config existe, templates siguen en `src/data/waTemplates.ts`; checkout tiene fallback local. | Guardar templates/config en DB y renderizar mensajes desde API/config versionada. |
| Notificaciones | Parcial | Store local + rutas admin; falta centro cliente/admin plenamente operativo y eventos de orden. | Eventos de orden deben crear notificaciones DB; UI debe consumir API y marcar lectura. |
| Social/campanas | Mock/parcial | Simula OAuth/publicacion/metricas; util como prototype, no feature productivo. | Marcar como mock hasta integrar Graph API o limitar a calendario editorial interno. |
| PWA/offline | Parcial | PWA base existe; no hay auditoria Lighthouse/offline reciente. | Correr Lighthouse, validar offline read-only y evitar mutaciones offline falsas. |
| QA | Pendiente | No hay evidencia reciente de Biome/typecheck/tests/build despues de cambios grandes. | Gates obligatorios antes de seguir agregando features. |

## Prioridad de limpieza

1. Gates: `npx biome check src/`, `npm run typecheck`, `npm run test:run`, `npm run build`.
2. Admin operativo: dashboard home, productos/stock, pedidos pendientes y 2FA obligatorio.
3. Cliente: OTP API-only, perfil desde DB, ordenes/puntos desde DB.
4. Checkout real: orden `pending_payment`, reserva stock, alerta admin, confirmacion SINPE.
5. Eliminar hardcoded operativo de paginas publicas y stores.

## Cambios aplicados en esta pasada

- `productStore` inicia vacio y mapea respuesta API snake_case a `Product`.
- `ProductImage` acepta URLs reales de API/uploads.
- `AccountLogin` deja de exponer login local/demo y usa OTP.
- `CustomerOTPLogin` guarda token/user de API y sincroniza perfil/ordenes.
- `AccountDashboard` refresca datos desde API al entrar.
- `ProductManager` agrega una primera pantalla admin de productos/stock estilo WordPress.
- Ruta admin de productos ahora acepta/persiste stock, costo, umbral, badge, puntos y estado.

## Validacion ejecutada

- `npx biome check src/`: pasa.
- `npm run typecheck`: pasa.
- `npm run build`: pasa.
- `npm run test:run`: pasa, 18 archivos / 125 tests.
- `node --check backend/src/routes/admin/products.js`: pasa.

Pendiente: smoke manual con backend vivo para OTP, admin productos, permisos 2FA, checkout y flujo responsive.

## Handoff urgente - 2026-06-10

El foco actual NO es revisar paginas/rutas todavia. Eso queda para despues de cerrar las tareas base:

1. Admin auth + 2FA obligatorio.
2. Admin WordPress-style operativo.
3. Cliente API-only.
4. Checkout/ordenes/stock real.
5. Luego si revisar paginas/rutas/CTAs.

### Cambios ya iniciados despues de la validacion anterior

- Backend:
  - Agregada migracion `backend/migrations/016_normalize_auth_customers.sql` para columnas que las rutas ya usaban: `role`, `tier`, `address`, `total_spent`.
  - Agregado seed `backend/seeds/007_seed_admin.sql` con admin local `admin@nekostore.cr` / `admin123`.
  - Reescrito `backend/src/routes/auth.js` sin mojibake y con login admin por email/telefono.
  - Login admin ahora responde `requires2FA` si el admin tiene 2FA activo.
  - `backend/src/routes/admin/2fa.js` ahora emite JWT admin despues de validar TOTP/backup code.
  - `backend/src/routes/customerAuth.js` corregido para crear clientes OTP compatibles con columnas requeridas (`email`, `password_hash`, `role`, `tier`).

- Frontend:
  - Agregado `src/components/admin/AdminLogin.tsx`.
  - `src/pages/AdminPage.tsx` ahora bloquea el panel si no hay token o el usuario no es admin.
  - Agregados `AdminHome` y `OrdersManager`, pero esto debe revisarse al retomar admin; se inicio antes de pausar paginas/rutas.
  - Agregados estilos para login/admin home/orders en `src/index.css`.

### Estado de validacion despues de esos cambios

- `npm run typecheck`: PASA.
- `node --check backend/src/routes/auth.js`: PASA.
- `node --check backend/src/routes/admin/2fa.js`: PASA.
- `node --check backend/src/routes/customerAuth.js`: PASA.
- `npx biome check src/`: FALLA solo por formato/organize imports en:
  - `src/components/admin/AdminHome.tsx`
  - `src/components/admin/OrdersManager.tsx`
  - `src/pages/AdminPage.tsx`
  - `src/services/cmsApi.ts`

### No seguir ahora

- No avanzar auditoria de paginas/rutas/CTAs hasta cerrar admin/auth/checkout.
- No construir paginas legales nuevas sin preguntar si valen la pena.
- No ampliar marketing/social hasta estabilizar operacion real.

### Retomar aqui

1. Arreglar Biome de los 4 archivos anteriores.
2. Ejecutar `npx biome check src/` y `npm run typecheck`.
3. Completar/validar admin login + 2FA con backend vivo.
4. Completar admin home/pedidos/productos como flujo operativo.
5. Implementar checkout real con `pending_payment`, reserva de stock y alertas.
