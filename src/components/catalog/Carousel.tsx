import { useCallback, useEffect, useState } from 'react'
import { GOTHIC_IMAGES } from '@/data/products'

const SLIDES = [
  {
    img: 'gothic1',
    eyebrow: 'Colección 2025',
    titlePrefix: 'Oscuridad que',
    titleEm: 'Florece',
    desc: 'Donde la sombra encuentra su forma. Nueva colección Shadow Bloom.',
  },
  {
    img: 'velvet2',
    eyebrow: 'Edición Limitada',
    titlePrefix: 'Terciopelo que',
    titleEm: 'Susurra',
    desc: 'Piezas únicas para quienes visten la noche.',
  },
  {
    img: 'dark3',
    eyebrow: 'Nuevo Drop',
    titlePrefix: 'Renace en la',
    titleEm: 'Tiniebla',
    desc: 'Preparate para el próximo drop exclusivo.',
  },
]

export default function Carousel() {
  const [idx, setIdx] = useState(0)

  const next = useCallback(() => setIdx((i) => (i + 1) % SLIDES.length), [])
  const prev = useCallback(() => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className='carousel'>
      <div className='carousel__track' style={{ transform: `translateX(-${idx * 100}%)` }}>
        {SLIDES.map((slide, i) => (
          <div key={slide.img} className={`carousel__slide ${i === idx ? 'active' : ''}`}>
            <img className='carousel__img' src={GOTHIC_IMAGES[slide.img]} alt='' />
            <div className='carousel__overlay' />
            <div className='carousel__content'>
              <div className='carousel__eyebrow'>{slide.eyebrow}</div>
              <div className='carousel__title'>
                {slide.titlePrefix}
                <br />
                <em>{slide.titleEm}</em>
              </div>
              <div className='carousel__desc'>{slide.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className='carousel__btn carousel__btn--prev'
        onClick={prev}
        type='button'
        aria-label='Anterior'
      >
        ‹
      </button>
      <button
        className='carousel__btn carousel__btn--next'
        onClick={next}
        type='button'
        aria-label='Siguiente'
      >
        ›
      </button>
      <div className='carousel__dots'>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.img}
            className={`carousel__dot ${i === idx ? 'active' : ''}`}
            onClick={() => setIdx(i)}
            type='button'
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
