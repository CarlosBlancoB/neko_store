import { useAuthStore } from '@/stores/authStore'
import { useLoyaltyStore } from '@/stores/loyaltyStore'
import { useNotificationStore } from '@/stores/notificationStore'
import type { Reward } from '@/types/loyalty'

interface RewardCardProps {
  reward: Reward
}

export default function RewardCard({ reward }: RewardCardProps) {
  const getCurrentCustomer = useAuthStore((s) => s.getCurrentCustomer)
  const redeemReward = useLoyaltyStore((s) => s.redeemReward)
  const pushNotif = useNotificationStore((s) => s.push)
  const customer = getCurrentCustomer()

  const canAfford = customer ? customer.points >= reward.cost : false
  const handleRedeem = () => {
    if (!customer) {
      pushNotif({
        icon: '⚠️',
        title: 'Inicia sesión',
        msg: 'Debes iniciar sesión para canjear recompensas',
        type: 'warning',
      })
      return
    }
    const result = redeemReward(reward.id, customer.points)
    if (result.success) {
      pushNotif({
        icon: '🖤',
        title: `Canjeaste: ${reward.title}`,
        msg: `Te quedan ${result.points} pts`,
        type: 'reward',
      })
    } else {
      pushNotif({
        icon: '⚠️',
        title: 'Puntos insuficientes',
        msg: `Necesitas ${reward.cost} pts para esta recompensa`,
        type: 'warning',
      })
    }
  }

  return (
    <div className={`reward-card ${!canAfford ? 'locked' : ''}`}>
      {!canAfford && <span className='reward-lock'>🔒</span>}
      <div className='reward-icon'>{reward.icon}</div>
      <div className='reward-title'>{reward.title}</div>
      <div className='reward-cost'>{reward.cost} pts</div>
      <button className='btn-primary' onClick={handleRedeem} disabled={!canAfford} type='button'>
        Canjear
      </button>
    </div>
  )
}
