import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Category } from '@/types/product'

interface UIState {
  isCartOpen: boolean
  isNotifOpen: boolean
  isProductModalOpen: boolean
  isCheckoutModalOpen: boolean
  activeSection: string
  activeFilter: Category | 'all'
  isDark: boolean
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleNotif: () => void
  openProductModal: () => void
  closeProductModal: () => void
  openCheckoutModal: () => void
  closeCheckoutModal: () => void
  setActiveSection: (section: string) => void
  setActiveFilter: (filter: Category | 'all') => void
  toggleTheme: () => void
  setTheme: (dark: boolean) => void
  closeAllModals: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isCartOpen: false,
      isNotifOpen: false,
      isProductModalOpen: false,
      isCheckoutModalOpen: false,
      activeSection: 'home',
      activeFilter: 'all',
      isDark: true,

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      toggleNotif: () => set((state) => ({ isNotifOpen: !state.isNotifOpen })),
      openProductModal: () => set({ isProductModalOpen: true }),
      closeProductModal: () => set({ isProductModalOpen: false }),
      openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
      closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),

      setActiveSection: (section) => set({ activeSection: section }),
      setActiveFilter: (filter) => set({ activeFilter: filter }),

      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (dark) => set({ isDark: dark }),

      closeAllModals: () =>
        set({
          isCartOpen: false,
          isNotifOpen: false,
          isProductModalOpen: false,
          isCheckoutModalOpen: false,
        }),
    }),
    {
      name: 'nekoTheme',
      partialize: (state) => ({ isDark: state.isDark }),
    },
  ),
)
