import { useConfigStore } from '@/stores/configStore'
import { formatCRPhone } from '@/utils/formatters'

export default function ContactInfoStrip() {
  const config = useConfigStore((s) => s.config)

  return (
    <div className='contact-info-strip'>
      <div className='contact-info-item'>
        <span>🇨🇷</span>
        <div>
          <strong>WhatsApp</strong>
          <p>{formatCRPhone(config.whatsappNumber)}</p>
        </div>
      </div>
      <div className='contact-info-item'>
        <span>✉️</span>
        <div>
          <strong>Email</strong>
          <p>{config.storeEmail}</p>
        </div>
      </div>
      <div className='contact-info-item'>
        <span>📍</span>
        <div>
          <strong>Ubicación</strong>
          <p>San José, Costa Rica</p>
        </div>
      </div>
      <div className='contact-info-item'>
        <span>🕐</span>
        <div>
          <strong>Horario</strong>
          <p>Lun-Sab 10am - 7pm</p>
        </div>
      </div>
    </div>
  )
}
