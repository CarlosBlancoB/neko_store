import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import type { Customer } from '@/types/customer'
import type { Order } from '@/types/order'

interface AuthState {
  customers: Record<string, Customer>
  currentCustomer: Customer | null
  currentPhone: string | null
  token: string | null
  login: (phone: string) => boolean
  setApiSession: (token: string, user: unknown) => void
  fetchCurrentCustomer: () => Promise<void>
  apiLogin: (phone: string, password: string) => Promise<boolean>
  apiRegister: (name: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
  register: (customer: Customer) => void
  updateCustomer: (phone: string, data: Partial<Customer>) => void
  getCurrentCustomer: () => Customer | null
  seedDemoAccount: () => void
}

function mapOrder(order: Record<string, unknown>): Order {
  const items = Array.isArray(order.items) ? (order.items as Record<string, unknown>[]) : []
  return {
    id: String(order.id),
    items: items.map((item) => ({
      product: {
        id: String(item.product_id ?? item.id),
        name: String(item.name ?? 'Producto'),
        category: 'accesorios' as const,
        price: Number(item.unit_price ?? 0),
        imgSeed: String(item.image ?? item.product_id ?? 'neko-product'),
        imageUrl: typeof item.image === 'string' ? item.image : undefined,
        sizes: [],
        description: '',
        points: 0,
      },
      quantity: Number(item.quantity ?? 1),
      size: String(item.size ?? ''),
    })),
    total: Number(order.total ?? 0),
    shipping: Number(order.shipping_cost ?? 0),
    shippingMethod: String(order.shipping_method ?? ''),
    address: String(order.shipping_address ?? ''),
    notes: String(order.notes ?? ''),
    date: String(order.created_at ?? new Date().toISOString()),
    pointsEarned: Number(order.points_earned ?? 0),
    status:
      order.status === 'completed' || order.status === 'confirmed' ? 'confirmado' : 'pendiente',
  }
}

function mapCustomer(raw: unknown, orders: Order[] = []): Customer | null {
  const u = raw as {
    id?: string
    name?: string
    phone?: string
    points?: number
    tier?: string
    total_spent?: number
    totalSpent?: number
    created_at?: string
    joinedAt?: string
    email?: string
    address?: string
    role?: 'customer' | 'admin'
  }

  if (!u.phone) return null

  return {
    id: u.id,
    name: u.name ?? '',
    phone: u.phone,
    email: u.email,
    address: u.address,
    points: Number(u.points ?? 0),
    tier: u.tier ?? 'MORTAL',
    role: u.role ?? 'customer',
    totalSpent: Number(u.totalSpent ?? u.total_spent ?? 0),
    joinedAt: u.joinedAt ?? u.created_at ?? new Date().toISOString(),
    notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
    orders,
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      customers: {},
      currentCustomer: null,
      currentPhone: null,
      token: null,

      login: () => false,

      setApiSession: (token, user) => {
        const customer = mapCustomer(user)
        if (!customer) return
        set({
          token,
          currentPhone: customer.phone,
          currentCustomer: customer,
        })
      },

      fetchCurrentCustomer: async () => {
        const { token } = get()
        if (!token) return

        const [profile, ordersRes] = await Promise.all([api.customers.me(), api.orders.list()])
        const orders = (ordersRes.orders as Record<string, unknown>[]).map(mapOrder)
        const customer = mapCustomer(profile.customer, orders)
        if (!customer) {
          set({ currentCustomer: null, currentPhone: null, token: null })
          return
        }

        set({ currentPhone: customer.phone, currentCustomer: customer })
      },

      apiLogin: async (phone, password) => {
        try {
          const res = await api.auth.login(phone, password)
          if (!res.token) return false
          const customer = mapCustomer(res.user)
          if (!customer) return false
          set({ token: res.token, currentPhone: customer.phone, currentCustomer: customer })
          return true
        } catch {
          return false
        }
      },

      apiRegister: async (name, phone, password) => {
        try {
          const res = await api.auth.register(name, phone, password)
          const customer = mapCustomer(res.user)
          if (!customer) return false
          set({ token: res.token, currentPhone: customer.phone, currentCustomer: customer })
          return true
        } catch {
          return false
        }
      },

      logout: () => set({ currentCustomer: null, currentPhone: null, token: null }),

      register: () => {},

      updateCustomer: () => {},

      getCurrentCustomer: () => get().currentCustomer,

      seedDemoAccount: () => {},
    }),
    {
      name: 'nekoCustomers',
      partialize: (state) => ({
        currentCustomer: state.currentCustomer,
        currentPhone: state.currentPhone,
        token: state.token,
      }),
    },
  ),
)
