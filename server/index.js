import http from 'node:http'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { handleChat } from './chat.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

const PORT = Number(process.env.PORT) || 8787
const GROQ_API_KEY = process.env.GROQ_API_KEY

function parseAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173'
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

const allowedOrigins = parseAllowedOrigins()

function createRateLimiter({ max, windowMs }) {
  const hits = new Map()
  return (ip) => {
    const now = Date.now()
    let e = hits.get(ip)
    if (!e || now > e.resetAt) {
      e = { count: 0, resetAt: now + windowMs }
      hits.set(ip, e)
    }
    e.count += 1
    return e.count <= max
  }
}

const rateLimit = createRateLimiter({ max: 10, windowMs: 60_000 })

function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function readBody(req, maxBytes = 32_000) {
  return new Promise((resolve, reject) => {
    let total = 0
    const chunks = []
    req.on('data', (chunk) => {
      total += chunk.length
      if (total > maxBytes) {
        reject(new Error('payload_too_large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function setCors(req, res) {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function json(res, status, obj) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(obj))
}

const server = http.createServer(async (req, res) => {
  setCors(req, res)

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    json(res, 200, { ok: true, service: 'portfolio-chat-api' })
    return
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    if (!GROQ_API_KEY) {
      json(res, 503, { error: 'GROQ_API_KEY not configured' })
      return
    }

    const ip = clientIp(req)
    if (!rateLimit(ip)) {
      json(res, 429, { error: 'Too many requests. Please wait a minute.' })
      return
    }

    let body
    try {
      body = JSON.parse(await readBody(req))
    } catch {
      json(res, 400, { error: 'Invalid JSON body' })
      return
    }

    const { messages, language = 'en' } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      json(res, 400, { error: 'messages array required' })
      return
    }

    const trimmed = messages.slice(-20).filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        m.content.length <= 2000,
    )

    if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== 'user') {
      json(res, 400, { error: 'Last message must be a non-empty user message' })
      return
    }

    const lang = language === 'fr' ? 'fr' : 'en'
    await handleChat(req, res, { apiKey: GROQ_API_KEY, language: lang, messages: trimmed })
    return
  }

  json(res, 404, { error: 'Not found' })
})

server.listen(PORT, () => {
  console.log(`Portfolio chat API listening on http://localhost:${PORT}`)
  console.log(`Project root: ${projectRoot}`)
  if (!GROQ_API_KEY) {
    console.warn('Warning: GROQ_API_KEY is not set — /api/chat will return 503')
  }
})
