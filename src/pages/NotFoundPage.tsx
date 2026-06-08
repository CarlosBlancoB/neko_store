import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

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
