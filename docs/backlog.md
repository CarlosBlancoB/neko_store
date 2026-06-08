# NEKO STORE — Backlog Priorizado

## Formato
- **ID:** `NEKO-XXX`
- **Prioridad:** P0 (bloqueante) / P1 (crítica) / P2 (importante) / P3 (deseable)
- **Fase:** 0–6
- **Esfuerzo:** S (≤4h) / M (1-2d) / L (3-5d) / XL (1-2s)
- **Dependencias:** IDs de items que deben completarse primero

---

### Fase 0 — Foundation

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-001 | Scaffold Vite + React 19 + TypeScript | P0 | S | — | Inicializar proyecto con `npm create vite@latest`, configurar tsconfig estricto |
| NEKO-002 | Configurar TailwindCSS v4 | P0 | S | NEKO-001 | Instalar TailwindCSS v4, postcss, configurar `@tailwind` directives en CSS |
| NEKO-003 | Configurar React Router v7 | P0 | S | NEKO-001 | Instalar react-router, crear router con rutas base (/, /cuenta, /contacto, /carrito, 404) |
| NEKO-004 | Configurar ESLint + Prettier | P1 | S | NEKO-001 | Reglas para React + TS, prettier con single quotes, trailing commas |
| NEKO-005 | Configurar Vitest | P1 | S | NEKO-001 | Setup con jsdom, testing-library, config en vite.config.ts |
| NEKO-006 | Configurar Playwright | P1 | M | NEKO-001 | Instalar, configurar browsers (chromium, firefox, webkit), crear spec básico |
| NEKO-007 | Crear estructura de carpetas src/ | P0 | S | NEKO-001 | components/, stores/, hooks/, types/, utils/, pages/, assets/, styles/ |
| NEKO-008 | Crear layout base (Navbar + Footer) | P0 | M | NEKO-003 | Layout persistente con Outlet, Navbar responsiva, Footer con links |
| NEKO-009 | Implementar ThemeToggle con CSS variables | P0 | M | NEKO-002 | Variables CSS para dark/light, toggle en Navbar, persistir preferencia |
| NEKO-010 | Configurar vite-plugin-pwa | P1 | S | NEKO-001 | Manifest, icons, workbox config básica |
| NEKO-011 | Generar iconos y splash para PWA | P1 | S | NEKO-010 | Iconos en sizes 48-512px, generar con herramienta o manual |
| NEKO-012 | Configurar fuentes: Megasord, Cormorant, Space Mono | P1 | S | NEKO-002 | Google Fonts + font-face para Megasord (local), definir en theme |
| NEKO-013 | Configurar alias paths (@components, @stores, etc.) | P1 | S | NEKO-001 | Alias en vite.config.ts y tsconfig.json |

### Fase 1 — Data Layer

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-014 | Definir interfaces TypeScript globales | P0 | M | NEKO-007 | Product, CartItem, Customer, Order, LoyaltyTier, Reward, Notification, Address interfaces |
| NEKO-015 | Migrar PRODUCTS hardcoded a tipo seguro | P0 | M | NEKO-014 | Array tipado con todos los productos legacy, validar campos |
| NEKO-016 | Implementar useConfigStore | P0 | S | NEKO-014 | Store para config de tienda: moneda, impuesto, gastos de envío, con persist |
| NEKO-017 | Implementar useCartStore | P0 | L | NEKO-014 | addItem, removeItem, updateQty, clearCart, applyShipping, calcular subtotal/tax/total |
| NEKO-018 | Implementar useAuthStore | P1 | M | NEKO-014 | login, logout, updateProfile, session persist, tipo Customer |
| NEKO-019 | Implementar useLoyaltyStore | P1 | L | NEKO-014 | addPoints, redeemReward, calcularTier, historial, expiration logic |
| NEKO-020 | Implementar useNotificationStore | P1 | S | NEKO-014 | addNotif, dismissNotif, clearAll, auto-dismiss timed |
| NEKO-021 | Implementar useUIStore | P1 | S | NEKO-014 | toggleCart, toggleModal, setActiveModal, setFilter, activeCategory |
| NEKO-022 | Migración de localStorage schema legacy | P1 | M | NEKO-017 | Leer datos antiguos, transformar al nuevo schema, guardar, respaldar legacy |
| NEKO-023 | Tests unitarios de useCartStore | P0 | M | NEKO-017 | 100% de acciones cubiertas, edge cases (qty NaN, stock 0, max 99) |
| NEKO-024 | Tests unitarios de useLoyaltyStore | P1 | M | NEKO-019 | Cálculo de tiers, puntos, expiración, redención |
| NEKO-025 | Tests unitarios de stores restantes | P2 | S | NEKO-016, 018, 020, 021 | Tests básicos de cada store |

### Fase 2 — Component Migration

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-026 | Implementar ProductCard | P0 | M | NEKO-015, NEKO-021 | Card con imagen, nombre, precio, badge, puntos, botón add-to-cart |
| NEKO-027 | Implementar ProductGrid | P0 | M | NEKO-026 | Grid responsivo (1-4 cols), consume productos del store |
| NEKO-028 | Implementar FilterBar | P0 | M | NEKO-021 | Filtros por categoría, precio (rango), talla, búsqueda por nombre |
| NEKO-029 | Implementar ProductModal | P0 | M | NEKO-026 | Modal con detalle completo, size picker, badge, descripción, add-to-cart |
| NEKO-030 | Implementar CartSidebar | P0 | M | NEKO-017, NEKO-021 | Slideover lateral con lista de items, total, checkout button |
| NEKO-031 | Implementar CartItem | P0 | S | NEKO-017 | Item individual con thumbnail, nombre, talla, qty, precio, remove |
| NEKO-032 | Implementar CartFooter | P0 | S | NEKO-017 | Subtotal, tax, shipping, total, CTA |
| NEKO-033 | Implementar ShippingOptions | P1 | S | NEKO-017 | Selector de método de envío (CR: Correos, delivery propio) |
| NEKO-034 | Implementar CheckoutModal | P0 | L | NEKO-030, NEKO-018 | Modal con formulario de envío, resumen, método de pago |
| NEKO-035 | Implementar CheckoutForm | P0 | M | NEKO-034 | Formulario con validación: nombre, teléfono (+506), dirección, provincia, notas |
| NEKO-036 | Implementar OrderSummary | P0 | S | NEKO-034 | Resumen de orden previo a confirmar |
| NEKO-037 | Implementar AccountLogin | P1 | M | NEKO-018 | Login con número de WhatsApp, input +506, validación, mock OTP |
| NEKO-038 | Implementar AccountDashboard | P1 | M | NEKO-037 | Estadísticas, últimas órdenes, atajos |
| NEKO-039 | Implementar StatsGrid | P1 | S | NEKO-038 | Grid de stats: órdenes totales, gastado, puntos, member since |
| NEKO-040 | Implementar OrderHistory | P1 | M | NEKO-018 | Lista de órdenes previas con estado, total, fecha |
| NEKO-041 | Implementar AccountTabs | P1 | S | NEKO-038 | Tabs: Dashboard, Órdenes, Lealtad, Configuración |
| NEKO-042 | Implementar LoyaltyCard | P1 | M | NEKO-019 | Card principal con tier, puntos, progreso, next tier |
| NEKO-043 | Implementar TierGrid | P1 | S | NEKO-019 | Visualización de todos los tiers con beneficios |
| NEKO-044 | Implementar RewardsGrid + RewardCard | P1 | M | NEKO-019 | Catálogo de recompensas disponibles para canjear |
| NEKO-045 | Implementar ProgressBar | P1 | S | NEKO-019 | Barra de progreso para next tier con animación |
| NEKO-046 | Implementar ContactCard | P2 | S | — | Card con info de contacto (WhatsApp, email, ubicación) |
| NEKO-047 | Implementar IntlForm | P2 | M | — | Formulario de contacto con selector de país, validación |
| NEKO-048 | Implementar ContactInfoStrip | P2 | S | — | Tira de iconos de contacto en homepage |
| NEKO-049 | Implementar Toast | P0 | S | NEKO-020 | Componente toast con tipos success/error/info/warning, auto-dismiss |
| NEKO-050 | Implementar Modal genérico | P0 | M | — | Modal reutilizable con backdrop, close, animación, foco trampa |
| NEKO-051 | Implementar Button con variantes | P0 | S | — | Variantes: primary, secondary, outline, ghost, sizes, loading state |
| NEKO-052 | Implementar Toggle | P1 | S | — | Toggle switch para settings |
| NEKO-053 | Implementar Badge | P1 | S | — | Badge para productos (Nuevo, Oferta, Exclusivo) y alertas |
| NEKO-054 | Implementar SizePicker | P0 | S | — | Selector de tallas (XS-3XL) con disponibilidad |
| NEKO-055 | Implementar NotificationsPanel | P1 | S | NEKO-020 | Panel de notificaciones con lista, dismiss, empty state |
| NEKO-056 | Implementar DropAlert | P1 | S | NEKO-020 | Alerta dropdown en navbar para notificaciones |
| NEKO-057 | Implementar páginas con lazy loading | P1 | M | NEKO-003 | React.lazy + Suspense para cada página |
| NEKO-058 | Implementar estados vacíos para todas las listas | P1 | M | Múltiples | Empty states para carrito, órdenes, recompensas, notificaciones |
| NEKO-059 | Tests de componentes principales | P1 | L | NEKO-026-057 | Render tests para cada componente, interaction tests para críticos |

### Fase 3 — PWA & Offline

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-060 | Configurar service worker con estrategias de cache | P1 | M | NEKO-010 | Cache-first para CSS/JS/imágenes, network-first para datos |
| NEKO-061 | Implementar offline catalog page | P2 | M | NEKO-060 | Página que muestra productos cacheados cuando offline |
| NEKO-062 | Implementar install prompt personalizado | P2 | M | NEKO-010 | UI custom para "Instalar NEKO" con criterios beforeinstallprompt |
| NEKO-063 | Implementar update notification flow | P2 | S | NEKO-060 | Detectar SW update, mostrar notificación, recargar |
| NEKO-064 | Auditoría Lighthouse PWA | P1 | S | NEKO-060-063 | Score ≥ 90 en categoría PWA |

### Fase 4 — WhatsApp Integration

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-065 | Crear utilidad WhatsAppEncoder | P0 | S | NEKO-014 | encodeOrderToMessage(cart, customer) → string |
| NEKO-066 | Implementar generateDeepLink | P0 | S | NEKO-065 | wa.me link con mensaje codificado y número +506 |
| NEKO-067 | Plantilla "new order" para WhatsApp | P1 | M | NEKO-065 | Template: items, cantidades, tallas, subtotal, envío, total |
| NEKO-068 | Botón "Pedir por WhatsApp" en checkout | P0 | S | NEKO-066, NEKO-067 | Botón que abre deep link con orden resumida |
| NEKO-069 | Formateo y validación de número +506 | P0 | S | — | Input con prefijo +506, validación 8 dígitos, formato legible |
| NEKO-070 | Fallback email si WhatsApp no disponible | P1 | M | NEKO-068 | mailto: como respaldo con misma información |
| NEKO-071 | Template "order confirmation" | P2 | S | NEKO-067 | Mensaje de confirmación para copiar y enviar al cliente |
| NEKO-072 | Documentación integración WhatsApp Business API | P3 | S | — | Notas técnicas para migración futura |

### Fase 5 — Payment Gateway (Futuro)

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-073 | Investigar integración SINPE Móvil | P3 | S | — | Documentar requisitos de Banco Central, API, costos |
| NEKO-074 | Investigar integración PayPal | P3 | S | — | Documentar SDK, costos, geografía |
| NEKO-075 | Diseñar flujo de pago unificado | P3 | M | NEKO-073, NEKO-074 | Diagrama de flujo con todos los métodos |
| NEKO-076 | Componente PaymentMethodSelector | P2 | M | NEKO-075 | Tabs para seleccionar método de pago |

### Fase 6 — Admin Dashboard (Futuro)

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-077 | Layout admin con sidebar | P2 | M | NEKO-003 | Layout separado para rutas /admin/* |
| NEKO-078 | Autenticación admin con roles | P2 | M | NEKO-018 | Login admin, roles (admin, editor), protección de rutas |
| NEKO-079 | CRUD de productos (inventario) | P2 | XL | NEKO-077 | Lista, crear, editar, eliminar productos con imágenes |
| NEKO-080 | Gestión de pedidos | P2 | L | NEKO-077 | Lista de pedidos, detalle, cambio de estado (confirmado, enviado, entregado) |
| NEKO-081 | Dashboard de analytics | P3 | L | NEKO-077 | Gráficos de ventas semanales/mensuales, top productos |

### Testing & QA Transversal

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-082 | Auditoría de accesibilidad (axe-core) | P1 | M | NEKO-026-057 | WCAG 2.1 AA, reporte de issues |
| NEKO-083 | Flujo E2E: browse → add to cart → checkout | P0 | M | NEKO-059, NEKO-068 | Playwright: navegación completa del usuario |
| NEKO-084 | Flujo E2E: login → loyalty dashboard | P1 | M | NEKO-059 | Playwright: login, ver puntos, canjear recompensa |
| NEKO-085 | Flujo E2E: WhatsApp order flow | P1 | M | NEKO-068, NEKO-083 | Verificar deep link generado correctamente |
| NEKO-086 | Pruebas visuales de regresión (Playwright) | P2 | L | NEKO-082 | Screenshot comparisons en componentes clave |
| NEKO-087 | Performance budget audit | P1 | S | NEKO-082 | Lighthouse: FCP < 1.5s, LCP < 2.5s, TBT < 200ms, CLS < 0.1 |
| NEKO-088 | Cross-browser testing matrix | P2 | M | NEKO-083-085 | Chromium, Firefox, Safari (WebKit), Edge, mobile browsers |
| NEKO-089 | Pruebas de red lenta y offline | P2 | M | NEKO-060, NEKO-083 | Simular 3G, offline mode, verificar comportamiento |
| NEKO-090 | Documentar bug reporting template | P3 | S | — | Template markdown para issues de GitHub |

### i18n & UX

| ID | Título | Prioridad | Esfuerzo | Dependencias | Descripción |
|----|--------|-----------|----------|--------------|-------------|
| NEKO-091 | Implementar sistema de i18n para español CR | P2 | M | NEKO-014 | Hook useTranslation, archivo ES.json con modismos ticos |
| NEKO-092 | Animaciones de transición entre rutas | P2 | M | NEKO-003 | Framer Motion o CSS transitions para page transitions |
| NEKO-093 | Skeleton screens para carga de datos | P2 | M | NEKO-026-027 | Skeleton para ProductGrid, Cart, Dashboard |
| NEKO-094 | Implementar modo reducido de movimiento | P2 | S | NEKO-009 | Respetar prefers-reduced-motion, desactivar animaciones |
| NEKO-095 | Meta tags SEO y Open Graph | P2 | S | NEKO-003 | Meta tags por página, OG image, description |
| NEKO-096 | Sitemap.xml y robots.txt | P3 | S | NEKO-003 | Generar sitemap dinámico o estático |
| NEKO-097 | Service Worker: push notifications (future) | P3 | M | NEKO-060 | Integración futura con Firebase Cloud Messaging |

---

## Totales por Prioridad
| Prioridad | Count |
|-----------|-------|
| P0 | 18 |
| P1 | 34 |
| P2 | 30 |
| P3 | 15 |
| **Total** | **97** |
