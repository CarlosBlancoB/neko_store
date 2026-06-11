import { useState } from 'react'
import { useTimer } from '@/hooks/useTimer'
import { useConfigStore } from '@/stores/configStore'

const DROP_DURATION = 2 * 3600 + 47 * 60 + 33

export default function DropAlert() {
  const config = useConfigStore((s) => s.config)
  const { display } = useTimer(DROP_DURATION)
  const [visible, setVisible] = useState(true)

  if (!config.dropActive || !visible) return null

  return (
    <div className='drop-alert'>
      <div className='drop-alert__inner'>
        <span className='drop-alert__icon'>🖤</span>
        <span className='drop-alert__text'>
          NUEVO DROP — Coleccion <strong>{config.dropTitle}</strong> disponible por tiempo limitado
        </span>
        <span className='drop-alert__timer'>{display}</span>
        <button className='drop-alert__close' onClick={() => setVisible(false)} type='button'>
          ✕
        </button>
      </div>
    </div>
  )
}
