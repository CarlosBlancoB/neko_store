import pool from '../../db.js'
import { saveFile, deleteFile } from '../../upload.js'

export default async function adminCarouselRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query('SELECT * FROM carousel_items ORDER BY sort_order')
    reply.send({ items: result.rows })
  })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { image_url, title, subtitle, link, link_text, active, sort_order } = request.body
    const id = `car-${Date.now().toString(36)}`
    await pool.query(
      `INSERT INTO carousel_items (id, image_url, title, subtitle, link, link_text, active, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, image_url, title || '', subtitle || '', link || '', link_text || '', active !== false, sort_order || 0],
    )
    reply.send({ item: { id, image_url, title, subtitle } })
  })

  app.put('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const { image_url, title, subtitle, link, link_text, active, sort_order } = request.body
    await pool.query(
      `UPDATE carousel_items SET
        image_url = COALESCE($1, image_url),
        title = COALESCE($2, title),
        subtitle = COALESCE($3, subtitle),
        link = COALESCE($4, link),
        link_text = COALESCE($5, link_text),
        active = COALESCE($6, active),
        sort_order = COALESCE($7, sort_order),
        updated_at = NOW()
       WHERE id = $8`,
      [image_url, title, subtitle, link, link_text, active, sort_order, id],
    )
    reply.send({ ok: true })
  })

  app.delete('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const existing = await pool.query('SELECT image_url FROM carousel_items WHERE id = $1', [id])
    if (existing.rows[0]?.image_url) deleteFile(existing.rows[0].image_url)
    await pool.query('DELETE FROM carousel_items WHERE id = $1', [id])
    reply.send({ deleted: true })
  })

  app.get('/public', async (request, reply) => {
    const result = await pool.query(
      'SELECT * FROM carousel_items WHERE active = true ORDER BY sort_order',
    )
    reply.send({ items: result.rows })
  })
}
