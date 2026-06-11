import type { FormEvent } from 'react'
import { useState } from 'react'
import { api } from '@/services/api'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const updateField = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setNotice('')
    setError('')

    try {
      await api.contact.send(form)
      setForm(INITIAL_FORM)
      setNotice('Mensaje enviado. Te respondemos por WhatsApp o email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el mensaje.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='contact-card contact-card--intl contact-form' onSubmit={handleSubmit}>
      <div className='contact-card__icon'>*</div>
      <div className='contact-card__flag'>FORMULARIO DIRECTO</div>
      <h3>Enviar mensaje</h3>
      <p>Usalo para dudas de tallas, disponibilidad, pedidos o colaboraciones.</p>

      {notice && <div className='admin-notice contact-form__status'>{notice}</div>}
      {error && <div className='admin-error contact-form__status'>{error}</div>}

      <div className='form-group'>
        <label htmlFor='contact-name'>Nombre</label>
        <input
          id='contact-name'
          type='text'
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />
      </div>

      <div className='contact-form__split'>
        <div className='form-group'>
          <label htmlFor='contact-phone'>WhatsApp</label>
          <input
            id='contact-phone'
            type='tel'
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder='50688888888'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='contact-email'>Email</label>
          <input
            id='contact-email'
            type='email'
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder='tu@email.com'
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='contact-subject'>Asunto</label>
        <input
          id='contact-subject'
          type='text'
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='contact-message'>Mensaje</label>
        <textarea
          id='contact-message'
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          required
        />
      </div>

      <button className='btn-primary btn-full' type='submit' disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar al admin'}
      </button>
    </form>
  )
}
