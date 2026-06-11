import { beforeEach, describe, expect, it } from 'vitest'
import { useConfigStore } from '@/stores/configStore'

describe('useConfigStore', () => {
  beforeEach(() => {
    useConfigStore.setState({
      config: {
        whatsappNumber: '50624247171',
        storeEmail: 'hola@nekostore.cr',
        instagramHandle: '@nekocr',
        intlShippingEnabled: true,
        intlContactEmail: 'intl@nekostore.cr',
        storeName: 'NEKO STORE',
        storeTagline: 'tagline',
        currencySymbol: '$',
        dropActive: false,
        dropTitle: '',
      },
    })
  })

  it('tiene config por defecto', () => {
    const config = useConfigStore.getState().config
    expect(config.storeName).toBe('NEKO STORE')
    expect(config.currencySymbol).toBe('$')
    expect(config.whatsappNumber).toBe('50624247171')
  })

  it('updateConfig modifica parcialmente', () => {
    useConfigStore
      .getState()
      .updateConfig({ currencySymbol: '₡', dropActive: true, dropTitle: 'DROP' })
    const config = useConfigStore.getState().config
    expect(config.currencySymbol).toBe('₡')
    expect(config.dropActive).toBe(true)
    expect(config.dropTitle).toBe('DROP')
    expect(config.storeName).toBe('NEKO STORE')
  })

  it('resetConfig restaura valores por defecto', () => {
    useConfigStore.getState().updateConfig({ storeName: 'Custom' })
    useConfigStore.getState().resetConfig()
    const config = useConfigStore.getState().config
    expect(config.storeName).toBe('NEKO STORE')
    expect(config.dropActive).toBe(true)
  })
})
