import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Customer } from '@/types/customer'

interface AuthState {
  customers: Record<string, Customer>
  currentPhone: string | null
  login: (phone: string) => boolean
  logout: () => void
  register: (customer: Customer) => void
  updateCustomer: (phone: string, data: Partial<Customer>) => void
  getCurrentCustomer: () => Customer | null
  seedDemoAccount: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      customers: {},
      currentPhone: null,

      login: (phone) => {
        const { customers } = get()
        if (customers[phone]) {
          set({ currentPhone: phone })
          return true
        }
        return false
      },

      logout: () => set({ currentPhone: null }),

      register: (customer) => {
        set((state) => ({
          customers: { ...state.customers, [customer.phone]: customer },
          currentPhone: customer.phone,
        }))
      },

      updateCustomer: (phone, data) => {
        set((state) => {
          const existing = state.customers[phone]
          if (!existing) return state
          return {
            customers: {
              ...state.customers,
              [phone]: { ...existing, ...data },
            },
          }
        })
      },

      getCurrentCustomer: () => {
        const { customers, currentPhone } = get()
        if (!currentPhone) return null
        return customers[currentPhone] ?? null
      },

      seedDemoAccount: () => {
        const { customers } = get()
        const demoPhone = '24247171'
        if (customers[demoPhone]) return
        const demoCustomer: Customer = {
          name: 'Valentina Neko',
          phone: demoPhone,
          points: 1620,
          tier: 'ECLIPSE',
          totalSpent: 487,
          isDemo: true,
          joinedAt: new Date(Date.now() - 90 * 86400000).toISOString(),
          notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
          orders: [
            {
              id: 'NK-DEMO001',
              items: [
                {
                  product: {
                    id: 1,
                    name: 'Vestido Shadow Bloom',
                    category: 'vestidos' as const,
                    price: 89,
                    imgSeed: 'shadowbloom',
                    sizes: ['XS', 'S', 'M', 'L', 'XL'],
                    description: '',
                    points: 89,
                    featured: true,
                  },
                  quantity: 1,
                  size: 'M',
                },
                {
                  product: {
                    id: 4,
                    name: 'Collar Moon Phase',
                    category: 'accesorios' as const,
                    price: 28,
                    imgSeed: 'moonphase',
                    sizes: ['Único'],
                    description: '',
                    isNew: true,
                    points: 28,
                    featured: true,
                  },
                  quantity: 1,
                  size: 'Único',
                },
              ],
              total: 117,
              shipping: 0,
              shippingMethod: 'Recogida en tienda',
              address: 'San José, Costa Rica',
              notes: '',
              date: new Date(Date.now() - 60 * 86400000).toISOString(),
              pointsEarned: 117,
              status: 'confirmado',
            },
            {
              id: 'NK-DEMO002',
              items: [
                {
                  product: {
                    id: 2,
                    name: 'Corset Velvet Requiem',
                    category: 'tops' as const,
                    price: 65,
                    imgSeed: 'velvet99',
                    sizes: ['S', 'M', 'L'],
                    description: '',
                    badge: 'LIMITADO',
                    points: 65,
                    featured: true,
                  },
                  quantity: 1,
                  size: 'S',
                },
                {
                  product: {
                    id: 7,
                    name: 'Falda Eclipse',
                    category: 'conjuntos' as const,
                    price: 72,
                    imgSeed: 'eclipse77',
                    sizes: ['XS', 'S', 'M', 'L'],
                    description: '',
                    points: 72,
                  },
                  quantity: 1,
                  size: 'M',
                },
              ],
              total: 137,
              shipping: 5,
              shippingMethod: 'Envío estándar',
              address: 'Heredia, Costa Rica',
              notes: 'Empaque especial por favor',
              date: new Date(Date.now() - 30 * 86400000).toISOString(),
              pointsEarned: 130,
              status: 'confirmado',
            },
            {
              id: 'NK-DEMO003',
              items: [
                {
                  product: {
                    id: 10,
                    name: 'Vestido Coven',
                    category: 'vestidos' as const,
                    price: 135,
                    imgSeed: 'coven11',
                    sizes: ['S', 'M', 'L'],
                    description: '',
                    badge: 'BESTSELLER',
                    points: 135,
                  },
                  quantity: 1,
                  size: 'M',
                },
              ],
              total: 135,
              shipping: 0,
              shippingMethod: 'Recogida en tienda',
              address: '',
              notes: '',
              date: new Date(Date.now() - 5 * 86400000).toISOString(),
              pointsEarned: 135,
              status: 'pendiente',
            },
          ],
        }
        set((state) => ({
          customers: { ...state.customers, [demoPhone]: demoCustomer },
        }))
      },
    }),
    {
      name: 'nekoCustomers',
      partialize: (state) => ({
        customers: state.customers,
        currentPhone: state.currentPhone,
      }),
    },
  ),
)
