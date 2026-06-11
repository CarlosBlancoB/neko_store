import path from 'path'
import multipart from '@fastify/multipart'
import { saveFile, deleteFile } from '../../upload.js'

export default async function adminUploadRoutes(app) {
  await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } })

  app.post('/', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const data = await request.file()
    if (!data) return reply.code(400).send({ error: 'No se envi\u00F3 archivo' })

    const buffer = await data.toBuffer()
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
    const ext = path.extname(data.filename).toLowerCase()
    if (!allowed.includes(ext)) {
      return reply.code(400).send({ error: 'Formato no permitido. Usa: jpg, png, webp, gif, svg' })
    }

    const url = saveFile(buffer, data.filename)
    reply.send({ url, filename: data.filename })
  })

  app.post('/product/:productId', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const data = await request.file()
    if (!data) return reply.code(400).send({ error: 'No se envi\u00F3 archivo' })

    const buffer = await data.toBuffer()
    const url = saveFile(buffer, data.filename)

    const { default: pool } = await import('../../db.js')
    const result = await pool.query('SELECT images FROM products WHERE id = $1', [request.params.productId])
    const images = result.rows[0]?.images || []
    images.push(url)

    await pool.query('UPDATE products SET images = $1, updated_at = NOW() WHERE id = $2', [JSON.stringify(images), request.params.productId])
    reply.send({ url, images })
  })

  app.delete('/product/:productId/:index', { onRequest: [app.requireAdmin] }, async (request, reply) => {
    const { default: pool } = await import('../../db.js')
    const idx = parseInt(request.params.index)
    const result = await pool.query('SELECT images FROM products WHERE id = $1', [request.params.productId])
    const images = result.rows[0]?.images || []

    if (images[idx]) deleteFile(images[idx])
    images.splice(idx, 1)

    await pool.query('UPDATE products SET images = $1, updated_at = NOW() WHERE id = $2', [JSON.stringify(images), request.params.productId])
    reply.send({ images })
  })
}
