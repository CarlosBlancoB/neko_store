# Spec: Social Media Campaign Manager

## Description
Sistema de gestión de campañas para Facebook e Instagram desde el admin de NEKO Store. Permite programar publicaciones orgánicas, adjuntar imágenes subidas manualmente, y recolectar métricas de engagement para mostrarlas en el dashboard.

**Nota:** No incluye pago de anuncios (ads). Solo publicación orgánica programada.

## Core Features

### 0. Promociones y Drops
- Seccion publica `/promociones` o bloque en home/catalogo con drops activos, ofertas temporales y recomendaciones por usuario.
- Cada promocion tiene nombre, descripcion, fecha inicio/fin, productos asociados, prioridad, estado y countdown.
- Las recomendaciones usan historial, categoria favorita, tier de lealtad y stock disponible.
- El drop counter superior debe leer la promocion prioritaria activa y ser gestionable desde dashboard.
- El admin puede activar/desactivar drops sin tocar codigo.

### 1. Conexión con Facebook Graph API
- Autenticación OAuth 2.0 con Facebook Login
- Conexión a páginas de Facebook e Instagram Business
- Almacenar access tokens (con refresh) en localStorage (fase inicial)
- Scope mínimo: `pages_manage_posts`, `pages_read_engagement`, `instagram_basic`, `instagram_content_publish`

### 2. Content Calendar
```
┌─────────────────────────────────────────────────────┐
│  Calendario de Contenidos — Junio 2026              │
├────┬────┬────┬────┬────┬────┬────┬──────────────────┤
│ Lu │ Ma │ Mi │ Ju │ Vi │ Sa │ Do │                  │
├────┼────┼────┼────┼────┼────┼────┤                  │
│    │ 1  │ 2  │ 3  │ 4° │ 5  │ 6  │  4 — Shadow     │
│    │    │    │    │ 🖤 │    │    │      Bloom drop   │
├────┼────┼────┼────┼────┼────┼────┤                  │
│ 7  │ 8  │ 9  │ 10 │ 11 │ 12 │ 13 │                  │
└────┴────┴────┴────┴────┴────┴────┴──────────────────┘
```
- Vista mensual y semanal
- Indicadores visuales de días con publicaciones programadas
- Drag & drop para reprogramar
- Filtro por campaña

### 3. Post Creator
Formulario de creación:
- **Imágenes**: Upload manual (máx 10, formatos jpg/png/webp, < 5MB c/u)
- **Texto**: Área de texto con contador de caracteres
- **Plataforma**: Facebook, Instagram, o ambas
- **Programación**: Fecha y hora específica, o "publicar ahora"
- **Campaña**: Selector de campaña existente o nueva
- **Preview**: Vista previa del post en ambas plataformas

### 4. Campaign Management
- Crear campaña: nombre, descripción, fechas inicio/fin, objetivo (awareness, engagement, sales)
- Agrupar posts por campaña
- Estado: borrador, activa, finalizada, pausada
- Resumen de rendimiento por campaña

### 5. Engagement Dashboard
```
┌─────────────────────┬─────────────────────┐
│  Últimos 7 días     │  Este mes           │
│  Alcance: 1,247     │  Alcance: 5,832     │
│  Interacciones: 89  │  Interacciones: 412 │
│  Tasa: 7.1%         │  Tasa: 7.06%        │
├─────────────────────┴─────────────────────┤
│  Top Posts (esta semana)                   │
│  1. 🖤 Shadow Bloom drop — 234 alcance     │
│  2. ⚡ Nuevos tops — 189 alcance           │
│  3. 🦇 Detalles exclusivos — 156 alcance   │
├───────────────────────────────────────────┤
│  Mejor hora para publicar: 6PM - 8PM CST  │
└───────────────────────────────────────────┘
```
- Cards con KPIs: alcance, impresiones, likes, comments, shares
- Gráfico de tendencia (alcance vs tiempo)
- Top 5 posts por engagement
- Recomendación de mejor hora para publicar

### 6. Asset Manager
- Galería de imágenes subidas para posts
- Upload drag & drop
- Etiquetado por campaña
- Búsqueda y filtro

## Data Flow
```
Admin crea post en dashboard
  → Se guarda en store como "scheduled"
  → A la hora señalada, worker (setInterval + Date check)
    → Publica vía Facebook Graph API
    → Marca como "published"
    → Guarda post ID de FB/IG
  → Cron diario: fetch engagement metrics
    → Actualiza store con métricas
```

## Technical Architecture

### Stores
- `useSocialStore` — conexiones, posts, campañas, métricas, assets
- Persistencia en localStorage (fase inicial; migrar a backend futuro)

### Componentes
```
src/
  pages/
    AdminPage.tsx — ruta /admin con tabs
  components/admin/
    SocialConnect.tsx — OAuth Facebook login
    PostCreator.tsx — formulario de creación
    ContentCalendar.tsx — calendario mensual/semanal
    CampaignList.tsx — lista de campañas
    CampaignForm.tsx — crear/editar campaña
    EngagementMetrics.tsx — dashboard de KPIs
    AssetManager.tsx — galería de imágenes
    PostCard.tsx — card de post individual
```

### API Simulation (Fase 1 — Mock)
En lugar de conectar Facebook Graph API real, usar mock store con datos simulados:
- `simulatePost()` — delay aleatorio, retorna post ID ficticio
- `simulateMetrics()` — genera métricas realistas basadas en data histórica mock
- Esto permite desarrollar y testear toda la UI sin depender de API keys

### Fase 2 — Facebook Graph API Real
- Usar `https://graph.facebook.com/v22.0/{page-id}/feed` para publicar
- Usar `https://graph.facebook.com/v22.0/{page-id}/insights` para métricas
- Refresh token management
- Rate limiting: max 25 posts/día por página

## Acceptance Criteria
- [ ] Admin puede conectar cuenta de Facebook (mock OAuth en Fase 1)
- [ ] Admin puede crear posts con imágenes, texto y programación
- [ ] Posts programados se publican automáticamente a la hora señalada
- [ ] Dashboard de engagement muestra métricas de los últimos 7/30 días
- [ ] Admin puede ver, editar, cancelar posts pendientes
- [ ] Campañas agrupan posts y muestran resumen de rendimiento
- [ ] Asset manager permite subir y organizar imágenes
- [ ] Calendario muestra vista mensual con posts programados
- [ ] Admin puede crear/editar promociones y drops temporales
- [ ] Seccion publica muestra multiples promociones activas
- [ ] Recomendaciones por usuario respetan stock, tier y categorias de interes
- [ ] Drop counter superior se alimenta de la promocion activa prioritaria

## Estado de checklist - 2026-06-10

- [x] Admin tiene modulo de campanas/posts en `/admin` con SocialConnect, PostCreator, ContentCalendar, CampaignList, EngagementMetrics, AssetManager y PostCard
- [x] Mock OAuth, simulacion de publicacion y metricas existen en `src/services/socialApi.ts`
- [x] Store social persiste localmente y puede sincronizar campanas/posts con backend
- [~] Crear/ver/editar/cancelar posts existe a nivel UI/store; falta QA funcional completo
- [~] Posts programados/publicacion automatica estan simulados; falta worker real y Graph API
- [~] Dashboard de engagement existe; falta conectar metricas reales y pruebas 7/30 dias
- [ ] Promociones/drops publicos con recomendaciones por usuario
- [ ] Drop counter alimentado por promocion prioritaria real

Proximo foco: separar lo que ya es Campaign Manager mock/local de lo que pertenece a promociones operativas, para evitar mezclar calendario social con inventario/checkout.

## Technical Notes
- Fase 1: Todo mock/localStorage — sin dependencias externas
- Fase 2: Facebook Graph API v22.0, OAuth PKCE flow
- Las imágenes se almacenan como base64 en localStorage (fase 1) o en objeto URL (blob)
- Engagement data: poll cada 6hs para no exceder rate limits de Graph API
- Separar cleanamente UI (componentes) de lógica de API (servicios en `src/services/`)
- Promociones pueden compartir store con campañas o tener `promotionStore` separado si se vuelven parte del checkout/inventario

## QA Notes
- Testear creación de post con todos los campos
- Testear que posts programados se publican en el horario correcto
- Testear cancelación de post pendiente
- Testear asset manager: upload, delete, filter
- Testear que métricas se actualizan sin duplicados
- Simular rate limiting de Graph API en pruebas
- Testear expiracion de promociones y countdown en mobile/desktop
- Testear recomendaciones con usuario anonimo, cliente nuevo y cliente con historial
