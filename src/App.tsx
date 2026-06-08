import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout.tsx'
import AboutPage from '@/pages/AboutPage.tsx'
import AccountPage from '@/pages/AccountPage.tsx'
import CatalogPage from '@/pages/CatalogPage.tsx'
import ContactPage from '@/pages/ContactPage.tsx'
import HomePage from '@/pages/HomePage.tsx'
import LoyaltyPage from '@/pages/LoyaltyPage.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/tienda' element={<CatalogPage />} />
        <Route path='/recompensas' element={<LoyaltyPage />} />
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/nosotras' element={<AboutPage />} />
        <Route path='/cuenta' element={<AccountPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
