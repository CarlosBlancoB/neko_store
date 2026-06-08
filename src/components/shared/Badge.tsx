import type { BadgeType } from '@/types/product'

interface BadgeProps {
  type: BadgeType | 'new'
}

export default function Badge({ type }: BadgeProps) {
  if (type === 'new') {
    return <span className='product-card__badge product-card__badge--new'>NUEVO</span>
  }
  return <span className='product-card__badge'>{type}</span>
}
