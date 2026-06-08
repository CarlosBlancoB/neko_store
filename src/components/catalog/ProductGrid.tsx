import { PRODUCTS } from '@/data/products'
import { useUIStore } from '@/stores/uiStore'
import ProductCard from './ProductCard'

interface ProductGridProps {
  featured?: boolean
}

export default function ProductGrid({ featured = false }: ProductGridProps) {
  const activeFilter = useUIStore((s) => s.activeFilter)

  const filtered = PRODUCTS.filter((p) => {
    if (featured && !p.featured) return false
    if (activeFilter !== 'all' && p.category !== activeFilter) return false
    return true
  })

  if (filtered.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
        No encontramos productos en esta categoría.
      </div>
    )
  }

  return (
    <div className='products-grid'>
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
