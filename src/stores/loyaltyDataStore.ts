import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { REWARDS as LOCAL_REWARDS } from '@/data/rewards'
import { TIERS as LOCAL_TIERS } from '@/data/tiers'
import { api } from '@/services/api'
import type { LoyaltyTier, Reward } from '@/types/loyalty'

interface LoyaltyDataState {
  tiers: LoyaltyTier[]
  rewards: Reward[]
  loading: boolean
  error: string | null
  lastFetched: number | null
  fetchLoyaltyData: () => Promise<void>
  getTierByPoints: (points: number) => LoyaltyTier
  getNextTier: (points: number) => LoyaltyTier | null
  getTierProgress: (points: number) => { percentage: number; label: string }
}

const TIER_DISCOUNTS: Record<string, number> = {
  MORTAL: 0.05,
  SOMBRA: 0.08,
  ECLIPSE: 0.12,
  'NEKO NOIR': 0.18,
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
    } catch {
      return []
    }
  }
  return []
}

function asNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function toTier(raw: unknown, index: number, allRows: unknown[]): LoyaltyTier {
  const row = raw as Record<string, unknown>
  const sorted = allRows as Record<string, unknown>[]
  const next = sorted[index + 1]
  const min = asNumber(row.min ?? row.min_points)
  return {
    id: row.id ? String(row.id) : undefined,
    name: String(row.name ?? 'MORTAL'),
    min,
    max: next ? asNumber(next.min ?? next.min_points) - 1 : Infinity,
    discount:
      row.discount == null ? (TIER_DISCOUNTS[String(row.name)] ?? 0) : asNumber(row.discount),
    color: row.color ? String(row.color) : undefined,
    description: row.description ? String(row.description) : undefined,
    benefits: asArray(row.benefits),
  }
}

function toReward(raw: unknown): Reward {
  const row = raw as Record<string, unknown>
  return {
    id: String(row.id),
    title: String(row.title ?? row.name ?? ''),
    description: row.description ? String(row.description) : undefined,
    icon: row.icon ? String(row.icon) : '*',
    cost: asNumber(row.cost ?? row.points_cost),
    type: 'discount',
    value: asNumber(row.value, 0),
    tierId: row.tier_id ? String(row.tier_id) : null,
  }
}

export const useLoyaltyDataStore = create<LoyaltyDataState>()(
  persist(
    (set, get) => ({
      tiers: LOCAL_TIERS,
      rewards: LOCAL_REWARDS,
      loading: false,
      error: null,
      lastFetched: null,

      fetchLoyaltyData: async () => {
        set({ loading: true, error: null })
        try {
          const res = await api.loyalty.get()
          const data = res.loyalty as { tiers?: unknown[]; rewards?: unknown[] }
          if (data.tiers && data.tiers.length > 0) {
            set({ tiers: data.tiers.map(toTier), lastFetched: Date.now() })
          }
          if (data.rewards && data.rewards.length > 0) {
            set({ rewards: data.rewards.map(toReward), lastFetched: Date.now() })
          }
          set({ loading: false })
        } catch {
          set({ loading: false, error: 'No se pudieron cargar datos de lealtad' })
        }
      },

      getTierByPoints: (points) => {
        const tiers = get().tiers
        for (const tier of tiers) {
          if (points >= tier.min && points <= tier.max) return tier
        }
        return tiers[0] ?? { name: 'MORTAL', min: 0, max: Infinity, discount: 0 }
      },

      getNextTier: (points) => {
        const tiers = get().tiers
        for (const tier of tiers) {
          if (points < tier.min) return tier
        }
        return null
      },

      getTierProgress: (points) => {
        const current = get().getTierByPoints(points)
        const next = get().getNextTier(points)
        if (!next) return { percentage: 100, label: 'Nivel máximo' }

        const range = next.min - current.min
        const progress = range > 0 ? ((points - current.min) / range) * 100 : 0
        const needed = next.min - points

        return {
          percentage: Math.min(100, Math.max(0, progress)),
          label: `Te faltan ${needed} pts para ${next.name}`,
        }
      },
    }),
    {
      name: 'nekoLoyaltyData',
      partialize: (state) => ({
        tiers: state.tiers,
        rewards: state.rewards,
        lastFetched: state.lastFetched,
      }),
    },
  ),
)
