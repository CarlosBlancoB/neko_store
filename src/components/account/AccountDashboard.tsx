import { useState } from 'react'
import LoyaltyCard from '@/components/loyalty/LoyaltyCard'
import { useAuthStore } from '@/stores/authStore'
import { formatCRPhone } from '@/utils/formatters'
import AccountTabs from './AccountTabs'
import OrderHistory from './OrderHistory'
import StatsGrid from './StatsGrid'

export default function AccountDashboard() {
  const getCurrentCustomer = useAuthStore((s) => s.getCurrentCustomer)
  const logout = useAuthStore((s) => s.logout)
  const customer = getCurrentCustomer()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!customer) return null

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🖤',
      content: (
        <div className='account-grid'>
          <StatsGrid customer={customer} />
          <div className='account-orders'>
            <h3 className='account-section-title'>Órdenes Recientes</h3>
            <OrderHistory orders={customer.orders} />
          </div>
        </div>
      ),
    },
    {
      id: 'loyalty',
      label: 'Lealtad',
      icon: '⭐',
      content: <LoyaltyCard />,
    },
  ]

  return (
    <div className='section active section-block'>
      <div className='account-header'>
        <div className='account-avatar'>
          {customer.name ? customer.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div className='account-info'>
          <h2>{customer.name || 'Sin nombre'}</h2>
          <p>{formatCRPhone(customer.phone)}</p>
          {customer.isDemo && <span className='demo-badge'>Demo</span>}
          <button
            onClick={logout}
            style={{
              background: 'none',
              border: '1px solid var(--border-2)',
              color: 'var(--text-muted)',
              padding: '4px 12px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
            type='button'
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <AccountTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
