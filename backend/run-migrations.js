import { readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'nestDB',
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
})

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('Connected to', process.env.DB_NAME ?? 'nestDB')

    // Ensure migrations tracking table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        name       TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    const migrationsDir = resolve(import.meta.dirname, 'migrations')
    const files = await readdir(migrationsDir)
    const sqlFiles = files
      .filter((f) => f.endsWith('.sql'))
      .sort()

    for (const file of sqlFiles) {
      const { rows } = await client.query(
        `SELECT COUNT(*) as count FROM _migrations WHERE name = $1`,
        [file],
      )
      if (Number(rows[0].count) > 0) {
        console.log(`  SKIP ${file} (already applied)`)
        continue
      }

      const sql = readFileSync(resolve(migrationsDir, file), 'utf-8')
      console.log(`  APPLY ${file}...`)
      await client.query(sql)
      await client.query(`INSERT INTO _migrations (name) VALUES ($1)`, [file])
      console.log(`  DONE  ${file}`)
    }

    console.log('All migrations applied successfully.')
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
