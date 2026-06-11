import pool from '../../db.js'

function notificationId() {
  return `notif-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export default async function adminNotificationsRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query(
      "SELECT * FROM notifications WHERE for_role = 'admin' ORDER BY created_at DESC LIMIT 50",
    )
    reply.send({ notifications: result.rows })
  })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { type, title, message, for_role } = request.body
    if (!type || !title || !message) {
      return reply.code(400).send({ error: 'type, title y message requeridos' })
    }
    const result = await pool.query(
      `INSERT INTO notifications (id, type, title, message, for_role, read)
       VALUES ($1, $2, $3, $4, $5, false) RETURNING *`,
      [notificationId(), type, title, message, for_role || 'admin'],
    )
    reply.code(201).send({ notification: result.rows[0] })
  })

  app.put('/:id/read', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const result = await pool.query(
      'UPDATE notifications SET read = true WHERE id = $1 RETURNING *',
      [id],
    )
    const notification = result.rows[0]
    if (!notification) return reply.code(404).send({ error: 'Notificación no encontrada' })
    reply.send({ notification })
  })
}
