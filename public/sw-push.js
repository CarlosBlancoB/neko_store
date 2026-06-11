self.addEventListener('push', (event) => {
  const fallback = {
    title: 'NEKO Store',
    body: 'Nueva notificacion',
    url: '/',
  }
  const data = event.data ? event.data.json() : fallback
  const title = data.title || fallback.title
  const options = {
    body: data.body || fallback.body,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-96x96.svg',
    data: { url: data.url || fallback.url },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) {
          client.navigate(url)
          return client.focus()
        }
      }
      return self.clients.openWindow(url)
    }),
  )
})
