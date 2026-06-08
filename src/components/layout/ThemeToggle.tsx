import { useUIStore } from '@/stores/uiStore'

export default function ThemeToggle() {
  const isDark = useUIStore((s) => s.isDark)
  const toggleTheme = useUIStore((s) => s.toggleTheme)

  return (
    <button
      className='btn-icon theme-toggle'
      onClick={toggleTheme}
      title='Cambiar tema'
      type='button'
    >
      <svg
        className='icon-moon'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        style={{ display: isDark ? 'block' : 'none' }}
        aria-hidden='true'
      >
        <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
      </svg>
      <svg
        className='icon-sun'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        style={{ display: isDark ? 'none' : 'block' }}
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='5' />
        <line x1='12' y1='1' x2='12' y2='3' />
        <line x1='12' y1='21' x2='12' y2='23' />
        <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
        <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
        <line x1='1' y1='12' x2='3' y2='12' />
        <line x1='21' y1='12' x2='23' y2='12' />
        <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
        <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
      </svg>
    </button>
  )
}
