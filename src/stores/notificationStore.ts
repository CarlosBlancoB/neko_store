import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import type { NotificationItem } from '@/types/notification'

interface NotificationState {
  notifications: NotificationItem[]
  loading: boolean
  error: string | null

  push: (data: Omit<NotificationItem, 'id' | 'time' | 'read'>) => void
  dismiss: (index: number) => void
  markRead: (index: number) => void
  clearAll: () => void
  markAllRead: () => void
  unreadCount: () => number
  seedDemo: () => void
  syncFromApi: (role?: 'customer' | 'admin') => Promise<void>
  apiMarkRead: (id: string, role?: 'customer' | 'admin') => Promise<void>
}

function mapRemoteNotification(raw: unknown): NotificationItem {
  const row = raw as Partial<NotificationItem> & {
    message?: string
    created_at?: string
  }
  return {
    id: String(row.id),
    icon: String(row.icon ?? '\uD83D\uDD14'),
    title: String(row.title ?? 'Notificacion'),
    msg: String(row.msg ?? row.message ?? ''),
    type: row.type,
    time: String(
      row.time ?? (row.created_at ? new Date(row.created_at).toLocaleString('es-CR') : 'Ahora'),
    ),
    read: row.read === true,
  }
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      loading: false,
      error: null,

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
            icon: '\uD83C\uDF11',
            title: 'Bienvenida a Neko Store',
            msg: 'Gracias por unirte. Acumula puntos oscuros y desbloquea recompensas exclusivas.',
            type: 'welcome',
          },
          {
            icon: '\u2726',
            title: 'Nuevo Drop \u2014 Shadow Bloom',
            msg: 'La colección Shadow Bloom está disponible. Edición limitada, solo 30 piezas.',
            type: 'drop',
          },
          {
            icon: '\uD83C\uDDE8\uD83C\uDDF7',
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

      syncFromApi: async (role = 'customer') => {
        set({ loading: true, error: null })
        try {
          const res =
            role === 'admin' ? await api.admin.notifications.list() : await api.notifications.list()
          const remote = res.notifications.map(mapRemoteNotification)
          const { notifications } = get()
          const merged = [
            ...remote,
            ...notifications.filter((n) => !remote.some((r) => r.id === n.id)),
          ]
          set({ notifications: merged.slice(0, 20), loading: false })
        } catch (err) {
          set({
            loading: false,
            error: err instanceof Error ? err.message : 'Error al sincronizar',
          })
        }
      },

      apiMarkRead: async (id, role = 'customer') => {
        try {
          if (role === 'admin') {
            await api.admin.notifications.markRead(id)
          } else {
            await api.notifications.markRead(id)
          }
          set((state) => ({
            notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          }))
        } catch {
          // fallback: marcar localmente
          set((state) => ({
            notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          }))
        }
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
