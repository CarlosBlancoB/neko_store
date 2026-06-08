import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useUIStore } from '@/stores/uiStore'
import ProductModal from '../catalog/ProductModal'
import CheckoutModal from '../checkout/CheckoutModal'
import Toast from '../shared/Toast'
import CartSidebar from './CartSidebar'
import DropAlert from './DropAlert'
import Footer from './Footer'
import Navbar from './Navbar'
import NotificationsPanel from './NotificationsPanel'

export default function Layout() {
  const location = useLocation()
  const isDark = useUIStore((s) => s.isDark)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
      <DropAlert />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
      <NotificationsPanel />
      <ProductModal />
      <CheckoutModal />
      <Toast />
    </>
  )
}
