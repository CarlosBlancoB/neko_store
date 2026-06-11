import FilterBar from '@/components/catalog/FilterBar'
import ProductGrid from '@/components/catalog/ProductGrid'
import usePageMeta from '@/hooks/usePageMeta'

export default function CatalogPage() {
  usePageMeta({
    title: 'Catalogo',
    description:
      'Explora nuestra colección completa de moda gótica y alternativa. Vestidos, tops, accesorios y conjuntos oscuros en Costa Rica.',
  })
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Coleccion</div>
        <h1 className='section-title'>Catalogo</h1>
      </div>
      <FilterBar />
      <ProductGrid />
    </div>
  )
}
