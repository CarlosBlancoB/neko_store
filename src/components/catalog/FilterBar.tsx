import { useUIStore } from '@/stores/uiStore'
import type { Category } from '@/types/product'

const FILTERS: { label: string; value: Category | 'all' }[] = [
  { label: 'Todo', value: 'all' },
  { label: 'Vestidos', value: 'vestidos' },
  { label: 'Tops', value: 'tops' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Conjuntos', value: 'conjuntos' },
]

export default function FilterBar() {
  const activeFilter = useUIStore((s) => s.activeFilter)
  const setActiveFilter = useUIStore((s) => s.setActiveFilter)

  return (
    <div className='filter-bar'>
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
          onClick={() => setActiveFilter(f.value)}
          type='button'
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
