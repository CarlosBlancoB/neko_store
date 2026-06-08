# NEKO STORE — Arquitectura

## Arquitectura Actual (Vanilla JS - Monolítica)

```
index.html
  └── <script src="src/app.js">
        └── app.js (monolito ~2000 líneas)
              ├── PRODUCTS (array hardcoded)
              ├── Cart (objeto global con funciones mutantes)
              ├── Auth (objeto global con sesión mock)
              ├── Checkout (funciones que mutan DOM)
              ├── UI (manejadores de eventos, render manual)
              ├── Account (dashboard, historial, configuración)
              └── Notifications (sistema de toasts)
```

### Problemas Identificados
- Estado global mutable y disperso
- Sin tipado ni seguridad de tipos
- DOM manipulation manual (ineficiente, propenso a bugs)
- Sin separación de responsabilidades
- Sin tests
- Sin lazy loading
- Sin manejo de errores consistente
- Sin PWA

---

## Arquitectura Objetivo (React + TypeScript)

```
src/
├── main.tsx                  # Entry point, providers wrapping
├── App.tsx                   # Router + Layout
├── router.tsx                # React Router v7 configuration
├── vite-env.d.ts
│
├── pages/
│   ├── HomePage.tsx
│   ├── CatalogPage.tsx
│   ├── AccountPage.tsx
│   ├── ContactPage.tsx
│   └── NotFoundPage.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ThemeToggle.tsx
│   ├── catalog/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductModal.tsx
│   │   └── FilterBar.tsx
│   ├── cart/
│   │   ├── CartSidebar.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartFooter.tsx
│   │   └── ShippingOptions.tsx
│   ├── checkout/
│   │   ├── CheckoutModal.tsx
│   │   ├── CheckoutForm.tsx
│   │   └── OrderSummary.tsx
│   ├── account/
│   │   ├── AccountLogin.tsx
│   │   ├── AccountDashboard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── NotifSettings.tsx
│   │   ├── StoreConfig.tsx
│   │   └── AccountTabs.tsx
│   ├── loyalty/
│   │   ├── LoyaltyCard.tsx
│   │   ├── TierGrid.tsx
│   │   ├── RewardsGrid.tsx
│   │   ├── RewardCard.tsx
│   │   └── ProgressBar.tsx
│   ├── contact/
│   │   ├── ContactCard.tsx
│   │   ├── IntlForm.tsx
│   │   └── ContactInfoStrip.tsx
│   ├── notifications/
│   │   ├── NotificationsPanel.tsx
│   │   └── DropAlert.tsx
│   └── shared/
│       ├── Toast.tsx
│       ├── Modal.tsx
│       ├── Button.tsx
│       ├── Toggle.tsx
│       ├── Badge.tsx
│       ├── SizePicker.tsx
│       └── Skeleton.tsx
│
├── stores/
│   ├── useCartStore.ts
│   ├── useAuthStore.ts
│   ├── useLoyaltyStore.ts
│   ├── useConfigStore.ts
│   ├── useNotificationStore.ts
│   └── useUIStore.ts
│
├── hooks/
│   ├── useTheme.ts
│   ├── useMediaQuery.ts
│   ├── useTranslation.ts
│   ├── useOnlineStatus.ts
│   └── useWhatsApp.ts
│
├── types/
│   ├── product.ts
│   ├── cart.ts
│   ├── customer.ts
│   ├── order.ts
│   ├── loyalty.ts
│   ├── notification.ts
│   └── config.ts
│
├── utils/
│   ├── currency.ts
│   ├── validators.ts
│   ├── whatsapp.ts
│   ├── localStorage.ts
│   ├── formatters.ts
│   └── constants.ts
│
├── data/
│   └── products.ts
│
├── styles/
│   ├── index.css            # Tailwind directives + CSS variables
│   └── animations.css
│
├── assets/
│   ├── icons/
│   └── images/
│
└── __tests__/
    ├── stores/
    ├── components/
    └── utils/
```

---

## Data Flow Diagrams (Text-Based)

### Flujo: Añadir al Carrito

```
Usuario
  │
  ▼
ProductCard / ProductModal
  │  onClick "Agregar al carrito"
  │  payload: { productId, size, quantity }
  ▼
useCartStore.addItem()
  │
  ├── Validar stock disponible
  ├── Si existe item con mismo productId + size → incrementar qty
  │   └── Si qty > stock → clamp a stock
  ├── Si no existe → crear nuevo CartItem
  ├── Recalcular subtotal
  ├── Persistir a localStorage (Zustand persist middleware)
  └── Disparar notificación: useNotificationStore.addNotif()
       │
       ▼
    Toast component reacciona al cambio de notificaciones
       │
       ▼
    "¡Agregado! Corset Vampiro - M"
```

### Flujo: Checkout → WhatsApp Order

```
CartSidebar
  │  onClick "Pedir por WhatsApp"
  ▼
CheckoutModal.open()
  │
  ├── CheckoutForm: usuario llena datos de envío
  │   ├── nombre completo
  │   ├── teléfono (+506 validado)
  │   ├── provincia, cantón, distrito
  │   ├── señas exactas
  │   └── notas opcionales
  │
  ▼
  OrderSummary: muestra resumen
  │
  ▼
  onClick "Confirmar y enviar por WhatsApp"
  │
  ├── useCartStore → getState() para items y totales
  ├── WhatsAppEncoder.encodeOrder({
  │     items,
  │     totals,
  │     customer,
  │     shipping
  │   })
  │   → string template formateado:
  │     "🦇 *NUEVO PEDIDO - NEKO STORE* 🦇
  │      ────────────────────
  │      *Cliente:* Carlos Pérez
  │      *Tel:* +506 8888-7777
  │      *Envío:* San José, Tibás...
  │      ────
  │      *1x* Corset Vampiro (M)  — ₡18,500
  │      *2x* Falda Terciopelo (S) — ₡22,000
  │      ────
  │      *Subtotal:* ₡40,500
  │      *Envío:* ₡3,500
  │      *Total:* ₡44,000
  │      ────
  │      *Notas:* Entregar en recepción"
  │
  ├── WhatsAppDeepLink.generate(phone, message)
  │   → https://wa.me/50688887777?text=🦇%20*NUEVO%20PEDIDO%20...
  │
  ├── window.open(deepLink, '_blank')
  │
  └── useCartStore.clearCart()
      └── useNotificationStore.addNotif({
            type: 'success',
            message: 'Pedido enviado por WhatsApp ✓'
          })
```

### Flujo: Lealtad → Tiers → Recompensas

```
Compra completada
  │
  ▼
useLoyaltyStore.addPoints(points)
  │
  ├── Historial: { amount, source, date, expiresAt }
  ├── Calcular total acumulado (no expirado)
  │
  ▼
useLoyaltyStore.calcularTier(totalPoints)
  │
  ├── MORTAL:    0 - 499 pts    → 0% descuento
  ├── SOMBRA:    500 - 1,499   → 5% descuento
  ├── ECLIPSE:   1,500 - 4,999 → 10% descuento
  └── NEKO NOIR: 5,000+        → 20% descuento + envío gratis
  │
  ▼
LoyaltyCard re-renderiza con nuevo tier
ProgressBar actualiza progreso
  │
  ▼
Usuario navega a RewardsGrid
  │
  ▼
useLoyaltyStore.getAvailableRewards(tier)
  │  Filtra recompensas según tier del usuario
  ▼
RewardCard muestra cada recompensa
  │  onClick "Canjear"
  ▼
useLoyaltyStore.redeemReward(rewardId)
  ├── Verificar puntos suficientes
  ├── Restar puntos
  ├── Agregar reward al historial de redención
  ├── Notificación de éxito
  └── Generar código de descuento si aplica
```

---

## Store Architecture (Zustand Slices)

```
┌─────────────────────────────────────────────────────┐
│                    Zustand Store                     │
│                                                     │
│  ┌─────────────┐  ┌───────────┐  ┌───────────────┐ │
│  │ useCartStore │  │ useAuth   │  │ useLoyalty    │ │
│  │             │  │ Store     │  │ Store         │ │
│  │ • items     │  │           │  │               │ │
│  │ • shipping  │  │ • customer│  │ • points      │ │
│  │ • subtotal  │  │ • isAuth  │  │ • tier        │ │
│  │ • tax       │  │ • session │  │ • history     │ │
│  │ • total     │  │           │  │ • rewards     │ │
│  │             │  │           │  │               │ │
│  │ persist:    │  │ persist:  │  │ persist:      │ │
│  │ localStorage│  │ session   │  │ localStorage  │ │
│  └─────────────┘  └───────────┘  └───────────────┘ │
│                                                     │
│  ┌──────────────┐  ┌─────────────────┐              │
│  │ useConfig    │  │ useNotification │              │
│  │ Store        │  │ Store           │              │
│  │              │  │                 │              │
│  │ • currency   │  │ • notifications │              │
│  │ • taxRate    │  │ • addNotif()    │              │
│  │ • shipping   │  │ • dismiss()     │              │
│  │ • theme      │  │ • clearAll()    │              │
│  │              │  │                 │              │
│  │ persist:     │  │ persist: false  │              │
│  │ localStorage │  │ (en memoria)    │              │
│  └──────────────┘  └─────────────────┘              │
│                                                     │
│  ┌──────────────────────────────────────┐            │
│  │ useUIStore                           │            │
│  │                                      │            │
│  │ • isCartOpen: boolean                │            │
│  │ • activeModal: ModalType | null      │            │
│  │ • filters: { category, priceRange,   │            │
│  │     size, searchQuery }              │            │
│  │ • activeCategory: Category           │            │
│  │                                      │            │
│  │ persist: false                       │            │
│  └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

---

## Routing Map

```
/                      → HomePage (catalog + featured + contact strip)
/catalogo              → CatalogPage (ProductGrid + FilterBar)
/carrito               → CartSidebar (ruta dedicada)
/checkout              → CheckoutModal (ruta dedicada)
/cuenta                → AccountPage (protegida: requiere auth)
  /cuenta/ordenes      → OrderHistory
  /cuenta/lealtad      → LoyaltyCard + TierGrid + RewardsGrid
  /cuenta/config       → NotifSettings + StoreConfig
/contacto              → ContactPage (ContactCard + IntlForm)
/*                     → NotFoundPage (404 custom)

Layout:
  Outlet
  ├── Navbar (siempre visible)
  ├── <page content>
  └── Footer (siempre visible)
  ├── CartSidebar (flotante, toggleable)
  ├── NotificationsPanel (flotante)
  └── Toast container (flotante)

Estructura del router:
  createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'catalogo', element: <CatalogPage /> },
        { path: 'cuenta', element: <ProtectedRoute><AccountPage /></ProtectedRoute>,
          children: [
            { path: 'ordenes', element: <OrderHistory /> },
            { path: 'lealtad', element: <LoyaltySection /> },
            { path: 'config', element: <AccountConfig /> },
          ]
        },
        { path: 'contacto', element: <ContactPage /> },
      ]
    }
  ])
```

---

## Theme System Architecture

```
:root[data-theme="dark"] {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #1a1a1a;
  --color-bg-tertiary: #2a2a2a;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a0a0a0;
  --color-accent: #8b0000;        /* rojo sangre */
  --color-accent-hover: #b30000;
  --color-accent-secondary: #4a0e4e; /* púrpura */
  --color-border: #333;
  --color-success: #00c853;
  --color-error: #ff1744;
  --color-warning: #ff9100;
  --color-info: #2979ff;
  --font-heading: 'Megasord', serif;
  --font-body: 'Cormorant Garamond', serif;
  --font-mono: 'Space Mono', monospace;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-card: 0 4px 20px rgba(0,0,0,0.4);
}

:root[data-theme="light"] {
  --color-bg-primary: #fafafa;
  --color-bg-secondary: #f0f0f0;
  --color-bg-tertiary: #e0e0e0;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666;
  --color-accent: #b30000;
  --color-accent-hover: #8b0000;
  --color-accent-secondary: #6a1b9a;
  --color-border: #ccc;
  --color-success: #00c853;
  --color-error: #ff1744;
  --color-warning: #ff9100;
  --color-info: #2979ff;
  --shadow-card: 0 4px 20px rgba(0,0,0,0.1);
}
```

### Theme Switching Flow
1. `useTheme` hook lee `data-theme` de `<html>` o localStorage
2. User hace click en `ThemeToggle` en Navbar
3. Hook alterna el tema, actualiza `data-theme` en `<html>`
4. Todas las CSS variables se actualizan inmediatamente
5. Preferencia se persiste en localStorage
6. En carga inicial, respeta `prefers-color-scheme` del sistema
