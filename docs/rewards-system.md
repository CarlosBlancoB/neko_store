# NEKO STORE — Sistema de Lealtad y Recompensas (v2)

> Versión financieramente sostenible. Basado en margen, riesgo, presupuesto y comportamiento real de cliente.
> Fecha: Junio 2026

---

## Índice

1. [Regla Base de Acumulación](#1-regla-base-de-acumulación)
2. [Fórmula Real del Sistema](#2-fórmula-real-del-sistema)
3. [Regla de Seguridad: Reward Budget](#3-regla-de-seguridad-reward-budget)
4. [Puntos Como Derecho de Acceso](#4-puntos-como-derecho-de-acceso)
5. [Fórmula para Calcular Puntos Necesarios](#5-fórmula-para-calcular-puntos-necesarios)
6. [Clasificación de Productos](#6-clasificación-de-productos)
7. [Score de Elegibilidad (Reward Score)](#7-score-de-elegibilidad-reward-score)
8. [Tipos de Reward](#8-tipos-de-reward)
9. [Fórmula de Protección por Margen](#9-fórmula-de-protección-por-margen)
10. [Expiración de Puntos](#10-expiracion-de-puntos)
11. [Lógica de Niveles de Cliente](#11-logica-de-niveles-de-cliente)
12. [Lógica en Bloque (TypeScript)](#12-logica-en-bloque-typescript)
13. [Ejemplos Prácticos](#13-ejemplos-practicos)
14. [Dashboard: Datos a Mostrar](#14-dashboard-datos-a-mostrar)
15. [Regla Final del Sistema](#15-regla-final-del-sistema)
16. [Estrategia por Fases](#16-estrategia-por-fases)
17. [Historias de Usuario](#17-historias-de-usuario)

---

## 1. Regla Base de Acumulación

Cada **₡500** de compra = **1 punto**.

| Compra | Puntos ganados |
|--------|---------------|
| ₡10,000 | 20 |
| ₡25,000 | 50 |
| ₡50,000 | 100 |
| ₡100,000 | 200 |

### Candado fundamental

Los puntos **NO** equivalen directamente al precio de venta. Los puntos representan **acceso controlado** según:
- Margen del producto
- Inventario disponible
- Rotación
- Riesgo financiero

---

## 2. Fórmula Real del Sistema

Cada artículo en el catálogo de rewards debe tener:

| Campo | Descripción |
|-------|-------------|
| precioVenta | Precio al público en ₡ |
| costoProducto | Costo real de reposición en ₡ |
| margenBruto | precioVenta - costoProducto |
| porcentajeMargen | margenBruto / precioVenta |
| stockDisponible | Unidades en inventario |
| categoria | Categoría del producto |
| nivelDeRotacion | baja / media / alta / estrella |
| esProductoReward | bool |
| rewardTier | Nivel mínimo de cliente requerido |
| puntosNecesarios | Calculado por el sistema |
| maximoRedencionesPorMes | Límite por SKU |

### Cálculo base

```
margenBruto = precioVenta - costoProducto
porcentajeMargen = margenBruto / precioVenta
```

**Ejemplo:**
- Camisa gótica
- Precio venta: ₡15,000
- Costo real: ₡7,000
- Margen bruto: ₡8,000
- Margen %: **53.3%**
- → Puede entrar a rewards, pero con restricciones

---

## 3. Regla de Seguridad: Reward Budget

El dashboard debe tener una **bolsa mensual máxima** para rewards.

```
rewardBudgetMensual = ventasMensuales × porcentajeMaximoReward
```

### Recomendación conservadora

```
porcentajeMaximoReward = 2% a 5% de ventas
```

El reward rate contra margen bruto no debe superar el 2% para validar que el programa no se come la utilidad.

### Ejemplo

| Concepto | Valor |
|----------|-------|
| Ventas del mes | ₡1,000,000 |
| Reward budget (3%) | ₡30,000 |

**Implicación:** El sistema no puede regalar productos cuyo costo acumulado supere ₡30,000 en ese mes. Aunque haya clientes con puntos suficientes, si el presupuesto se agotó, el reward se marca como **Bloqueado hasta próximo ciclo**.

Esto evita regalar hasta quebrarse.

---

## 4. Puntos Como Derecho de Acceso

Los puntos **no compran precio**. Los puntos **desbloquean productos según nivel**.

### Niveles de acceso

| Nivel | Rango de puntos | Ejemplos |
|-------|----------------|----------|
| Nivel 1 | 50 - 100 pts | Accesorios pequeños |
| Nivel 2 | 150 - 250 pts | Accesorios premium |
| Nivel 3 | 300 - 500 pts | Camisetas / piezas de baja rotación |
| Nivel 4 | 700+ pts + compra mínima | Productos especiales |

---

## 5. Fórmula para Calcular Puntos Necesarios

```
puntosNecesarios = (costoProducto / valorInternoPorPunto) × factorRiesgo
```

### Valor interno por punto

```
valorInternoPorPunto = ₡25 a ₡50
```

Aunque el cliente gane 1 punto por cada ₡500, internamente el negocio decide cuánto "cuesta" cada punto.

#### Ejemplo conservador

```
1 punto tiene valor interno de ₡30
```

### Cálculo completo

**Producto:** Anillo gótico
- Costo: ₡2,000
- Precio venta: ₡5,000
- Factor riesgo: 1.3

**Resultado:**
```
puntosNecesarios = (2,000 / 30) × 1.3
puntosNecesarios = 86.6 → redondeado: 90 puntos
```

**Lectura financiera:**
- El cliente necesita gastar **₡45,000** para obtener 90 puntos (₡45,000 / ₡500 = 90)
- La tienda regala algo que costó ₡2,000
- Después de que el cliente compró ₡45,000
- **Eso sí tiene sentido.**

---

## 6. Clasificación de Productos

### Producto apto para reward

- Margen bruto mayor a 45%
- Stock medio o alto
- Baja o media rotación
- Costo bajo o moderado
- No es producto estrella
- No es edición limitada

### Producto peligroso para reward

- Margen menor a 35%
- Stock bajo
- Alta demanda
- Producto nuevo
- Producto limitado
- Producto caro de reponer

### Producto prohibido para reward

- Margen muy bajo
- Importado difícil de reponer
- Alta rotación
- Genera identidad fuerte de marca
- Se vende solo

### Regla brutal

> No regales lo que la gente ya está dispuesta a pagar. Regala lo que aumenta fidelidad, mueve inventario y no destruye caja.

---

## 7. Score de Elegibilidad (Reward Score)

Cada producto recibe un puntaje de elegibilidad de **0 a 100**.

### Fórmula

```
rewardScore =
  (margenScore × 0.35) +
  (stockScore × 0.25) +
  (rotacionScore × 0.20) +
  (costoScore × 0.20)
```

### Margen Score (35%)

| Margen | Score |
|--------|-------|
| Mayor a 60% | 100 |
| 45% - 60% | 80 |
| 35% - 45% | 50 |
| Menor a 35% | 0 |

### Stock Score (25%)

| Stock | Score |
|-------|-------|
| Alto (≥20) | 100 |
| Medio (10-19) | 70 |
| Bajo (5-9) | 20 |
| Crítico (<5) | 0 |

### Rotación Score (20%) — Lógica invertida

| Rotación | Score | Razón |
|----------|-------|-------|
| Baja | 100 | Si no se vende, se regala |
| Media | 70 | Riesgo controlado |
| Alta | 20 | No regales lo que ya se vende |
| Estrella | 0 | Protege tu producto más fuerte |

### Costo Score (20%)

| Costo | Score |
|-------|-------|
| Bajo (≤₡2,000) | 100 |
| Medio (₡2,001 - ₡5,000) | 70 |
| Alto (₡5,001 - ₡10,000) | 30 |
| Muy alto (>₡10,000) | 0 |

### Decisión final

| Score | Decisión |
|-------|----------|
| ≥ 75 | **Apto para reward gratis** |
| 55 - 74 | Apto con compra mínima |
| 35 - 54 | Solo descuento parcial |
| < 35 | No apto |

---

## 8. Tipos de Reward

### A. Producto Gratis Controlado

Solo para productos con score ≥ 75.

- Cliente redime puntos
- No necesita compra adicional
- Se descuenta del reward budget mensual

### B. Producto + Compra Mínima

Más saludable financieramente.

> "Canjeá 200 puntos y llevate este accesorio gratis en compras mayores a ₡15,000"

El reward no es pérdida aislada, sino **disparador de venta**.

### C. Descuento Parcial

Para productos con score 35-74.

> "300 puntos = 30% de descuento en producto seleccionado"

No se regala todo. Se protege margen.

### D. Upgrade

La mejor opción para no desfalcar la caja.

> "Comprá una camiseta y con 120 puntos mejorá a accesorio premium con precio especial"

Se siente como beneficio, pero mantiene caja viva.

---

## 9. Fórmula de Protección por Margen

Antes de permitir un reward, el sistema pregunta:

> ¿La utilidad generada por el cliente supera el costo del reward?

### Cálculo

```
utilidadEstimadaCliente = totalCompradoCliente × margenPromedioTienda
```

### Ejemplo

| Variable | Valor |
|----------|-------|
| Total comprado por cliente | ₡80,000 |
| Margen promedio tienda | 45% |
| Utilidad estimada | ₡36,000 |

**Reward solicitado:** producto con costo real de ₡4,000

### Relación

```
rewardCostRatio = costoReward / utilidadEstimadaCliente
rewardCostRatio = 4,000 / 36,000 = 11.1%
```

### Regla

| rewardCostRatio | Decisión |
|----------------|----------|
| ≤ 15% | Permitido |
| 15% - 25% | Permitido con compra mínima |
| > 25% | Bloqueado |

---

## 10. Expiración de Puntos

Los puntos no viven para siempre. Son una **obligación económica** hasta que se usan o expiran.

| Configuración | Período |
|---------------|---------|
| **Recomendado** | **180 días** |
| Alternativa amigable | 365 días |

### Política de expiración

| Regla | Detalle |
|-------|---------|
| Período de validez | 180 días desde que se ganaron |
| Orden de expiración | FIFO (primeros en ganarse expiran primero) |
| Notificación previa | 15 días antes: "Tus puntos están por expirar" |
| Notificación al expirar | "X puntos expiraron" |
| Puntos de bono | Misma regla (180 días) |
| Puntos de referido | Misma regla |

### Justificación

Una tienda pequeña no puede cargar una deuda eterna. En loyalty, los puntos pendientes son un pasivo hasta que se redimen o expiran.

---

## 11. Lógica de Niveles de Cliente

No todos los clientes tienen el mismo poder de canje.

| Nivel | Total gastado | Capacidad de canje |
|-------|---------------|-------------------|
| 🥀 **Sombra** | ₡0 - ₡49,999 | Gana puntos, no puede redimir productos grandes. Puede redimir puntos de hasta 80. |
| 🌑 **Ritual** | ₡50,000 - ₡149,999 | Puede redimir accesorios pequeños (hasta 250 puntos). |
| 🔮 **Nocturno** | ₡150,000 - ₡299,999 | Accede a mejores rewards (hasta 500 puntos). |
| 🐈⬛ **Eclipse** | ₡300,000+ | Acceso completo. Rewards premium, preventas, piezas especiales. |

### Mapeo de acceso

| Nivel | Puntos máximos canjeables por reward |
|-------|--------------------------------------|
| Sombra | 80 |
| Ritual | 250 |
| Nocturno | 500 |
| Eclipse | Sin límite |

El sistema no mide solo puntos, mide **fidelidad real**.

---

## 12. Lógica en Bloque (TypeScript)

### Constantes del sistema

```typescript
const POINTS_PER_COLONES = 500
const REWARD_POINT_INTERNAL_VALUE = 30
// Cada punto representa ₡30 de costo máximo para el negocio.
// No es valor público. Es valor financiero interno.

const MAX_REWARD_BUDGET_PERCENTAGE = 0.03
// Máximo 3% de ventas mensuales destinado a rewards.

const MAX_REWARD_COST_OVER_CUSTOMER_PROFIT = 0.15
// Un reward no debe costar más del 15% de la utilidad estimada
// que ese cliente ha generado.

const POINT_EXPIRATION_DAYS = 180
```

### Cálculo de puntos ganados

```typescript
function calculateEarnedPoints(orderTotal: number): number {
  return Math.floor(orderTotal / POINTS_PER_COLONES)
}
```

### Cálculo de margen

```typescript
function calculateGrossMargin(salePrice: number, productCost: number): number {
  return salePrice - productCost
}

function calculateMarginPercentage(salePrice: number, productCost: number): number {
  if (salePrice <= 0) return 0
  return (salePrice - productCost) / salePrice
}
```

### Scores individuales

```typescript
function getMarginScore(marginPercentage: number): number {
  if (marginPercentage >= 0.60) return 100
  if (marginPercentage >= 0.45) return 80
  if (marginPercentage >= 0.35) return 50
  return 0
}

function getStockScore(stock: number): number {
  if (stock >= 20) return 100
  if (stock >= 10) return 70
  if (stock >= 5) return 20
  return 0
}

type RotationLevel = 'baja' | 'media' | 'alta' | 'estrella'

function getRotationScore(rotation: RotationLevel): number {
  switch (rotation) {
    case 'baja':   return 100
    case 'media':  return 70
    case 'alta':   return 20
    case 'estrella': return 0
  }
}

function getCostScore(productCost: number): number {
  if (productCost <= 2000) return 100
  if (productCost <= 5000) return 70
  if (productCost <= 10000) return 30
  return 0
}
```

### Score total del producto

```typescript
function calculateRewardScore(params: {
  salePrice: number
  productCost: number
  stock: number
  rotation: RotationLevel
}): number {
  const marginPercentage = calculateMarginPercentage(params.salePrice, params.productCost)

  return (
    getMarginScore(marginPercentage) * 0.35 +
    getStockScore(params.stock) * 0.25 +
    getRotationScore(params.rotation) * 0.20 +
    getCostScore(params.productCost) * 0.20
  )
}
```

### Clasificación del producto

```typescript
type RewardEligibility =
  | 'free_reward'
  | 'reward_with_minimum_purchase'
  | 'partial_discount_only'
  | 'not_eligible'

function getRewardEligibility(rewardScore: number): RewardEligibility {
  if (rewardScore >= 75) return 'free_reward'
  if (rewardScore >= 55) return 'reward_with_minimum_purchase'
  if (rewardScore >= 35) return 'partial_discount_only'
  return 'not_eligible'
}
```

### Puntos necesarios para canjear

```typescript
function calculateRequiredPoints(params: {
  productCost: number
  riskFactor: number
}): number {
  const rawPoints =
    (params.productCost / REWARD_POINT_INTERNAL_VALUE) * params.riskFactor
  return Math.ceil(rawPoints / 10) * 10 // Redondea en bloques de 10
}
```

### Factor de riesgo

```typescript
function calculateRiskFactor(params: {
  marginPercentage: number
  stock: number
  rotation: RotationLevel
}): number {
  let riskFactor = 1

  if (params.marginPercentage < 0.45) riskFactor += 0.4
  if (params.stock < 10) riskFactor += 0.3
  if (params.rotation === 'alta') riskFactor += 0.4
  if (params.rotation === 'estrella') riskFactor += 0.8

  return riskFactor
}
```

### Presupuesto mensual

```typescript
function calculateMonthlyRewardBudget(monthlySales: number): number {
  return monthlySales * MAX_REWARD_BUDGET_PERCENTAGE
}

function isRewardBudgetAvailable(params: {
  monthlySales: number
  currentRewardCostUsed: number
  rewardProductCost: number
}): boolean {
  const monthlyRewardBudget = calculateMonthlyRewardBudget(params.monthlySales)
  return (
    params.currentRewardCostUsed + params.rewardProductCost <= monthlyRewardBudget
  )
}
```

### Utilidad estimada del cliente

```typescript
function calculateEstimatedCustomerProfit(params: {
  customerTotalSpent: number
  averageStoreMargin: number
}): number {
  return params.customerTotalSpent * params.averageStoreMargin
}

function isRewardSafeForCustomer(params: {
  customerTotalSpent: number
  averageStoreMargin: number
  rewardProductCost: number
}): boolean {
  const estimatedProfit = calculateEstimatedCustomerProfit({
    customerTotalSpent: params.customerTotalSpent,
    averageStoreMargin: params.averageStoreMargin,
  })

  if (estimatedProfit <= 0) return false
  const rewardCostRatio = params.rewardProductCost / estimatedProfit
  return rewardCostRatio <= MAX_REWARD_COST_OVER_CUSTOMER_PROFIT
}
```

### Nivel del cliente

```typescript
type CustomerTier = 'sombra' | 'ritual' | 'nocturno' | 'eclipse'

function getCustomerTier(customerTotalSpent: number): CustomerTier {
  if (customerTotalSpent >= 300000) return 'eclipse'
  if (customerTotalSpent >= 150000) return 'nocturno'
  if (customerTotalSpent >= 50000) return 'ritual'
  return 'sombra'
}

function canTierAccessReward(params: {
  tier: CustomerTier
  requiredPoints: number
}): boolean {
  switch (params.tier) {
    case 'sombra':  return params.requiredPoints <= 80
    case 'ritual':  return params.requiredPoints <= 250
    case 'nocturno': return params.requiredPoints <= 500
    case 'eclipse': return true
  }
}
```

### Decisión final de canje

```typescript
function canRedeemReward(params: {
  customerPoints: number
  customerTotalSpent: number
  averageStoreMargin: number
  productSalePrice: number
  productCost: number
  stock: number
  rotation: RotationLevel
  monthlySales: number
  currentRewardCostUsed: number
}): {
  allowed: boolean
  reason: string
  requiredPoints: number
  rewardScore: number
  eligibility: RewardEligibility
  customerTier: CustomerTier
} {
  const marginPercentage = calculateMarginPercentage(
    params.productSalePrice, params.productCost,
  )
  const rewardScore = calculateRewardScore({
    salePrice: params.productSalePrice,
    productCost: params.productCost,
    stock: params.stock,
    rotation: params.rotation,
  })
  const eligibility = getRewardEligibility(rewardScore)
  const riskFactor = calculateRiskFactor({
    marginPercentage,
    stock: params.stock,
    rotation: params.rotation,
  })
  const requiredPoints = calculateRequiredPoints({
    productCost: params.productCost,
    riskFactor,
  })
  const customerTier = getCustomerTier(params.customerTotalSpent)

  if (eligibility === 'not_eligible') {
    return { allowed: false,
      reason: 'Este producto no es apto para rewards por margen, stock o rotación.',
      requiredPoints, rewardScore, eligibility, customerTier }
  }
  if (params.customerPoints < requiredPoints) {
    return { allowed: false, reason: 'El cliente no tiene suficientes puntos.',
      requiredPoints, rewardScore, eligibility, customerTier }
  }
  if (!canTierAccessReward({ tier: customerTier, requiredPoints })) {
    return { allowed: false,
      reason: 'El nivel del cliente aún no permite acceder a este reward.',
      requiredPoints, rewardScore, eligibility, customerTier }
  }
  if (!isRewardBudgetAvailable({
    monthlySales: params.monthlySales,
    currentRewardCostUsed: params.currentRewardCostUsed,
    rewardProductCost: params.productCost,
  })) {
    return { allowed: false,
      reason: 'El presupuesto mensual de rewards ya fue consumido.',
      requiredPoints, rewardScore, eligibility, customerTier }
  }
  if (!isRewardSafeForCustomer({
    customerTotalSpent: params.customerTotalSpent,
    averageStoreMargin: params.averageStoreMargin,
    rewardProductCost: params.productCost,
  })) {
    return { allowed: false,
      reason: 'El costo del reward es demasiado alto comparado con la utilidad generada por este cliente.',
      requiredPoints, rewardScore, eligibility, customerTier }
  }

  return { allowed: true,
    reason: 'Reward aprobado de forma financieramente segura.',
    requiredPoints, rewardScore, eligibility, customerTier }
}
```

---

## 13. Ejemplos Prácticos

### Caso 1: Producto apto ✅

**Producto:** Collar gótico
- Precio venta: ₡8,000
- Costo: ₡2,500
- Stock: 18
- Rotación: media

**Cliente:**
- Ha comprado: ₡75,000
- Tiene: 150 puntos
- Margen promedio tienda: 45%

**Resultado esperado:**
- Cliente nivel: **Ritual**
- Producto: probablemente apto
- Puntos requeridos: ~110 a 130
- Canje permitido si hay budget mensual disponible

### Caso 2: Producto peligroso ❌

**Producto:** Botas góticas
- Precio venta: ₡45,000
- Costo: ₡32,000
- Stock: 2
- Rotación: alta

**Resultado:**
- No apto para reward gratis
- Solo podría aplicar descuento parcial o acceso especial con compra mínima alta
- Margen muy bajo (28.9%), stock crítico, rotación alta → score bajo

---

## 14. Dashboard: Datos a Mostrar

El dashboard no dice solo "aprobado" o "rechazado". Muestra:

| Dato | Tipo | Tooltip |
|------|------|---------|
| Producto | Texto | - |
| Precio | ₡ | - |
| Costo | ₡ | - |
| Margen | ₡ / % | - |
| Stock | Número | - |
| Rotación | Baja / Media / Alta / Estrella | Leyenda: "Baja = se regala, Alta = se vende sola" |
| Reward Score | 0-100 | Tooltip: "Mide elegibilidad (margen 35%, stock 25%, rotación 20%, costo 20%)" |
| Puntos requeridos | Número | Tooltip: "Basado en costo × factor de riesgo / valor interno del punto" |
| Tipo de reward | Texto | Free / +Compra / Descuento / No apto |
| Riesgo financiero | Bajo / Medio / Alto | Tooltip: "Compara costo del reward vs utilidad generada por el cliente" |
| Budget mensual usado | ₡ | - |
| Budget mensual restante | ₡ | - |
| Clientes que pueden acceder | Número | - |

### Ejemplo visual

```
┌────────────────────────────────────────────────────────────┐
│ Collar Nocturno                                            │
│ ─────────────────────────────────────                      │
│ Reward Score:  82 / 100  ████████████████░░                │
│ Estado:        ✅ Apto para reward                         │
│ Puntos req:    120 pts                                     │
│ Costo tienda:  ₡2,500                                      │
│ Riesgo:        Bajo                                        │
│ Budget rest.:  ₡18,500 del mes                             │
│ Tipo:          Producto gratis                             │
└────────────────────────────────────────────────────────────┘
```

---

## 15. Regla Final del Sistema

Un cliente puede redimir un reward **solo si todas** estas condiciones se cumplen:

1. ✅ Tiene puntos suficientes
2. ✅ El producto tiene un rewardScore aceptable (≥ umbral según tipo)
3. ✅ El costo real del producto cabe dentro del presupuesto mensual de rewards
4. ✅ El reward no supera el 15% de la utilidad generada por ese cliente
5. ✅ El cliente pertenece al nivel correcto
6. ✅ El producto no está marcado como protegido, limitado o estrella
7. ✅ El stock no queda comprometido después del canje

---

## 16. Estrategia por Fases

No se empieza regalando ropa. Eso es peligroso.

### Fase 1 — Lanzamiento
Rewards solo con **accesorios pequeños** (collares, pins, parches).

### Fase 2 — Crecimiento
Accesorios premium con **compra mínima**.

### Fase 3 — Escalamiento
Ropa seleccionada solo para clientes nivel **Nocturno** o **Eclipse**.

### Fase 4 — Madurez
Experiencias, preventas, drops privados y descuentos exclusivos.

---

## 17. Historias de Usuario

### HU-01: Acumulación de puntos
> Como cliente, quiero ganar puntos por cada compra para sentir que mi lealtad tiene valor.
>
> **Criterios:**
> - 1 punto por cada ₡500 gastados
> - Los puntos se acreditan automáticamente al confirmar la orden
> - El cliente ve los puntos ganados en la pantalla de confirmación

### HU-02: Reward Score automático
> Como administradora, quiero que el sistema calcule automáticamente el rewardScore de cada producto para saber cuáles puedo ofrecer como reward sin riesgo.
>
> **Criterios:**
> - El score se calcula basado en margen (35%), stock (25%), rotación (20%) y costo (20%)
> - Productos con score ≥ 75 se marcan como "Apto"
> - Productos con score < 35 se marcan como "No apto"

### HU-03: Reward Budget
> Como administradora, quiero definir un presupuesto mensual para rewards para controlar cuánto le cuesta al negocio el programa de lealtad.
>
> **Criterios:**
> - Budget = ventas del mes × porcentaje configurable (default 3%)
> - El sistema bloquea rewards cuando se agota el budget
> - El dashboard muestra budget usado y restante

### HU-04: Niveles de cliente por gasto
> Como cliente, quiero subir de nivel según mi gasto total para acceder a mejores rewards.
>
> **Criterios:**
> - Sombra: ₡0 - ₡49,999
> - Ritual: ₡50,000 - ₡149,999
> - Nocturno: ₡150,000 - ₡299,999
> - Eclipse: ₡300,000+
> - Cada nivel desbloquea rewards de mayor valor

### HU-05: Canje con protección financiera
> Como sistema, debo validar 7 condiciones antes de aprobar un canje para garantizar que el reward es financieramente sostenible.
>
> **Criterios:**
> - Validar puntos suficientes
> - Validar rewardScore del producto
> - Validar budget mensual disponible
> - Validar que el costo del reward ≤ 15% de utilidad del cliente
> - Validar nivel del cliente
> - Validar que el producto no esté protegido
> - Validar stock suficiente

### HU-06: Expiración de puntos
> Como cliente, quiero saber cuándo expiran mis puntos para poder usarlos a tiempo.
>
> **Criterios:**
> - Los puntos expiran a los 180 días
> - FIFO: los más antiguos expiran primero
> - Notificación 15 días antes
> - Historial muestra fecha de expiración

### HU-07: Dashboard de rewards
> Como administradora, quiero ver en el dashboard el rewardScore, puntos requeridos, riesgo financiero y budget de cada producto para tomar decisiones informadas.
>
> **Criterios:**
> - Tabla con todos los productos evaluables
> - Score, estado, puntos requeridos, riesgo, budget
> - Tooltips con explicaciones de cada métrica
> - Filtrar por elegibilidad

### HU-08: Canje con compra mínima
> Como cliente, quiero canjear puntos por un descuento o producto que requiera una compra mínima para sentir que obtengo un beneficio real sin que la tienda pierda.
>
> **Criterios:**
> - Modal de canje muestra: "Canjeá {X} puntos y llevate esto gratis en compras mayores a ₡Y"
> - El código de descuento se genera al completar la compra
> - Válido por 30 días

### HU-09: Tipos de reward
> Como administradora, quiero configurar 4 tipos de reward (gratis, con compra, descuento parcial, upgrade) para adaptar el programa a diferentes productos y niveles de riesgo.
>
> **Criterios:**
> - Cada reward tiene un tipo
> - El sistema recomienda el tipo según rewardScore
> - El administrador puede sobreescribir manualmente

### HU-10: Factor de riesgo
> Como sistema, debo calcular un factor de riesgo por producto para ajustar los puntos necesarios y proteger el margen.
>
> **Criterios:**
> - Base: 1.0
> - +0.4 si margen < 45%
> - +0.3 si stock < 10
> - +0.4 si rotación alta
> - +0.8 si rotación estrella

### HU-11: Protección por margen por cliente
> Como sistema, debo verificar que el costo del reward no supere el 15% de la utilidad estimada que el cliente ha generado.
>
> **Criterios:**
> - Utilidad estimada = total gastado por cliente × margen promedio tienda
> - rewardCostRatio = costoReward / utilidadEstimada
> - Si > 15%, reward bloqueado
> - Si está entre 15% y 25%, permitido con compra mínima

### HU-12: Puntos redondeados en bloques de 10
> Como sistema, debo redondear los puntos requeridos hacia arriba en bloques de 10 para simplificar la lógica de canje.
>
> **Criterios:**
> - 86.6 → 90
> - 123.4 → 130
> - 257 → 260

### HU-13: Productos prohibidos automáticos
> Como administradora, quiero que el sistema marque automáticamente ciertos productos como no aptos para reward según reglas de negocio.
>
> **Criterios:**
> - Productos con margen < 35% → no aptos
> - Productos estrella → no aptos
> - Productos limitados → no aptos
> - Productos con stock < 5 → no aptos
> - El administrador puede forzar la inclusión con advertencia

### HU-14: Reward Score visible en admin
> Como administradora, quiero ver el desglose del rewardScore de cada producto (margen, stock, rotación, costo) para entender por qué un producto es o no apto.
>
> **Criterios:**
> - Tarjeta expandible por producto
> - Muestra: margenScore, stockScore, rotacionScore, costScore
> - Muestra ponderación final
> - Tooltip por cada score con su fórmula

### HU-15: Fase de lanzamiento controlada
> Como administradora, quiero lanzar el programa de rewards solo con accesorios pequeños en fase inicial para minimizar riesgo financiero.
>
> **Criterios:**
> - Filtro global "fase del programa" en el admin
> - Fase 1: solo accesorios pequeños
> - Fase 2: + accesorios premium con compra mínima
> - Fase 3: + ropa seleccionada solo para Nocturno/Eclipse
> - Fase 4: + experiencias y preventas

---

## Apéndice A: Data Model (DB)

```sql
-- Extension of existing products table for reward data
ALTER TABLE products ADD COLUMN IF NOT EXISTS product_cost NUMERIC(10,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rotation_level VARCHAR(20) DEFAULT 'media';
ALTER TABLE products ADD COLUMN IF NOT EXISTS reward_enabled BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS reward_max_redemptions_per_month INTEGER DEFAULT 10;
ALTER TABLE products ADD COLUMN IF NOT EXISTS reward_protected BOOLEAN DEFAULT false;

-- Monthly reward budget tracking
CREATE TABLE IF NOT EXISTS reward_budget (
  id SERIAL PRIMARY KEY,
  year_month VARCHAR(7) NOT NULL UNIQUE, -- '2026-06'
  monthly_sales NUMERIC(12,2) DEFAULT 0,
  budget_amount NUMERIC(12,2) DEFAULT 0,
  cost_used NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Customer tier history
CREATE TABLE IF NOT EXISTS customer_tiers (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  tier VARCHAR(20) NOT NULL,
  total_spent NUMERIC(12,2) NOT NULL,
  achieved_at TIMESTAMP DEFAULT NOW()
);

-- Points expiration tracking
ALTER TABLE points_history ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP;
ALTER TABLE points_history ADD COLUMN IF NOT EXISTS expired BOOLEAN DEFAULT false;
```

## Apéndice B: UI Patterns

### Tooltips técnicos (explicación on hover)

| Elemento | Tooltip |
|----------|---------|
| Reward Score | "Puntaje de elegibilidad. Pondera: margen (35%), stock (25%), rotación (20%), costo (20%). Mínimo 75 para reward gratis." |
| Puntos requeridos | "Calculado como (costo × factor riesgo) / valor interno del punto (₡30). Redondeado a bloques de 10." |
| Riesgo | "Compara el costo del reward contra la utilidad que este cliente ha generado. Máximo seguro: 15%." |
| Rotación: Baja | "Rotación baja = producto que no se vende solo. Ideal para reward porque mueve inventario." |
| Rotación: Estrella | "Producto estrella = se vende solo. No se regala porque no necesita incentivo." |
| Budget restante | "Presupuesto mensual = ventas del mes × 3%. Disponible para rewards hasta agotar." |

### Estados vacíos

- **Sin puntos:** "Todavía no ganaste puntos. Cada ₡500 de compra = 1 punto."
- **Sin rewards disponibles:** "No hay rewards disponibles para tu nivel. Seguí comprando para desbloquear más."
- **Sin canjes:** "Todavía no canjeaste ningún reward. Tus puntos te esperan."
- **Reward bloqueado por budget:** "Este reward no está disponible este mes. Volvé el próximo mes."
- **Reward bloqueado por nivel:** "Este reward requiere nivel {{tier}}. Gastá ₡{{faltante}} más para subir de nivel."

---

*Documento generado a partir de especificación financiera detallada. Junio 2026.*
