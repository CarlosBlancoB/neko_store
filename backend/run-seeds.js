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

async function seed() {
  const client = await pool.connect()
  try {
    const seedsDir = resolve(import.meta.dirname, 'seeds')
    const files = await readdir(seedsDir)
    const sqlFiles = files
      .filter((f) => f.endsWith('.sql'))
      .sort()

    for (const file of sqlFiles) {
      const sql = readFileSync(resolve(seedsDir, file), 'utf-8')
      console.log(`  SEED ${file}...`)
      await client.query(sql)
      console.log(`  DONE  ${file}`)
    }

    console.log('All seeds applied successfully.')
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
