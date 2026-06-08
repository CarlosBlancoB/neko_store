import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { REWARDS } from '@/data/rewards'
import { TIERS } from '@/data/tiers'

interface LoyaltyState {
  redeemedRewards: number[]
  redeemReward: (rewardId: number, customerPoints: number) => { success: boolean; points: number }
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

      redeemReward: (rewardId, customerPoints) => {
        const reward = REWARDS.find((r) => r.id === rewardId)
        if (!reward || customerPoints < reward.cost)
          return { success: false, points: customerPoints }

        const { redeemedRewards } = get()
        set({ redeemedRewards: [...redeemedRewards, rewardId] })
        return { success: true, points: customerPoints - reward.cost }
      },

      getTier: (points) => {
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
        if (!TIERS || TIERS.length === 0) return { percent: 100, label: '' }
        const sorted = [...TIERS].reverse()
        const current = sorted.find((t) => points >= t.min) ?? TIERS[0]
        if (!current) return { percent: 0, label: '' }
        const idx = TIERS.findIndex((t) => t.name === current.name)
        const nextTier = TIERS[idx + 1]

        if (!nextTier) return { percent: 100, label: '🖤 Nivel máximo — NEKO NOIR' }

        const percent = Math.min(((points - current.min) / (nextTier.min - current.min)) * 100, 100)
        const label = `${points} / ${nextTier.min} pts para ${nextTier.name}`
        return { percent, label }
      },
    }),
    {
      name: 'nekoLoyalty',
      partialize: (state) => ({
        redeemedRewards: state.redeemedRewards,
      }),
    },
  ),
)
