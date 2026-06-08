import type { LoyaltyTier } from '@/types/loyalty'

export const TIERS: LoyaltyTier[] = [
  { name: 'MORTAL', min: 0, max: 499, discount: 0.05 },
  { name: 'SOMBRA', min: 500, max: 1499, discount: 0.08 },
  { name: 'ECLIPSE', min: 1500, max: 3999, discount: 0.12 },
  { name: 'NEKO NOIR', min: 4000, max: Infinity, discount: 0.18 },
]
