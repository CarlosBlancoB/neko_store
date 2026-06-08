import ContactCard from '@/components/contact/ContactCard'
import IntlForm from '@/components/contact/IntlForm'

export default function ContactPage() {
  return (
    <div className='section active section-block'>
      <div className='section-header'>
        <div className='section-eyebrow'>Conecta con Nosotras</div>
        <h1 className='section-title'>Contacto</h1>
      </div>
      <div className='contact-grid'>
        <ContactCard />
        <IntlForm />
      </div>
    </div>
  )
}
