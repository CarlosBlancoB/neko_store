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
      <div className={`${className} ${isOpen ? 'active' : ''}`}>
        <button className='modal-close' onClick={onClose} type='button'>
          ✕
        </button>
        {children}
      </div>
    </>
  )
}
