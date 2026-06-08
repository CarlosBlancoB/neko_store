import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon: string
  content: ReactNode
}

interface AccountTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function AccountTabs({ tabs, activeTab, onTabChange }: AccountTabsProps) {
  return (
    <>
      <div className='account-tabs'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`acc-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            type='button'
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} className={`acc-tab-panel ${activeTab === tab.id ? 'active' : ''}`}>
          {tab.content}
        </div>
      ))}
    </>
  )
}
