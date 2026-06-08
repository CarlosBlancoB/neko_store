import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const cls = [
    variant === 'primary' ? 'btn-primary' : '',
    variant === 'secondary' ? 'btn-secondary' : '',
    variant === 'ghost' ? 'btn-icon' : '',
    full ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={cls} type='button' {...props}>
      {children}
    </button>
  )
}
