import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import type { Category, Product } from '@/types/product'

interface ProductState {
  items: Product[]
  loading: boolean
  error: string | null
  lastFetched: number | null
  fetchProducts: (params?: { category?: string; search?: string }) => Promise<void>
  fetchAdminProducts: () => Promise<void>
  getByCategory: (category: string) => Product[]
  getFeatured: () => Product[]
  getById: (id: string | number) => Product | undefined
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function asNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function toProduct(raw: unknown): Product {
  const r = raw as Record<string, unknown>
  const images = asArray(r.images)
  const category = String(
    r.category_slug ?? r.category ?? r.category_id ?? 'accesorios',
  ) as Category
  return {
    id: String(r.id),
    name: String(r.name ?? ''),
    category,
    categoryId: String(r.category_id ?? category),
    price: asNumber(r.price),
    imgSeed: String(r.imgSeed ?? r.img_seed ?? images[0] ?? r.id ?? 'neko-product'),
    imageUrl: images[0],
    images,
    sizes: asArray(r.sizes),
    description: String(r.description ?? ''),
    badge: r.badge ? (String(r.badge) as Product['badge']) : undefined,
    isNew: Boolean(r.isNew ?? r.is_new ?? false),
    points: asNumber(r.points),
    featured: Boolean(r.featured ?? false),
    featuredSortOrder: asNumber(r.featuredSortOrder ?? r.featured_sort_order),
    stock: asNumber(r.stock),
    active: r.active == null ? true : Boolean(r.active),
    costPrice: asNumber(r.costPrice ?? r.cost_price),
    lowStockThreshold: asNumber(r.lowStockThreshold ?? r.low_stock_threshold, 5),
  }
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchProducts: async (params) => {
        set({ loading: true, error: null })
        try {
          const res = await api.products.list(params)
          const items = (res.products as Product[]).map(toProduct)
          set({ items, loading: false, lastFetched: Date.now() })
        } catch {
          set({ loading: false, error: 'No se pudieron cargar los productos desde el servidor' })
        }
      },

      fetchAdminProducts: async () => {
        set({ loading: true, error: null })
        try {
          const res = await api.admin.products.list()
          const items = (res.products as unknown[]).map(toProduct)
          set({ items, loading: false, lastFetched: Date.now() })
        } catch {
          set({ loading: false, error: 'No se pudo cargar el inventario desde el servidor' })
        }
      },

      getByCategory: (category) => {
        return get().items.filter((p) => p.category === category)
      },

      getFeatured: () => {
        return get().items.filter((p) => p.featured)
      },

      getById: (id) => {
        return get().items.find((p) => String(p.id) === String(id))
      },
    }),
    {
      name: 'nekoProducts',
      partialize: (state) => ({
        items: state.items,
        lastFetched: state.lastFetched,
      }),
    },
  ),
)
