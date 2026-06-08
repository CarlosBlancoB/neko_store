import LoyaltyCard from '@/components/loyalty/LoyaltyCard'
import RewardsGrid from '@/components/loyalty/RewardsGrid'
import TierGrid from '@/components/loyalty/TierGrid'

export default function LoyaltyPage() {
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Programa de Lealtad</div>
        <h1 className='section-title'>Nekos Leales</h1>
      </div>
      <LoyaltyCard />
      <TierGrid />
      <RewardsGrid />
    </div>
  )
}
