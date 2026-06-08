import { useEffect, useState } from 'react'
import { useConfigStore } from '@/stores/configStore'

export default function DropAlert() {
  const config = useConfigStore((s) => s.config)
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 47 * 60 + 33)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  if (!config.dropActive || !visible) return null

  const h = Math.floor(timeLeft / 3600)
  const m = Math.floor((timeLeft % 3600) / 60)
  const s = timeLeft % 60
  const display = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

  return (
    <div className='drop-alert'>
      <div className='drop-alert__inner'>
        <span className='drop-alert__icon'>🖤</span>
        <span className='drop-alert__text'>
          NUEVO DROP — Colección <strong>{config.dropTitle}</strong> disponible por tiempo limitado
        </span>
        <span className='drop-alert__timer'>{timeLeft > 0 ? display : 'EXPIRADO'}</span>
        <button className='drop-alert__close' onClick={() => setVisible(false)} type='button'>
          ✕
        </button>
      </div>
    </div>
  )
}
