import FilterBar from '@/components/catalog/FilterBar'
import ProductGrid from '@/components/catalog/ProductGrid'

export default function CatalogPage() {
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Colección</div>
        <h1 className='section-title'>Catálogo</h1>
      </div>
      <FilterBar />
      <ProductGrid />
    </div>
  )
}
