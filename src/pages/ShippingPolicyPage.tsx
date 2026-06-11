import usePageMeta from '@/hooks/usePageMeta'

const SHIPPING_ROWS = [
  { route: 'GAM a GAM', firstKg: 'aprox. ₡1.950', extraKg: 'aprox. ₡1.000' },
  { route: 'GAM a resto del pais', firstKg: 'aprox. ₡2.640', extraKg: 'aprox. ₡1.000' },
  { route: 'Resto del pais a GAM', firstKg: 'aprox. ₡2.640', extraKg: 'aprox. ₡1.000' },
  { route: 'Resto del pais a resto del pais', firstKg: 'aprox. ₡3.380', extraKg: 'aprox. ₡1.200' },
]

export default function ShippingPolicyPage() {
  usePageMeta({
    title: 'Politica de Envios',
    description: 'Politica de envios nacionales de Neko Store basada en tarifas de Correos CR.',
  })

  return (
    <section className='section active section-block'>
      <div className='legal-page'>
        <div className='section-eyebrow'>Costa Rica</div>
        <h1 className='section-title'>Politica de Envios</h1>
        <p>
          Enviamos pedidos dentro de Costa Rica usando Correos de Costa Rica cuando el pedido no se
          retira en tienda. El costo final se consulta y confirma siempre en Correos CR antes de
          preparar la guia.
        </p>

        <h2>Tarifas aproximadas</h2>
        <p>
          Referencia basada en Pymexpress de Correos de Costa Rica para el primer kg, redondeada
          hacia arriba. Las tarifas base publicadas no incluyen IVA.
        </p>
        <div className='legal-table-wrap'>
          <table className='legal-table'>
            <thead>
              <tr>
                <th>Ruta</th>
                <th>Primer kg</th>
                <th>Kg adicional</th>
              </tr>
            </thead>
            <tbody>
              {SHIPPING_ROWS.map((row) => (
                <tr key={row.route}>
                  <td>{row.route}</td>
                  <td>{row.firstKg}</td>
                  <td>{row.extraKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Plazos</h2>
        <p>
          Los plazos de Correos CR dependen de zona urbana, rural o excepciones operativas. Como
          referencia, los envios nacionales suelen manejarse como D+1 para urbano y D+3 para rural,
          sujeto a confirmacion de Correos CR.
        </p>

        <h2>Confirmacion</h2>
        <p>
          Al reservar tu pedido, confirmamos stock y SINPE. Despues calculamos el envio exacto con
          Correos CR segun direccion, peso y disponibilidad de servicio.
        </p>
      </div>
    </section>
  )
}
