import { REWARDS } from '@/data/rewards'
import RewardCard from './RewardCard'

export default function RewardsGrid() {
  return (
    <div className='rewards-section'>
      <h3>Recompensas Disponibles</h3>
      <div className='rewards-grid'>
        {REWARDS.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  )
}
