import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Badge from '@/components/shared/Badge'

describe('Badge', () => {
  it('renderiza texto del badge', () => {
    render(<Badge type='DROP NUEVO' />)
    expect(screen.getByText('DROP NUEVO')).toBeDefined()
  })

  it('renderiza "NUEVO" para type new', () => {
    render(<Badge type='new' />)
    expect(screen.getByText('NUEVO')).toBeDefined()
  })

  it('usa clase product-card__badge--new para type new', () => {
    render(<Badge type='new' />)
    const span = screen.getByText('NUEVO')
    expect(span.className).toContain('product-card__badge--new')
  })

  it('usa clase base para badge normal', () => {
    render(<Badge type='EXCLUSIVO' />)
    const span = screen.getByText('EXCLUSIVO')
    expect(span.className).toBe('product-card__badge')
  })
})
