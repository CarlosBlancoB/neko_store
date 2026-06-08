import { useNotificationStore } from '@/stores/notificationStore'
import { useUIStore } from '@/stores/uiStore'

export default function NotificationsPanel() {
  const { notifications, dismiss, markRead, clearAll, markAllRead } = useNotificationStore()
  const isOpen = useUIStore((s) => s.isNotifOpen)
  const toggle = useUIStore((s) => s.toggleNotif)

  const handleToggle = () => {
    toggle()
    if (!isOpen) markAllRead()
  }

  return (
    <>
      <button
        className={`notif-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        type='button'
        aria-label='Cerrar notificaciones'
      />
      <div className={`notif-panel ${isOpen ? 'open' : ''}`}>
        <div className='notif-header'>
          <h3>Notificaciones</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className='notif-clear' onClick={clearAll} type='button'>
              Limpiar todo
            </button>
            <button onClick={handleToggle} className='modal-close-inline' type='button'>
              ✕
            </button>
          </div>
        </div>
        <div className='notif-list'>
          {notifications.length === 0 ? (
            <div className='notif-empty'>
              <svg
                width='36'
                height='36'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
                opacity='0.3'
                aria-hidden='true'
              >
                <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' />
                <path d='M13.73 21a2 2 0 01-3.46 0' />
              </svg>
              <p>Sin notificaciones</p>
            </div>
          ) : (
            notifications.map((n, i) => (
              <button
                key={n.id}
                className={`notif-item ${n.read ? '' : 'unread'}`}
                onClick={() => markRead(i)}
                type='button'
              >
                <div className='notif-item__icon'>{n.icon}</div>
                <div className='notif-item__body'>
                  <div className='notif-item__title'>{n.title}</div>
                  <div className='notif-item__msg'>{n.msg}</div>
                  <div className='notif-item__time'>{n.time}</div>
                </div>
                <button
                  className='notif-item__dismiss'
                  onClick={(e) => {
                    e.stopPropagation()
                    dismiss(i)
                  }}
                  type='button'
                >
                  ✕
                </button>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  )
}
