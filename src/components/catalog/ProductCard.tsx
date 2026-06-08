import Badge from '@/components/shared/Badge'
import { useConfigStore } from '@/stores/configStore'
import { useUIStore } from '@/stores/uiStore'
import type { Product } from '@/types/product'
import { picsumUrl } from '@/utils/formatters'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)
  const openModal = useUIStore((s) => s.openProductModal)
  const setActiveSection = useUIStore((s) => s.setActiveSection)

  const handleClick = () => {
    setActiveSection('shop')
    openModal()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <button type='button' className='product-card' onClick={handleClick} onKeyDown={handleKeyDown}>
      <div className='product-card__img'>
        <img src={picsumUrl(product.imgSeed, 500, 667)} alt={product.name} loading='lazy' />
        {product.badge && <Badge type={product.badge} />}
        {product.isNew && <Badge type='new' />}
        <div className='product-card__overlay'>
          <span className='btn-primary'>Ver detalle</span>
        </div>
      </div>
      <div className='product-card__info'>
        <div className='product-card__category'>{product.category}</div>
        <div className='product-card__name'>{product.name}</div>
        <div className='product-card__bottom'>
          <span className='product-card__price'>
            {currencySymbol}
            {product.price}
          </span>
          <span className='product-card__pts'>{product.points} pts</span>
        </div>
      </div>
    </button>
  )
}
