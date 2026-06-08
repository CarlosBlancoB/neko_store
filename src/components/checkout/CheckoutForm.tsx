interface CheckoutFormProps {
  form: {
    name: string
    phone: string
    province: string
    canton: string
    district: string
    address: string
    notes: string
  }
  onChange: (field: string, value: string) => void
}

export default function CheckoutForm({ form, onChange }: CheckoutFormProps) {
  return (
    <>
      <div className='form-group'>
        <label htmlFor='checkout-name'>
          Nombre completo <small className='req'>*</small>
        </label>
        <input
          id='checkout-name'
          type='text'
          value={form.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder='Tu nombre'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-phone'>
          Teléfono{' '}
          <small>
            (+506) <span className='req'>*</span>
          </small>
        </label>
        <input
          id='checkout-phone'
          type='tel'
          value={form.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder='8888-7777'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-province'>Provincia</label>
        <input
          id='checkout-province'
          type='text'
          value={form.province}
          onChange={(e) => onChange('province', e.target.value)}
          placeholder='San José'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-canton'>Cantón</label>
        <input
          id='checkout-canton'
          type='text'
          value={form.canton}
          onChange={(e) => onChange('canton', e.target.value)}
          placeholder='Tibás'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-district'>Distrito</label>
        <input
          id='checkout-district'
          type='text'
          value={form.district}
          onChange={(e) => onChange('district', e.target.value)}
          placeholder='San Juan'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-address'>Señas exactas</label>
        <textarea
          id='checkout-address'
          value={form.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder='Casa blanca con rejas negras, contiguo a la farmacia'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='checkout-notes'>Notas adicionales</label>
        <textarea
          id='checkout-notes'
          value={form.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder='Empaque especial, regalo, etc.'
        />
      </div>
    </>
  )
}
