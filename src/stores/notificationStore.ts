import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NotificationItem } from '@/types/notification'

interface NotificationState {
  notifications: NotificationItem[]
  push: (data: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void
  dismiss: (index: number) => void
  markRead: (index: number) => void
  clearAll: () => void
  markAllRead: () => void
  unreadCount: () => number
  seedDemo: () => void
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      push: (data) => {
        const notification: NotificationItem = {
          id: Date.now().toString(),
          ...data,
          time: 'Ahora mismo',
          read: false,
        }
        set((state) => ({
          notifications: [notification, ...state.notifications].slice(0, 20),
        }))
      },

      dismiss: (index) => {
        set((state) => {
          const updated = [...state.notifications]
          updated.splice(index, 1)
          return { notifications: updated }
        })
      },

      markRead: (index) => {
        set((state) => {
          const updated = state.notifications.map((n, i) =>
            i === index ? { ...n, read: true } : n,
          )
          return { notifications: updated }
        })
      },

      clearAll: () => set({ notifications: [] }),

      markAllRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }))
      },

      unreadCount: () => get().notifications.filter((n) => !n.read).length,

      seedDemo: () => {
        const { notifications } = get()
        if (notifications.length > 0) return
        const demos: Omit<NotificationItem, 'id' | 'time' | 'read'>[] = [
          {
            icon: '🌑',
            title: 'Bienvenida a Neko Store',
            msg: 'Gracias por unirte. Acumula puntos oscuros y desbloquea recompensas exclusivas.',
            type: 'welcome',
          },
          {
            icon: '✦',
            title: 'Nuevo Drop — Shadow Bloom',
            msg: 'La colección Shadow Bloom está disponible. Edición limitada, solo 30 piezas.',
            type: 'drop',
          },
          {
            icon: '🇨🇷',
            title: 'Envíos en Costa Rica',
            msg: 'Hacemos envíos a todo el país. Recogida en tienda siempre gratis.',
            type: 'info',
          },
        ]
        set({
          notifications: demos.map((d, i) => ({
            id: String(i),
            ...d,
            time: 'Hoy',
            read: false,
          })),
        })
      },
    }),
    {
      name: 'nekoNotifs',
      partialize: (state) => ({
        notifications: state.notifications,
      }),
    },
  ),
)
