import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import ProductCard from '@/components/catalog/ProductCard'
import { useConfigStore } from '@/stores/configStore'
import { useUIStore } from '@/stores/uiStore'
import type { Product } from '@/types/product'

const mockProduct: Product = {
  id: 99,
  name: 'Test Corset',
  category: 'tops',
  price: 65,
  imgSeed: 'velvet99',
  sizes: ['S', 'M', 'L'],
  description: 'Un corset de prueba.',
  badge: 'DROP NUEVO',
  points: 65,
}

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

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Corset')).toBeDefined()
  })

  it('renders price with currency symbol', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$65')).toBeDefined()
  })

  it('renders points', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('65 pts')).toBeDefined()
  })

  it('renders badge when present', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('DROP NUEVO')).toBeDefined()
  })

  it('renders category', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('tops')).toBeDefined()
  })

  it('opens modal on click', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} />)
    await user.click(screen.getByRole('button'))
    const state = useUIStore.getState()
    expect(state.isProductModalOpen).toBe(true)
    expect(state.activeProductId).toBe(99)
  })
})
