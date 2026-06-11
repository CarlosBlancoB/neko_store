import pool from '../db.js'

function rowId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export default async function contactRoutes(app) {
  app.post('/', async (request, reply) => {
    const name = cleanText(request.body?.name, 120)
    const phone = cleanText(request.body?.phone, 40)
    const email = cleanText(request.body?.email, 180)
    const subject = cleanText(request.body?.subject, 160)
    const message = cleanText(request.body?.message, 1200)

    if (!name || !subject || !message) {
      return reply.code(400).send({ error: 'Nombre, asunto y mensaje son requeridos' })
    }

    if (!phone && !email) {
      return reply.code(400).send({ error: 'Agrega WhatsApp o email para responderte' })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const result = await client.query(
        `INSERT INTO contact_messages (id, name, phone, email, subject, message)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [rowId('contact'), name, phone || null, email || null, subject, message],
      )

      await client.query(
        `INSERT INTO notifications (id, type, title, message, icon, for_role, read)
         VALUES ($1, 'form_filled_admin', $2, $3, '!', 'admin', false)`,
        [rowId('notif'), 'Nuevo mensaje de contacto', `${name}: ${subject}`],
      )

      await client.query('COMMIT')
      reply.code(201).send({ message: result.rows[0] })
    } catch (err) {
      await client.query('ROLLBACK')
      const messageText = err instanceof Error ? err.message : 'No se pudo guardar el mensaje'
      reply.code(400).send({ error: messageText })
    } finally {
      client.release()
    }
  })
}
