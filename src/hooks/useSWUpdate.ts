import { useRegisterSW } from 'virtual:pwa-register/react'
import { useCallback } from 'react'

export function useSWUpdate() {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      r?.update()
    },
  })

  const update = useCallback(() => {
    updateServiceWorker(true)
  }, [updateServiceWorker])

  return { offlineReady, needRefresh, update }
}
