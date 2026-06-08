import type { CartItem } from './cart'

export type OrderStatus = 'pendiente' | 'confirmado'

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shipping: number
  shippingMethod: string
  address: string
  notes: string
  date: string
  pointsEarned: number
  status: OrderStatus
}
