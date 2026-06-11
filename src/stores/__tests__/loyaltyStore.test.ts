import { beforeEach, describe, expect, it } from 'vitest'
import { useLoyaltyStore } from '@/stores/loyaltyStore'

describe('useLoyaltyStore', () => {
  beforeEach(() => {
    useLoyaltyStore.setState({
      redeemedRewards: [],
    })
  })

  it('getTier devuelve MORTAL con discount 0.05', () => {
    const tier = useLoyaltyStore.getState().getTier(0)
    expect(tier.name).toBe('MORTAL')
    expect(tier.discount).toBe(0.05)
  })

  it('getTier devuelve SOMBRA para 500-1499', () => {
    const tier = useLoyaltyStore.getState().getTier(1000)
    expect(tier.name).toBe('SOMBRA')
    expect(tier.discount).toBe(0.08)
  })

  it('getTier devuelve ECLIPSE para 1500-3999', () => {
    const tier = useLoyaltyStore.getState().getTier(3000)
    expect(tier.name).toBe('ECLIPSE')
    expect(tier.discount).toBe(0.12)
  })

  it('getTier devuelve NEKO NOIR para 4000+', () => {
    const tier = useLoyaltyStore.getState().getTier(10000)
    expect(tier.name).toBe('NEKO NOIR')
    expect(tier.discount).toBe(0.18)
  })

  it('getTier devuelve nextTier si no es el máximo', () => {
    const tier = useLoyaltyStore.getState().getTier(100)
    expect(tier.nextTier).toBeDefined()
    expect(tier.nextTier?.name).toBe('SOMBRA')
  })

  it('getTier no devuelve nextTier si es el máximo', () => {
    const tier = useLoyaltyStore.getState().getTier(5000)
    expect(tier.nextTier).toBeUndefined()
  })

  it('getProgress calcula porcentaje al siguiente tier', () => {
    const progress = useLoyaltyStore.getState().getProgress(250)
    expect(progress.percent).toBeGreaterThan(0)
    expect(progress.percent).toBeLessThan(100)
    expect(progress.label).toContain('SOMBRA')
  })

  it('getProgress da 100% si ya está en el tier máximo', () => {
    const progress = useLoyaltyStore.getState().getProgress(10000)
    expect(progress.percent).toBe(100)
    expect(progress.label).toContain('Nivel máximo')
  })

  it('getProgress da 0% para 0 puntos MORTAL', () => {
    const progress = useLoyaltyStore.getState().getProgress(0)
    expect(progress.percent).toBe(0)
    expect(progress.label).toContain('0 /')
  })

  it('redeemReward canjea recompensa si tiene puntos suficientes', () => {
    const result = useLoyaltyStore.getState().redeemReward(1, 200)
    expect(result.success).toBe(true)
    expect(result.points).toBe(100)
  })

  it('redeemReward falla si no tiene puntos suficientes', () => {
    const result = useLoyaltyStore.getState().redeemReward(6, 100)
    expect(result.success).toBe(false)
    expect(result.points).toBe(100)
  })

  it('redeemReward registra rewardId en redeemedRewards', () => {
    useLoyaltyStore.getState().redeemReward(1, 200)
    const redeemed = useLoyaltyStore.getState().redeemedRewards
    expect(redeemed).toHaveLength(1)
    expect(redeemed[0]).toBe('1')
  })

  it('getTier compara dos tiers correctamente', () => {
    const mortal = useLoyaltyStore.getState().getTier(0)
    const sombra = useLoyaltyStore.getState().getTier(1000)
    expect(mortal.name).not.toBe(sombra.name)
    expect(sombra.discount).toBeGreaterThan(mortal.discount)
  })
})
