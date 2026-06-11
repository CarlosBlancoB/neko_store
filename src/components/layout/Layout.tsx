import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useSWUpdate } from '@/hooks/useSWUpdate'
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
  const isOnline = useOnlineStatus()
  const { needRefresh, update } = useSWUpdate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
      <a href='#main-content' className='skip-link'>
        Saltar al contenido
      </a>
      {!isOnline && (
        <div className='offline-alert' role='alert'>
          No hay conexión a internet. Mostrando datos locales.
        </div>
      )}
      {needRefresh && (
        <div className='update-alert' role='alert'>
          Hay una nueva versión disponible
          <button className='update-alert__btn' onClick={update} type='button'>
            Actualizar
          </button>
        </div>
      )}
      <DropAlert />
      <Navbar />
      <main id='main-content'>
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
