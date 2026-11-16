// Реєстрація і вхід. Пароль зберігається як scrypt-хеш із сіллю; сесія — випадковий токен (у базі лише його sha256).
import crypto from 'node:crypto'
import { cmd, dbReady } from './_db.js'

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex')
const scrypt = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex')
const same = (a, b) => {
  const x = Buffer.from(a, 'hex'); const y = Buffer.from(b, 'hex')
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 120
const validPhone = (p) => /^\+?[0-9 ()\-]{7,20}$/.test(p)
const validLogin = (l) => /^[\p{L}\p{N}_.\-]{3,32}$/u.test(l)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  if (!dbReady()) return res.status(503).json({ error: 'no_db' })
  try {
    const { action, password } = req.body || {}
    const raw = String((req.body || {}).login || '').trim()
    const login = raw.toLowerCase()
    if (!validLogin(login)) return res.status(400).json({ error: 'bad_login' })
    if (typeof password !== 'string' || password.length < 4 || password.length > 100) return res.status(400).json({ error: 'bad_password' })
    const key = 'u:' + login
    const token = crypto.randomBytes(32).toString('hex')

    if (action === 'register') {
      const email = String((req.body || {}).email || '').trim().toLowerCase()
      const phone = String((req.body || {}).phone || '').trim()
      if (!validEmail(email)) return res.status(400).json({ error: 'bad_email' })
      if (phone && !validPhone(phone)) return res.status(400).json({ error: 'bad_phone' })
      const consent = (req.body || {}).consent === true
      const salt = crypto.randomBytes(16).toString('hex')
      const rec = { login, name: raw, salt, hash: scrypt(password, salt), email, phone, consent, tokens: [sha(token)], created: Date.now() }
      const ok = await cmd('SET', key, JSON.stringify(rec), 'NX')
      if (!ok) return res.status(409).json({ error: 'exists' })
      return res.status(200).json({ token, login, name: raw, state: null })
    }

    if (action === 'login') {
      const fk = 'f:' + login
      const fails = Number(await cmd('GET', fk)) || 0
      if (fails >= 5) return res.status(429).json({ error: 'locked' })
      const cur = await cmd('GET', key)
      const rec = cur ? JSON.parse(cur) : null
      if (!rec || !same(scrypt(password, rec.salt), rec.hash)) {
        await cmd('INCR', fk)
        await cmd('EXPIRE', fk, 60)
        return res.status(401).json({ error: 'wrong' })
      }
      await cmd('DEL', fk)
      rec.tokens = [...(rec.tokens || []), sha(token)].slice(-10)
      await cmd('SET', key, JSON.stringify(rec))
      const st = await cmd('GET', 's:' + login)
      return res.status(200).json({ token, login, name: rec.name, state: st ? JSON.parse(st) : null })
    }
    return res.status(400).json({ error: 'bad_action' })
  } catch (e) {
    console.error('auth error', e)
    return res.status(500).json({ error: 'server' })
  }
}
