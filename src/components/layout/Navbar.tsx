import { useLocation, useNavigate } from 'react-router-dom'
import { useCartStore } from '@/stores/cartStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useUIStore } from '@/stores/uiStore'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { path: '/', label: 'Inicio', section: 'home' },
  { path: '/tienda', label: 'Tienda', section: 'shop' },
  { path: '/recompensas', label: 'Recompensas', section: 'loyalty' },
  { path: '/contacto', label: 'Contacto', section: 'contact' },
  { path: '/nosotras', label: 'Nosotras', section: 'about' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const unreadCount = useNotificationStore((s) => s.unreadCount())
  const toggleCart = useUIStore((s) => s.toggleCart)
  const toggleNotif = useUIStore((s) => s.toggleNotif)

  return (
    <nav
      className='navbar'
      style={{
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <button className='navbar__logo' onClick={() => navigate('/')} type='button'>
        <svg
          className='logo-svg'
          viewBox='0 0 80 70'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <ellipse
            cx='40'
            cy='48'
            rx='20'
            ry='16'
            fill='var(--logo-fill)'
            stroke='#c9a96e'
            strokeWidth='0.5'
          />
          <ellipse
            cx='40'
            cy='28'
            rx='16'
            ry='14'
            fill='var(--logo-fill)'
            stroke='#c9a96e'
            strokeWidth='0.5'
          />
          <polygon
            points='26,18 22,6 34,16'
            fill='var(--logo-fill)'
            stroke='#c9a96e'
            strokeWidth='0.5'
          />
          <polygon
            points='54,18 58,6 46,16'
            fill='var(--logo-fill)'
            stroke='#c9a96e'
            strokeWidth='0.5'
          />
          <polygon points='27,17 24,9 33,16' fill='var(--logo-ear)' />
          <polygon points='53,17 56,9 47,16' fill='var(--logo-ear)' />
          <ellipse cx='34' cy='27' rx='3.5' ry='4.5' fill='#c9a96e' />
          <ellipse cx='46' cy='27' rx='3.5' ry='4.5' fill='#c9a96e' />
          <ellipse cx='34' cy='28' rx='1.5' ry='3.5' fill='var(--logo-fill)' />
          <ellipse cx='46' cy='28' rx='1.5' ry='3.5' fill='var(--logo-fill)' />
          <polygon points='40,33 38,36 42,36' fill='#c9a96e' opacity='0.7' />
          <line x1='24' y1='34' x2='37' y2='34' stroke='#c9a96e' strokeWidth='0.6' opacity='0.6' />
          <line x1='24' y1='37' x2='37' y2='36' stroke='#c9a96e' strokeWidth='0.6' opacity='0.6' />
          <line x1='56' y1='34' x2='43' y2='34' stroke='#c9a96e' strokeWidth='0.6' opacity='0.6' />
          <line x1='56' y1='37' x2='43' y2='36' stroke='#c9a96e' strokeWidth='0.6' opacity='0.6' />
          <path
            d='M58,52 Q72,44 68,58 Q64,64 58,60'
            fill='none'
            stroke='#c9a96e'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
          <path d='M36,8 Q38,4 42,5 Q38,6 38,10 Z' fill='#c9a96e' opacity='0.5' />
        </svg>
        <div className='logo-text'>
          <span className='logo-name'>NEKO</span>
          <span className='logo-sub'>STORE</span>
        </div>
      </button>

      <div className='navbar__links'>
        {NAV_LINKS.map((link) => (
          <button
            key={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => navigate(link.path)}
            type='button'
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className='navbar__actions'>
        <ThemeToggle />
        <button className='btn-icon' onClick={toggleNotif} title='Notificaciones' type='button'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
          >
            <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' />
            <path d='M13.73 21a2 2 0 01-3.46 0' />
          </svg>
          {unreadCount > 0 && <span className='notif-badge'>{unreadCount}</span>}
        </button>
        <button
          className='btn-icon'
          onClick={() => navigate('/cuenta')}
          title='Mi cuenta'
          type='button'
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
          >
            <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
            <circle cx='12' cy='7' r='4' />
          </svg>
        </button>
        <button className='btn-icon cart-btn' onClick={toggleCart} title='Carrito' type='button'>
          <svg
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
          >
            <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
            <line x1='3' y1='6' x2='21' y2='6' />
            <path d='M16 10a4 4 0 01-8 0' />
          </svg>
          <span className='cart-badge'>{itemCount}</span>
        </button>
      </div>
    </nav>
  )
}
