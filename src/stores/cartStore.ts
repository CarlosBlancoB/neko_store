import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TIERS } from '@/data/tiers'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

interface CartState {
  items: CartItem[]
  shippingCost: number
  shippingMethod: string
  addItem: (product: Product, size: string, quantity?: number) => void
  removeItem: (index: number) => void
  updateQuantity: (index: number, delta: number) => void
  setShipping: (cost: number, method: string) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getDiscount: (customerPoints?: number) => number
  getTotal: (customerPoints?: number) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingCost: 0,
      shippingMethod: 'Recogida en tienda',

      addItem: (product, size, quantity = 1) => {
        const { items } = get()
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.size === size,
        )
        if (existingIndex >= 0) {
          const updated = items.map((item, idx) =>
            idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
          )
          set({ items: updated })
        } else {
          set({ items: [...items, { product, quantity, size }] })
        }
      },

      removeItem: (index) => {
        const items = [...get().items]
        items.splice(index, 1)
        set({ items })
      },

      updateQuantity: (index, delta) => {
        const items = [...get().items]
        const item = items[index]
        if (!item) return
        const newQty = item.quantity + delta
        if (newQty <= 0) {
          items.splice(index, 1)
        } else {
          items[index] = { ...item, quantity: newQty }
        }
        set({ items })
      },

      setShipping: (cost, method) => {
        set({ shippingCost: cost, shippingMethod: method })
      },

      clearCart: () => set({ items: [], shippingCost: 0, shippingMethod: 'Recogida en tienda' }),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      getDiscount: (customerPoints = 0) => {
        if (customerPoints <= 0) return 0
        const tier = [...TIERS].reverse().find((t) => customerPoints >= t.min)
        return tier?.discount ?? 0
      },
      getTotal: (customerPoints = 0) => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscount(customerPoints)
        return subtotal * (1 - discount) + get().shippingCost
      },
    }),
    {
      name: 'nekoCart',
      partialize: (state) => ({
        items: state.items,
        shippingCost: state.shippingCost,
        shippingMethod: state.shippingMethod,
      }),
    },
  ),
)
