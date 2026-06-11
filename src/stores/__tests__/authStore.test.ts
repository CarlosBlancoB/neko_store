import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from '@/stores/authStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      customers: {},
      currentCustomer: null,
      currentPhone: null,
      token: null,
    })
  })

  it('comienza sin sesion', () => {
    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
    expect(useAuthStore.getState().token).toBeNull()
  })

  it('activa sesion solo con payload de API', () => {
    useAuthStore.getState().setApiSession('api-token', {
      id: 'cust-88887777',
      name: 'Test User',
      phone: '88887777',
      points: 120,
      tier: 'MORTAL',
      total_spent: 60000,
      role: 'customer',
      created_at: '2026-01-01T00:00:00.000Z',
    })

    const customer = useAuthStore.getState().getCurrentCustomer()
    expect(useAuthStore.getState().token).toBe('api-token')
    expect(useAuthStore.getState().currentPhone).toBe('88887777')
    expect(customer?.name).toBe('Test User')
    expect(customer?.points).toBe(120)
    expect(customer?.orders).toEqual([])
  })

  it('ignora payload API sin telefono', () => {
    useAuthStore.getState().setApiSession('api-token', { name: 'Sin telefono' })

    expect(useAuthStore.getState().token).toBeNull()
    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
  })

  it('no hace login local con numero existente', () => {
    useAuthStore.setState({
      customers: {
        '24247171': {
          name: 'Valentina',
          phone: '24247171',
          points: 100,
          tier: 'ECLIPSE',
          totalSpent: 500,
          joinedAt: new Date().toISOString(),
          notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
          orders: [],
        },
      },
    })

    const ok = useAuthStore.getState().login('24247171')

    expect(ok).toBe(false)
    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
  })

  it('hace logout', () => {
    useAuthStore.getState().setApiSession('api-token', {
      name: 'Test',
      phone: '88887777',
      points: 0,
      tier: 'MORTAL',
    })

    useAuthStore.getState().logout()

    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
    expect(useAuthStore.getState().token).toBeNull()
  })

  it('no registra ni actualiza clientes locales', () => {
    useAuthStore.getState().register({
      name: 'Test',
      phone: '88887777',
      points: 100,
      tier: 'MORTAL',
      totalSpent: 0,
      joinedAt: new Date().toISOString(),
      notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
      orders: [],
    })
    useAuthStore.getState().updateCustomer('88887777', { points: 200, tier: 'SOMBRA' })

    expect(useAuthStore.getState().customers).toEqual({})
    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
  })

  it('no crea cuenta demo local', () => {
    useAuthStore.getState().seedDemoAccount()

    expect(useAuthStore.getState().customers).toEqual({})
    expect(useAuthStore.getState().getCurrentCustomer()).toBeNull()
  })
})
