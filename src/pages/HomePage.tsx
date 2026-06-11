import { Link } from 'react-router-dom'
import Carousel from '@/components/catalog/Carousel'
import ProductGrid from '@/components/catalog/ProductGrid'
import ContactInfoStrip from '@/components/contact/ContactInfoStrip'
import PWAInstallSection from '@/components/pwa/PWAInstallSection'
import usePageMeta from '@/hooks/usePageMeta'

export default function HomePage() {
  usePageMeta({
    title: 'Inicio',
    description:
      'Moda oscura y alternativa en Costa Rica. Descubre nuestra coleccion de vestidos, tops, accesorios y conjuntos goticos.',
  })
  return (
    <>
      <Carousel />
      <section className='featured-section'>
        <ProductGrid featured />
        <div className='featured-section__footer'>
          <Link to='/tienda' className='btn-primary btn-catalog'>
            Ver todo el catalogo
          </Link>
        </div>
      </section>
      <PWAInstallSection />
      <ContactInfoStrip />
    </>
  )
}
