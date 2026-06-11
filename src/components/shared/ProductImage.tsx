import { useState } from 'react'

interface ProductImageProps {
  seed?: string
  alt: string
  className?: string
  width?: number
  height?: number
}

function ProductPlaceholder({ alt }: { alt: string }) {
  return (
    <div className='product-image-placeholder' role='img' aria-label={alt}>
      <img src='/brand/neko-logo-cat.png' alt='' aria-hidden='true' />
      <img src='/brand/neko-logo-text.png' alt='NEKO Store' />
      <span>Imagen pendiente</span>
    </div>
  )
}

export default function ProductImage({ seed, alt, className }: ProductImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const src = seed?.trim()

  if (!src || error) {
    return <ProductPlaceholder alt={alt} />
  }

  return (
    <>
      {loading && <div className='product-image-skeleton' aria-hidden='true' />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading='lazy'
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  )
}
