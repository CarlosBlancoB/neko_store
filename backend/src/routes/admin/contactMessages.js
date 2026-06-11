import pool from '../../db.js'

const VALID_STATUSES = ['new', 'in_review', 'answered', 'archived']

export default async function adminContactMessagesRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { status } = request.query
    const params = []
    let sql = 'SELECT * FROM contact_messages'

    if (status) {
      sql += ' WHERE status = $1'
      params.push(status)
    }

    sql += ' ORDER BY created_at DESC LIMIT 100'
    const result = await pool.query(sql, params)
    reply.send({ messages: result.rows })
  })

  app.put('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const { status, admin_notes } = request.body

    if (status && !VALID_STATUSES.includes(status)) {
      return reply.code(400).send({ error: `Estado invalido. Validos: ${VALID_STATUSES.join(', ')}` })
    }

    const result = await pool.query(
      `UPDATE contact_messages
       SET status = COALESCE($1, status),
           admin_notes = COALESCE($2, admin_notes),
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [status || null, typeof admin_notes === 'string' ? admin_notes : null, id],
    )

    const message = result.rows[0]
    if (!message) return reply.code(404).send({ error: 'Mensaje no encontrado' })
    reply.send({ message })
  })
}
