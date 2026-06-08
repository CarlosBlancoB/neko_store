export interface LoyaltyTier {
  name: string
  min: number
  max: number
  discount: number
}

export interface Reward {
  id: number
  title: string
  icon: string
  cost: number
  type: 'discount' | 'shipping' | 'product'
  value: number
}
