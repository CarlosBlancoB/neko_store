import pool from '../db.js'

export default async function customersRoutes(app) {
  app.get('/me', { onRequest: [app.authenticate] }, async (request, reply) => {
    const result = await pool.query(
      `SELECT id, name, phone, email, address, role, points, tier, created_at
       FROM customers WHERE id = $1`,
      [request.user.id],
    )
    const customer = result.rows[0]
    if (!customer) return reply.code(404).send({ error: 'Cliente no encontrado' })
    reply.send({ customer })
  })

  app.put('/me', { onRequest: [app.authenticate] }, async (request, reply) => {
    const { name, email, address } = request.body
    const result = await pool.query(
      `UPDATE customers SET name = COALESCE($1, name), email = COALESCE($2, email), address = COALESCE($3, address)
       WHERE id = $4
       RETURNING id, name, phone, email, address, role, points, tier, created_at`,
      [name, email, address, request.user.id],
    )
    reply.send({ customer: result.rows[0] })
  })
}
