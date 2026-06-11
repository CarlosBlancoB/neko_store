import LoyaltyCard from '@/components/loyalty/LoyaltyCard'
import RewardsGrid from '@/components/loyalty/RewardsGrid'
import TierGrid from '@/components/loyalty/TierGrid'
import usePageMeta from '@/hooks/usePageMeta'

export default function LoyaltyPage() {
  usePageMeta({
    title: 'Recompensas',
    description:
      'Programa de lealtad Neko Store. Acumula puntos oscuros, sube de tier y canjea recompensas exclusivas.',
  })
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Programa de Lealtad</div>
        <h1 className='section-title'>Nekos Leales</h1>
        <p className='section-intro'>
          Ganas 1 punto por cada ₡500 de compra confirmada. Los puntos suben tu tier y se pueden
          canjear por descuentos, envio o recompensas activas.
        </p>
      </div>
      <LoyaltyCard />
      <TierGrid />
      <RewardsGrid />
    </div>
  )
}
