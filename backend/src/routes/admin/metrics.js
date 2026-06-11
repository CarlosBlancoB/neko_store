import pool from '../../db.js'

export default async function adminMetricsRoutes(app) {
  app.get('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const orderStats = await pool.query(`
      SELECT
        COUNT(*)::int as total_orders,
        COALESCE(SUM(total), 0)::float as total_revenue,
        COALESCE(AVG(total), 0)::float as avg_order_value,
        COUNT(*) FILTER (WHERE status = 'pending')::int as pending_orders,
        COUNT(*) FILTER (WHERE status = 'cancelled')::int as cancelled_orders
      FROM orders
    `)

    const customerStats = await pool.query(`
      SELECT COUNT(*)::int as total_customers,
             COALESCE(AVG(points), 0)::float as avg_points
      FROM customers WHERE role = 'customer'
    `)

    const productStats = await pool.query(`
      SELECT COUNT(*)::int as total_products,
             COUNT(*) FILTER (WHERE active = false)::int as inactive_products
      FROM products
    `)

    const recentOrders = await pool.query(`
      SELECT o.id, o.total, o.status, o.created_at, c.name as customer_name
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      ORDER BY o.created_at DESC LIMIT 5
    `)

    const postsByStatus = await pool.query(`
      SELECT status, COUNT(*)::int as count
      FROM social_posts GROUP BY status
    `)

    const topProducts = await pool.query(`
      SELECT p.id, p.name, SUM(oi.quantity)::int as total_sold,
             SUM(oi.unit_price * oi.quantity)::float as revenue
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'cancelled'
      GROUP BY p.id, p.name
      ORDER BY total_sold DESC LIMIT 5
    `)

    reply.send({
      metrics: {
        orders: orderStats.rows[0],
        customers: customerStats.rows[0],
        products: productStats.rows[0],
        recent_orders: recentOrders.rows,
        posts_by_status: postsByStatus.rows,
        top_products: topProducts.rows,
      },
    })
  })
}
