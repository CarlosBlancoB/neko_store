import AccountDashboard from '@/components/account/AccountDashboard'
import AccountLogin from '@/components/account/AccountLogin'
import usePageMeta from '@/hooks/usePageMeta'
import { useAuthStore } from '@/stores/authStore'

export default function AccountPage() {
  const token = useAuthStore((s) => s.token)
  const customer = useAuthStore((s) => s.getCurrentCustomer())

  usePageMeta({
    title: 'Mi Cuenta',
    description:
      'Inicia sesión en Neko Store para ver tu historial de órdenes, puntos de lealtad y recompensas.',
  })

  if (!token || !customer) return <AccountLogin />
  return <AccountDashboard />
}
