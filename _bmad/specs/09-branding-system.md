# Spec: Branding System

## Description
Sistema centralizado de branding para NEKO Store que aplica logotipo, colores de marca y un código QR con la URL del sitio a todas las imágenes y contenido compartido en redes sociales, así como en las publicaciones creadas desde el Campaign Manager.

## Core Features

### 1. Brand Asset Manager
Dashboard en `/admin/branding` con configuración:

```
┌──────────────────────────────────────────────┐
│  NEKO STORE — Branding                       │
│                                              │
│  Logo (SVG recomendado):                     │
│  ┌──────────────────────────────────┐        │
│  │  [🖼️ neko-logo.svg]             │        │
│  │  [Cambiar logo]  [Eliminar]     │        │
│  └──────────────────────────────────┘        │
│                                              │
│  Colores de marca:                           │
│  Primario:    ■ #050508      (fondo)         │
│  Secundario:  ■ #c9a96e      (gold)          │
│  Acento:      ■ #e2c48a      (gold light)    │
│  Texto:       ■ #e8e4dc      (texto claro)   │
│                                              │
│  QR Code:                                     │
│  ┌─────┐  Previsualización:                  │
│  │ QR  │  ┌──────────────┐                   │
│  │     │  │  NEKO STORE  │                   │
│  └─────┘  │  Logo + QR   │                   │
│           │  🌐 nekostore.cr                 │
│  URL:     └──────────────┘                   │
│  [nekostore.cr]                              │
│                                              │
│  [Guardar configuración de marca]            │
└──────────────────────────────────────────────┘
```

### 1.1 Logos Oficiales de NEKO
- `nekoStoreText1.png` → logo de texto principal
- `nekoStore4.png` → isotipo/cabeza de gato
- Ambos vienen en negro sobre fondo blanco.
- Se debe aplicar tecnica de transparencia para ocultar blanco y mantener solo negro (preferencia: remocion real de fondo en asset pipeline; fallback temporal: blend/filter CSS controlado).
- Permitir uso combinado (isotipo + wordmark) o separado segun contexto (navbar, footer, OG).

### 2. QR Code Generator
- Generar QR dinámicamente con la URL del sitio (`nekostore.cr`)
- Configurable: tamaño, color (usa color gold de marca), nivel de corrección
- El QR se incrusta en:
  - OG Images para compartir en redes sociales
  - Posts del Campaign Manager
  - Plantillas de WhatsApp
  - Footer del sitio web

### 3. Branded OG Images (Open Graph)
Cuando se comparte un enlace de NEKO Store en redes sociales, la imagen OG debe incluir:
- Logo de NEKO (esquina superior izquierda)
- Nombre de la tienda + tagline
- QR code del sitio (esquina inferior derecha)
- Fondo con gradient de marca (oscuro con detalles gold)
- Color consistency con el tema dark

**Implementación:**
```typescript
interface BrandedImageConfig {
  logo: string          // base64 del logo
  qrCode: string        // base64 del QR generado
  primaryColor: string  // #050508
  accentColor: string   // #c9a96e
  textColor: string     // #e8e4dc
  url: string           // nekostore.cr
  storeName: string     // NEKO STORE
  tagline: string       // Moda gótica. Alma oscura.
}
```

### 4. Branding Integration with Campaign Manager
Cuando se crea un post en el Campaign Manager:
- Preview muestra el branding aplicado (logo + QR overlay)
- Opción toggle: "Aplicar marca" (default: on)
- Las imágenes subidas se procesan con el branding overlay
- El post preview en Facebook/Instagram incluye branding

### 5. WhatsApp Branding
- Templates de WhatsApp incluyen ascii art del logo (🖤 NEKO STORE 🖤)
- Enlace al sitio web con QR mencionado
- Formato consistente con emojis de marca

### 6. Branding Store
```typescript
interface BrandingConfig {
  logoTextUrl: string
  logoIconUrl: string
  logoProcessingMode: 'asset-transparent' | 'css-filter'
  primaryColor: string
  accentColor: string
  textColor: string
  storeUrl: string
  qrSize: number
  qrCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  applyToSocialPosts: boolean
  applyToOGImages: boolean
  applyToWhatsApp: boolean
}
```

## Technical Architecture

### Dependencies
- `qrcode` (npm) — generación de QR codes en el cliente
- Canvas API (nativa) — para composición de OG images con overlay
- SVG-to-image conversion (blob URL)

### Implementation Plan

**Fase 1 — QR + Branding Config (ahora)**
- Instalar `qrcode` package
- Crear store `useBrandingStore` con configuración persistente
- Hook `useQRCode(url)` que genera QR en base64
- Componente `BrandingConfig` en `/admin/branding`
- Componente `QRCode` reutilizable

**Fase 2 — OG Image Generator (siguiente)**
- Hook `useOGImage()` que genera canvas con branding overlay
- Servir imagen OG dinámica via `react-helmet` o meta tags
- Cache de imágenes generadas en localStorage

**Fase 3 — Campaign Manager Integration (con Fase 2 de Social Campaigns)**
- Process uploaded images with branding overlay
- Preview branded posts before publishing

## Acceptance Criteria
- [ ] Admin puede subir/configurar logo de texto y logo icono por separado
- [ ] Logos negros sobre fondo blanco se renderizan sin fondo visible
- [ ] QR code se genera automáticamente con URL del sitio
- [ ] QR code usa color gold de marca
- [ ] Branding config persiste en localStorage
- [ ] OG images mockup generado con overlay de marca
- [ ] WhatsApp templates incluyen branding consistente
- [ ] Campaign Manager preview muestra branding aplicado
- [ ] Toggle para activar/desactivar branding por canal

## Estado de checklist - 2026-06-10

- [x] `qrcode` instalado y usado por hooks/componentes de branding
- [x] `useBrandingStore`, `useQRCode`, `QRCode` y `BrandingConfig` existen
- [x] Configuracion de branding persiste en store cliente
- [~] QR se genera desde URL/configuracion; falta QA visual y accesible
- [~] Branding admin existe, pero el modelo actual usa `logoUrl`; falta separar `logoTextUrl` y `logoIconUrl`
- [ ] Transparencia real para logos oficiales con fondo blanco
- [ ] OG image generator con canvas/overlay completo
- [ ] Overlay de marca aplicado a assets/post preview del Campaign Manager
- [ ] Templates WhatsApp con branding consistente verificados end-to-end

Proximo foco: normalizar modelo de logos oficiales (`nekoStoreText1.png` + `nekoStore4.png`) antes de extender OG/social, porque el spec pide wordmark e isotipo separados.

## Technical Notes
- Usar `qrcode` package con `toDataURL()` para generar QR como data URI
- Canvas 2D API para composición de OG images (sin dependencias externas pesadas)
- Los logos se almacenan como data URI o URL gestionada por CMS de assets
- Si el fondo no se remueve en origen, aplicar estrategia temporal:
  - `mix-blend-mode: multiply` sobre fondo claro
  - o `filter` calibrado en dark/light theme
- Los colores de marca en branding store deben sincronizarse con CSS variables del tema
- QR se genera dinámicamente, no estático — siempre apunta al dominio actual

## QA Notes
- Testear generación de QR con diferentes URLs
- Testear persistencia de configuración de marca
- Testear que logo se muestra correctamente en preview
- Testear canvas composition con diferentes tamaños de imagen
- Testear que toggle "Aplicar marca" funciona correctamente
- Verificar accesibilidad del QR (aria-label descriptivo)
