import usePageMeta from '@/hooks/usePageMeta'
import { useCMSStore } from '@/stores/cmsStore'

export default function AboutPage() {
  const getContentValue = useCMSStore((s) => s.getContentValue)
  const getContentImage = useCMSStore((s) => s.getContentImage)
  const heroImage = getContentImage('about', 'hero_image') ?? '/brand/nosotros.png'
  const body1 =
    getContentValue('about', 'body_1') ||
    'Neko Store nace en San Ramon de Alajuela para hacer la moda alternativa mas accesible en Costa Rica. Importamos y vendemos ropa seleccionada para quienes buscan estilo propio sin perder calidad.'
  const body2 =
    getContentValue('about', 'body_2') ||
    'Queremos construir una familia, no solo una lista de clientes. Por eso combinamos una experiencia cercana con rewards que devuelven valor a la lealtad de nuestra comunidad.'

  usePageMeta({
    title: 'Nosotros',
    description:
      'Conoce la historia de Neko Store, tienda de San Ramon de Alajuela que importa y vende moda alternativa en Costa Rica.',
  })
  return (
    <div className='section active section-block'>
      <div className='about-hero-img'>
        <img
          src={heroImage}
          alt='Neko Store'
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
        />
        <div className='about-hero-overlay' />
      </div>
      <div className='about-grid'>
        <div className='about-text'>
          <p>{body1}</p>
          <p>{body2}</p>
        </div>
        <div className='about-values'>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Seleccion Curada</h4>
              <p>Importamos y elegimos cada prenda por su estilo, calidad y durabilidad.</p>
            </div>
          </div>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Raices de San Ramon</h4>
              <p>Operamos desde San Ramon de Alajuela, con envios a todo Costa Rica.</p>
            </div>
          </div>
          <div className='value-item'>
            <span>✦</span>
            <div>
              <h4>Equipo Multidisciplinario</h4>
              <p>Somos un equipo de personas en software, marketing, diseno y operaciones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
