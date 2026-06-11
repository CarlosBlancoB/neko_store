import { useCallback, useState } from 'react'
import { api } from '@/services/api'

function urlBase64ToUint8Array(value: string) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4)
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = window.atob(base64)
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)))
}

export function usePushSubscription() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const subscribe = useCallback(async () => {
    setLoading(true)
    setStatus('')
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setStatus('Este navegador no soporta push PWA.')
        return
      }

      const key = await api.push.publicKey()
      if (!key.enabled || !key.publicKey) {
        setStatus('Push no esta configurado. Falta VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY.')
        return
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus('Permiso de notificaciones denegado.')
        return
      }

      const registration = await navigator.serviceWorker.ready
      const existing = await registration.pushManager.getSubscription()
      const subscription =
        existing ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key.publicKey),
        }))

      await api.push.subscribe(subscription.toJSON())
      setStatus('Push activado en este dispositivo.')
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'No se pudo activar push.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { subscribe, loading, status }
}
