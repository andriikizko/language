// Збереження і читання прогресу акаунта.
import crypto from 'node:crypto'
import { cmd, dbReady } from './_db.js'

const MAX = 400 * 1024
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  if (!dbReady()) return res.status(503).json({ error: 'no_db' })
  try {
    const { token, state } = req.body || {}
    const login = String((req.body || {}).login || '').trim().toLowerCase()
    if (!login || typeof token !== 'string') return res.status(400).json({ error: 'bad_request' })
    const cur = await cmd('GET', 'u:' + login)
    if (!cur || !(JSON.parse(cur).tokens || []).includes(sha(token))) return res.status(401).json({ error: 'auth' })
    if (state !== undefined && state !== null) {
      const str = JSON.stringify(state)
      if (str.length > MAX) return res.status(413).json({ error: 'too_big' })
      await cmd('SET', 's:' + login, str)
      return res.status(200).json({ ok: true })
    }
    const st = await cmd('GET', 's:' + login)
    return res.status(200).json({ state: st ? JSON.parse(st) : null })
  } catch (e) {
    console.error('sync error', e)
    return res.status(500).json({ error: 'server' })
  }
}
