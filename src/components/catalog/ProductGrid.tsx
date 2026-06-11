import { useProductStore } from '@/stores/productStore'
import { useUIStore } from '@/stores/uiStore'
import ProductCard from './ProductCard'

interface ProductGridProps {
  featured?: boolean
}

const FEATURED_SKELETON_IDS = ['featured-1', 'featured-2', 'featured-3', 'featured-4']
const CATALOG_SKELETON_IDS = [
  'catalog-1',
  'catalog-2',
  'catalog-3',
  'catalog-4',
  'catalog-5',
  'catalog-6',
  'catalog-7',
  'catalog-8',
]

export default function ProductGrid({ featured = false }: ProductGridProps) {
  const activeFilter = useUIStore((s) => s.activeFilter)
  const products = useProductStore((s) => s.items)
  const loading = useProductStore((s) => s.loading)

  const featuredProducts = products
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredSortOrder ?? 0) - (b.featuredSortOrder ?? 0))
  const filtered = featured
    ? featuredProducts.length > 0
      ? featuredProducts
      : products.slice(0, 4)
    : products.filter((p) => {
        if (activeFilter !== 'all' && p.category !== activeFilter) return false
        return true
      })

  if (loading && products.length === 0) {
    const skeletonIds = featured ? FEATURED_SKELETON_IDS : CATALOG_SKELETON_IDS
    return (
      <ul className='products-grid' aria-label='Cargando catalogo'>
        {skeletonIds.map((id) => (
          <li key={id} className='products-grid__item'>
            <div className='product-card product-card--skeleton'>
              <div className='product-card__img product-card__img--skeleton' />
              <div className='product-card__info'>
                <div className='skeleton-line skeleton-line--short' />
                <div className='skeleton-line' />
                <div className='skeleton-line skeleton-line--price' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className='products-empty'>
        {featured
          ? 'El catalogo se esta cargando. Volve a intentarlo en un momento.'
          : 'No encontramos productos en esta categoria.'}
      </div>
    )
  }

  return (
    <ul className='products-grid' aria-label='Catálogo de productos'>
      {filtered.map((product) => (
        <li key={product.id} className='products-grid__item'>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
