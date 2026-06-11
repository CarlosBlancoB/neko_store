import pool from '../db.js'

function mapNotification(row) {
  return {
    id: row.id,
    icon: row.icon || '\uD83D\uDD14',
    title: row.title,
    msg: row.message,
    type: row.type,
    time: row.created_at ? new Date(row.created_at).toLocaleString('es-CR') : 'Ahora',
    read: row.read === true,
  }
}

export default async function notificationsRoutes(app) {
  app.get('/', { onRequest: [app.authenticate] }, async (request, reply) => {
    const result = await pool.query(
      `SELECT *
       FROM notifications
       WHERE for_role = 'customer' AND customer_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [request.user.id],
    )
    reply.send({ notifications: result.rows.map(mapNotification) })
  })

  app.put('/:id/read', { onRequest: [app.authenticate] }, async (request, reply) => {
    const result = await pool.query(
      `UPDATE notifications
       SET read = true
       WHERE id = $1 AND customer_id = $2
       RETURNING *`,
      [request.params.id, request.user.id],
    )
    const notification = result.rows[0]
    if (!notification) return reply.code(404).send({ error: 'Notificacion no encontrada' })
    reply.send({ notification: mapNotification(notification) })
  })
}
