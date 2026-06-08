import { useAuthStore } from '@/stores/authStore'
import { useLoyaltyStore } from '@/stores/loyaltyStore'
import ProgressBar from './ProgressBar'

export default function LoyaltyCard() {
  const customer = useAuthStore((s) => s.getCurrentCustomer())
  const getTier = useLoyaltyStore((s) => s.getTier)
  const getProgress = useLoyaltyStore((s) => s.getProgress)

  if (!customer) {
    return (
      <div className='loyalty-card' style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Inicia sesión para ver tu progreso de lealtad.
        </p>
      </div>
    )
  }

  const tier = getTier(customer.points)
  const progress = getProgress(customer.points)

  return (
    <div className='loyalty-card'>
      <div className='loyalty-card__header'>
        <div>
          <div className='loyalty-tier-badge'>{tier.name}</div>
        </div>
        <div className='loyalty-card__points'>
          <span>{customer.points}</span>
          <small>PUNTOS OSCUROS</small>
        </div>
      </div>
      <ProgressBar percent={progress.percent} label={progress.label} />
      <div className='loyalty-card__phone'>
        {customer.phone
          ? `Asociado a +506 ${customer.phone.slice(0, 4)}-${customer.phone.slice(4)}`
          : ''}
      </div>
    </div>
  )
}
