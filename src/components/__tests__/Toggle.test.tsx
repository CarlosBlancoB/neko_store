import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Toggle from '@/components/shared/Toggle'

describe('Toggle', () => {
  it('renderiza con aria-label', () => {
    render(<Toggle checked={false} onChange={() => {}} id='test-toggle' />)
    expect(screen.getByLabelText('test-toggle')).toBeDefined()
  })

  it('checkbox refleja checked true', () => {
    render(<Toggle checked={true} onChange={() => {}} id='test-toggle' />)
    const input = screen.getByRole('checkbox') as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('checkbox refleja checked false', () => {
    render(<Toggle checked={false} onChange={() => {}} id='test-toggle' />)
    const input = screen.getByRole('checkbox') as HTMLInputElement
    expect(input.checked).toBe(false)
  })

  it('llama onChange al hacer click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Toggle checked={false} onChange={onChange} id='test-toggle' />)
    const input = screen.getByRole('checkbox')
    await user.click(input)
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
