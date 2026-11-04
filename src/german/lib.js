import nounsRaw from './data/nouns.txt?raw'
import verbsRaw from './data/verbs.txt?raw'
import sepRaw from './data/separable.txt?raw'
import wordsRaw from './data/words.txt?raw'
import phrasesRaw from './data/phrases.txt?raw'

export const PRONOUNS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']

const rows = (raw) => raw.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.split('|'))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const shuffle = (a) => {
  const r = a.slice()
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

// ---------- Відмінювання (Präsens) ----------
const FULL = {
  sein: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
  haben: ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
  werden: ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
  wissen: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
  tun: ['tue', 'tust', 'tut', 'tun', 'tut', 'tun'],
}
// du / er — для дієслів зі зміною кореня
const IRR = {
  geben: ['gibst', 'gibt'], sehen: ['siehst', 'sieht'], lesen: ['liest', 'liest'],
  sprechen: ['sprichst', 'spricht'], nehmen: ['nimmst', 'nimmt'], helfen: ['hilfst', 'hilft'],
  laufen: ['läufst', 'läuft'], fahren: ['fährst', 'fährt'], tragen: ['trägst', 'trägt'],
  halten: ['hältst', 'hält'], fallen: ['fällst', 'fällt'], essen: ['isst', 'isst'],
  treffen: ['triffst', 'trifft'], schlagen: ['schlägst', 'schlägt'], lassen: ['lässt', 'lässt'],
  schlafen: ['schläfst', 'schläft'], waschen: ['wäschst', 'wäscht'], werfen: ['wirfst', 'wirft'],
  fangen: ['fängst', 'fängt'], gelten: ['giltst', 'gilt'], vergessen: ['vergisst', 'vergisst'],
  empfehlen: ['empfiehlst', 'empfiehlt'], raten: ['rätst', 'rät'], erraten: ['errätst', 'errät'],
  verraten: ['verrätst', 'verrät'], laden: ['lädst', 'lädt'], wachsen: ['wächst', 'wächst'],
  messen: ['misst', 'misst'], treten: ['trittst', 'tritt'], sterben: ['stirbst', 'stirbt'],
  fressen: ['frisst', 'frisst'], verlassen: ['verlässt', 'verlässt'], erhalten: ['erhältst', 'erhält'],
  enthalten: ['enthältst', 'enthält'], unterhalten: ['unterhältst', 'unterhält'],
  erfahren: ['erfährst', 'erfährt'], übernehmen: ['übernimmst', 'übernimmt'],
}

const needE = (stem) => /[dt]$/.test(stem) || /(?:[bcdfgkpstvwxz]|ch)[mn]$/.test(stem)

const stemInfo = (inf) => {
  if (inf.endsWith('eln')) { const s = inf.slice(0, -1); return { stem: s, ich: s.slice(0, -2) + 'le' } }
  if (inf.endsWith('ern')) { const s = inf.slice(0, -1); return { stem: s, ich: s + 'e' } }
  const s = inf.slice(0, -2)
  return { stem: s, ich: s + 'e' }
}

export const regularConj = (inf) => {
  const { stem, ich } = stemInfo(inf)
  const e = needE(stem)
  const du = e ? stem + 'est' : /[sßxz]$/.test(stem) ? stem + 't' : stem + 'st'
  const er = e ? stem + 'et' : stem + 't'
  return [ich, du, er, inf, er, inf]
}

export const conj = (inf) => {
  if (FULL[inf]) return FULL[inf].slice()
  const f = regularConj(inf)
  if (IRR[inf]) { f[1] = IRR[inf][0]; f[2] = IRR[inf][1] }
  return f
}

// ---------- Модальні ----------
const MODAL_RAW = [
  ['können', 'вміти, могти', 'уметь, мочь', ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'], 'Ich kann gut schwimmen.', 'Я добре вмію плавати.', 'Я хорошо умею плавать.'],
  ['müssen', 'мусити', 'быть должным', ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'], 'Ich muss jetzt lernen.', 'Мені зараз треба вчитися.', 'Мне сейчас нужно учиться.'],
  ['dürfen', 'мати дозвіл', 'иметь разрешение', ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'], 'Darf ich hier sitzen?', 'Можна мені тут сидіти?', 'Можно мне здесь сидеть?'],
  ['wollen', 'хотіти', 'хотеть', ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'], 'Wir wollen spielen.', 'Ми хочемо гратися.', 'Мы хотим играть.'],
  ['sollen', 'мати слід, бути зобов\'язаним', 'следует, быть обязанным', ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'], 'Du sollst das Heft mitbringen.', 'Ти маєш принести зошит.', 'Ты должен принести тетрадь.'],
  ['mögen', 'любити, подобатися', 'любить, нравиться', ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'], 'Ich mag Katzen.', 'Я люблю котів.', 'Я люблю кошек.'],
  ['möchten', 'хотіти (ввічливо)', 'хотеть (вежливо)', ['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten'], 'Ich möchte ein Eis.', 'Я хотів би морозиво.', 'Я хотел бы мороженое.'],
]

// ---------- Дані ----------
export const DATA = (() => {
  const nouns = rows(nounsRaw).map(([g, de, pl, ua, ru]) => ({ id: de, g, de, pl, ua, ru }))
  const verbs = rows(verbsRaw).map(([inf, ua, ru]) => ({ id: inf, inf, ua, ru, forms: conj(inf) }))
  const sep = rows(sepRaw).map(([pre, base, ua, ru]) => ({
    id: pre + base, pre, base, inf: pre + base, ua, ru,
    forms: conj(base).map((f) => f + ' ' + pre),
  }))
  const words = rows(wordsRaw).map(([de, ua, ru]) => ({ id: de, de, ua, ru }))
  const phrases = rows(phrasesRaw).map(([de, ua, ru]) => ({ id: de, de, ua, ru }))
  const modals = MODAL_RAW.map(([inf, ua, ru, forms, ex, exUa, exRu]) => ({ id: inf, inf, ua, ru, forms, ex, exUa, exRu }))
  return { nouns, verbs, sep, words, phrases, modals }
})()

export const TABS = [
  { id: 'words', ua: 'Словник', ru: 'Словарь' },
  { id: 'phrases', ua: 'Фрази', ru: 'Фразы' },
  { id: 'nouns', ua: 'Іменники', ru: 'Существительные' },
  { id: 'verbs', ua: 'Дієслова', ru: 'Глаголы' },
  { id: 'modals', ua: 'Модальні', ru: 'Модальные' },
  { id: 'sep', ua: 'Відокремлювані', ru: 'Отделяемые' },
  { id: 'past', ua: 'Минулий час', ru: 'Прошедшее' },
  { id: 'cases', ua: 'Відмінки', ru: 'Падежи' },
]

// ---------- Артиклі ----------
const NOM = { m: 'der', f: 'die', n: 'das' }
const AKK = { m: 'den', f: 'die', n: 'das' }
export const KEIN_NOM = { der: 'kein', die: 'keine', das: 'kein' }
export const KEIN_AKK = { den: 'keinen', die: 'keine', das: 'kein', der: 'keiner' }
export const KEIN_PL = { die: 'keine', der: 'keiner', das: 'keines' }
export const articleSet = (g) => ({ nom: NOM[g], akk: AKK[g], pl: 'die' })

export const keinSet = (s) => ({ nom: KEIN_NOM[s.nom], akk: KEIN_AKK[s.akk], pl: KEIN_PL[s.pl] })
const sk = (s) => s.nom + '/' + s.akk + '/' + s.pl

// ---------- Питання ----------
const uniqueFill = (correctKey, cands, mk) => {
  const seen = new Set([correctKey])
  const out = []
  for (const c of shuffle(cands)) {
    const k = mk(c)
    if (!seen.has(k)) { seen.add(k); out.push(c) }
    if (out.length === 3) break
  }
  return out
}

const wrongForms = (inf, correct, base, pre) => {
  const reg = regularConj(inf)
  const join = (f) => (pre ? f.map((x) => x + ' ' + pre) : f)
  const { stem } = stemInfo(inf)
  const c = []
  c.push(join(reg))
  c.push(join([correct0(correct, pre)[0], correct0(correct, pre)[2], correct0(correct, pre)[1], ...correct0(correct, pre).slice(3)]))
  const a = correct0(correct, pre)
  c.push(join([a[0], a[1], a[2], a[4], a[3], a[5]]))
  c.push(join([stem + 'en', a[1], a[2], a[3], a[4], stem + 't']))
  const ae = a.map((x) => x)
  const e = needE(stem)
  c.push(join([a[0], e ? stem + 'st' : stem + 'est', e ? stem + 't' : stem + 'et', a[3], e ? stem + 't' : stem + 'et', a[5]]))
  if (/a/.test(stem) && !IRR[inf]) c.push(join([a[0], stem.replace('a', 'ä') + 'st', stem.replace('a', 'ä') + 't', a[3], a[4], a[5]]))
  else if (/e/.test(stem) && !IRR[inf]) c.push(join([a[0], stem.replace('e', 'i') + 'st', stem.replace('e', 'i') + 't', a[3], a[4], a[5]]))
  c.push(join([a[0], a[1], a[2], a[3], a[3], a[5]]))
  if (pre) {
    c.push(correct0(correct, pre).map((x) => pre + x))
    c.push(correct0(correct, pre).map((x) => pre + ' ' + x))
    c.push(correct0(correct, pre).map((x, i) => (i % 2 ? pre + x : x + ' ' + pre)))
  }
  return c
}
// повертає форми без префікса
const correct0 = (forms, pre) => (pre ? forms.map((f) => f.slice(0, f.length - pre.length - 1)) : forms)

export const makeQuestion = (tab, item, lang) => {
  const pool = DATA[tab]
  if (tab === 'words' || tab === 'phrases') {
    const rev = tab === 'words' && Math.random() < 0.35
    const others = shuffle(pool.filter((x) => x.id !== item.id && x[lang] !== item[lang])).slice(0, 3)
    const opts = shuffle([item, ...others])
    return rev
      ? { kind: 'tr', item, prompt: { main: item[lang], sub: null, hideTrans: true }, options: opts.map((o) => ({ label: o.de })), correct: opts.indexOf(item) }
      : { kind: 'tr', item, prompt: { main: item.de, sub: item[lang] }, options: opts.map((o) => ({ label: o[lang] })), correct: opts.indexOf(item) }
  }
  if (tab === 'nouns') {
    const right = articleSet(item.g)
    const cands = []
    for (const n of ['der', 'die', 'das']) for (const a of ['den', 'die', 'das']) for (const p of ['die', 'der']) {
      const s = { nom: n, akk: a, pl: p }
      const same = (n === right.nom) + (a === right.akk) + (p === right.pl)
      if (same === 3) continue
      if (same >= 1) cands.push(s)
    }
    const wrong = uniqueFill(sk(right), cands, sk)
    const opts = shuffle([right, ...wrong])
    return { kind: 'art', item, prompt: { main: item.de, sub: item[lang] }, options: opts.map((s) => ({ set: s, kein: keinSet(s) })), correct: opts.findIndex((s) => sk(s) === sk(right)) }
  }
  // verbs / modals / sep
  const correct = item.forms
  const pre = tab === 'sep' ? item.pre : ''
  let cands = []
  if (tab === 'modals') {
    const a = correct
    cands = [
      [a[0], a[1], a[2], a[4], a[3], a[5]],
      [a[3].replace(/n$/, ''), a[1], a[2], a[3], a[4], a[5]],
      [a[0] + 'e', a[1], a[2], a[3], a[4], a[5]],
      [a[1], a[0], a[2], a[3], a[4], a[5]],
      [a[0], a[1], a[2] + 't', a[3], a[4], a[5]],
      [a[3], a[1], a[3], a[3], a[4], a[5]],
      [a[0], a[1], a[2], a[3], a[3], a[5]],
    ]
  } else {
    cands = wrongForms(tab === 'sep' ? item.base : item.inf, correct, item.base, pre)
  }
  const wrong = uniqueFill(correct.join('|'), cands, (x) => x.join('|'))
  while (wrong.length < 3) {
    const base = wrong.length ? wrong[0] : correct
    const w = base.slice(); const i = Math.floor(Math.random() * 6)
    w[i] = w[i] + 'e'
    if (w.join('|') !== correct.join('|') && !wrong.some((x) => x.join('|') === w.join('|'))) wrong.push(w)
  }
  const opts = shuffle([correct, ...wrong])
  const key = correct.join('|')
  return { kind: 'forms', item, prompt: { main: item.inf, sub: item[lang] }, options: opts.map((f) => ({ forms: f })), correct: opts.findIndex((f) => f.join('|') === key) }
}

// ---------- Вибір питань за статистикою ----------
const LAST = {}
export const pickItems = (tab, stats, n = 10, ext, only) => {
  let pool = ext || (tab === 'nouns' ? DATA.nouns.filter((n) => n.pl !== '-') : DATA[tab])
  if (only) pool = pool.filter((it) => only.has(String(it.id)))
  // не повторюємо попередній раунд, якщо є з чого вибирати
  const prev = only ? null : LAST[tab]
  if (prev && pool.length - prev.size >= n) pool = pool.filter((it) => !prev.has(it.id))
  const weighted = pool.map((it) => {
    const s = stats[tab + ':' + it.id] || { ok: 0, bad: 0 }
    return { it, w: 1 }
  })
  const out = []
  const cp = weighted.slice()
  const target = Math.min(n, cp.length)
  while (out.length < target) {
    const tot = cp.reduce((a, b) => a + b.w, 0)
    let r = Math.random() * tot
    let idx = 0
    for (; idx < cp.length; idx++) { r -= cp[idx].w; if (r <= 0) break }
    idx = Math.min(idx, cp.length - 1)
    out.push(cp[idx].it); cp.splice(idx, 1)
  }
  LAST[tab] = new Set(out.map((x) => x.id))
  return shuffle(out)
}

// кількість різних питань у базі розділу
export const poolSize = (tab, ext) => (ext ? ext.length : tab === 'nouns' ? DATA.nouns.filter((n) => n.pl !== '-').length : (DATA[tab] || []).length)
