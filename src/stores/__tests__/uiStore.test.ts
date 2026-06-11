import { beforeEach, describe, expect, it } from 'vitest'
import { useUIStore } from '@/stores/uiStore'

describe('useUIStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      isCartOpen: false,
      isNotifOpen: false,
      isProductModalOpen: false,
      isCheckoutModalOpen: false,
      activeSection: 'home',
      activeFilter: 'all',
      activeProductId: null,
      isDark: true,
    })
  })

  it('comienza con dark theme', () => {
    expect(useUIStore.getState().isDark).toBe(true)
  })

  it('toggleTheme alterna dark/light', () => {
    useUIStore.getState().toggleTheme()
    expect(useUIStore.getState().isDark).toBe(false)
    useUIStore.getState().toggleTheme()
    expect(useUIStore.getState().isDark).toBe(true)
  })

  it('setTheme fija el tema', () => {
    useUIStore.getState().setTheme(false)
    expect(useUIStore.getState().isDark).toBe(false)
    useUIStore.getState().setTheme(true)
    expect(useUIStore.getState().isDark).toBe(true)
  })

  it('toggleCart abre/cierra carrito', () => {
    expect(useUIStore.getState().isCartOpen).toBe(false)
    useUIStore.getState().toggleCart()
    expect(useUIStore.getState().isCartOpen).toBe(true)
    useUIStore.getState().toggleCart()
    expect(useUIStore.getState().isCartOpen).toBe(false)
  })

  it('openCart / closeCart', () => {
    useUIStore.getState().openCart()
    expect(useUIStore.getState().isCartOpen).toBe(true)
    useUIStore.getState().closeCart()
    expect(useUIStore.getState().isCartOpen).toBe(false)
  })

  it('toggleNotif', () => {
    useUIStore.getState().toggleNotif()
    expect(useUIStore.getState().isNotifOpen).toBe(true)
    useUIStore.getState().toggleNotif()
    expect(useUIStore.getState().isNotifOpen).toBe(false)
  })

  it('openProductModal / closeProductModal', () => {
    useUIStore.getState().selectProduct(1)
    useUIStore.getState().openProductModal()
    expect(useUIStore.getState().isProductModalOpen).toBe(true)
    expect(useUIStore.getState().activeProductId).toBe(1)
    useUIStore.getState().closeProductModal()
    expect(useUIStore.getState().isProductModalOpen).toBe(false)
    expect(useUIStore.getState().activeProductId).toBeNull()
  })

  it('openCheckoutModal / closeCheckoutModal', () => {
    useUIStore.getState().openCheckoutModal()
    expect(useUIStore.getState().isCheckoutModalOpen).toBe(true)
    useUIStore.getState().closeCheckoutModal()
    expect(useUIStore.getState().isCheckoutModalOpen).toBe(false)
  })

  it('closeAllModals cierra todo', () => {
    useUIStore.getState().openCart()
    useUIStore.getState().toggleNotif()
    useUIStore.getState().openProductModal()
    useUIStore.getState().closeAllModals()
    expect(useUIStore.getState().isCartOpen).toBe(false)
    expect(useUIStore.getState().isNotifOpen).toBe(false)
    expect(useUIStore.getState().isProductModalOpen).toBe(false)
    expect(useUIStore.getState().isCheckoutModalOpen).toBe(false)
  })

  it('setActiveSection', () => {
    useUIStore.getState().setActiveSection('loyalty')
    expect(useUIStore.getState().activeSection).toBe('loyalty')
  })

  it('setActiveFilter', () => {
    useUIStore.getState().setActiveFilter('vestidos')
    expect(useUIStore.getState().activeFilter).toBe('vestidos')
    useUIStore.getState().setActiveFilter('all')
    expect(useUIStore.getState().activeFilter).toBe('all')
  })
})
