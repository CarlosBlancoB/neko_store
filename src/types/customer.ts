import type { Order } from './order'

export interface NotificationSettings {
  order: boolean
  drop: boolean
  points: boolean
  rewards: boolean
  offers: boolean
}

export interface Customer {
  name: string
  phone: string
  points: number
  tier: string
  totalSpent: number
  isDemo?: boolean
  joinedAt: string
  notifSettings: NotificationSettings
  orders: Order[]
}
