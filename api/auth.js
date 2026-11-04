// Реєстрація і вхід. Пароль зберігається як scrypt-хеш із сіллю; сесія — випадковий токен (у базі лише його sha256).
import crypto from 'node:crypto'
import { cmd, dbReady } from './_db.js'

// Початкові акаунти (sha256 від "логін:пароль"); створюються в базі при першому вході.
const SEED = {
  platon: { name: 'Platon', hash: 'a4b80ffb5761a33128d4199d32d24e6517774e0b6b04fbefa14d5b1aa418cf31' },
  anna: { name: 'Anna Oleksandrovna❤️', hash: 'bf4281c9e33af49fbe1f1390f51aa89b6dd05a55f2052223ea6f72545ffe1f9d' },
  andrii: { name: 'Andrii', hash: '24c9e12839d61e13cc7fd34c718e5d188094048582b7cbac36a5c5c075457adf' },
}

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex')
const scrypt = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex')
const same = (a, b) => {
  const x = Buffer.from(a, 'hex'); const y = Buffer.from(b, 'hex')
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}
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
      if (SEED[login]) return res.status(409).json({ error: 'exists' })
      const salt = crypto.randomBytes(16).toString('hex')
      const rec = { login, name: raw, salt, hash: scrypt(password, salt), tokens: [sha(token)], created: Date.now() }
      const ok = await cmd('SET', key, JSON.stringify(rec), 'NX')
      if (!ok) return res.status(409).json({ error: 'exists' })
      return res.status(200).json({ token, login, name: raw, state: null })
    }

    if (action === 'login') {
      const fk = 'f:' + login
      const fails = Number(await cmd('GET', fk)) || 0
      if (fails >= 5) return res.status(429).json({ error: 'locked' })
      let rec = null
      const cur = await cmd('GET', key)
      if (cur) rec = JSON.parse(cur)
      else if (SEED[login] && sha(login + ':' + password) === SEED[login].hash) {
        const salt = crypto.randomBytes(16).toString('hex')
        rec = { login, name: SEED[login].name, salt, hash: scrypt(password, salt), tokens: [], created: Date.now() }
      }
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
