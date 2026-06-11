import pool from '../../db.js'

export default async function adminProductsRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name
       FROM products p JOIN categories c ON c.id = p.category_id
       ORDER BY p.featured DESC, p.featured_sort_order ASC, p.created_at DESC`,
    )
    reply.send({ products: result.rows })
  })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const {
      name,
      description,
      price,
      category_id,
      images,
      sizes,
      badge,
      points,
      stock,
      active,
      cost_price,
      low_stock_threshold,
      featured,
      featured_sort_order,
    } = request.body
    if (!name || !price || !category_id) {
      return reply.code(400).send({ error: 'name, price y category_id requeridos' })
    }
    const result = await pool.query(
      `INSERT INTO products (
        name, description, price, category_id, images, sizes, badge, points,
        stock, active, cost_price, low_stock_threshold, featured, featured_sort_order
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        name,
        description || '',
        price,
        category_id,
        JSON.stringify(images || []),
        JSON.stringify(sizes || []),
        badge || '',
        points ?? 0,
        stock ?? 0,
        active ?? true,
        cost_price ?? 0,
        low_stock_threshold ?? 5,
        featured ?? false,
        featured_sort_order ?? 0,
      ],
    )
    reply.code(201).send({ product: result.rows[0] })
  })

  app.put('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const {
      name,
      description,
      price,
      category_id,
      images,
      sizes,
      badge,
      points,
      stock,
      active,
      cost_price,
      low_stock_threshold,
      featured,
      featured_sort_order,
    } = request.body
    const result = await pool.query(
      `UPDATE products SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        category_id = COALESCE($4, category_id),
        images = COALESCE($5, images::jsonb)::jsonb,
        sizes = COALESCE($6, sizes::jsonb)::jsonb,
        badge = COALESCE($7, badge),
        points = COALESCE($8, points),
        stock = COALESCE($9, stock),
        active = COALESCE($10, active),
        cost_price = COALESCE($11, cost_price),
        low_stock_threshold = COALESCE($12, low_stock_threshold),
        featured = COALESCE($13, featured),
        featured_sort_order = COALESCE($14, featured_sort_order),
        updated_at = NOW()
       WHERE id = $15 RETURNING *`,
      [
        name,
        description,
        price,
        category_id,
        images ? JSON.stringify(images) : null,
        sizes ? JSON.stringify(sizes) : null,
        badge,
        points,
        stock,
        active,
        cost_price,
        low_stock_threshold,
        featured,
        featured_sort_order,
        id,
      ],
    )
    const product = result.rows[0]
    if (!product) return reply.code(404).send({ error: 'Producto no encontrado' })
    reply.send({ product })
  })

  app.delete('/:id', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id])
    if (result.rows.length === 0) return reply.code(404).send({ error: 'Producto no encontrado' })
    reply.send({ deleted: true })
  })
}
