import { DATA, makeQuestion, shuffle } from './lib'
import { PAST, makePastQuestion } from './past'

export const NEED_OK = 5

// ключ + знімок питання для вкладки «Помилки»
export const toMistake = (q) => {
  if (q.item) return { key: `${q.tab}:${q.item.id}`, tab: q.tab, id: q.item.id, done: 0 }
  const sig = q.kind + '|' + (q.parts ? q.parts.map((p) => p.v).join('') : q.main || '')
  return { key: `cases:${sig}`, tab: 'cases', q: JSON.parse(JSON.stringify({ ...q, tab: 'cases' })), done: 0 }
}

export const buildErrorRound = (mistakes, lang, n = 10) => {
  const list = shuffle(Object.entries(mistakes)).slice(0, n)
  const out = []
  for (const [key, m] of list) {
    let q = null
    if (m.q) q = { ...m.q }
    else {
      const pool = m.tab === 'past' ? PAST : DATA[m.tab]
      const item = pool && pool.find((x) => x.id === m.id)
      if (item) q = m.tab === 'past' ? makePastQuestion(item, lang) : makeQuestion(m.tab, item, lang)
    }
    if (q) out.push({ ...q, tab: m.tab, mkey: key, mdone: m.done || 0 })
  }
  return out
}

// злиття локального та серверного стану
export const mergeState = (a, b) => {
  const stats = { ...(a.stats || {}) }
  for (const [k, v] of Object.entries(b.stats || {})) {
    const c = stats[k] || { ok: 0, bad: 0 }
    stats[k] = { ok: Math.max(c.ok, v.ok), bad: Math.max(c.bad, v.bad) }
  }
  const mistakes = { ...(a.mistakes || {}) }
  for (const [k, v] of Object.entries(b.mistakes || {})) {
    mistakes[k] = mistakes[k] ? { ...mistakes[k], done: Math.max(mistakes[k].done || 0, v.done || 0) } : v
  }
  return { stats, mistakes }
}
