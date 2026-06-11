import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import CartSidebar from '@/components/layout/CartSidebar'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useConfigStore } from '@/stores/configStore'
import { useUIStore } from '@/stores/uiStore'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  name: 'Vestido Test',
  category: 'vestidos',
  price: 89,
  imgSeed: 'shadowbloom',
  sizes: ['S', 'M', 'L'],
  description: 'Test description',
  points: 89,
}

const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: 1,
  size: 'M',
}

beforeEach(() => {
  useCartStore.setState({
    items: [],
    shippingCost: 0,
    shippingMethod: 'Recogida en tienda',
  })
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
  useAuthStore.setState({
    customers: {},
    currentPhone: null,
  })
  useConfigStore.setState({
    config: {
      whatsappNumber: '50688887777',
      storeEmail: 'test@nekostore.cr',
      instagramHandle: '@neko',
      intlShippingEnabled: false,
      intlContactEmail: 'hello@nekostore.cr',
      storeName: 'NEKO STORE',
      storeTagline: 'test',
      currencySymbol: '$',
      dropActive: true,
      dropTitle: 'DROP',
    },
  })
})

describe('CartSidebar', () => {
  it('shows empty state when no items', () => {
    render(<CartSidebar />)
    expect(screen.getByText('El vacío aguarda...')).toBeDefined()
  })

  it('renders cart items', () => {
    useCartStore.setState({ items: [mockCartItem] })
    render(<CartSidebar />)
    expect(screen.getByText('Vestido Test')).toBeDefined()
  })

  it('shows item price', () => {
    useCartStore.setState({ items: [mockCartItem] })
    render(<CartSidebar />)
    expect(screen.getByText('$89')).toBeDefined()
  })

  it('renders shipping options', () => {
    useCartStore.setState({ items: [mockCartItem] })
    render(<CartSidebar />)
    expect(screen.getByText((c) => c.includes('Recogida'))).toBeDefined()
    expect(screen.getByText((c) => c.includes('Estándar'))).toBeDefined()
    expect(screen.getByText((c) => c.includes('Express'))).toBeDefined()
  })

  it('shows checkout button when items exist', () => {
    useCartStore.setState({ items: [mockCartItem] })
    render(<CartSidebar />)
    expect(screen.getByText('Reservar pedido')).toBeDefined()
  })

  it('updates quantity via buttons', async () => {
    useCartStore.setState({ items: [mockCartItem] })
    const user = userEvent.setup()
    render(<CartSidebar />)
    const buttons = screen.getAllByRole('button')
    const plusBtn = buttons.find((b) => b.textContent === '+')
    expect(plusBtn).toBeDefined()
    await user.click(plusBtn as HTMLElement)
    const state = useCartStore.getState()
    expect(state.items[0]?.quantity).toBe(2)
  })

  it('removes item via remove button', async () => {
    useCartStore.setState({ items: [mockCartItem] })
    const user = userEvent.setup()
    render(<CartSidebar />)
    const buttons = screen.getAllByRole('button')
    const closeBtn = buttons.find(
      (b) => b.textContent === '✕' && b.classList.contains('cart-item__remove'),
    )
    expect(closeBtn).toBeDefined()
    await user.click(closeBtn as HTMLElement)
    const state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
  })
})
