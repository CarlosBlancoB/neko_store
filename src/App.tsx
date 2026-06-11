import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout.tsx'
import useInitApp from '@/hooks/useInitApp'

const HomePage = lazy(() => import('@/pages/HomePage.tsx'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage.tsx'))
const LoyaltyPage = lazy(() => import('@/pages/LoyaltyPage.tsx'))
const ContactPage = lazy(() => import('@/pages/ContactPage.tsx'))
const AboutPage = lazy(() => import('@/pages/AboutPage.tsx'))
const AccountPage = lazy(() => import('@/pages/AccountPage.tsx'))
const AdminPage = lazy(() => import('@/pages/AdminPage.tsx'))
const ShippingPolicyPage = lazy(() => import('@/pages/ShippingPolicyPage.tsx'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.tsx'))

function SuspenseFallback() {
  return (
    <div className='suspense-fallback'>
      <span className='suspense-fallback__text'>Cargando...</span>
    </div>
  )
}

export default function App() {
  useInitApp()

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/tienda' element={<CatalogPage />} />
          <Route path='/recompensas' element={<LoyaltyPage />} />
          <Route path='/contacto' element={<ContactPage />} />
          <Route path='/nosotros' element={<AboutPage />} />
          <Route path='/cuenta' element={<AccountPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/politica-envios' element={<ShippingPolicyPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
