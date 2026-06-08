import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'

export default function AccountLogin() {
  const [phone, setPhone] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const seedDemoAccount = useAuthStore((s) => s.seedDemoAccount)
  const seedDemo = useNotificationStore((s) => s.seedDemo)
  const pushNotif = useNotificationStore((s) => s.push)

  const handleSubmit = () => {
    const clean = phone.replace(/\D/g, '')
    if (clean.length !== 8) {
      pushNotif({
        icon: '⚠️',
        title: 'Número inválido',
        msg: 'Debe ser un número de 8 dígitos',
        type: 'warning',
      })
      return
    }

    if (mode === 'login') {
      const ok = login(clean)
      if (ok) {
        pushNotif({
          icon: '🖤',
          title: 'Bienvenida de vuelta',
          msg: 'Sesión iniciada',
          type: 'success',
        })
      } else {
        pushNotif({
          icon: '⚠️',
          title: 'Cuenta no encontrada',
          msg: 'Regístrate primero o usa la demo',
          type: 'warning',
        })
      }
    } else {
      register({
        name: '',
        phone: clean,
        points: 0,
        tier: 'MORTAL',
        totalSpent: 0,
        joinedAt: new Date().toISOString(),
        notifSettings: { order: true, drop: true, points: true, rewards: true, offers: false },
        orders: [],
      })
      pushNotif({
        icon: '🖤',
        title: 'Cuenta creada',
        msg: 'Bienvenida a Neko Store',
        type: 'success',
      })
    }
  }

  const handleDemo = () => {
    seedDemoAccount()
    seedDemo()
    login('24247171')
    pushNotif({ icon: '🖤', title: 'Demo cargada', msg: 'Bienvenida, Valentina', type: 'success' })
  }

  return (
    <div className='section active section-block'>
      <div className='account-login-wrap'>
        <div className='login-card'>
          <div className='section-eyebrow' style={{ textAlign: 'center' }}>
            Mi Cuenta
          </div>
          <h2 className='section-title' style={{ textAlign: 'center', marginBottom: '20px' }}>
            {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
          <p className='login-desc'>
            Ingresa tu número de WhatsApp para{' '}
            {mode === 'login' ? 'entrar' : 'crear tu cuenta oscura'}.
          </p>
          <div className='form-group'>
            <label htmlFor='login-phone'>
              Número de WhatsApp <small>(+506)</small>
            </label>
            <input
              id='login-phone'
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='2424-7171'
              style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px' }}
            />
          </div>
          <button className='btn-primary btn-full' onClick={handleSubmit} type='button'>
            {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
          <div className='login-note'>
            {mode === 'login' ? (
              <>
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => setMode('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    textDecoration: 'underline',
                  }}
                  type='button'
                >
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => setMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    textDecoration: 'underline',
                  }}
                  type='button'
                >
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </div>
        <div className='login-demo-hint'>
          <span>🌑</span>
          <div>
            <strong>Cuenta Demo</strong>
            <p>
              Usa <code>24247171</code> para explorar la cuenta demo de Valentina Neko con 1,620
              pts, tier Eclipse y 3 órdenes de ejemplo.
            </p>
            <button
              className='btn-secondary'
              onClick={handleDemo}
              style={{ marginTop: '12px', padding: '8px 20px', fontSize: '9px' }}
              type='button'
            >
              Cargar Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
