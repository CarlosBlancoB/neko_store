import AccountDashboard from '@/components/account/AccountDashboard'
import AccountLogin from '@/components/account/AccountLogin'
import { useAuthStore } from '@/stores/authStore'

export default function AccountPage() {
  const currentPhone = useAuthStore((s) => s.currentPhone)

  if (!currentPhone) return <AccountLogin />
  return <AccountDashboard />
}
