import { describe, expect, it } from 'vitest'
import { formatCRPhone, formatDate, getDiscount, getInitials, picsumUrl } from '@/utils/formatters'

describe('picsumUrl', () => {
  it('returns mapped URL for known seed', () => {
    const url = picsumUrl('shadowbloom', 500, 667)
    expect(url).toContain('images.unsplash.com')
    expect(url).toContain('photo-1509631179647')
  })

  it('returns picsum fallback for unknown seed', () => {
    const url = picsumUrl('nonexistent123', 300, 400)
    expect(url).toContain('picsum.photos')
    expect(url).toContain('nonexistent123')
  })
})

describe('formatCRPhone', () => {
  it('formats full CR number with 506 prefix', () => {
    expect(formatCRPhone('50688887777')).toBe('+506 8888-7777')
  })

  it('formats 8-digit number without prefix', () => {
    expect(formatCRPhone('88887777')).toBe('+506 8888-7777')
  })

  it('handles number with existing formatting', () => {
    expect(formatCRPhone('+506 8888-7777')).toBe('+506 8888-7777')
  })

  it('passes through other formats', () => {
    expect(formatCRPhone('12345')).toBe('+12345')
  })
})

describe('formatDate', () => {
  it('formats ISO date in Spanish', () => {
    const result = formatDate('2025-06-15')
    expect(result).toMatch(/junio|june/i)
  })
})

describe('getInitials', () => {
  it('returns first two initials', () => {
    expect(getInitials('Valentina Neko')).toBe('VN')
  })

  it('handles single name', () => {
    expect(getInitials('Valentina')).toBe('V')
  })

  it('uppercases result', () => {
    expect(getInitials('valentina neko')).toBe('VN')
  })
})

describe('getDiscount', () => {
  it('returns 0% at tier minimum', () => {
    expect(getDiscount(500, 500, 1500)).toBe(0)
  })

  it('returns 50% at midpoint', () => {
    expect(getDiscount(1000, 500, 1500)).toBe(50)
  })

  it('returns 100% at next tier', () => {
    expect(getDiscount(1500, 500, 1500)).toBe(100)
  })

  it('caps at 100%', () => {
    expect(getDiscount(2000, 500, 1500)).toBe(100)
  })
})
