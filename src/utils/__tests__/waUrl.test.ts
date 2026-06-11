import { describe, expect, it } from 'vitest'
import { buildContactWaUrl, buildIntlMailtoUrl, buildWaOrderUrl } from '@/utils/waUrl'

describe('buildWaOrderUrl', () => {
  it('builds WhatsApp deep link with order details', () => {
    const url = buildWaOrderUrl(
      '50688887777',
      'Valentina',
      '8888-7777',
      'San José',
      '',
      '1x Vestido (M)',
      'Recogida en tienda',
      0,
      117,
      117,
      'NK-001',
      '$',
    )
    expect(url).toContain('wa.me/50688887777')
    expect(url).toContain('Nuevo%20Pedido')
    expect(url).toContain('NK-001')
  })

  it('includes notes when provided', () => {
    const url = buildWaOrderUrl(
      '50688887777',
      'Valentina',
      '8888-7777',
      'San José',
      'Empaque de regalo',
      '1x Vestido (M)',
      'Envío estándar',
      5,
      122,
      122,
      'NK-002',
      '$',
    )
    expect(url).toContain('Empaque%20de%20regalo')
  })
})

describe('buildContactWaUrl', () => {
  it('builds simple WhatsApp link', () => {
    expect(buildContactWaUrl('50688887777')).toBe('https://wa.me/50688887777')
  })
})

describe('buildIntlMailtoUrl', () => {
  it('builds mailto with subject and body', () => {
    const url = buildIntlMailtoUrl(
      'hello@nekostore.cr',
      'Carlos',
      'carlos@email.com',
      'México',
      '¿Hacen envíos internacionales?',
    )
    expect(url).toContain('mailto:hello@nekostore.cr')
    expect(url).toContain('Consulta%20internacional')
    expect(url).toContain('M%C3%A9xico')
  })
})
