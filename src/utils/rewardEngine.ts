export const POINTS_PER_COLONES = 500
export const REWARD_POINT_INTERNAL_VALUE = 30
export const MAX_REWARD_BUDGET_PERCENTAGE = 0.03
export const MAX_REWARD_COST_OVER_CUSTOMER_PROFIT = 0.15
export const POINT_EXPIRATION_DAYS = 180

export type RotationLevel = 'baja' | 'media' | 'alta' | 'estrella'
export type RewardEligibility =
  | 'free_reward'
  | 'reward_with_minimum_purchase'
  | 'partial_discount_only'
  | 'not_eligible'

export interface RewardScoreParams {
  salePrice: number
  productCost: number
  stock: number
  rotation: RotationLevel
}

export interface RiskFactorParams {
  marginPercentage: number
  stock: number
  rotation: RotationLevel
}

export interface RequiredPointsParams {
  productCost: number
  riskFactor: number
}

export interface BudgetCheckParams {
  monthlySales: number
  currentRewardCostUsed: number
  rewardProductCost: number
}

export interface CustomerProfitCheckParams {
  customerTotalSpent: number
  averageStoreMargin: number
  rewardProductCost: number
}

export interface TierAccessParams {
  tier: CustomerTier
  requiredPoints: number
}

export interface CanRedeemParams {
  customerPoints: number
  customerTotalSpent: number
  averageStoreMargin: number
  productSalePrice: number
  productCost: number
  stock: number
  rotation: RotationLevel
  monthlySales: number
  currentRewardCostUsed: number
}

export interface CanRedeemResult {
  allowed: boolean
  reason: string
  requiredPoints: number
  rewardScore: number
  eligibility: RewardEligibility
  customerTier: CustomerTier
}

export type CustomerTier = 'sombra' | 'ritual' | 'nocturno' | 'eclipse'

export function calculateEarnedPoints(orderTotal: number): number {
  return Math.floor(orderTotal / POINTS_PER_COLONES)
}

export function calculateGrossMargin(salePrice: number, productCost: number): number {
  return salePrice - productCost
}

export function calculateMarginPercentage(salePrice: number, productCost: number): number {
  if (salePrice <= 0) return 0
  return (salePrice - productCost) / salePrice
}

export function getMarginScore(marginPercentage: number): number {
  if (marginPercentage >= 0.6) return 100
  if (marginPercentage >= 0.45) return 80
  if (marginPercentage >= 0.35) return 50
  return 0
}

export function getStockScore(stock: number): number {
  if (stock >= 20) return 100
  if (stock >= 10) return 70
  if (stock >= 5) return 20
  return 0
}

export function getRotationScore(rotation: RotationLevel): number {
  switch (rotation) {
    case 'baja':
      return 100
    case 'media':
      return 70
    case 'alta':
      return 20
    case 'estrella':
      return 0
  }
}

export function getCostScore(productCost: number): number {
  if (productCost <= 2000) return 100
  if (productCost <= 5000) return 70
  if (productCost <= 10000) return 30
  return 0
}

export function calculateRewardScore(params: RewardScoreParams): number {
  const marginPercentage = calculateMarginPercentage(params.salePrice, params.productCost)
  return (
    getMarginScore(marginPercentage) * 0.35 +
    getStockScore(params.stock) * 0.25 +
    getRotationScore(params.rotation) * 0.2 +
    getCostScore(params.productCost) * 0.2
  )
}

export function getRewardEligibility(rewardScore: number): RewardEligibility {
  if (rewardScore >= 75) return 'free_reward'
  if (rewardScore >= 55) return 'reward_with_minimum_purchase'
  if (rewardScore >= 35) return 'partial_discount_only'
  return 'not_eligible'
}

export function calculateRequiredPoints(params: RequiredPointsParams): number {
  const rawPoints = (params.productCost / REWARD_POINT_INTERNAL_VALUE) * params.riskFactor
  return Math.ceil(rawPoints / 10) * 10
}

export function calculateRiskFactor(params: RiskFactorParams): number {
  let riskFactor = 1
  if (params.marginPercentage < 0.45) riskFactor += 0.4
  if (params.stock < 10) riskFactor += 0.3
  if (params.rotation === 'alta') riskFactor += 0.4
  if (params.rotation === 'estrella') riskFactor += 0.8
  return riskFactor
}

export function calculateMonthlyRewardBudget(monthlySales: number): number {
  return monthlySales * MAX_REWARD_BUDGET_PERCENTAGE
}

export function isRewardBudgetAvailable(params: BudgetCheckParams): boolean {
  const monthlyRewardBudget = calculateMonthlyRewardBudget(params.monthlySales)
  return params.currentRewardCostUsed + params.rewardProductCost <= monthlyRewardBudget
}

export function calculateEstimatedCustomerProfit(params: {
  customerTotalSpent: number
  averageStoreMargin: number
}): number {
  return params.customerTotalSpent * params.averageStoreMargin
}

export function isRewardSafeForCustomer(params: CustomerProfitCheckParams): boolean {
  const estimatedProfit = calculateEstimatedCustomerProfit({
    customerTotalSpent: params.customerTotalSpent,
    averageStoreMargin: params.averageStoreMargin,
  })
  if (estimatedProfit <= 0) return false
  const rewardCostRatio = params.rewardProductCost / estimatedProfit
  return rewardCostRatio <= MAX_REWARD_COST_OVER_CUSTOMER_PROFIT
}

export function getCustomerTier(customerTotalSpent: number): CustomerTier {
  if (customerTotalSpent >= 300000) return 'eclipse'
  if (customerTotalSpent >= 150000) return 'nocturno'
  if (customerTotalSpent >= 50000) return 'ritual'
  return 'sombra'
}

export function canTierAccessReward(params: TierAccessParams): boolean {
  switch (params.tier) {
    case 'sombra':
      return params.requiredPoints <= 80
    case 'ritual':
      return params.requiredPoints <= 250
    case 'nocturno':
      return params.requiredPoints <= 500
    case 'eclipse':
      return true
  }
}

export function canRedeemReward(params: CanRedeemParams): CanRedeemResult {
  const marginPercentage = calculateMarginPercentage(params.productSalePrice, params.productCost)
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
    return {
      allowed: false,
      reason: 'Este producto no es apto para rewards por margen, stock o rotación.',
      requiredPoints,
      rewardScore,
      eligibility,
      customerTier,
    }
  }
  if (params.customerPoints < requiredPoints) {
    return {
      allowed: false,
      reason: 'El cliente no tiene suficientes puntos.',
      requiredPoints,
      rewardScore,
      eligibility,
      customerTier,
    }
  }
  if (!canTierAccessReward({ tier: customerTier, requiredPoints })) {
    return {
      allowed: false,
      reason: 'El nivel del cliente aún no permite acceder a este reward.',
      requiredPoints,
      rewardScore,
      eligibility,
      customerTier,
    }
  }
  if (
    !isRewardBudgetAvailable({
      monthlySales: params.monthlySales,
      currentRewardCostUsed: params.currentRewardCostUsed,
      rewardProductCost: params.productCost,
    })
  ) {
    return {
      allowed: false,
      reason: 'El presupuesto mensual de rewards ya fue consumido.',
      requiredPoints,
      rewardScore,
      eligibility,
      customerTier,
    }
  }
  if (
    !isRewardSafeForCustomer({
      customerTotalSpent: params.customerTotalSpent,
      averageStoreMargin: params.averageStoreMargin,
      rewardProductCost: params.productCost,
    })
  ) {
    return {
      allowed: false,
      reason:
        'El costo del reward es demasiado alto comparado con la utilidad generada por este cliente.',
      requiredPoints,
      rewardScore,
      eligibility,
      customerTier,
    }
  }

  return {
    allowed: true,
    reason: 'Reward aprobado de forma financieramente segura.',
    requiredPoints,
    rewardScore,
    eligibility,
    customerTier,
  }
}
