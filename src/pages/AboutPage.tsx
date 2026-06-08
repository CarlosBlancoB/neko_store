import { GOTHIC_IMAGES } from '@/data/products'

export default function AboutPage() {
  return (
    <div className='section active section-block'>
      <div className='about-hero-img'>
        <img
          src={GOTHIC_IMAGES.aboutneko}
          alt='Neko Store'
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
        <div className='about-hero-overlay' />
      </div>
      <div className='about-grid'>
        <div className='about-text'>
          <p>
            Neko Store nace de la necesidad de un espacio donde la moda oscura sea accesible en
            Costa Rica. Desde San José, curamos y diseñamos piezas que abrazan la sombra en cada uno
            de nosotros.
          </p>
          <p>
            Creemos que la ropa es una extensión del alma. Cada prenda en nuestro catálogo ha sido
            seleccionada por su calidad, diseño y capacidad de contar una historia.
          </p>
        </div>
        <div className='about-values'>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Hecho con Propósito</h4>
              <p>Cada prenda es elegida por su significado y artesanía.</p>
            </div>
          </div>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Raíces Ticas</h4>
              <p>Operamos desde San José, con envíos a todo Costa Rica.</p>
            </div>
          </div>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Comunidad Oscura</h4>
              <p>Más que una tienda, un refugio para almas afines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
