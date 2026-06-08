# NEKO STORE — Sistema de Recompensas

## Tier System

| Tier | Puntos Requeridos | Descuento | Envío Gratis | Acceso Exclusivo | Color | Icono |
|------|------------------|-----------|--------------|------------------|-------|-------|
| 🥀 MORTAL | 0 - 499 pts | 0% | ❌ | ❌ | Gris (#666) | skull |
| 🌑 SOMBRA | 500 - 1,499 pts | 5% | ❌ | ❌ | Púrpura (#6a1b9a) | moon |
| 🔮 ECLIPSE | 1,500 - 4,999 pts | 10% | ✅ | Productos limitados | Violeta (#9c27b0) | crystal |
| 🐈⬛ NEKO NOIR | 5,000+ pts | 20% | ✅ | Todo + previews | Dorado (#ffd700) | crown |

### Benefits Detail

#### MORTAL
- 1 punto por cada ₡1,000 gastados
- Acceso al catálogo completo
- Notificaciones de ofertas

#### SOMBRA
- 1.5x puntos en todas las compras
- 5% de descuento en cada orden
- Acceso anticipado a nuevas colecciones
- Badge "SOMBRA" en perfil

#### ECLIPSE
- 2x puntos en todas las compras
- 10% de descuento en cada orden
- Envío gratis en todo el país
- Acceso a productos exclusivos ECLIPSE
- Badge "ECLIPSE" en perfil
- Prioridad en atención al cliente

#### NEKO NOIR
- 3x puntos en todas las compras
- 20% de descuento en cada orden
- Envío gratis en todo el país
- Acceso a colecciones preview
- Productos exclusivos NEKO NOIR
- Badge "NEKO NOIR" animado
- Línea directa WhatsApp prioritaria
- Regalo sorpresa en cada cumpleaños

---

## Point Calculation Rules

### Earning Points
```typescript
export function calculatePointsEarned(
  orderTotal: number,
  tier: LoyaltyTier['name']
): number {
  const base = Math.floor(orderTotal / 1000); // 1 punto por cada ₡1,000

  const multipliers: Record<LoyaltyTier['name'], number> = {
    'MORTAL': 1,
    'SOMBRA': 1.5,
    'ECLIPSE': 2,
    'NEKO NOIR': 3,
  };

  return Math.floor(base * multipliers[tier]);
}
```

**Bonus opportunities:**
- **Sign-up bonus:** 100 puntos al crear cuenta
- **Referral bonus:** 200 puntos por referido que complete compra
- **Birthday bonus:** 500 puntos en el mes del cumpleaños
- **Review bonus:** 50 puntos por review con foto
- **Social bonus:** 25 puntos por compartir en Instagram/TikTok

### Point Deductions
- **Redemption:** Puntos gastados en recompensas
- **Expiration:** Puntos no usados en 1 año desde que se ganaron
- **Refund reversal:** Si una orden se cancela, los puntos se revierten

### Spending Points
```typescript
export function calculatePointsDiscount(points: number): number {
  // 100 puntos = ₡1,000 de descuento
  return Math.floor(points / 100) * 1000;
}
```

---

## Discount Percentages Per Tier

| Tier | Discount | Stackable with Sale? | Stackable with Code? |
|------|----------|---------------------|---------------------|
| MORTAL | 0% | N/A | Sí |
| SOMBRA | 5% | No (elige mayor) | No |
| ECLIPSE | 10% | No (elige mayor) | No |
| NEKO NOIR | 20% | No (elige mayor) | No |

**Rule:** El descuento de tier NO se acumula con ofertas ni códigos. El sistema automáticamente aplica el mayor descuento disponible.

---

## Reward Catalog Data Model

```typescript
// src/data/rewards.ts

export const REWARDS: Reward[] = [
  // ── Discounts ──
  {
    id: 'disc-1000',
    name: '₡1,000 de descuento',
    description: 'Descuento de ₡1,000 en tu próxima compra',
    pointsCost: 100,
    tier: 'MORTAL',
    type: 'discount',
    value: 1000,
    available: true,
  },
  {
    id: 'disc-3000',
    name: '₡3,000 de descuento',
    description: 'Descuento de ₡3,000 en tu próxima compra',
    pointsCost: 300,
    tier: 'MORTAL',
    type: 'discount',
    value: 3000,
    available: true,
  },
  {
    id: 'disc-5000',
    name: '₡5,000 de descuento',
    description: 'Descuento de ₡5,000 en tu próxima compra',
    pointsCost: 500,
    tier: 'SOMBRA',
    type: 'discount',
    value: 5000,
    available: true,
  },
  {
    id: 'disc-10000',
    name: '₡10,000 de descuento',
    description: 'Descuento de ₡10,000 en tu próxima compra (exclusivo ECLIPSE+)',
    pointsCost: 1000,
    tier: 'ECLIPSE',
    type: 'discount',
    value: 10000,
    available: true,
  },
  {
    id: 'disc-25000',
    name: '₡25,000 de descuento',
    description: 'Descuento de ₡25,000 — solo para almas NEKO NOIR',
    pointsCost: 2500,
    tier: 'NEKO NOIR',
    type: 'discount',
    value: 25000,
    available: true,
  },

  // ── Free Shipping ──
  {
    id: 'ship-free',
    name: 'Envío gratis',
    description: 'Envío gratis en tu próxima compra (todo CR)',
    pointsCost: 200,
    tier: 'MORTAL',
    type: 'shipping',
    value: 0,
    available: true,
  },
  {
    id: 'ship-express',
    name: 'Envío express gratis',
    description: 'Envío express 24hrs completamente gratis',
    pointsCost: 400,
    tier: 'SOMBRA',
    type: 'shipping',
    value: 0,
    available: true,
  },

  // ── Exclusive Products ──
  {
    id: 'pin-exclusive',
    name: 'Pin exclusivo NEKO',
    description: 'Pin esmaltado edición limitada — diseño de luna y espada',
    pointsCost: 300,
    tier: 'SOMBRA',
    type: 'product',
    value: 0,
    stock: 50,
    image: '/rewards/pin-neko.png',
    available: true,
  },
  {
    id: 'tote-bag',
    name: 'Tote bag NEKO',
    description: 'Tote bag de terciopelo negro con logo bordado',
    pointsCost: 600,
    tier: 'ECLIPSE',
    type: 'product',
    value: 0,
    stock: 30,
    image: '/rewards/tote-neko.png',
    available: true,
  },
  {
    id: 'corset-noir',
    name: 'Corset NEKO NOIR',
    description: 'Corset exclusivo para miembros NEKO NOIR — edición limitada',
    pointsCost: 3000,
    tier: 'NEKO NOIR',
    type: 'product',
    value: 0,
    stock: 5,
    image: '/rewards/corset-noir.png',
    available: true,
  },

  // ── Exclusive Access ──
  {
    id: 'early-access',
    name: 'Acceso anticipado 24h',
    description: 'Acceso 24 horas antes al lanzamiento de nueva colección',
    pointsCost: 150,
    tier: 'SOMBRA',
    type: 'exclusive',
    value: 0,
    available: true,
  },
  {
    id: 'vip-event',
    name: 'Invitación evento VIP',
    description: 'Invitación a evento privado NEKO (lanzamientos, fotos, networking)',
    pointsCost: 1000,
    tier: 'ECLIPSE',
    type: 'exclusive',
    value: 0,
    stock: 20,
    available: true,
  },
  {
    id: 'design-vote',
    name: 'Voto en nuevo diseño',
    description: 'Votá en la próxima colección antes de producción',
    pointsCost: 500,
    tier: 'NEKO NOIR',
    type: 'exclusive',
    value: 0,
    available: true,
  },
];
```

---

## Redemption Flow

```
Usuario en RewardsGrid
  │
  ▼
Selecciona RewardCard
  │
  ├── ¿Puntos suficientes?
  │   ├── No → mostrar "Te faltan {X} puntos" + sugerir formas de ganar
  │   └── Sí → mostrar modal de confirmación
  │
  ▼
Modal de confirmación:
  ┌─────────────────────────────────────┐
  │  Canjear recompensa                 │
  │                                     │
  │  🎁 {reward.name}                   │
  │  {reward.description}               │
  │                                     │
  │  Puntos a canjear: {pointsCost}     │
  │  Tus puntos: {userPoints}           │
  │  Te quedan: {userPoints - cost}     │
  │                                     │
  │  [Cancelar]  [Canjear]              │
  └─────────────────────────────────────┘
  │
  ▼
useLoyaltyStore.redeemReward(rewardId)
  │
  ├── Verificar: points >= reward.pointsCost ✅
  ├── Verificar: reward.available ✅
  ├── (Si type=product) Verificar: reward.stock > 0
  │
  ├── points -= reward.pointsCost
  │
  ├── Crear RedeemedReward {
  │     id: generateId(),
  │     rewardId: reward.id,
  │     rewardName: reward.name,
  │     pointsSpent: reward.pointsCost,
  │     code: reward.type === 'discount'
  │       ? generateDiscountCode('NEKO', customer.id)
  │       : undefined,
  │     redeemedAt: new Date().toISOString(),
  │     used: false,
  │   }
  │
  ├── Si type=product → reward.stock -= 1
  │
  └── Notificación:
      type: 'success',
      title: '¡Recompensa canjeada!',
      message: reward.type === 'discount'
        ? `Código: ${code} — usalo en tu próxima compra`
        : 'Te contactaremos para coordinar la entrega'
```

### Discount Code Generation
```typescript
export function generateDiscountCode(
  prefix: string,
  customerId: string
): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${customerId.slice(0, 4)}-${timestamp}-${random}`;
}
// Ejemplo: "NEKO-A1B2-XXXX-YYYY"
```

---

## Points Expiration Policy

| Regla | Detalle |
|-------|---------|
| Período de validez | 1 año desde la fecha en que se ganaron |
| Orden de expiración | FIFO (los primeros en ganarse expiran primero) |
| Notificación previa | 30 días antes: "Tus puntos están por expirar" |
| Notificación al expirar | "X puntos expiraron" |
| Puntos de bono | Misma regla (1 año desde que se otorgaron) |
| Puntos de referido | Misma regla |
| Recompensa no usada | El código de descuento expira a los 6 meses |

```typescript
export function getExpiringPoints(
  pointsHistory: PointsEntry[],
  daysThreshold: number = 30
): number {
  const now = new Date();
  const threshold = new Date(now.getTime() + daysThreshold * 24 * 60 * 60 * 1000);

  return pointsHistory
    .filter(entry =>
      entry.source !== 'redemption' &&
      entry.expiresAt &&
      new Date(entry.expiresAt) <= threshold &&
      new Date(entry.expiresAt) > now
    )
    .reduce((sum, entry) => sum + entry.amount, 0);
}
```

---

## Dashboard Visualization Requirements

### LoyaltyCard
```
┌────────────────────────────────────────┐
│  🌙  SOMBRA                            │
│                                        │
│  1,250 puntos                          │
│                                        │
│  ████████████░░░░░░░░░░  48%           │
│  Te faltan 250 pts para ECLIPSE        │
│                                        │
│  Beneficios:                           │
│  ✓ 5% de descuento                     │
│  ○ Envío gratis (desbloquea en ECLIPSE)│
│  ○ Productos exclusivos                │
└────────────────────────────────────────┘
```

### TierGrid
```
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ 🥀   │ │ 🌑   │ │ 🔮   │ │ 👑   │
│MORTAL│ │SOMBRA│ │ECLIPSE│ │NEKO  │
│ 0pts │ │500pts│ │1500pt│ │5000pt│
│ 0%   │ │ 5%   │ │ 10%  │ │ 20%  │
│      │ │⭐ TU │ │      │ │      │
│      │ │ TIER │ │      │ │      │
└──────┘ └──────┘ └──────┘ └──────┘
```

### StatsGrid (account dashboard)
```
┌──────────────────┐ ┌──────────────────┐
│ Órdenes totales  │ │ Total gastado    │
│       12         │ │      ₡185,000    │
└──────────────────┘ └──────────────────┘
┌──────────────────┐ ┌──────────────────┐
│ Puntos actuales  │ │ Miembro desde     │
│      1,250       │ │   Ene 2025       │
└──────────────────┘ └──────────────────┘
```

### PointsHistory
```
┌────────────────────────────────────────┐
│ Historial de puntos                    │
│                                        │
│ ⋮ más recientes                        │
│ +250  Compra #0042         hace 3d    │
│ +50   Review: Corset       hace 1sem  │
│ -300  Canje: ₡3,000 desc   hace 2sem  │
│ +200  Referido: María      hace 1mes  │
│ -100  Expiraron            hace 1mes  │
│ +500  Bono cumpleaños      hace 2mes  │
│ ⋮                                     │
└────────────────────────────────────────┘
```

### Empty States
- **No points history:** "Todavía no ganaste puntos. ¡Hacé tu primera compra para empezar!"
- **No rewards available:** "No hay recompensas disponibles para tu tier. ¡Subí de nivel para desbloquear más!"
- **No redeemed rewards:** "Todavía no canjeaste ninguna recompensa. Tus puntos te esperan."
