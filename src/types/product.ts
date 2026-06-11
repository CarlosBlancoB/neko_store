export type Category = 'vestidos' | 'tops' | 'accesorios' | 'conjuntos'
export type BadgeType = 'DROP NUEVO' | 'LIMITADO' | 'BESTSELLER' | 'EXCLUSIVO' | 'NUEVO'

export interface Size {
  label: string
  value: string
}

export interface Product {
  id: string | number
  name: string
  category: Category
  categoryId?: string
  price: number
  imgSeed: string
  imageUrl?: string
  images?: string[]
  imgSeedAlt?: string
  sizes: string[]
  description: string
  badge?: BadgeType
  isNew?: boolean
  points: number
  featured?: boolean
  featuredSortOrder?: number
  stock?: number
  active?: boolean
  costPrice?: number
  lowStockThreshold?: number
}
