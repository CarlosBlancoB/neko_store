import { useLoyaltyDataStore } from '@/stores/loyaltyDataStore'
import RewardCard from './RewardCard'

export default function RewardsGrid() {
  const rewards = useLoyaltyDataStore((s) => s.rewards)
  const loading = useLoyaltyDataStore((s) => s.loading)
  const error = useLoyaltyDataStore((s) => s.error)

  if (loading) {
    return <div className='admin-panel-empty'>Cargando recompensas...</div>
  }

  if (error && rewards.length === 0) {
    return <div className='admin-error'>{error}</div>
  }

  return (
    <div className='rewards-section'>
      <h3>Recompensas Disponibles</h3>
      {rewards.length === 0 ? (
        <div className='admin-panel-empty'>
          No hay recompensas activas. El admin debe publicar recompensas desde la base de datos.
        </div>
      ) : (
        <div className='rewards-grid'>
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      )}
    </div>
  )
}
