import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import type { RotationLevel } from '@/utils/rewardEngine'
import { canRedeemReward } from '@/utils/rewardEngine'
import { useLoyaltyDataStore } from './loyaltyDataStore'
import { useProductStore } from './productStore'

interface RedeemOptions {
  customerTotalSpent?: number
}

interface LoyaltyState {
  redeemedRewards: string[]
  loading: boolean
  error: string | null
  points: number | null
  tier: string | null

  redeemReward: (
    rewardId: string | number,
    customerPoints: number,
    options?: RedeemOptions,
  ) => { success: boolean; points: number; reason?: string }
  apiRedeemReward: (
    rewardId: string,
    customerPoints: number,
  ) => Promise<{ success: boolean; points: number }>
  fetchLoyalty: () => Promise<void>
  resetError: () => void
  getTier: (points: number) => {
    name: string
    discount: number
    nextTier?: { name: string; min: number }
  }
  getProgress: (points: number) => { percent: number; label: string }
}

export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      redeemedRewards: [],
      loading: false,
      error: null,
      points: null,
      tier: null,

      redeemReward: (rewardId, customerPoints, options) => {
        const rewardKey = String(rewardId)
        const rewards = useLoyaltyDataStore.getState().rewards
        const reward = rewards.find((r) => String(r.id) === rewardKey)
        if (!reward)
          return { success: false, points: customerPoints, reason: 'Reward no encontrado.' }
        if (customerPoints < reward.cost)
          return { success: false, points: customerPoints, reason: 'Puntos insuficientes.' }

        if (reward.type === 'product') {
          const product = useProductStore
            .getState()
            .items.find((p) => String(p.id) === String(reward.value))
          if (product) {
            const products = useProductStore.getState().items
            const _avgCost =
              products.reduce((s, p) => s + (p.costPrice ?? p.price * 0.5), 0) / products.length
            const avgMargin =
              products.reduce(
                (s, p) => s + (p.price - (p.costPrice ?? p.price * 0.5)) / p.price,
                0,
              ) / products.length
            const totalMonthlySales = products.reduce((s, p) => s + p.price * (p.stock ?? 10), 0)
            const currentRewardCostUsed = get().redeemedRewards.reduce<number>((sum, id) => {
              const r = rewards.find((rw) => String(rw.id) === String(id))
              return r ? sum + r.cost : sum
            }, 0)

            const stock = product.stock ?? 0
            const productCost = product.costPrice ?? product.price * 0.5
            const rotation: RotationLevel =
              product.badge === 'BESTSELLER'
                ? 'alta'
                : product.badge === 'EXCLUSIVO'
                  ? 'estrella'
                  : stock > 20
                    ? 'baja'
                    : stock > 10
                      ? 'media'
                      : stock > 5
                        ? 'alta'
                        : 'estrella'

            const engineResult = canRedeemReward({
              customerPoints,
              customerTotalSpent: options?.customerTotalSpent ?? customerPoints * 500,
              averageStoreMargin: avgMargin,
              productSalePrice: product.price,
              productCost,
              stock,
              rotation,
              monthlySales: totalMonthlySales,
              currentRewardCostUsed,
            })

            if (!engineResult.allowed) {
              return {
                success: false,
                points: customerPoints,
                reason: engineResult.reason,
              }
            }
          }
        }

        const { redeemedRewards } = get()
        set({ redeemedRewards: [...redeemedRewards, rewardKey] })
        return { success: true, points: customerPoints - reward.cost }
      },

      apiRedeemReward: async (rewardId, customerPoints) => {
        try {
          const res = await api.loyalty.redeem(rewardId)
          const localResult = get().redeemReward(rewardId, customerPoints)
          set({
            points:
              (res.redemption as { points_remaining?: number })?.points_remaining ??
              res.points_remaining,
            redeemedRewards: get().redeemedRewards,
          })
          return localResult
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Error al canjear' })
          return { success: false, points: customerPoints }
        }
      },

      fetchLoyalty: async () => {
        set({ loading: true, error: null })
        try {
          const res = await api.loyalty.get()
          const loyalty = res.loyalty as { points: number; tier: string }
          set({ points: loyalty.points, tier: loyalty.tier, loading: false })
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : 'Error al cargar lealtad',
          })
        }
      },

      resetError: () => set({ error: null }),

      getTier: (points) => {
        const TIERS = useLoyaltyDataStore.getState().tiers
        const sorted = [...TIERS].reverse()
        const current = sorted.find((t) => points >= t.min) ?? TIERS[0]
        const idx = TIERS.findIndex((t) => t.name === (current?.name ?? ''))
        const nextTier = TIERS[idx + 1]
        return {
          name: current?.name ?? 'MORTAL',
          discount: current?.discount ?? 0,
          nextTier: nextTier ? { name: nextTier.name, min: nextTier.min } : undefined,
        }
      },

      getProgress: (points) => {
        const TIERS = useLoyaltyDataStore.getState().tiers
        if (!TIERS || TIERS.length === 0) return { percent: 100, label: '' }
        const sorted = [...TIERS].reverse()
        const current = sorted.find((t) => points >= t.min) ?? TIERS[0]
        if (!current) return { percent: 0, label: '' }
        const idx = TIERS.findIndex((t) => t.name === current.name)
        const nextTier = TIERS[idx + 1]

        if (!nextTier) return { percent: 100, label: 'Nivel m\u00E1ximo' }

        const percent = Math.min(((points - current.min) / (nextTier.min - current.min)) * 100, 100)
        const label = `${points} / ${nextTier.min} pts para ${nextTier.name}`
        return { percent, label }
      },
    }),
    {
      name: 'nekoLoyalty',
      partialize: (state) => ({
        redeemedRewards: state.redeemedRewards,
        points: state.points,
        tier: state.tier,
      }),
    },
  ),
)
