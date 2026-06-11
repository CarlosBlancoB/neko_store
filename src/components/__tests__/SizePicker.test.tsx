import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SizePicker from '@/components/shared/SizePicker'

describe('SizePicker', () => {
  const sizes = ['S', 'M', 'L', 'XL']

  it('renderiza todas las tallas', () => {
    render(<SizePicker sizes={sizes} selected={null} onSelect={vi.fn()} />)
    for (const s of sizes) {
      expect(screen.getByText(s)).toBeDefined()
    }
  })

  it('label apunta al hidden input', () => {
    render(<SizePicker sizes={sizes} selected={null} onSelect={vi.fn()} />)
    const label = screen.getByText('TALLA')
    expect(label.getAttribute('for')).toBe('size-picker-input')
  })

  it('talla seleccionada tiene clase selected', () => {
    render(<SizePicker sizes={sizes} selected='M' onSelect={vi.fn()} />)
    const btn = screen.getByText('M')
    expect(btn.className).toContain('selected')
  })

  it('talla no seleccionada no tiene clase selected', () => {
    render(<SizePicker sizes={sizes} selected='M' onSelect={vi.fn()} />)
    const btn = screen.getByText('S')
    expect(btn.className).not.toContain('selected')
  })

  it('onSelect se llama con la talla correcta', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<SizePicker sizes={sizes} selected={null} onSelect={onSelect} />)
    await user.click(screen.getByText('XL'))
    expect(onSelect).toHaveBeenCalledWith('XL')
  })
})
