import Carousel from '@/components/catalog/Carousel'
import ProductGrid from '@/components/catalog/ProductGrid'
import ContactInfoStrip from '@/components/contact/ContactInfoStrip'

export default function HomePage() {
  return (
    <>
      <Carousel />
      <ProductGrid featured />
      <div className='intl-banner'>
        <div className='intl-banner__inner'>
          <div className='intl-banner__text'>
            <h3>🌍 Envíos Internacionales</h3>
            <p>Contáctanos para pedidos fuera de Costa Rica</p>
          </div>
          <a href='mailto:international@nekostore.cr' className='btn-secondary'>
            international@nekostore.cr
          </a>
        </div>
      </div>
      <ContactInfoStrip />
    </>
  )
}
