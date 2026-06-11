export interface LoyaltyTier {
  id?: string
  name: string
  min: number
  max: number
  discount: number
  color?: string
  description?: string
  benefits?: string[]
}

export interface Reward {
  id: string | number
  title: string
  description?: string
  icon: string
  cost: number
  type: 'discount' | 'shipping' | 'product'
  value: number | string
  tierId?: string | null
}
