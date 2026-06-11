import { beforeEach, describe, expect, it } from 'vitest'
import { useNotificationStore } from '@/stores/notificationStore'

describe('useNotificationStore', () => {
  beforeEach(() => {
    useNotificationStore.setState({ notifications: [] })
  })

  it('comienza vacía', () => {
    expect(useNotificationStore.getState().notifications).toHaveLength(0)
    expect(useNotificationStore.getState().unreadCount()).toBe(0)
  })

  it('push agrega notificación', () => {
    useNotificationStore.getState().push({
      icon: '🖤',
      title: 'Test',
      msg: 'Mensaje de prueba',
      type: 'info',
    })
    const notifications = useNotificationStore.getState().notifications
    expect(notifications).toHaveLength(1)
    const n = notifications[0]
    expect(n?.title).toBe('Test')
    expect(n?.read).toBe(false)
    expect(n?.time).toBe('Ahora mismo')
    expect(n?.id).toBeDefined()
  })

  it('push respeta límite de 20', () => {
    for (let i = 0; i < 25; i++) {
      useNotificationStore.getState().push({
        icon: '🖤',
        title: `Notif ${i}`,
        msg: 'test',
        type: 'info',
      })
    }
    expect(useNotificationStore.getState().notifications).toHaveLength(20)
  })

  it('unreadCount cuenta no leídas', () => {
    useNotificationStore.getState().push({ icon: '🖤', title: 'A', msg: 'a', type: 'info' })
    useNotificationStore.getState().push({ icon: '🖤', title: 'B', msg: 'b', type: 'info' })
    expect(useNotificationStore.getState().unreadCount()).toBe(2)
    useNotificationStore.getState().markRead(0)
    expect(useNotificationStore.getState().unreadCount()).toBe(1)
  })

  it('dismiss elimina por índice', () => {
    useNotificationStore.getState().push({ icon: '🖤', title: 'A', msg: 'a', type: 'info' })
    useNotificationStore.getState().push({ icon: '🖤', title: 'B', msg: 'b', type: 'info' })
    useNotificationStore.getState().dismiss(1)
    const notifications = useNotificationStore.getState().notifications
    expect(notifications).toHaveLength(1)
    expect(notifications[0]?.title).toBe('B')
  })

  it('clearAll elimina todas', () => {
    useNotificationStore.getState().push({ icon: '🖤', title: 'A', msg: 'a', type: 'info' })
    useNotificationStore.getState().push({ icon: '🖤', title: 'B', msg: 'b', type: 'info' })
    useNotificationStore.getState().clearAll()
    expect(useNotificationStore.getState().notifications).toHaveLength(0)
  })

  it('markAllRead marca todas como leídas', () => {
    useNotificationStore.getState().push({ icon: '🖤', title: 'A', msg: 'a', type: 'info' })
    useNotificationStore.getState().push({ icon: '🖤', title: 'B', msg: 'b', type: 'info' })
    useNotificationStore.getState().markAllRead()
    expect(useNotificationStore.getState().unreadCount()).toBe(0)
    expect(useNotificationStore.getState().notifications.every((n) => n.read)).toBe(true)
  })

  it('seedDemo no duplica si ya hay notificaciones', () => {
    useNotificationStore.getState().push({ icon: '🖤', title: 'A', msg: 'a', type: 'info' })
    useNotificationStore.getState().seedDemo()
    expect(useNotificationStore.getState().notifications).toHaveLength(1)
  })
})
