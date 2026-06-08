# NEKO STORE — Roadmap de Migración

## Fase 0: Discovery & Foundation
**Objetivo:** Establecer el scaffold del proyecto React, toolchain, tema base y PWA manifest.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Scaffold Vite + React + TS | — | S | `npm run dev` levanta proyecto en blanco |
| Configurar TailwindCSS v4 | — | S | Clases de utilidad se renderizan correctamente |
| Configurar React Router v7 | — | S | Pantalla 404 funciona |
| Crear layout base (Navbar, Footer) | Scaffold | M | Todas las rutas comparten layout |
| Configurar tema oscuro/claro con CSS variables | Tailwind | M | Theme toggle persiste y alterna correctamente |
| Configurar PWA manifest con vite-plugin-pwa | Scaffold | S | Lighthouse detecta manifest válido |
| Configurar iconos y splash screens | PWA manifest | S | Iconos se muestran en instalación |
| Configurar ESLint + Prettier | Scaffold | S | `npm run lint` pasa sin errores |
| Configurar Vitest | Scaffold | S | `npm run test` ejecuta suite vacía |
| Configurar Playwright | Scaffold | M | `npm run test:e2e` navega a página principal |
| Configurar carpetas `src/` (components, stores, hooks, types, utils, pages) | Scaffold | S | Estructura existente y ordenada |

**Esfuerzo total:** 8 puntos (S=1, M=2)
**Dependencias externas:** Ninguna
**Riesgos:** Bajo — toolchain estándar

---

## Fase 1: Data Layer
**Objetivo:** Implementar todas las stores Zustand con persistencia, tipos e interfaces.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Definir interfaces TypeScript globales | Fase 0 | M | Tipos usados en todas las stores |
| Implementar `useConfigStore` | Interfaces | S | Config se persiste en localStorage |
| Implementar `useCartStore` | Interfaces | L | CRUD completo de carrito con persistencia |
| Implementar `useAuthStore` | Interfaces | M | Login/logout con datos mock, persiste sesión |
| Implementar `useLoyaltyStore` | Interfaces | L | Cálculo de puntos, tiers, historial |
| Implementar `useNotificationStore` | Interfaces | S | Cola de notificaciones con auto-dismiss |
| Implementar `useUIStore` | Interfaces | S | Sidebar, modales, theme, filtros |
| Implementar migración de localStorage schema | Fase 0 | M | Datos legacy se migran sin pérdida |
| Tests unitarios de stores | Todas stores | M | 90% coverage en lógica de stores |

**Esfuerzo total:** 14 (S=3, M=4, L=2)
**Dependencias externas:** Ninguna
**Riesgos:** Medio — schema legacy puede tener inconsistencias

---

## Fase 2: Component Migration
**Objetivo:** Migrar todos los componentes de vanilla JS a React con TailwindCSS.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Migrar CatalogGrid + ProductCard | Fase 1 | M | Grid responsivo con datos de store |
| Migrar ProductModal | CatalogGrid | M | Modal con tallas, descripción, badge |
| Migrar FilterBar (categorías, precio, talla) | CatalogGrid | M | Filtros actualizan grid en tiempo real |
| Migrar CartSidebar + CartItem | Fase 1 | M | Sidebar deslizable, items editables |
| Migrar CheckoutModal + CheckoutForm | CartSidebar | L | Formulario completo con validación |
| Migrar AccountLogin (WhatsApp OTP mock) | Fase 1 | M | Login con número tico, validation |
| Migrar AccountDashboard | AccountLogin | M | Stats, historial, configuración |
| Migrar LoyaltyCard + TierGrid + RewardsGrid | Fase 1 | M | Visualización de puntos y tiers |
| Migrar ContactCard + IntlForm | Fase 1 | S | Formulario de contacto internacional |
| Migrar DropAlert + NotificationsPanel | Fase 1 | S | Notificaciones toast y panel |
| Migrar Toast + Modal + Button compartidos | Fase 0 | M | Componentes base reutilizables |
| Migrar Toggle + Badge + SizePicker + ThemeToggle | Fase 0 | S | Componentes pequeños |
| Implementar lazy loading para modales | Fase 2 | S | Modales se cargan bajo demanda |
| Tests unitarios de componentes | Cada componente | L | Cada componente tiene tests de render |

**Esfuerzo total:** 26 (S=4, M=8, L=2)
**Dependencias externas:** Ninguna
**Riesgos:** Medio — algunos componentes vanilla tienen lógica densa

---

## Fase 3: PWA & Offline
**Objetivo:** Habilitar funcionalidad offline completa y experiencia de instalación.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Configurar service worker con Workbox | Fase 0 | M | SW registrado en producción |
| Estrategia cache-first para assets estáticos | SW config | S | Imágenes se sirven offline |
| Estrategia network-first para catálogo | SW config | M | Catálogo funciona con datos cacheados |
| Implementar offline fallback page | SW config | S | Página offline personalizada se muestra |
| Implementar install prompt personalizado | Fase 0 | M | Prompt "Instalar NEKO" aparece en escritorio |
| Implementar update flow con skipWaiting | SW config | S | Notificación de actualización disponible |
| Tests de Lighthouse PWA | Todo Fase 3 | S | Puntuación PWA ≥ 90 |

**Esfuerzo total:** 10 (S=3, M=4, L=0)
**Dependencias externas:** workbox-window (built-in con vite-plugin-pwa)
**Riesgos:** Bajo — documentación extensa de Workbox

---

## Fase 4: WhatsApp Integration
**Objetivo:** Integrar flujo de pedidos por WhatsApp vía deep links.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Crear utilidad de encoding para mensajes WhatsApp | Fase 1 | S | Mensaje codificado correctamente |
| Implementar generación de deep links wa.me | Utilidad encoding | S | Link abre WhatsApp con mensaje pre-llenado |
| Crear template "new order" con resumen de carrito | Fase 2 | M | Template incluye items, total, datos envío |
| Crear template "order confirmation" | Template new order | S | Template de confirmación para el usuario |
| Agregar botón "Pedir por WhatsApp" en checkout | Fase 2 | S | Botón visible en resumen de orden |
| Formatear número telefónico para CR (+506) | Fase 1 | S | Validación y formato de número tico |
| Implementar fallback email si WhatsApp no disponible | WhatsApp flow | M | Enlace mailto como respaldo |
| Testear deep links en múltiples dispositivos | Fase 4 | S | Links funcionan en iOS, Android, Web |
| Documentar integración WhatsApp Business API | Fase 4 | S | Documento de referencia futuro |

**Esfuerzo total:** 10 (S=6, M=2, L=0)
**Dependencias externas:** API pública wa.me
**Riesgos:** Bajo — deep links estándar sin API key

---

## Fase 5: Payment Gateway (Futuro)
**Objetivo:** Integrar métodos de pago directo (no implementado en MVP).

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Investigar integración SINPE Móvil | — | S | Documento de viabilidad |
| Investigar integración PayPal | — | S | Documento de viabilidad |
| Diseñar flujo de pago en checkout | Fase 2 | M | Mockup del flujo completo |
| Implementar componente PaymentMethodSelector | Diseño flujo | M | Selector de método con UI |
| Integrar SINPE Móvil (future) | Investigación | XL | Depende de API bancaria |
| Integrar PayPal (future) | Investigación | L | Depende de SDK PayPal |
| Tests E2E de flujo de pago | Integración | L | Flujo completo con sandbox |

**Esfuerzo total:** 20 (S=2, M=2, L=2, XL=1)
**Dependencias externas:** APIs de terceros, aprobación SINPE
**Riesgos:** Alto — depende de entidades externas

---

## Fase 6: Admin Dashboard (Futuro)
**Objetivo:** Panel administrativo para gestión de inventario y pedidos.

| Tarea | Dependencia | Esfuerzo | Criterio de Aceptación |
|-------|-------------|----------|------------------------|
| Crear layout admin con sidebar | Fase 0 | M | Layout responsivo para escritorio |
| Implementar autenticación admin | Fase 1 | M | Login separado con roles |
| Implementar gestión de inventario CRUD | Admin layout | XL | CRUD completo de productos |
| Implementar gestión de pedidos | Admin layout | L | Lista, detalle, cambio de estado |
| Implementar dashboard de analytics | Admin layout | L | Gráficos de ventas, productos populares |
| Implementar gestión de usuarios | Admin layout | M | Lista de usuarios, historial |
| Tests E2E para admin | Todo Admin | L | Flujos críticos del panel |

**Esfuerzo total:** 24 (S=0, M=3, L=3, XL=1)
**Dependencias externas:** Ninguna
**Riesgos:** Medio — complejidad de CRUD

---

## Resumen de Esfuerzo

| Fase | S | M | L | XL | Total |
|------|---|---|---|----|-------|
| Fase 0 | 6 | 2 | 0 | 0 | 8 |
| Fase 1 | 3 | 3 | 2 | 0 | 14 |
| Fase 2 | 4 | 8 | 2 | 0 | 26 |
| Fase 3 | 3 | 4 | 0 | 0 | 10 |
| Fase 4 | 6 | 2 | 0 | 0 | 10 |
| Fase 5 | 2 | 2 | 2 | 1 | 20 |
| Fase 6 | 0 | 3 | 3 | 1 | 24 |
| **Total** | **24** | **24** | **9** | **2** | **112** |

## Timeline Estimado
| Fase | Duración | Dependencia |
|------|----------|-------------|
| Fase 0 | 1 semana | — |
| Fase 1 | 2 semanas | Fase 0 |
| Fase 2 | 3 semanas | Fase 1 |
| Fase 3 | 1 semana | Fase 0 |
| Fase 4 | 1 semana | Fase 1, Fase 2 |
| Fase 5 | 4 semanas | Fase 2 |
| Fase 6 | 4 semanas | Fase 1, Fase 2 |
