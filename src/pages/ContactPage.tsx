import ContactCard from '@/components/contact/ContactCard'
import ContactForm from '@/components/contact/ContactForm'
import usePageMeta from '@/hooks/usePageMeta'
import { useCMSStore } from '@/stores/cmsStore'

export default function ContactPage() {
  const getContentValue = useCMSStore((s) => s.getContentValue)
  const getContentImage = useCMSStore((s) => s.getContentImage)
  const backgroundEnabled = getContentValue('contact', 'form_background_enabled') === 'true'
  const backgroundImage = getContentImage('contact', 'form_background') ?? '/brand/contacto.png'

  usePageMeta({
    title: 'Contacto',
    description: 'Conecta con Neko Store en Costa Rica por WhatsApp o email.',
  })
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Conecta con Nosotros</div>
        <h1 className='section-title'>Contacto</h1>
      </div>
      <div
        className={`contact-grid ${backgroundEnabled ? 'contact-grid--image-bg' : ''}`}
        style={backgroundEnabled ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      >
        <ContactCard />
        <ContactForm />
      </div>
    </div>
  )
}
