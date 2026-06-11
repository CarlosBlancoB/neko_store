import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  overlayClassName?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
  overlayClassName = '',
}: ModalProps) {
  return (
    <>
      <button
        className={`modal-overlay ${isOpen ? 'active' : ''} ${overlayClassName}`}
        onClick={onClose}
        type='button'
        aria-label='Cerrar'
      />
      <div
        className={`${className} ${isOpen ? 'active' : ''}`}
        role='dialog'
        aria-modal='true'
        aria-label='Detalle del producto'
      >
        <button className='modal-close' onClick={onClose} type='button'>
          ✕
        </button>
        {children}
      </div>
    </>
  )
}
