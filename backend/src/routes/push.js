import pool from '../db.js'
import { getPushStatus } from '../services/push.js'

function rowId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export default async function pushRoutes(app) {
  app.get('/vapid-public-key', async (_request, reply) => {
    reply.send(getPushStatus())
  })

  app.post('/subscribe', { onRequest: [app.authenticate] }, async (request, reply) => {
    const { subscription } = request.body
    if (!subscription?.endpoint) {
      return reply.code(400).send({ error: 'Suscripcion push invalida' })
    }

    const role = request.user.role === 'admin' ? 'admin' : 'customer'
    const result = await pool.query(
      `INSERT INTO push_subscriptions (id, customer_id, role, endpoint, subscription)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (endpoint)
       DO UPDATE SET customer_id = $2, role = $3, subscription = $5, updated_at = NOW()
       RETURNING id`,
      [rowId('push'), request.user.id, role, subscription.endpoint, JSON.stringify(subscription)],
    )

    reply.code(201).send({ ok: true, id: result.rows[0].id })
  })
}
