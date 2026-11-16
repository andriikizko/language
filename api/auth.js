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
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  if (!dbReady()) return res.status(503).json({ error: 'no_db' })
  try {
    const { action, password } = req.body || {}

    // Вхід через Google: перевіряємо ID-токен, беремо лише email.
    if (action === 'google') {
      const cid = process.env.GOOGLE_CLIENT_ID
      if (!cid) return res.status(503).json({ error: 'no_google' })
      const credential = String((req.body || {}).credential || '')
      if (!credential) return res.status(400).json({ error: 'bad_request' })
      const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential))
      const g = await r.json()
      const okAud = g.aud === cid
      const email = String(g.email || '').toLowerCase()
      if (!r.ok || !okAud || String(g.email_verified) !== 'true' || !validEmail(email)) return res.status(401).json({ error: 'google_failed' })
      const gkey = 'u:' + email
      const token = crypto.randomBytes(32).toString('hex')
      const cur = await cmd('GET', gkey)
      let rec
      if (cur) rec = JSON.parse(cur)
      else rec = { login: email, name: '', email, google: true, phone: '', consent: null, tokens: [], created: Date.now() }
      rec.tokens = [...(rec.tokens || []), sha(token)].slice(-10)
      await cmd('SET', gkey, JSON.stringify(rec))
      const st = await cmd('GET', 's:' + email)
      return res.status(200).json({ token, login: email, name: rec.name || '', needProfile: !rec.name || rec.consent === null, consent: rec.consent === true, state: st ? JSON.parse(st) : null })
    }

    // Дозаповнення профілю після Google-входу: ім'я, телефон, згода.
    if (action === 'profile') {
      const b = req.body || {}
      const lg = String(b.login || '').trim().toLowerCase()
      const raw = await cmd('GET', 'u:' + lg)
      if (!raw) return res.status(401).json({ error: 'auth' })
      const rec = JSON.parse(raw)
      if (!(rec.tokens || []).includes(sha(String(b.token || '')))) return res.status(401).json({ error: 'auth' })
      const name = String(b.name || '').trim().slice(0, 60)
      const phone = String(b.phone || '').trim()
      if (!name) return res.status(400).json({ error: 'bad_name' })
      if (phone && !validPhone(phone)) return res.status(400).json({ error: 'bad_phone' })
      rec.name = name; rec.phone = phone; rec.consent = b.consent === true
      await cmd('SET', 'u:' + lg, JSON.stringify(rec))
      return res.status(200).json({ ok: true, name, consent: rec.consent })
    }
    const raw = String((req.body || {}).login || '').trim()
    const login = raw.toLowerCase()
    if (!validLogin(login)) return res.status(400).json({ error: 'bad_login' })
    if (typeof password !== 'string' || password.length < 4 || password.length > 100) return res.status(400).json({ error: 'bad_password' })
    const key = 'u:' + login
    const token = crypto.randomBytes(32).toString('hex')

    // Видалення акаунта й усіх даних (вимога Google Play) та зміна згоди на розсилку.
    if (action === 'delete' || action === 'consent') {
      const b = req.body || {}
      const lg = String(b.login || '').trim().toLowerCase()
      const raw = lg ? await cmd('GET', 'u:' + lg) : null
      if (!raw) return res.status(401).json({ error: 'auth' })
      const rec = JSON.parse(raw)
      if (!(rec.tokens || []).includes(sha(String(b.token || '')))) return res.status(401).json({ error: 'auth' })
      if (action === 'delete') { await cmd('DEL', 'u:' + lg); await cmd('DEL', 's:' + lg); return res.status(200).json({ ok: true }) }
      rec.consent = b.consent === true
      await cmd('SET', 'u:' + lg, JSON.stringify(rec))
      return res.status(200).json({ ok: true })
    }

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
      return res.status(200).json({ token, login, name: raw, consent, state: null })
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
      return res.status(200).json({ token, login, name: rec.name, consent: rec.consent === true, state: st ? JSON.parse(st) : null })
    }
    return res.status(400).json({ error: 'bad_action' })
  } catch (e) {
    console.error('auth error', e)
    return res.status(500).json({ error: 'server' })
  }
}
