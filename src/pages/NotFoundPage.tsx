import { useNavigate } from 'react-router-dom'
import usePageMeta from '@/hooks/usePageMeta'

export default function NotFoundPage() {
  const navigate = useNavigate()

  usePageMeta({
    title: '404 · Página no encontrada',
    description: 'La página que buscas no existe. Regresa al inicio de Neko Store.',
  })

  return (
    <div
      className='section active section-block'
      style={{ textAlign: 'center', paddingTop: '120px' }}
    >
      <div
        style={{
          fontSize: '96px',
          marginBottom: '16px',
          fontFamily: 'Megasord, serif',
          color: 'var(--gold)',
        }}
      >
        404
      </div>
      <p
        style={{
          fontSize: '20px',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginBottom: '32px',
        }}
      >
        Esta página se perdió en la oscuridad...
      </p>
      <button className='btn-primary' onClick={() => navigate('/')} type='button'>
        Volver al inicio
      </button>
    </div>
  )
}
