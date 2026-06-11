# Propuesta NEKO STORE — Sitio Web Profesional

## Resumen Ejecutivo

Sitio web e-commerce para **NEKO STORE**, tienda de San Ramon de Alajuela que importa y vende ropa. Incluye catalogo de productos, carrito de compras, pedidos por WhatsApp, programa de lealtad, panel admin, gestion de redes sociales y PWA (progressive web app).

## Contexto de Marca
- La tienda nace para ofrecer una experiencia accesible y cercana.
- Enfoque de negocio: construir una familia de clientes y recompensar la lealtad con rewards.
- Operacion: importacion y venta de ropa (no manufactura propia).
- Equipo: grupo de personas multidisciplinario (ingenieria de software, marketing, diseno, inventario y operaciones).

---

## Funcionalidades Incluidas

### Catálogo y Tienda
- Catálogo de 55+ productos en 4 categorías (vestidos, tops, accesorios, conjuntos)
- Filtros por categoría con vista responsiva
- Modal de producto con selector de tallas
- Modal de checkout con formulario de envío
- Seccion de promociones/drops temporales con countdown y recomendaciones por usuario

### Carrito de Compras
- Sidebar deslizable con edición de cantidad y talla
- Cálculo de subtotal, envío y total
- Persistencia local (el carrito no se pierde al cerrar el navegador)
- Reserva temporal de stock al iniciar pedido para evitar sobreventa
- Confirmacion manual de comprobante SINPE antes de descontar stock definitivo

### WhatsApp Integration
- Confirmación de pedido vía WhatsApp al cliente
- Notificación al admin cuando llega un pedido nuevo
- Templates personalizados para: confirmación, envío, entrega, carrito abandonado, puntos acumulados
- QR code para compartir la tienda
- Fallback obligatorio sin WhatsApp Business: alertas internas del dashboard para seguimiento
- Automatizacion opcional futura con WhatsApp Business para detectar comprobantes y generar alertas

### Programa de Lealtad
- 4 tiers: MORTAL → SOMBRA → ECLIPSE → NEKO NOIR
- Puntos por compra ($1 = 1 punto)
- Catálogo de recompensas canjeables
- Barra de progreso hacia el próximo tier

### Panel de Administración (`/admin`)
- **Branding**: logo, colores de marca, configuración QR
- **Drops y promociones**: activar/desactivar drop counter, configurar copy, countdown y productos asociados
- **Notificaciones WhatsApp**: toggles para notificaciones al cliente y al admin
- **Alertas**: bandeja para admin/cliente con detalle, historial de 7 dias y acciones contextuales
- **Redes Sociales**: conexión Facebook, calendario de contenidos, creación de posts, campañas, métricas de engagement, administrador de assets
- **📊 Proyección de Ventas e Inventario**: dashboard inteligente que muestra inventario disponible, rotación estimada, proyección de ingresos por producto y categoría, alertas de bajo stock, y estimación de tiempo para agotar existencias — ideal para tomar decisiones sobre producción, reabastecimiento y promociones

### Cuenta y Registro
- Registro minimo: nombre, apellidos, edad y telefono.
- Login por telefono + codigo OTP enviado por WhatsApp; no hay acceso directo solo por numero.
- Perfil extendido opcional desde dashboard: correo, foto, direccion compatible con Correos de Costa Rica, cedula y 2FA.

### PWA (Progressive Web App)
- Instalable en el dispositivo del usuario
- Service worker con caché de assets estáticos
- Banner de actualización cuando hay nueva versión
- Indicador de conectividad offline

### SEO y Accesibilidad
- Meta tags Open Graph en todas las páginas
- Títulos dinámicos por página
- Navegación por teclado y lectores de pantalla
- `prefers-reduced-motion` para usuarios sensibles

### Cuenta Demo
- Cliente demo: **Valentina Neko** (tel. 24247171)
- 1,620 puntos, tier ECLIPSE
- Historial de 3 órdenes de demostración

---

## Stack Técnico

| Componente | Tecnología |
|------------|-----------|
| Frontend | React 19 + TypeScript 5 + Vite 6 |
| Estilos | TailwindCSS v4 + CSS variables |
| Estado | Zustand 5 (6 stores con persistencia) |
| PWA | vite-plugin-pwa + Workbox |
| Testing | Vitest (125+ tests) |
| Linting | Biome (0 errores) |
| Base de datos | PostgreSQL (nestDB) |
| Migraciones | SQL con runner Node.js |

---

## Costos de Infraestructura (Referencia)

### Dominio
| Opción | Costo anual | Registrador |
|--------|------------|------------|
| `.com` | ~$10–15 (₡5,000–8,000) | Namecheap, Cloudflare |
| `.cr` | $70 + IVA (~₡37,000 + IVA) | NIC Costa Rica |
| `.co.cr` | $25 + IVA (~₡13,000 + IVA) | NIC Costa Rica |

### Hosting (VPS — recomendado para app con backend + PostgreSQL)
| Proveedor | Plan | Costo mensual | Especificaciones |
|-----------|------|--------------|-----------------|
| Hostinger | VPS 1 | ~$10 (₡5,000) | 1 vCPU, 2GB RAM, 40GB NVMe |
| Neolo | VPS 1 | ~$13,654/mes | 1 vCPU, 2GB RAM, 20GB NVMe |
| Hostinger | VPS 2 | ~$15 (₡7,500) | 2 vCPU, 4GB RAM, 60GB NVMe |

### Recomendación
- **Mínimo**: VPS 2GB RAM + dominio `.com` (~$15–25/mes total)
- **Recomendado**: VPS 4GB RAM + dominio `.cr` (~$25–35/mes total) para mejor rendimiento y presencia local

---

## Inversión

### Honorarios de Desarrollo — ₡165,000 (pago único)

| Módulo | Incluye | Valor |
|--------|---------|-------|
| Migración a React + PWA | Sitio completo de catálogo + carrito + PWA instalable | ₡50,000 |
| WhatsApp Integration | Notificaciones bidireccionales cliente/admin, templates | ₡25,000 |
| Panel de Administración | Branding, notificaciones, redes sociales | ₡35,000 |
| Programa de Lealtad | 4 tiers, recompensas, historial | ₡20,000 |
| Redes Sociales | Calendario, posts, campañas, métricas, assets | ₡20,000 |
| Proyección de Ventas | Dashboard de inventario, rotación, alertas, pronóstico de ingresos | ₡15,000 |
| **Total** | | **₡165,000** |

> **Nota**: El costo de desarrollo incluye el despliegue del sitio en producción. No incluye costos de hosting, dominio, pauta en redes sociales (ads en Facebook/Instagram), ni campañas externas.
### Condiciones de Pago

| Tracto | Porcentaje | Monto | Momento |
|--------|-----------|-------|---------|
| **1er tracto** | 40% | **₡66,000** | Al inicio del proyecto (firma de acuerdo) |
| **2do tracto** | 60% | **₡99,000** | Al entregar la implementación completa, funcional y desplegada |
| **Total** | 100% | **₡165,000** | |

### Costos recurrentes

| Concepto | Estimado mensual |
|----------|-----------------|
| Hosting VPS | ~$10–20 (₡5,000–10,000) |
| Dominio | ~$1–6/mes (₡500–3,000) prorrateado |

### 🔄 Plan de Suscripción Mensual — Soporte + Redes Sociales + Campañas

Para mantenimiento continuo, creación de contenido y gestión de campañas:

| Incluye | Detalle |
|---------|--------|
| **Soporte técnico** | Actualizaciones de seguridad, backups, monitoreo de uptime, solución de incidencias |
| **Gestión de redes sociales** | Creación y programación de hasta 8 posts/mes, copywriting, selección de assets |
| **Gestión de campañas** | Configuración, segmentación y monitoreo de campañas promocionales, análisis de métricas *(gastos de ads en Facebook/Instagram van por cuenta del cliente)* |
| **Actualización de catálogo** | Agregar/editar productos, precios, descripciones, imágenes |
| **Reporte mensual** | PDF con métricas del sitio + redes sociales, recomendaciones |

| Plan | Precio |
|------|--------|
| **Mantenimiento Básico** (soporte técnico + actualizaciones) | **₡25,000/mes** (~$48) |
| **Redes + Campañas** (soporte + 8 posts + campañas + reporte) | **₡50,000/mes** (~$96) |
| **Full** (todo lo anterior + gestión de catálogo + métricas avanzadas) | **₡75,000/mes** (~$144) |

> **Nota**: Los gastos de pauta en Facebook/Instagram (inversión en ads) corren por cuenta del cliente. La suscripción cubre la gestión estratégica, creación de contenido, segmentación y monitoreo, pero no el presupuesto publicitario en sí.

*Sin comisiones por venta, sin suscripciones a plataformas, sin costos ocultos. El plan mensual se factura aparte del desarrollo inicial y puede cancelarse en cualquier momento.*

### Comparativa de Mercado

| Opción | Costo estimado | Qué incluye |
|--------|---------------|-------------|
| **NEKO STORE (esta propuesta)** | **₡165,000 (~$317)** | Sitio completo, PWA, WhatsApp, lealtad, admin, redes sociales, PostgreSQL, proyección de ventas |
| Freelancer CR (experiencia media) | $800–1,500 (~₡416,000–780,000) | Solo sitio básico, sin PWA, sin lealtad, sin panel admin |
| Freelancer CR (experto) | $1,500–3,000 (~₡780,000–1,560,000) | Similar a esta propuesta pero sin módulo de redes sociales |
| Agencia digital CR (ej. Avendaño, Zenta, Grupo M) | $3,000–8,000 (~₡1,560,000–4,160,000) | Sitio completo + branding + SEO profesional |
| Shopify (1 año) | $468 + comisiones 2.9% (≈$600–800/año real) | Plataforma genérica, sin PWA nativa, sin WhatsApp integrado |
| WooCommerce (1 año) | ~$600–1,200 (hosting + plugins + mantenimiento) | Open source, requiere plugins para cada funcionalidad |

**Conclusión**: Esta propuesta ofrece el mismo alcance que una agencia (o mayor, considerando PWA + redes sociales + lealtad) a **menos del 10% del costo**, y supera en funcionalidades a Shopify/WooCommerce sin comisiones ni suscripciones mensuales.

---

## Valor Agregado vs. Opciones Genéricas

| Aspecto | NEKO STORE (esta propuesta) | Shopify / WooCommerce |
|---------|---------------------------|---------------------|
| Diseño | 100% personalizado, estética gótica única | Temas limitados, poco diferenciación |
| PWA | Instalable offline, nativa | No disponible |
| WhatsApp | Integración profunda bidireccional | Solo con plugins costosos |
| Panel admin | Branding, notificaciones, redes sociales todo en uno | Múltiples paneles desconectados |
| Lealtad | Sistema de tiers personalizado | Solo con apps extras |
| Código fuente | Propiedad total del cliente | Propiedad de la plataforma |
| Sin comisiones | 0% por transacción | 2–3% por venta + suscripción mensual |
| Costo mensual | Solo hosting (~$10–20) | ~$39/mes + comisiones + apps |

---

## Módulo de Redes Sociales (Incluido)

- **Calendario de contenidos**: vista mensual con indicación de días con posts programados
- **Creador de posts**: texto, imágenes (hasta 10), selección de plataforma (Facebook, Instagram, ambas), programación
- **Gestión de campañas**: creación, edición, eliminación, agrupación de posts
- **Métricas de engagement**: alcance, impresiones, interacciones, tasa de engagement, top posts, mejor hora para publicar
- **Administrador de assets**: galería de imágenes subidas para usar en posts

*(Fase 2: conexión con Facebook Graph API real para publicación automática y métricas en vivo)*

---

## 📊 Proyección de Ventas e Inventario

Dashboard inteligente en el panel admin que convierte tu inventario en decisiones de negocio:

| Funcionalidad | Descripción |
|--------------|-------------|
| **Inventario disponible** | Vista de todas las prendas con cantidad en bodega, tallas disponibles |
| **Rotación estimada** | Basada en ventas históricas, calcula cuánto inventario se vende por semana/mes |
| **Proyección de ingresos** | Ingreso potencial total del inventario actual (stock × precio), desglosado por categoría |
| **Alertas de bajo stock** | Notificación cuando un producto está próximo a agotarse |
| **Tiempo para agotar existencias** | Estimación de semanas hasta quedarse sin stock al ritmo de ventas actual |
| **Top productos por rentabilidad** | Cuáles generan más margen y rotan más rápido |
| **Recomendaciones automáticas** | Qué poner en oferta, qué reabastecer, cuándo subir precios |

> **Valor para NEKO STORE**: Como tenés toda la ropa en bodega, este dashboard te permite saber exactamente qué se está vendiendo, qué está quedado, y cuándo necesitás reponer — todo en tiempo real desde el panel admin.

---

## Desglose del Proyecto

| Módulo | Estado | Incluye |
|--------|--------|---------|
| Migración HTML → React | ✅ Completado | Fidelidad visual 91% |
| Catálogo + Carrito | ✅ Completado | 55 productos, filtros, modal |
| Checkout + WhatsApp | ✅ Completado | Notificaciones bidireccionales |
| Programa de Lealtad | ✅ Completado | 4 tiers, recompensas, puntos |
| PWA + Offline | ✅ Completado | Instalable, caché, actualizaciones |
| Panel Admin | ✅ Completado | Branding, notificaciones, campañas |
| SEO + Accesibilidad | ✅ Completado | Meta tags, ARIA, reduced motion |
| Testing | ✅ Completado | 125+ tests unitarios |
| Base de Datos | ✅ Completado | PostgreSQL con migrations + seeds |
| Redes Sociales | ✅ Completado | Calendario, posts, campañas, métricas |
| Backend API | 🚧 En progreso | Fastify + JWT + 13 rutas |
| Proyección de Ventas | 📋 Pendiente | Dashboard de inventario + pronóstico de ingresos |

---

## Próximos Pasos

1. Definir hosting y dominio
2. Desplegar build de producción
3. Configurar Facebook Developer account para Graph API (Fase 2)
4. Capacitación del equipo en el panel admin
5. Lanzamiento

---

*Propuesta preparada para NEKO STORE — Costa Rica, 2026*
