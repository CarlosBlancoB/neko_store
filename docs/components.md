# NEKO STORE — Árbol de Componentes

## Convenciones
- Todos los componentes en `src/components/<categoria>/`
- Props tipadas con TypeScript interfaces
- Estado local solo para UI ephemeral (animaciones, hover, focus)
- Estado global vía Zustand hooks
- Nombres en PascalCase

---

## Layout

### `App`
**Ruta:** `src/App.tsx`
**Responsabilidad:** Router + provider wrapper (ThemeProvider, Toaster)
**Props:** ninguna
**State:** Router state (react-router)

### `Layout`
**Ruta:** `src/components/layout/Layout.tsx`
**Responsabilidad:** Outlet de React Router con Navbar + Footer + CartSidebar + Toasts
**Props:** ninguna
**State:** `useUIStore` para state del sidebar

### `Navbar`
**Ruta:** `src/components/layout/Navbar.tsx`
**Responsabilidad:** Navegación principal, cart badge, theme toggle, drop alert, logo
**Props:**
```typescript
interface NavbarProps {}
// Consume de stores
```
**State usado:** `useUIStore` (isCartOpen toggle), `useCartStore` (item count), `useNotificationStore` (unread count), `useAuthStore` (isAuth)
**Hijos:** `ThemeToggle`, `DropAlert`, `CartBadge` (inline)

### `Footer`
**Ruta:** `src/components/layout/Footer.tsx`
**Responsabilidad:** Links, redes sociales, copyright, métodos de pago, frase estética
**Props:**
```typescript
interface FooterProps {}
```
**State:** Ninguno

### `ThemeToggle`
**Ruta:** `src/components/layout/ThemeToggle.tsx`
**Responsabilidad:** Alternar dark/light mode con icono
**Props:**
```typescript
interface ThemeToggleProps {}
```
**State:** `useTheme` hook (local)

---

## Catalog

### `ProductGrid`
**Ruta:** `src/components/catalog/ProductGrid.tsx`
**Responsabilidad:** Grid responsivo de ProductCards, maneja loading/empty/error states
**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}
```
**State usado:** `useUIStore` (filtros activos)
**Estados:** loading (skeleton grid), empty ("No hay productos que coincidan"), error (fallback message)

### `ProductCard`
**Ruta:** `src/components/catalog/ProductCard.tsx`
**Responsabilidad:** Card individual de producto con imagen, nombre, precio, badge, puntos, hover effects
**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onClick: () => void;
}
```
**State local:** `isHovered`, `isImageLoaded`
**Acciones:** onClick → abre `ProductModal`, onAddToCart → `useCartStore.addItem()`

### `ProductModal`
**Ruta:** `src/components/catalog/ProductModal.tsx`
**Responsabilidad:** Modal detallado del producto con tallas, descripción, badge, puntos, CTA
**Props:**
```typescript
interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}
```
**State local:** `selectedSize`, `quantity`, `activeImage`
**Estado vacío:** Si producto no disponible, mostrar "Producto agotado"

### `FilterBar`
**Ruta:** `src/components/catalog/FilterBar.tsx`
**Responsabilidad:** Filtros de categoría, rango de precio, talla, búsqueda
**Props:**
```typescript
interface FilterBarProps {
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
}
```
**State local:** `searchQuery`, `selectedCategory`, `priceRange`, `selectedSize`
**State usado:** `useUIStore.filters` (inicial)

---

## Cart

### `CartSidebar`
**Ruta:** `src/components/cart/CartSidebar.tsx`
**Responsabilidad:** Slideover lateral con lista de items del carrito y footer
**Props:**
```typescript
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
```
**State usado:** `useCartStore` (items, totals), `useUIStore` (isCartOpen)
**Estados:** empty ("Tu carrito está vacío — ¡explora nuestro catálogo!"), loading (skeleton)

### `CartItem`
**Ruta:** `src/components/cart/CartItem.tsx`
**Responsabilidad:** Item individual en carrito con thumbnail, info, quantity control, precio, remove
**Props:**
```typescript
interface CartItemProps {
  item: CartItem;
  onUpdateQty: (itemId: string, qty: number) => void;
  onRemove: (itemId: string) => void;
}
```
**State local:** `isUpdating`
**Edge cases:** qty clamp 1-99, stock máximo, NaN prevention

### `CartFooter`
**Ruta:** `src/components/cart/CartFooter.tsx`
**Responsabilidad:** Subtotal, tax, shipping, total, CTA button
**Props:**
```typescript
interface CartFooterProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  onWhatsAppOrder: () => void;
}
```

### `ShippingOptions`
**Ruta:** `src/components/cart/ShippingOptions.tsx`
**Responsabilidad:** Selector de método de envío (Correos CR, delivery propio)
**Props:**
```typescript
interface ShippingOptionsProps {
  options: ShippingOption[];
  selected: string;
  onSelect: (optionId: string) => void;
}
```
**State local:** `selectedOption`

---

## Checkout

### `CheckoutModal`
**Ruta:** `src/components/checkout/CheckoutModal.tsx`
**Responsabilidad:** Modal de checkout con formulario + resumen + CTA WhatsApp
**Props:**
```typescript
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```
**State local:** `step` (form | summary | confirm)
**Hijos:** `CheckoutForm`, `OrderSummary`

### `CheckoutForm`
**Ruta:** `src/components/checkout/CheckoutForm.tsx`
**Responsabilidad:** Formulario de datos de envío con validación
**Props:**
```typescript
interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  initialData?: Partial<CheckoutFormData>;
}
```
**State local:** `formData`, `errors`, `isSubmitting`
**Validaciones:**
- nombre: required, min 3 chars
- teléfono: required, formato +506XXXXXXXX
- provincia, cantón, distrito: required, select options
- señas: required, min 10 chars
- notas: optional

### `OrderSummary`
**Ruta:** `src/components/checkout/OrderSummary.tsx`
**Responsabilidad:** Resumen final de orden antes de enviar por WhatsApp
**Props:**
```typescript
interface OrderSummaryProps {
  order: OrderSummary;
  customer: CustomerInfo;
  shipping: ShippingInfo;
  onConfirm: () => void;
  onEdit: () => void;
}
```

---

## Account

### `AccountLogin`
**Ruta:** `src/components/account/AccountLogin.tsx`
**Responsabilidad:** Login con número de WhatsApp + OTP mock
**Props:**
```typescript
interface AccountLoginProps {
  onLogin: (customer: Customer) => void;
}
```
**State local:** `phone`, `otp`, `step` (phone | otp | success), `error`, `isLoading`
**Edge cases:** número inválido, OTP incorrecto (siempre "0000" para demo)

### `AccountDashboard`
**Ruta:** `src/components/account/AccountDashboard.tsx`
**Responsabilidad:** Dashboard principal de cuenta del usuario
**Props:**
```typescript
interface AccountDashboardProps {}
```
**State usado:** `useAuthStore`, `useLoyaltyStore`

### `StatsGrid`
**Ruta:** `src/components/account/StatsGrid.tsx`
**Responsabilidad:** Grid de estadísticas del usuario
**Props:**
```typescript
interface StatsGridProps {
  stats: AccountStats;
}
```
**Métricas:** total órdenes, total gastado, puntos actuales, miembro desde

### `OrderHistory`
**Ruta:** `src/components/account/OrderHistory.tsx`
**Responsabilidad:** Lista de órdenes anteriores del usuario
**Props:**
```typescript
interface OrderHistoryProps {
  orders: Order[];
}
```
**Estados:** loading (skeleton rows), empty ("No hay órdenes anteriores"), list

### `NotifSettings`
**Ruta:** `src/components/account/NotifSettings.tsx`
**Responsabilidad:** Configuración de notificaciones (push, email, WhatsApp)
**Props:**
```typescript
interface NotifSettingsProps {}
```
**State local:** `settings` (toggles para cada tipo)

### `StoreConfig`
**Ruta:** `src/components/account/StoreConfig.tsx`
**Responsabilidad:** Configuración de tienda visible al usuario (moneda, idioma, tema)
**Props:**
```typescript
interface StoreConfigProps {}
```
**State usado:** `useConfigStore`

### `AccountTabs`
**Ruta:** `src/components/account/AccountTabs.tsx`
**Responsabilidad:** Navegación por tabs dentro de la cuenta
**Props:**
```typescript
interface AccountTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Tab[];
}
```

---

## Loyalty

### `LoyaltyCard`
**Ruta:** `src/components/loyalty/LoyaltyCard.tsx`
**Responsabilidad:** Card principal de lealtad con tier, puntos, progreso
**Props:**
```typescript
interface LoyaltyCardProps {}
```
**State usado:** `useLoyaltyStore`
**Render:** Tier badge (color + nombre), puntos actuales, ProgressBar al siguiente tier, beneficios del tier actual

### `TierGrid`
**Ruta:** `src/components/loyalty/TierGrid.tsx`
**Responsabilidad:** Visualización de los 4 tiers con sus beneficios
**Props:**
```typescript
interface TierGridProps {}
```
**State usado:** `useLoyaltyStore` (tiers config)
**Render:** Grid de 4 cards, cada una con nombre, puntos requeridos, descuento, beneficios, indicador de tier actual

### `RewardsGrid`
**Ruta:** `src/components/loyalty/RewardsGrid.tsx`
**Responsabilidad:** Catálogo de recompensas disponibles
**Props:**
```typescript
interface RewardsGridProps {}
```
**State usado:** `useLoyaltyStore` (rewards)
**Estados:** loading (skeleton), empty ("No hay recompensas disponibles para tu tier"), grid

### `RewardCard`
**Ruta:** `src/components/loyalty/RewardCard.tsx`
**Responsabilidad:** Card individual de recompensa canjeable
**Props:**
```typescript
interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (rewardId: string) => void;
}
```
**State local:** `isRedeeming`
**Edge cases:** puntos insuficientes (disabled + "Te faltan X puntos"), recompensa agotada

### `ProgressBar`
**Ruta:** `src/components/loyalty/ProgressBar.tsx`
**Responsabilidad:** Barra de progreso al siguiente tier
**Props:**
```typescript
interface ProgressBarProps {
  currentPoints: number;
  nextTierPoints: number;
  tierName: string;
}
```
**Animación:** Transición suave de width con CSS transition

---

## Contact

### `ContactCard`
**Ruta:** `src/components/contact/ContactCard.tsx`
**Responsabilidad:** Card con información de contacto (WhatsApp, email, ubicación, horarios)
**Props:**
```typescript
interface ContactCardProps {}
```
**Render:** Iconos + info de contacto, enlaces clickeables

### `IntlForm`
**Ruta:** `src/components/contact/IntlForm.tsx`
**Responsabilidad:** Formulario de contacto internacional con selector de país
**Props:**
```typescript
interface IntlFormProps {
  onSubmit: (data: ContactFormData) => void;
}
```
**State local:** `formData`, `errors`, `countryCode`, `isSubmitting`

### `ContactInfoStrip`
**Ruta:** `src/components/contact/ContactInfoStrip.tsx`
**Responsabilidad:** Tira horizontal de iconos de contacto en homepage
**Props:**
```typescript
interface ContactInfoStripProps {}
```

---

## Notifications

### `NotificationsPanel`
**Ruta:** `src/components/notifications/NotificationsPanel.tsx`
**Responsabilidad:** Panel desplegable con lista de notificaciones
**Props:**
```typescript
interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
```
**State usado:** `useNotificationStore`
**Estados:** empty ("No hay notificaciones"), list (items con dismiss individual), clear all button

### `DropAlert`
**Ruta:** `src/components/notifications/DropAlert.tsx`
**Responsabilidad:** Badge de alerta + dropdown preview en navbar
**Props:**
```typescript
interface DropAlertProps {}
```
**State usado:** `useNotificationStore` (unread count, latest)

---

## Shared

### `Toast`
**Ruta:** `src/components/shared/Toast.tsx`
**Responsabilidad:** Toast notification con auto-dismiss
**Props:**
```typescript
interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}
```
**Variantes:** success (verde), error (rojo), warning (amarillo), info (azul)
**Animación:** slide in desde top-right, fade out
**Accesibilidad:** role="alert", aria-live="polite"

### `Modal`
**Ruta:** `src/components/shared/Modal.tsx`
**Responsabilidad:** Modal genérico reutilizable con backdrop y foco trampa
**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```
**Accesibilidad:** role="dialog", aria-modal="true", focus trap, close on Escape, close on backdrop click

### `Button`
**Ruta:** `src/components/shared/Button.tsx`
**Responsabilidad:** Botón reutilizable con variantes
**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
```
**Estilos:** Variantes con colores del theme, loading state con spinner, disabled state opaco

### `Toggle`
**Ruta:** `src/components/shared/Toggle.tsx`
**Responsabilidad:** Toggle switch
**Props:**
```typescript
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```
**Accesibilidad:** role="switch", aria-checked, keyboard operable

### `Badge`
**Ruta:** `src/components/shared/Badge.tsx`
**Responsabilidad:** Badge para productos y notificaciones
**Props:**
```typescript
interface BadgeProps {
  variant: 'new' | 'sale' | 'exclusive' | 'default';
  children: React.ReactNode;
}
```

### `SizePicker`
**Ruta:** `src/components/shared/SizePicker.tsx`
**Responsabilidad:** Selector de tallas con disponibilidad
**Props:**
```typescript
interface SizePickerProps {
  sizes: Size[];
  selected: string | null;
  onSelect: (size: string) => void;
}
```
**Edge cases:** talla agotada (disabled con tachado), sin talla seleccionada (placeholder)

### `Skeleton`
**Ruta:** `src/components/shared/Skeleton.tsx`
**Responsabilidad:** Skeleton loading placeholder
**Props:**
```typescript
interface SkeletonProps {
  variant: 'text' | 'card' | 'image' | 'circle';
  width?: string;
  height?: string;
  count?: number; // para repetir
}
```
**Animación:** shimmer effect con CSS animation
