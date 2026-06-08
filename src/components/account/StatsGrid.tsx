import { useConfigStore } from '@/stores/configStore'
import type { Customer } from '@/types/customer'

interface StatsGridProps {
  customer: Customer | null
}

export default function StatsGrid({ customer }: StatsGridProps) {
  const currencySymbol = useConfigStore((s) => s.config.currencySymbol)

  if (!customer) return null

  return (
    <div className='account-stats'>
      <div className='stat-card'>
        <div className='stat-icon'>🛒</div>
        <div className='stat-val'>{customer.orders.length}</div>
        <div className='stat-label'>Órdenes</div>
      </div>
      <div className='stat-card'>
        <div className='stat-icon'>💰</div>
        <div className='stat-val'>
          {currencySymbol}
          {customer.totalSpent}
        </div>
        <div className='stat-label'>Gastado</div>
      </div>
      <div className='stat-card'>
        <div className='stat-icon'>⭐</div>
        <div className='stat-val'>{customer.points}</div>
        <div className='stat-label'>Puntos</div>
      </div>
      <div className='stat-card'>
        <div className='stat-icon'>📅</div>
        <div className='stat-val' style={{ fontSize: '16px' }}>
          {new Date(customer.joinedAt).toLocaleDateString('es')}
        </div>
        <div className='stat-label'>Member desde</div>
      </div>
    </div>
  )
}
