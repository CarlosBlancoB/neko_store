import { useState } from 'react'
import { useConfigStore } from '@/stores/configStore'
import { useNotificationStore } from '@/stores/notificationStore'

export default function IntlForm() {
  const config = useConfigStore((s) => s.config)
  const pushNotif = useNotificationStore((s) => s.push)

  const [form, setForm] = useState({ name: '', email: '', country: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      pushNotif({
        icon: '⚠️',
        title: 'Campos requeridos',
        msg: 'Completa nombre, email y mensaje',
        type: 'warning',
      })
      return
    }
    const subject = encodeURIComponent(`International Inquiry - ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nCountry: ${form.country}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:${config.intlContactEmail}?subject=${subject}&body=${body}`
    pushNotif({
      icon: '🌍',
      title: 'Correo abierto',
      msg: 'Tu cliente de correo se abrirá con el mensaje',
      type: 'info',
    })
  }

  return (
    <div className='contact-card contact-card--intl intl-form'>
      <div className='contact-card__icon'>🌍</div>
      <div className='contact-card__flag'>INTERNACIONAL</div>
      <h3>Contacto Internacional</h3>
      <p>¿Fuera de Costa Rica? Escríbenos y te cotizamos el envío a tu país.</p>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='intl-name'>
            Nombre completo <span className='req'>*</span>
          </label>
          <input
            id='intl-name'
            type='text'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder='Tu nombre'
          />
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='intl-email'>
              Email <span className='req'>*</span>
            </label>
            <input
              id='intl-email'
              type='email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder='tu@email.com'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='intl-country'>País</label>
            <input
              id='intl-country'
              type='text'
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder='México, USA, etc.'
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='intl-message'>
            Mensaje <span className='req'>*</span>
          </label>
          <textarea
            id='intl-message'
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder='¿Qué pieza te interesa?'
          />
        </div>
        <div className='form-hint'>Usaremos tu email para responderte. Sin spam.</div>
        <button className='btn-primary btn-full' type='submit' style={{ marginTop: '16px' }}>
          Enviar consulta
        </button>
      </form>
    </div>
  )
}
