import pool from '../../db.js'

export default async function adminPostsRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query(
      'SELECT * FROM social_posts ORDER BY scheduled_at DESC NULLS LAST, created_at DESC',
    )
    reply.send({ posts: result.rows })
  })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { content, images, platforms, scheduled_at, campaign_id, status } = request.body
    if (!content) return reply.code(400).send({ error: 'content requerido' })
    const result = await pool.query(
      `INSERT INTO social_posts (content, images, platforms, scheduled_at, campaign_id, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        content,
        JSON.stringify(images || []),
        JSON.stringify(platforms || []),
        scheduled_at || null,
        campaign_id || null,
        status || 'draft',
      ],
    )
    reply.code(201).send({ post: result.rows[0] })
  })

  app.put('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const { content, images, platforms, scheduled_at, campaign_id, status } = request.body
    const result = await pool.query(
      `UPDATE social_posts SET
        content = COALESCE($1, content),
        images = COALESCE($2, images::jsonb)::jsonb,
        platforms = COALESCE($3, platforms::jsonb)::jsonb,
        scheduled_at = COALESCE($4, scheduled_at),
        campaign_id = COALESCE($5, campaign_id),
        status = COALESCE($6, status)
       WHERE id = $7 RETURNING *`,
      [content, images ? JSON.stringify(images) : null, platforms ? JSON.stringify(platforms) : null, scheduled_at, campaign_id, status, id],
    )
    const post = result.rows[0]
    if (!post) return reply.code(404).send({ error: 'Post no encontrado' })
    reply.send({ post })
  })

  app.put('/:id/publish', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const result = await pool.query(
      `UPDATE social_posts SET status = 'published', published_at = NOW() WHERE id = $1 RETURNING *`,
      [id],
    )
    const post = result.rows[0]
    if (!post) return reply.code(404).send({ error: 'Post no encontrado' })
    reply.send({ post })
  })

  app.delete('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const result = await pool.query('DELETE FROM social_posts WHERE id = $1 RETURNING id', [id])
    if (result.rows.length === 0) return reply.code(404).send({ error: 'Post no encontrado' })
    reply.send({ deleted: true })
  })
}
