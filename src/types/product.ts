export type Category = 'vestidos' | 'tops' | 'accesorios' | 'conjuntos'
export type BadgeType = 'DROP NUEVO' | 'LIMITADO' | 'BESTSELLER' | 'EXCLUSIVO' | 'NUEVO'

export interface Size {
  label: string
  value: string
}

export interface Product {
  id: number
  name: string
  category: Category
  price: number
  imgSeed: string
  imgSeedAlt?: string
  sizes: string[]
  description: string
  badge?: BadgeType
  isNew?: boolean
  points: number
  featured?: boolean
}
