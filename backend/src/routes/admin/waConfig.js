import pool from '../../db.js'

export default async function adminWaConfigRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query(
      "SELECT value FROM config WHERE key = 'wa_config'",
    )
    const config = result.rows[0]?.value || {
      admin_phone: '',
      notify_admin_on_order: true,
      notify_customer_on_status: true,
      abandoned_cart_reminder: false,
      welcome_message: true,
      order_confirmation_template: true,
    }
    reply.send({ config })
  })

  app.put('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const {
      admin_phone,
      notify_admin_on_order,
      notify_customer_on_status,
      abandoned_cart_reminder,
      welcome_message,
      order_confirmation_template,
    } = request.body
    const value = {
      admin_phone,
      notify_admin_on_order,
      notify_customer_on_status,
      abandoned_cart_reminder,
      welcome_message,
      order_confirmation_template,
    }
    await pool.query(
      `INSERT INTO config (key, value) VALUES ('wa_config', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1`,
      [JSON.stringify(value)],
    )
    reply.send({ config: value })
  })
}
