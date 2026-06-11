import type { Order } from './order'

export interface NotificationSettings {
  order: boolean
  drop: boolean
  points: boolean
  rewards: boolean
  offers: boolean
}

export interface Customer {
  id?: string
  name: string
  phone: string
  email?: string
  address?: string
  points: number
  tier: string
  role?: 'customer' | 'admin'
  totalSpent: number
  isDemo?: boolean
  joinedAt: string
  notifSettings: NotificationSettings
  orders: Order[]
}
