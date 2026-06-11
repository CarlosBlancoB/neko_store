import pool from '../../db.js'

export default async function adminCampaignsRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query(
      `SELECT sc.*,
        json_agg(json_build_object(
          'id', sp.id, 'content', sp.content, 'status', sp.status,
          'scheduled_at', sp.scheduled_at, 'published_at', sp.published_at
        )) FILTER (WHERE sp.id IS NOT NULL) as posts
       FROM social_campaigns sc
       LEFT JOIN social_posts sp ON sp.campaign_id = sc.id
       GROUP BY sc.id
       ORDER BY sc.created_at DESC`,
    )
    reply.send({ campaigns: result.rows })
  })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { name, description, start_date, end_date, budget, platform } = request.body
    if (!name) return reply.code(400).send({ error: 'name requerido' })
    const result = await pool.query(
      `INSERT INTO social_campaigns (name, description, start_date, end_date, budget, platform)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, description || '', start_date || null, end_date || null, budget || 0, platform || 'facebook'],
    )
    reply.code(201).send({ campaign: result.rows[0] })
  })

  app.put('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const { name, description, start_date, end_date, budget, platform, status } = request.body
    const result = await pool.query(
      `UPDATE social_campaigns SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        start_date = COALESCE($3, start_date),
        end_date = COALESCE($4, end_date),
        budget = COALESCE($5, budget),
        platform = COALESCE($6, platform),
        status = COALESCE($7, status)
       WHERE id = $8 RETURNING *`,
      [name, description, start_date, end_date, budget, platform, status, id],
    )
    const campaign = result.rows[0]
    if (!campaign) return reply.code(404).send({ error: 'Campaña no encontrada' })
    reply.send({ campaign })
  })

  app.delete('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    await pool.query('UPDATE social_posts SET campaign_id = NULL WHERE campaign_id = $1', [id])
    const result = await pool.query('DELETE FROM social_campaigns WHERE id = $1 RETURNING id', [id])
    if (result.rows.length === 0) return reply.code(404).send({ error: 'Campaña no encontrada' })
    reply.send({ deleted: true })
  })
}
