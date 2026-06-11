import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useConfigStore } from '@/stores/configStore'
import { useLoyaltyDataStore } from '@/stores/loyaltyDataStore'
import { useLoyaltyStore } from '@/stores/loyaltyStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { useProductStore } from '@/stores/productStore'
import { useSocialStore } from '@/stores/socialStore'
import { useWAConfigStore } from '@/stores/waConfigStore'

export default function useInitApp() {
  const token = useAuthStore((s) => s.token)
  const fetchCurrentCustomer = useAuthStore((s) => s.fetchCurrentCustomer)
  const logout = useAuthStore((s) => s.logout)
  const fetchConfig = useConfigStore((s) => s.fetchConfig)
  const fetchLoyalty = useLoyaltyStore((s) => s.fetchLoyalty)
  const syncFromApi = useNotificationStore((s) => s.syncFromApi)
  const syncWAConfig = useWAConfigStore((s) => s.syncFromApi)
  const syncCampaigns = useSocialStore((s) => s.syncCampaigns)
  const syncPosts = useSocialStore((s) => s.syncPosts)
  const fetchProducts = useProductStore((s) => s.fetchProducts)
  const fetchLoyaltyData = useLoyaltyDataStore((s) => s.fetchLoyaltyData)

  useEffect(() => {
    fetchConfig()
    fetchProducts()
    fetchLoyaltyData()
  }, [fetchConfig, fetchProducts, fetchLoyaltyData])

  useEffect(() => {
    if (!token) return
    fetchCurrentCustomer().catch(() => logout())
    fetchLoyalty()
    syncFromApi()
    syncWAConfig()
    syncCampaigns()
    syncPosts()
  }, [
    token,
    fetchCurrentCustomer,
    logout,
    fetchLoyalty,
    syncFromApi,
    syncWAConfig,
    syncCampaigns,
    syncPosts,
  ])
}
