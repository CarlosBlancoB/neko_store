import { useEffect, useState } from 'react'
import { api } from '@/services/api'

type ContactMessage = {
  id: string
  name: string
  phone?: string
  email?: string
  subject: string
  message: string
  status: string
  admin_notes?: string
  created_at?: string
}

const STATUSES = [
  { value: '', label: 'Todos' },
  { value: 'new', label: 'Nuevos' },
  { value: 'in_review', label: 'En revision' },
  { value: 'answered', label: 'Respondidos' },
  { value: 'archived', label: 'Archivados' },
]

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const fetchMessages = async (nextStatus = status) => {
    setLoading(true)
    setError('')
    try {
      const res = await api.admin.contactMessages.list(nextStatus || undefined)
      setMessages(res.messages as ContactMessage[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar mensajes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const updateMessage = async (id: string, nextStatus: string, adminNotes?: string) => {
    setNotice('')
    setError('')
    try {
      await api.admin.contactMessages.update(id, {
        status: nextStatus,
        admin_notes: adminNotes,
      })
      await fetchMessages()
      setNotice('Mensaje actualizado.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo actualizar el mensaje.')
    }
  }

  return (
    <div className='orders-manager'>
      <header className='wp-admin-header'>
        <div>
          <p className='wp-admin-kicker'>Mensajes</p>
          <h2>Bandeja de contacto</h2>
          <span>Consultas enviadas desde la pagina de contacto.</span>
        </div>
        <div className='orders-toolbar'>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value)
              fetchMessages(event.target.value)
            }}
            aria-label='Filtrar mensajes por estado'
          >
            {STATUSES.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className='btn-secondary' onClick={() => fetchMessages()} type='button'>
            Refrescar
          </button>
        </div>
      </header>

      {error && <div className='admin-error'>{error}</div>}
      {notice && <div className='admin-notice'>{notice}</div>}
      {loading && <div className='admin-panel-empty'>Cargando mensajes...</div>}

      <div className='orders-list'>
        {messages.map((item) => (
          <article key={item.id} className='contact-admin-card order-admin-card'>
            <header>
              <div>
                <h3>{item.subject}</h3>
                <p>
                  {item.name} - {item.phone || item.email || 'sin contacto'}
                </p>
              </div>
              <span className='contact-admin-card__status'>{item.status}</span>
            </header>
            <div className='order-admin-card__meta'>
              {item.created_at && <span>{new Date(item.created_at).toLocaleString('es-CR')}</span>}
              {item.email && <span>{item.email}</span>}
              {item.phone && <span>{item.phone}</span>}
            </div>
            <p className='contact-admin-card__message'>{item.message}</p>
            <div className='contact-admin-card__actions order-admin-card__actions'>
              <label>
                Estado
                <select
                  value={item.status}
                  onChange={(event) =>
                    updateMessage(item.id, event.target.value, item.admin_notes ?? '')
                  }
                >
                  {STATUSES.filter((option) => option.value).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Nota interna
                <textarea
                  defaultValue={item.admin_notes ?? ''}
                  onBlur={(event) => updateMessage(item.id, item.status, event.target.value)}
                />
              </label>
            </div>
          </article>
        ))}
        {!loading && messages.length === 0 && (
          <div className='admin-panel-empty'>No hay mensajes para este filtro.</div>
        )}
      </div>
    </div>
  )
}
