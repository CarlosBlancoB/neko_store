import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Toast, { useToastStore } from '@/components/shared/Toast'

beforeEach(() => {
  useToastStore.setState({ message: '', visible: false })
})

describe('Toast', () => {
  it('no se muestra inicialmente', () => {
    render(<Toast />)
    const toast = screen.getByRole('alert')
    expect(toast.className).not.toContain('show')
  })

  it('se muestra al llamar show', () => {
    vi.useFakeTimers()
    render(<Toast />)
    act(() => {
      useToastStore.getState().show('Hola')
    })
    const toast = screen.getByRole('alert')
    expect(toast.textContent).toBe('Hola')
    expect(toast.className).toContain('show')
    vi.useRealTimers()
  })

  it('tiene aria-live polite', () => {
    render(<Toast />)
    const toast = screen.getByRole('alert')
    expect(toast.getAttribute('aria-live')).toBe('polite')
  })

  it('se oculta después de 3200ms', () => {
    vi.useFakeTimers()
    render(<Toast />)
    act(() => {
      useToastStore.getState().show('Mensaje')
    })
    expect(screen.getByRole('alert').className).toContain('show')
    act(() => {
      vi.advanceTimersByTime(3200)
    })
    expect(screen.getByRole('alert').className).not.toContain('show')
    vi.useRealTimers()
  })

  it('show actualiza el mensaje', () => {
    render(<Toast />)
    act(() => {
      useToastStore.getState().show('Nuevo mensaje')
    })
    expect(screen.getByRole('alert').textContent).toBe('Nuevo mensaje')
  })
})
