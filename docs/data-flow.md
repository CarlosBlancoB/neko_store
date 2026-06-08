# NEKO STORE — Flujo de Datos y Stores

## Domain Models (TypeScript Interfaces)

### Product
```typescript
interface Product {
  id: string;
  name: string;
  price: number;          // en colones (₡)
  category: Category;
  image: string;          // URL relativa
  images?: string[];       // galería
  sizes: Size[];
  description: string;
  badge?: BadgeType;
  points: number;         // puntos de lealtad que otorga
  featured?: boolean;
  stock: Record<string, number>; // { "S": 5, "M": 2, "L": 0 }
  createdAt: string;       // ISO date
}

type Category = 'vestidos' | 'tops' | 'accesorios' | 'conjuntos';
type BadgeType = 'new' | 'sale' | 'exclusive';

interface Size {
  label: string;  // "XS", "S", "M", "L", "XL", "2XL", "3XL"
  value: string;
  available: boolean;
}
```

### Cart
```typescript
interface CartItem {
  id: string;            // unique: productId + size
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  maxQuantity: number;    // stock limit
  image: string;
  points: number;
}

interface CartState {
  items: CartItem[];
  shipping: ShippingOption | null;
  coupon: Coupon | null;
}

interface CartComputed {
  subtotal: number;
  tax: number;           // 13% IVA CR
  shippingCost: number;
  total: number;
  totalPoints: number;
}

interface ShippingOption {
  id: string;
  name: string;          // "Correos CR", "Delivery NEKO", "Recoger en tienda"
  price: number;
  estimatedDays: string; // "3-5 días hábiles"
}
```

### Customer / Auth
```typescript
interface Customer {
  id: string;
  name: string;
  phone: string;         // con código país: "+50688887777"
  email?: string;
  address?: Address;
  memberSince: string;   // ISO date
  totalOrders: number;
  totalSpent: number;
  preferences: CustomerPreferences;
}

interface Address {
  province: string;
  canton: string;
  district: string;
  details: string;       // señas exactas
  zip?: string;
}

interface CustomerPreferences {
  theme: 'dark' | 'light';
  notifications: {
    push: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  currency: 'CRC' | 'USD';
}

interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
  sessionToken: string | null;
  loginMethod: 'whatsapp' | 'email' | null;
}
```

### Order
```typescript
interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  shipping: ShippingInfo;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  pointsEarned: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
type PaymentMethod = 'whatsapp' | 'sinpe' | 'paypal' | 'cash';

interface ShippingInfo {
  name: string;
  phone: string;
  address: Address;
  method: string;
  estimatedDelivery: string;
}
```

### Loyalty
```typescript
interface LoyaltyState {
  points: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  pointsHistory: PointsEntry[];
  rewards: Reward[];
  redeemedRewards: RedeemedReward[];
  nextTier: {
    name: string;
    pointsNeeded: number;
    progress: number;     // 0-100
  };
}

interface LoyaltyTier {
  name: 'MORTAL' | 'SOMBRA' | 'ECLIPSE' | 'NEKO NOIR';
  minPoints: number;
  discountPercent: number;
  freeShipping: boolean;
  exclusiveAccess: boolean;
  color: string;          // hex for UI
  icon: string;
}

interface PointsEntry {
  id: string;
  amount: number;
  source: 'purchase' | 'bonus' | 'redemption' | 'expiration';
  referenceId?: string;   // order id
  description: string;
  createdAt: string;
  expiresAt: string;     // 1 year from earned
}

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  tier: LoyaltyTier['name'];
  type: 'discount' | 'product' | 'shipping' | 'exclusive';
  value: number;          // discount %, or product id
  stock?: number;
  image?: string;
  available: boolean;
}

interface RedeemedReward {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  code?: string;          // discount code
  redeemedAt: string;
  used: boolean;
}
```

### Notification
```typescript
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;      // ms, 0 = persist
  createdAt: string;
  read: boolean;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}
```

### Config
```typescript
interface ConfigState {
  currency: 'CRC' | 'USD';
  taxRate: number;        // 0.13
  shippingOptions: ShippingOption[];
  storeName: string;
  storePhone: string;     // "+50688887777"
  storeEmail: string;
  storeAddress: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}
```

### UI
```typescript
interface UIState {
  isCartOpen: boolean;
  activeModal: string | null;  // modal id or null
  filters: {
    category: Category | 'all';
    priceRange: [number, number];
    size: string | null;
    searchQuery: string;
    sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
  };
  activeTab: string;
  isOnline: boolean;
}
```

---

## Store Slices (Zustand)

### `useCartStore`
**Archivo:** `src/stores/useCartStore.ts`
**Persistencia:** localStorage key `neko-cart`
**Schema:**
```typescript
interface CartStore extends CartState {
  // Computed (derived, no persist)
  subtotal: () => number;
  tax: () => number;
  total: () => number;
  itemCount: () => number;

  // Actions
  addItem: (product: Product, size: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setShipping: (option: ShippingOption) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}
```

### `useAuthStore`
**Archivo:** `src/stores/useAuthStore.ts`
**Persistencia:** sessionStorage key `neko-auth`
**Schema:**
```typescript
interface AuthStore extends AuthState {
  login: (phone: string, method: 'whatsapp' | 'email') => Promise<void>;
  loginWithOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
  updateAddress: (address: Address) => void;
  updatePreferences: (prefs: Partial<CustomerPreferences>) => void;
}
```

### `useLoyaltyStore`
**Archivo:** `src/stores/useLoyaltyStore.ts`
**Persistencia:** localStorage key `neko-loyalty`
**Schema:**
```typescript
interface LoyaltyStore extends LoyaltyState {
  addPoints: (amount: number, source: PointsEntry['source'], referenceId?: string) => void;
  redeemReward: (rewardId: string) => Promise<RedeemedReward>;
  calculateTier: () => void;
  getAvailableRewards: () => Reward[];
  getPointsUntilNextTier: () => number;
  expireOldPoints: () => void;
  getPointsHistory: (limit?: number) => PointsEntry[];
}
```

### `useConfigStore`
**Archivo:** `src/stores/useConfigStore.ts`
**Persistencia:** localStorage key `neko-config`
**Schema:**
```typescript
interface ConfigStore extends ConfigState {
  updateCurrency: (currency: 'CRC' | 'USD') => void;
  updateShippingOptions: (options: ShippingOption[]) => void;
  formatPrice: (amount: number) => string;
}
```

### `useNotificationStore`
**Archivo:** `src/stores/useNotificationStore.ts`
**Persistencia:** No (en memoria, se pierde al recargar — intencional)
**Schema:**
```typescript
interface NotificationStore {
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: () => number;
}
```

### `useUIStore`
**Archivo:** `src/stores/useUIStore.ts`
**Persistencia:** No (UI efímera)
**Schema:**
```typescript
interface UIStore extends UIState {
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setFilters: (filters: Partial<UIState['filters']>) => void;
  resetFilters: () => void;
  setActiveTab: (tab: string) => void;
  setOnlineStatus: (isOnline: boolean) => void;
}
```

---

## Data Flow Diagrams

### Add to Cart → Checkout → WhatsApp Order

```
[User] → click "Agregar" en ProductCard
  │
  │  ProductCard.onAddToCart(product, size)
  │
  ▼
useCartStore.addItem(product, size, qty=1)
  │
  ├── Validar: qty > 0, qty ≤ stock
  ├── Buscar item existente (productId + size match)
  │   ├── existe → incrementar qty (clamp a stock)
  │   └── no existe → push nuevo CartItem
  ├── Recalcular subtotal
  │
  ├── Zustand persist → localStorage["neko-cart"]
  │
  └── useNotificationStore.addNotification({
        type: "success",
        title: "Agregado",
        message: `${product.name} - ${size}`
      })
        │
        ▼
    Toast se renderiza (auto-dismiss 3s)
        │
        ▼
    Navbar cart badge actualiza count
        │
      [User continúa comprando o abre carrito]
        │
        ▼
    useUIStore.toggleCart()
        │
        ▼
    CartSidebar renderiza con items actualizados
        │
      [User hace clic "Pedir por WhatsApp"]
        │
        ▼
    useUIStore.openModal("checkout")
        │
        ▼
    CheckoutModal se renderiza (lazy loaded)
        │
      [User llena formulario de envío]
        │
        ▼
    CheckoutForm.onSubmit(formData)
        │
        ▼
    OrderSummary muestra resumen
        │
      [User confirma]
        │
        ▼
    utils/whatsapp.ts:
      WhatsAppEncoder.encodeOrder(cart, customer, shipping)
        → genera string con formato:
          🦇 *NUEVO PEDIDO - NEKO STORE* 🦇
          Cliente: {name}
          Tel: {phone}
          Envío: {address}
          ────
          {items}
          ────
          Subtotal: {subtotal}
          Envío: {shipping}
          Total: {total}
          ────
          Notas: {notes}
        │
        ▼
    WhatsAppDeepLink.generate(phone, message)
        → "https://wa.me/50688887777?text={encoded}"
        │
        ▼
    window.open(url, "_blank")
        │
        ▼
    useCartStore.clearCart()
    useNotificationStore.addNotification({ type: "success", message: "Pedido enviado ✓" })
```

### Loyalty: Points → Tier Calculation → Rewards

```
[Compra completada: order.total = ₡25,000]
  │
  ▼
  const pointsEarned = Math.floor(order.total / 1000) * 10
  // 25,000 / 1000 = 25 → 25 * 10 = 250 puntos
  │
  ▼
useLoyaltyStore.addPoints(250, "purchase", order.id)
  │
  ├── Crear PointsEntry {
  │     amount: 250,
  │     source: "purchase",
  │     expiresAt: "+1 year"
  │   }
  ├── points += 250
  ├── lifetimePoints += 250
  │
  ▼
useLoyaltyStore.calculateTier()
  │
  ├── lifetimePoints < 500     → MORTAL     (0%)
  ├── lifetimePoints 500-1499  → SOMBRA     (5%)
  ├── lifetimePoints 1500-4999 → ECLIPSE    (10%)
  └── lifetimePoints ≥ 5000    → NEKO NOIR  (20%)
  │
  ├── Actualizar tier
  ├── Calcular nextTier: { name, pointsNeeded, progress }
  └── Si tier cambió → notificación de subida de nivel
  │
  ▼
LoyaltyCard re-renderiza:
  - Badge con nuevo tier (color, icono, nombre)
  - Puntos actuales
  - ProgressBar: "Te faltan {X} puntos para {nextTier}"
  - Beneficios del tier actual
  │
  ▼
[User va a RewardsGrid]
  │
  ▼
useLoyaltyStore.getAvailableRewards()
  │  Filtra rewards donde reward.tier ≤ user.tier
  │  (MORTAL ve rewards MORTAL; NEKO NOIR ve todos)
  │
  ▼
RewardCard por cada reward:
  ┌─────────────────────────────────────┐
  │  🎁 Descuento ₡5,000               │
  │  Válido en tu próxima compra        │
  │  2,500 puntos                       │
  │  [Canjear] ← disabled si points < 2500 │
  └─────────────────────────────────────┘
  │
  [User click "Canjear"]
  │
  ▼
useLoyaltyStore.redeemReward(rewardId)
  ├── Verificar: points ≥ reward.pointsCost
  ├── Verificar: reward.available
  ├── Restar points -= reward.pointsCost
  ├── Crear RedeemedReward {
  │     rewardId,
  │     pointsSpent,
  │     code: generateDiscountCode(),
  │     redeemedAt: new Date()
  │   }
  ├── Agregar a redeemedRewards[]
  └── Notificación: "¡Recompensa canjeada! Código: NEKO-XXXX"
  │
  ▼
RewardsGrid re-renderiza:
  - Puntos actualizados
  - Reward canjeado se marca como usado / desaparece si sin stock
```

---

## LocalStorage Schema Migration Plan

### Legacy Schema (current vanilla JS)
```
localStorage:
  nekoCart → JSON.stringify({ items: [...], total: number })  // schema plano
  nekoAuth → JSON.stringify({ phone: string, name: string })  // sin estructura
  nekoTheme → "dark" | "light"                                // simple string
```

### Migration Strategy
1. En `main.tsx`, antes de renderizar React, ejecutar migrador:
2. Leer claves legacy
3. Validar y transformar a nuevo schema
4. Escribir nuevo schema con prefijo `neko-v2-*`
5. Respaldar legacy como `neko-legacy-*`
6. Eliminar claves legacy

### Migration Code Sketch
```typescript
// src/utils/localStorage.ts
interface MigrationMap {
  from: string;
  to: string;
  transform: (legacy: unknown) => unknown;
  validate: (data: unknown) => boolean;
}

const migrations: MigrationMap[] = [
  {
    from: 'nekoCart',
    to: 'neko-cart',
    transform: (legacy: any) => ({
      state: {
        items: legacy.items?.map((item: any) => ({
          id: `${item.productId}-${item.size}`,
          productId: item.productId,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
          maxQuantity: item.stock ?? 99,
          image: item.image,
          points: item.points ?? 0,
        })) ?? [],
        shipping: null,
        coupon: null,
      },
      version: 2,
    }),
    validate: (data: any) => Array.isArray(data?.items),
  },
  // ... más migraciones
];

export function runMigrations(): void {
  for (const migration of migrations) {
    const legacyRaw = localStorage.getItem(migration.from);
    if (!legacyRaw) continue;

    try {
      const legacy = JSON.parse(legacyRaw);
      if (!migration.validate(legacy)) {
        console.warn(`[Migration] Invalid legacy data for ${migration.from}`);
        continue;
      }

      // Backup legacy
      localStorage.setItem(`${migration.from}-legacy-backup`, legacyRaw);

      // Transform and save
      const transformed = migration.transform(legacy);
      localStorage.setItem(migration.to, JSON.stringify(transformed));

      // Remove legacy
      localStorage.removeItem(migration.from);

      console.log(`[Migration] ${migration.from} → ${migration.to} ✓`);
    } catch (e) {
      console.error(`[Migration] Failed for ${migration.from}:`, e);
    }
  }
}
```

### Target Schema (post-migration)
| localStorage Key | Store | Version | TTL |
|-----------------|-------|---------|-----|
| `neko-cart` | useCartStore | 2 | ∞ |
| `neko-auth` | useAuthStore | 2 | session |
| `neko-loyalty` | useLoyaltyStore | 2 | ∞ |
| `neko-config` | useConfigStore | 2 | ∞ |
| `neko-theme` | useTheme hook | 2 | ∞ |
