import nounsData from './data/nouns.json'
import verbs from './data/verbs.json'
import dict from './data/dict.json'
import course from './data/course.json'
import grammar from './data/grammar.json'
import exam from './data/exam.json'
import course2 from './data/course_a2.json'
import grammar2 from './data/grammar_a2.json'
import exam2 from './data/exam_a2.json'

export const EXAM = exam

export const BLOCKS = course
export const GRAMMAR = grammar
export const FREE_GRAMMAR = 4
export const LEVELS = {
  a1: { name: 'A1', blocks: course, grammar, exam, xp: 'x', free: 3, freeG: 4 },
  a2: { name: 'A2', blocks: course2, grammar: grammar2, exam: exam2, xp: 'y', free: 0, freeG: 0 },
}
export const cleanDe = (s) => s.replace(/\d[\d,.\s]*[€%]?\s*\(([^)]+)\)/g, '$1').replace(/\s+/g, ' ').trim()
export const FREE_BLOCKS = 3
const ART = { m: 'der', f: 'die', n: 'das', p: 'die' }
const byDe = {}
nounsData.words.forEach((w) => { if (!byDe[w.de]) byDe[w.de] = w })
const nounByKey = Object.fromEntries(nounsData.words.map((w) => [w.de + '|' + w.g, w]))
const verbByDe = Object.fromEntries(verbs.map((v) => [v.de, v]))
const adjByDe = Object.fromEntries(dict.adj.map((a) => [a.de, a]))

export const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]] } return r }
export const pick = (a, n) => shuffle(a).slice(0, n)
export const blockById = (id) => { for (const L of Object.values(LEVELS)) { const f = L.blocks.find((b) => b.id === id) || L.grammar.find((b) => b.id === id); if (f) return f } return undefined }

export const blockWords = (b) => {
  const nouns = typeof b.nouns === 'string' ? nounsData.words.filter((w) => w.topic === b.nouns) : b.nouns.map((d) => byDe[d]).filter(Boolean)
  let adjs = []
  if (b.adjs === 'colors') adjs = dict.adj.filter((a) => a.topic === 'colors')
  else if (b.adjs === 'food') adjs = dict.adj.filter((a) => a.topic === 'food')
  else if (b.adjs === 'feel') adjs = b.adjlist?.length ? b.adjlist.map((d) => adjByDe[d]).filter(Boolean) : dict.adj.filter((a) => a.topic === 'feel')
  else adjs = (b.adjlist || []).map((d) => adjByDe[d]).filter(Boolean)
  return { nouns, adjs, verbs: (b.verbs || []).map((d) => verbByDe[d]).filter(Boolean) }
}

// --- числа ---
const U = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
const T = { 2: 'zwanzig', 3: 'dreißig', 4: 'vierzig', 5: 'fünfzig', 6: 'sechzig', 7: 'siebzig', 8: 'achtzig', 9: 'neunzig' }
export const card = (n) => {
  if (n < 20) return U[n]
  if (n === 100) return 'hundert'
  const t = Math.floor(n / 10), u = n % 10
  return u === 0 ? T[t] : (u === 1 ? 'ein' : U[u]) + 'und' + T[t]
}

const tr = (o, lang) => o[lang]
const withArt = (w) => (w.g === 'p' ? 'die ' : ART[w.g] + ' ') + w.de
const L = (o, lang) => (typeof o === 'object' ? o[lang] : o)

// id формати:  w|tr|n:Tisch:m   w|art|Tisch:m   w|pl|Tisch:m   w|de|n:Tisch:m   g|block|i   n|37   l|block|d|q
const itemOf = (kind, key) => {
  if (kind === 'n') { const [de, g] = key.split(':'); return { kind, ...nounByKey[de + '|' + g] } }
  if (kind === 'a') return { kind, ...adjByDe[key] }
  return { kind, ...verbByDe[key] }
}
const labelDe = (it) => (it.kind === 'n' ? withArt(it) : it.kind === 'v' ? it.de : it.de)
const idOf = (kind, it) => (kind === 'n' ? `n:${it.de}:${it.g}` : `${kind}:${it.de}`)

export const makeQuestion = (id, lang) => {
  const [t, ...r] = id.split('|')
  if (t === 'w') {
    const [mode, key] = r
    const [kind, ...rest] = key.split(':')
    const it = itemOf(kind, rest.join(':'))
    if (mode === 'art') {
      return { id, de: true, type: 'choice', hint: 'Який артикль?', prompt: it.de, sub: it[lang], opts: ['der', 'die', 'das'], correct: ['m', 'f', 'n'].indexOf(it.g),
        explain: `${withArt(it)} — ${it[lang]}.${it.pl ? ' Множина: die ' + it.pl + '.' : ''}` }
    }
    if (mode === 'pl') {
      return { id, de: true, type: 'type', hint: 'Напиши множину (die …)', prompt: withArt(it), sub: it[lang], answer: it.pl,
        explain: `${withArt(it)} → die ${it.pl} (${it[lang]}).` }
    }
    const pool = kind === 'n' ? nounsData.words : kind === 'a' ? dict.adj : verbs
    const seen = new Set([it[lang]]); const others = shuffle(pool.filter((x) => x.de !== it.de && x[lang] !== it[lang])).filter((x) => { if (seen.has(x[lang])) return false; seen.add(x[lang]); return true }).slice(0, 3)
    if (mode === 'tr') {
      const opts = shuffle([it[lang], ...others.map((o) => o[lang])])
      return { id, de: true, type: 'choice', hint: 'Обери переклад', prompt: labelDe(it), opts, correct: opts.indexOf(it[lang]),
        explain: `${labelDe(it)} — ${it[lang]}.${it.f ? ' ' + it.f[0] + ', ' + it.f[1] + ', ' + it.f[2] + '…' : ''}` }
    }
    const lab = (x) => labelDe({ kind, ...x })
    const opts = shuffle([labelDe(it), ...others.map(lab)])
    return { id, type: 'choice', hint: 'Як це німецькою?', prompt: it[lang], opts, correct: opts.indexOf(labelDe(it)), explain: `${it[lang]} — ${labelDe(it)}.` }
  }
  if (t === 'g') {
    const b = blockById(r[0]); const g = b.gaps[+r[1]]
    const opts = shuffle([g.a, ...g.w])
    const wmap = {}; if (g.y) g.w.forEach((w, k) => { if (g.y[k]) wmap[w] = g.y[k][lang === 'ru' ? 1 : 0] })
    return { id, de: true, type: 'choice', hint: 'Встав пропущене слово', prompt: g.s, sub: g[lang], opts, correct: opts.indexOf(g.a),
      explain: `${g.s.replace('___', g.a)} — ${g[lang].replace('___', g.a)}`, tpl: g.s, wmap, block: b.id }
  }
  if (t === 'e') {
    const b = blockById(r[0]); const g = b.gaps[+r[1]]
    const fill = (x) => g.s.replace('___', x).replace(/\s*\([^)]*\)/g, '').trim()
    const opts = shuffle([fill(g.a), ...g.w.map(fill)])
    const wmap = {}; if (g.y) g.w.forEach((w, k) => { if (g.y[k]) wmap[fill(w)] = g.y[k][lang === 'ru' ? 1 : 0] })
    return { id, type: 'choice', hint: 'Яке речення правильне?', prompt: g[lang].replace('___', '…'), opts, correct: opts.indexOf(fill(g.a)),
      explain: `${fill(g.a)} — ${g[lang]}`, wmap, block: b.id }
  }
  if (t === 'd') {
    const b = blockById(r[0]); const sn = b.topic.s[+r[1]]; const clean = cleanDe(sn.de)
    return { id, type: 'type', hint: 'Диктант: прослухай і напиши німецькою', prompt: '', audio: [clean], audioLabel: '▶ Прослухати речення', answer: clean, explain: `${sn.de} — ${sn[lang]}`, block: b.id }
  }
  if (t === 'o') {
    const b = blockById(r[0]); const sn = b.topic.s[+r[1]]; const clean = cleanDe(sn.de)
    return { id, type: 'order', hint: 'Склади речення', prompt: sn[lang], tokens: shuffle(clean.split(' ')), answer: clean, explain: `${sn.de} — ${sn[lang]}`, block: b.id }
  }
  if (t === 'n') {
    const n = +r[0]
    const cands = new Set([n + 1, n - 1, n + 10, n - 10, +String(n).split('').reverse().join('')])
    const wrong = shuffle([...cands].filter((x) => x !== n && x > 0 && x <= 100)).slice(0, 3)
    const opts = shuffle([card(n), ...wrong.map(card)])
    return { id, type: 'choice', hint: 'Як це німецькою?', prompt: String(n), opts, correct: opts.indexOf(card(n)), explain: `${n} = ${card(n)}` }
  }
  if (t === 'l') {
    const b = blockById(r[0]); const d = b.dialogs[+r[1]]; const q = d.qs[+r[2]]
    const idx = shuffle(q.o.map((_, i) => i))
    return { id, type: 'choice', hint: 'Діалог: «' + d.title + '»', prompt: q[lang], opts: idx.map((i) => q.o[i][lang]), correct: idx.indexOf(q.c),
      explain: `Правильна відповідь: ${q.o[q.c][lang]}.`, block: b.id, dialog: +r[1] }
  }
  if (t === 'x' || t === 'y') {
    const x = (t === 'x' ? exam : exam2)[+r[0]]
    const idx = x.o.length === 3 ? shuffle(x.o.map((_, i) => i)) : x.o.map((_, i) => i)
    return { id, type: 'choice', hint: { lesen: 'Lesen', schreiben: 'Schreiben', hoeren: 'Hören' }[x.sec], prompt: x.q, text: x.text, audio: x.audio,
      opts: idx.map((i) => x.o[i]), correct: idx.indexOf(x.c), explain: `Правильна відповідь: ${x.o[x.c]}.` }
  }
  return null
}

const wid = (mode, kind, it) => `w|${mode}|${idOf(kind, it)}`
export const poolFor = (b, mode) => {
  if (b.kind === 'grammar') return mode === 'gap' ? b.gaps.map((_, i) => `g|${b.id}|${i}`) : mode === 'err' ? b.gaps.map((_, i) => `e|${b.id}|${i}`) : []
  const w = blockWords(b)
  const core = (x) => x.filter((i) => i.core)
  const nn = core(w.nouns).length >= 4 ? core(w.nouns) : w.nouns
  if (mode === 'tr') return [...nn.map((i) => wid('tr', 'n', i)), ...core(w.adjs).map((i) => wid('tr', 'a', i)), ...w.verbs.filter((v) => v.core).map((i) => wid('tr', 'v', i))]
  if (mode === 'de') return [...nn.map((i) => wid('de', 'n', i)), ...w.adjs.map((i) => wid('de', 'a', i))]
  if (mode === 'art') return w.nouns.filter((i) => i.g !== 'p').map((i) => wid('art', 'n', i))
  if (mode === 'pl') return w.nouns.filter((i) => i.pl && i.g !== 'p').map((i) => wid('pl', 'n', i))
  if (mode === 'gap') return b.gaps.map((_, i) => `g|${b.id}|${i}`)
  if (mode === 'err') return b.gaps.map((_, i) => `e|${b.id}|${i}`)
  if (mode === 'dict') return b.topic.s.map((x, i) => [x, i]).filter(([x]) => { const n = cleanDe(x.de).split(' ').length; return n >= 3 && n <= 9 }).map(([, i]) => `d|${b.id}|${i}`)
  if (mode === 'num') return Array.from({ length: 30 }, () => 'n|' + (13 + Math.floor(Math.random() * 87)))
  if (mode === 'order') return b.topic.s.map((x, i) => [x, i]).filter(([x]) => { const n = cleanDe(x.de).split(' ').length; return n >= 3 && n <= 9 }).map(([, i]) => `o|${b.id}|${i}`)
  if (mode === 'listen') return b.dialogs.flatMap((d, di) => d.qs.map((_, qi) => `l|${b.id}|${di}|${qi}`))
  return []
}
export const session = (b, mode, n = 10) => pick(poolFor(b, mode), n)
export const testSet = (b) => {
  const parts = [...pick(poolFor(b, 'tr'), 4), ...pick(poolFor(b, 'art'), 3), ...pick(poolFor(b, 'pl'), 2), ...pick(poolFor(b, 'gap'), 5), ...pick(poolFor(b, 'listen'), 2)]
  if (b.numq) parts.push(...pick(poolFor(b, 'num'), 3))
  return shuffle(parts)
}
export const finalSet = (level = 'a1') => shuffle(LEVELS[level].blocks.flatMap((b) => {
  const w = blockWords(b); const core = w.nouns.filter((n) => n.core && n.g !== 'p')
  const ids = pick(core, 4).flatMap((n, i) => [`w|${i % 2 ? 'art' : 'tr'}|n:${n.de}:${n.g}`])
  return ids
}))
export const speak = (text) => {
  try { if (!('speechSynthesis' in window)) return; const u = new SpeechSynthesisUtterance(text); u.lang = 'de-DE'; u.rate = 0.9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u) } catch { /* ignore */ }
}
export const speakAll = (texts) => {
  try {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    texts.forEach((t) => { const u = new SpeechSynthesisUtterance(t); u.lang = 'de-DE'; u.rate = 0.9; window.speechSynthesis.speak(u) })
  } catch { /* ignore */ }
}
export { L }

// Інтервальне повторення: коробки 0..5, інтервали в днях.
const GAP = [0, 1, 3, 7, 14, 30]
export const srsUpdate = (srs, id, ok) => {
  const box = ok ? Math.min(5, ((srs || {})[id]?.b ?? -1) + 1) : 0
  return { ...(srs || {}), [id]: { b: box, d: Date.now() + GAP[box] * 864e5 } }
}
export const srsDue = (srs) => Object.entries(srs || {}).filter(([, v]) => v.d <= Date.now()).map(([k]) => k)
export const examIds = (sec, level = 'a1') => LEVELS[level].exam.map((x, i) => [x, i]).filter(([x]) => x.sec === sec).map(([, i]) => LEVELS[level].xp + '|' + i)
