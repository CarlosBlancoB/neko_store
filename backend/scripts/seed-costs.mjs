import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const { rows } = await pool.query('SELECT id, name, price FROM products ORDER BY id')
for (const row of rows) {
  const costPrice = Math.round(row.price * 0.42)
  await pool.query('UPDATE products SET cost_price = $1, low_stock_threshold = 5 WHERE id = $2', [costPrice, row.id])
}
console.log(`Updated ${rows.length} products with cost prices`)
await pool.end()
