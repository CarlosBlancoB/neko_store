import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Modal from '@/components/shared/Modal'

describe('Modal', () => {
  it('no tiene clase active cuando isOpen false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Contenido</p>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).not.toContain('active')
  })

  it('tiene clase active cuando isOpen true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Contenido</p>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('active')
  })

  it('renderiza children cuando isOpen true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Contenido</p>
      </Modal>,
    )
    expect(screen.getByText('Contenido')).toBeDefined()
  })

  it('tiene role dialog y aria-modal', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Contenido</p>
      </Modal>,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    expect(dialog.getAttribute('aria-modal')).toBe('true')
  })

  it('cierra al hacer click en overlay', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Contenido</p>
      </Modal>,
    )
    const overlay = screen.getByLabelText('Cerrar')
    await user.click(overlay)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('cierra al hacer click en botón X', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Contenido</p>
      </Modal>,
    )
    const buttons = screen.getAllByRole('button')
    const closeBtn = buttons.find((b) => b.textContent === '✕')
    expect(closeBtn).toBeDefined()
    if (closeBtn) {
      await user.click(closeBtn)
      expect(onClose).toHaveBeenCalledOnce()
    }
  })
})
