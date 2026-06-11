import CustomerOTPLogin from './CustomerOTPLogin'

export default function AccountLogin() {
  return (
    <div className='section active section-block'>
      <div className='account-login-wrap'>
        <div className='login-card'>
          <div className='section-eyebrow' style={{ textAlign: 'center' }}>
            Mi Cuenta
          </div>
          <h2 className='section-title' style={{ textAlign: 'center', marginBottom: '20px' }}>
            Entrar o Registrarte
          </h2>
          <p className='login-desc'>
            Ingresa tu numero de WhatsApp. Si no tenes cuenta, se crea al validar el codigo.
          </p>
          <CustomerOTPLogin />
        </div>
      </div>
    </div>
  )
}
