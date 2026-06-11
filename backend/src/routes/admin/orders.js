import pool from '../../db.js'

const VALID_STATUSES = [
  'pending_payment',
  'paid_verified',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
]

const PAID_STATUSES = ['paid_verified', 'preparing', 'shipped', 'delivered']

function rowId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export default async function adminOrdersRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { status } = request.query
    let sql = `
      SELECT o.*, c.name as customer_name, c.phone as customer_phone,
        json_agg(json_build_object(
          'id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity,
          'size', oi.size, 'unit_price', oi.price, 'name', oi.name
        )) as items
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      JOIN order_items oi ON oi.order_id = o.id
      JOIN products p ON p.id = oi.product_id
    `
    const params = []
    if (status) {
      sql += ' WHERE o.status = $1'
      params.push(status)
    }
    sql += ' GROUP BY o.id, c.name, c.phone ORDER BY o.created_at DESC'
    const result = await pool.query(sql, params)
    reply.send({ orders: result.rows })
  })

  app.put('/:id/status', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { id } = request.params
    const { status, payment_reference } = request.body
    if (!VALID_STATUSES.includes(status)) {
      return reply.code(400).send({ error: `Estado invalido. Validos: ${VALID_STATUSES.join(', ')}` })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const orderResult = await client.query('SELECT * FROM orders WHERE id = $1 FOR UPDATE', [id])
      const order = orderResult.rows[0]
      if (!order) {
        await client.query('ROLLBACK')
        return reply.code(404).send({ error: 'Orden no encontrada' })
      }

      const wasPaid = PAID_STATUSES.includes(order.status)
      const becomesPaid = PAID_STATUSES.includes(status)

      if (!wasPaid && becomesPaid) {
        await client.query(
          `UPDATE customers
           SET points = points + $1, total_spent = total_spent + $2
           WHERE id = $3`,
          [Number(order.points_earned ?? 0), Number(order.items_total ?? order.total ?? 0), order.customer_id],
        )
      }

      if (order.status === 'pending_payment' && status === 'cancelled') {
        const items = await client.query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [
          id,
        ])
        for (const item of items.rows) {
          await client.query('UPDATE products SET stock = stock + $1, updated_at = NOW() WHERE id = $2', [
            Number(item.quantity),
            item.product_id,
          ])
        }
      }

      const paymentStatus =
        status === 'cancelled' ? 'cancelled' : becomesPaid ? 'paid' : order.payment_status ?? 'pending'

      const result = await client.query(
        `UPDATE orders
         SET status = $1,
             payment_status = $2,
             payment_reference = COALESCE($3, payment_reference),
             paid_at = CASE
               WHEN $4 = true AND paid_at IS NULL THEN NOW()
               ELSE paid_at
             END,
             updated_at = NOW()
         WHERE id = $5
         RETURNING *`,
        [status, paymentStatus, payment_reference || null, becomesPaid, id],
      )

      if (!wasPaid && becomesPaid) {
        await client.query(
          `INSERT INTO notifications (id, customer_id, type, title, message, icon, for_role, read)
           VALUES ($1, $2, 'payment', $3, $4, '✓', 'customer', false)`,
          [
            rowId('notif'),
            order.customer_id,
            'Pago SINPE confirmado',
            `Tu pedido ${order.id} ya esta confirmado y pasa a preparacion.`,
          ],
        )
      }

      await client.query('COMMIT')
      reply.send({ order: result.rows[0] })
    } catch (err) {
      await client.query('ROLLBACK')
      const message = err instanceof Error ? err.message : 'No se pudo actualizar la orden'
      reply.code(400).send({ error: message })
    } finally {
      client.release()
    }
  })
}
