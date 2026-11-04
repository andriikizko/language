import { DATA, conj, shuffle } from './lib'

export const CASES = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv']
export const QW = ['Wer/Was?', 'Wen/Was?', 'Wem?', 'Wessen?']

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const wpick = (pairs) => {
  const tot = pairs.reduce((a, p) => a + p[1], 0)
  let r = Math.random() * tot
  for (const [v, w] of pairs) { r -= w; if (r <= 0) return v }
  return pairs[0][0]
}

// ---------- Таблиці ----------
const DEF = { m: ['der', 'den', 'dem', 'des'], f: ['die', 'die', 'der', 'der'], n: ['das', 'das', 'dem', 'des'], p: ['die', 'die', 'den', 'der'] }
const END = { m: ['', 'en', 'em', 'es'], f: ['e', 'e', 'er', 'er'], n: ['', '', 'em', 'es'], p: ['e', 'e', 'en', 'er'] }
export const GENDER_LABEL = { m: 'Maskulin', f: 'Feminin', n: 'Neutrum', p: 'Plural' }

export const detForm = (fam, g, ci) => {
  if (fam === 'def') return DEF[g][ci]
  if (fam === 'ein' && g === 'p') return null
  const end = END[g][ci]
  const stem = fam === 'euer' && end ? 'eur' : fam
  return stem + end
}

// ---------- Іменники ----------
const WEAK = {
  Mensch: ['Menschen', 'Menschen'], Junge: ['Jungen', 'Jungen'], Nachbar: ['Nachbarn', 'Nachbarn'],
  Gedanke: ['Gedanken', 'Gedankens'], Name: ['Namen', 'Namens'], Herr: ['Herrn', 'Herrn'],
  Planet: ['Planeten', 'Planeten'], Buchstabe: ['Buchstaben', 'Buchstabens'],
}
const SAFE_ES = new Set(['Hund', 'Kind', 'Buch', 'Tag', 'Weg', 'Bild', 'Wort', 'Zug', 'Sohn', 'Baum', 'Hut', 'Bett', 'Tier', 'Mann', 'Ball', 'Heft', 'Brief'])

const genSg = (n) => {
  const w = n.de
  if (n.g === 'f') return w
  if (WEAK[w]) return WEAK[w][1]
  if (/(s|ß|x|z|sch|tz)$/.test(w)) return w + 'es'
  if (/e$/.test(w)) return w + 's'
  const syl = (w.toLowerCase().match(/[aeiouäöüy]+/g) || []).length
  if (syl >= 2) return w + 's'
  return SAFE_ES.has(w) ? w + 'es' : null
}
const datPl = (pl) => (/[ns]$/.test(pl) ? pl : pl + 'n')

// форма іменника: ci 0..3, plural true/false
export const nounForm = (n, ci, plural) => {
  if (plural) return ci === 2 ? datPl(n.pl) : n.pl
  if (ci === 3) return genSg(n)
  if (WEAK[n.de] && ci > 0) return WEAK[n.de][0]
  return n.de
}

const noun = (id) => DATA.nouns.find((n) => n.de === id)
const grp = (ids) => ids.map(noun).filter((n) => n && n.pl !== '-')
const P = grp(['Bruder', 'Vater', 'Mutter', 'Schwester', 'Freund', 'Freundin', 'Lehrerin', 'Lehrer', 'Nachbar', 'Nachbarin', 'Junge', 'Kind', 'Sohn', 'Tochter', 'Schüler', 'Schülerin', 'Mitschüler', 'Direktorin'])
const OBJ = grp(['Buch', 'Heft', 'Auto', 'Handy', 'Tasche', 'Jacke', 'Mütze', 'Ball', 'Computer', 'Rucksack', 'Schlüssel', 'Koffer', 'Apfel', 'Brief', 'Foto', 'Bild'])
const ANI = grp(['Hund', 'Katze', 'Pferd'])
const PT = [...P, ...OBJ, ...ANI]
const PM = [...P, ...ANI, ...grp(['Ball', 'Computer', 'Handy', 'Auto'])]
const FAM = grp(['Bruder', 'Vater', 'Mutter', 'Schwester', 'Freund', 'Freundin', 'Nachbar', 'Nachbarin'])
const LOC = grp(['Zimmer', 'Haus', 'Stadt', 'Küche', 'Keller', 'Schule'])
const LOC_THROUGH = grp(['Zimmer', 'Haus', 'Wald', 'Park', 'Stadt', 'Küche'])
const LOC_AROUND = grp(['Haus', 'Park', 'Tisch', 'Wald'])
const WALL = grp(['Fenster', 'Tür', 'Tisch', 'Baum', 'Haus'])
const BUY = grp(['Buch', 'Heft', 'Auto', 'Handy', 'Tasche', 'Jacke', 'Mütze', 'Ball', 'Computer', 'Rucksack', 'Koffer', 'Apfel'])
const OPENABLE = grp(['Tür', 'Fenster', 'Tasche', 'Koffer', 'Rucksack', 'Buch', 'Heft'])

const FAMS = [['def', 2], ['ein', 1], ['kein', 1], ['mein', 2], ['dein', 1], ['sein', 2], ['ihr', 1], ['unser', 1], ['euer', 1]]


// ---------- Переклад: справжні речення з правильними відмінками (таблиці з data/tr.json) ----------
import TR from './data/tr.json'
const upf = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const PRON_S = { Ich: ['Я', 'Я', 'ich'], Du: ['Ти', 'Ты', 'du'], Wir: ['Ми', 'Мы', 'wir'] }
const LI = (lang) => (lang === 'ua' ? 0 : 1)
const LK = (lang) => (lang === 'ua' ? 'ua' : 'ru')
// іменник + присвійне слово у відмінку cs (nom/gen/dat/acc/ins/loc)
const npTr = (lang, n, plural, fam, cs) => {
  const e = TR.nouns[n.de]
  if (!e) return null
  const L = e[LK(lang)]
  const num = plural ? 'pl' : 'sg'
  const det = L.det[fam] ? L.det[fam][num][cs] : ''
  const w = L[num][cs]
  return w ? (det ? det + ' ' : '') + w : null
}
const vf = (lang, v) => TR.verbs[v] && TR.verbs[v][LK(lang)]
const FRAMES = {
  für: { cs: 'gen', t: ['Подарунок для {np}.', 'Подарок для {np}.'] },
  ohne: { cs: 'gen', t: ['Ми йдемо без {np}.', 'Мы идём без {np}.'] },
  durch: { cs: 'acc', t: ['Пес біжить через {np}.', 'Собака бежит через {np}.'] },
  gegen: { cs: 'acc', t: ["М'яч летить у {np}.", 'Мяч летит в {np}.'] },
  um: { cs: 'gen', t: ['Ми біжимо навколо {np}.', 'Мы бежим вокруг {np}.'] },
  von: { cs: 'gen', t: ['Я отримую подарунок від {np}.', 'Я получаю подарок от {np}.'] },
  bei: { cs: 'gen', t: ['Я живу у {np}.', 'Я живу у {np}.'] },
  aus: { cs: 'gen', t: ['Дитина приходить з {np}.', 'Ребёнок приходит из {np}.'] },
}
const FRAMES_ZU = { ua: { cs: 'gen', t: 'Ми йдемо до {np}.' }, ru: { cs: 'dat', t: 'Мы идём к {np}.' } }
// spec — що саме перекладаємо; s — побудоване речення
const makeTr = (spec, s) => {
  const out = [null, null]
  for (const lang of ['ua', 'ru']) {
    let txt = null
    const num = s.plural
    if (spec.kind === 'subj') {
      const np = npTr(lang, s.n, num, s.fam, 'nom')
      const e = TR.nouns[s.n.de]
      if (np && e) {
        const L = e[LK(lang)]
        if (spec.person) { const w = vf(lang, 'wartenx'); txt = `${upf(np)} ${num ? 'вже ' : 'вже '}${num ? w.sie : w.er}.`.replace('вже ', lang === 'ua' ? 'вже ' : 'уже ') }
        else txt = `${upf(np)} ${num ? L.new.pl : L.new.sg}.`
      }
    } else if (spec.kind === 'verb') {
      const v = vf(lang, spec.v)
      const sp = PRON_S[spec.S]
      if (v) {
        const neg = s.fam === 'kein'
        let cs = v.case
        if (neg && cs === 'acc') cs = 'gen'
        const fam = neg ? 'def' : s.fam
        const np = npTr(lang, s.n, num, fam, cs)
        if (np) txt = `${sp[LI(lang)]} ${neg ? 'не ' : ''}${v[sp[2]]} ${v.prep ? v.prep + ' ' : ''}${np}.`
      }
    } else if (spec.kind === 'prep') {
      let fr = FRAMES[spec.p]
      if (spec.p === 'zu') fr = { cs: FRAMES_ZU[lang].cs, t: [FRAMES_ZU[lang].t, FRAMES_ZU[lang].t] }
      if (spec.p === 'mit') {
        const v = vf(lang, 'spielen'); const sp = PRON_S[spec.S]
        const np = npTr(lang, s.n, num, s.fam, 'ins')
        if (np) txt = `${sp[LI(lang)]} ${v[sp[2]]} ${lang === 'ua' ? 'з' : 'с'} ${np}.`
      } else if (fr) {
        const np = npTr(lang, s.n, num, s.fam, fr.cs)
        if (np) txt = fr.t[LI(lang)].replace('{np}', np)
      }
    } else if (spec.kind === 'poss') {
      const th = TR.nouns[spec.thing]
      const np = npTr(lang, s.n, num, s.fam, 'gen')
      if (th && np) { const L = th[LK(lang)]; txt = `${upf(L.sg.nom)} ${np} ${L.new.sg}.` }
    }
    out[LI(lang)] = txt
  }
  return out[0] && out[1] ? out : null
}

// ---------- Шаблони речень ----------
const SUBJ = [['Ich', 0], ['Du', 1], ['Wir', 3]]
const NAMES = ['Martin', 'Lena', 'Anna', 'Tom', 'Mia']
const AKK_V = [
  ['sehen', PT], ['suchen', PT], ['besuchen', P], ['fragen', P], ['laden', P, ' ein', 'einladen'], ['kennen', P],
  ['treffen', P], ['begrüßen', P], ['finden', OBJ], ['kaufen', BUY], ['brauchen', OBJ], ['holen', OBJ],
  ['nehmen', OBJ], ['verlieren', OBJ], ['vergessen', OBJ], ['öffnen', OPENABLE],
]
const DAT_V = [
  ['helfen', P], ['danken', P], ['gratulieren', P], ['antworten', P], ['glauben', P], ['folgen', P],
  ['begegnen', P], ['hören', P, ' zu', 'zuhören'],
]
const GEN_OWNED = [
  ['Das', 'Heft'], ['Das', 'Buch'], ['Das', 'Handy'], ['Das', 'Zimmer'], ['Das', 'Auto'], ['Das', 'Bett'],
  ['Der', 'Rucksack'], ['Der', 'Ball'], ['Der', 'Computer'], ['Der', 'Koffer'], ['Der', 'Hund'],
  ['Die', 'Tasche'], ['Die', 'Jacke'], ['Die', 'Mütze'], ['Die', 'Katze'],
]

// Повертає опис речення: { ci, group, plural?, build(np)->{pre,post}, why }
const makeTemplate = () => {
  const ci = wpick([[0, 1], [1, 3], [2, 3], [3, 2]])
  if (ci === 0) {
    const person = Math.random() < 0.5
    const group = person ? P : OBJ
    return {
      ci, group,
      build: (plural) => ({ pre: '', post: person ? (plural ? ' warten schon.' : ' wartet schon.') : (plural ? ' sind neu.' : ' ist neu.') }),
      spec: { kind: 'subj', person },
      trig: { type: 'subj' },
    }
  }
  if (ci === 1) {
    if (Math.random() < 0.65) {
      const [inf, group, tail = '', label] = pick(AKK_V)
      const [S, idx] = pick(SUBJ)
      return { ci, group, build: () => ({ pre: `${S} ${conj(inf)[idx]} `, post: tail + '.' }), spec: { kind: 'verb', S, v: label || inf }, trig: { type: 'verb', v: label || inf } }
    }
    const pre = pick([
      ['für', P, 'Das Geschenk ist für '],
      ['ohne', PT, 'Wir gehen ohne '],
      ['durch', LOC_THROUGH, 'Der Hund läuft durch '],
      ['gegen', WALL, 'Der Ball fliegt gegen '],
      ['um', LOC_AROUND, 'Wir laufen um '],
    ])
    return { ci, group: pre[1], build: () => ({ pre: pre[2], post: '.' }), spec: { kind: 'prep', p: pre[0] }, trig: { type: 'prep', v: pre[0] } }
  }
  if (ci === 2) {
    if (Math.random() < 0.5) {
      const [inf, group, tail = '', label] = pick(DAT_V)
      const [S, idx] = pick(SUBJ)
      return { ci, group, build: () => ({ pre: `${S} ${conj(inf)[idx]} `, post: tail + '.' }), spec: { kind: 'verb', S, v: label || inf }, trig: { type: 'verb', v: label || inf } }
    }
    const pre = pick([
      ['mit', PM, 'spielen'],
      ['von', P, 'geschenk'],
      ['bei', FAM, 'wohne'],
      ['zu', P, 'gehen'],
      ['aus', LOC, 'kommt'],
    ])
    const [S, idx] = pick(SUBJ)
    const txt = {
      spielen: `${S} ${conj('spielen')[idx]} mit `,
      geschenk: 'Ich bekomme ein Geschenk von ',
      wohne: 'Ich wohne bei ',
      gehen: 'Wir gehen zu ',
      kommt: 'Das Kind kommt aus ',
    }[pre[2]]
    return { ci, group: pre[1], build: () => ({ pre: txt, post: '.' }), spec: { kind: 'prep', p: pre[0], S }, trig: { type: 'prep', v: pre[0] } }
  }
  const [art, thing] = pick(GEN_OWNED)
  return { ci: 3, group: P, build: () => ({ pre: `${art} ${thing} `, post: ' ist neu.' }), spec: { kind: 'poss', thing }, trig: { type: 'poss' } }
}

// будує одне речення з NP
const buildSentence = (wantFam) => {
  for (let tries = 0; tries < 50; tries++) {
    const t = makeTemplate()
    const n = pick(t.group)
    const plural = Math.random() < 0.25
    let fam = wantFam ? wantFam() : wpick(FAMS)
    if (fam === 'ein' && plural) fam = 'kein'
    // kein звучить природно лише при дієслові (Ich sehe keinen Hund), не при підметі, прийменнику чи належності
    if (fam === 'kein' && t.trig.type !== 'verb') fam = wantFam ? 'mein' : pick(['def', 'mein', 'dein', 'sein', 'unser'])
    const g = plural ? 'p' : n.g
    const det = detForm(fam, g, t.ci)
    const nf = nounForm(n, t.ci, plural)
    if (!det || !nf) continue
    const { pre, post } = t.build(plural)
    const res = { fam, g, ci: t.ci, det, noun: nf, n, plural, pre, post, trig: t.trig, tr: null }
    res.tr = makeTr(t.spec, res)
    return res
  }
  throw new Error('no sentence')
}

const trigShort = (t, ci) => (t.type === 'subj' ? 'Subjekt' : t.type === 'poss' ? 'Besitz → Genitiv' : `${t.v} + ${CASES[ci]}`)
const explain = (s) => `${CASES[s.ci]} · ${QW[s.ci]} — ${trigShort(s.trig, s.ci)}`

const POOL_FORMS = (fam) => {
  const set = new Set()
  for (const g of ['m', 'f', 'n', 'p']) for (let c = 0; c < 4; c++) { const f = detForm(fam, g, c); if (f) set.add(f) }
  return [...set]
}

// ---------- Типи питань ----------
const qSent = () => {
  const s = buildSentence()
  const lead = s.pre === ''
  const fmt = (x) => (lead ? cap(x) : x)
  const wrong = shuffle(POOL_FORMS(s.fam).filter((f) => f !== s.det)).slice(0, 3)
  const opts = shuffle([s.det, ...wrong])
  return {
    kind: 'sent', key: 'sent',
    parts: [{ t: 'text', v: s.pre }, { t: 'gap', v: fmt(s.det) }, { t: 'text', v: ' ' + s.noun + s.post }],
    options: opts.map((o) => ({ label: fmt(o), raw: o })), correct: opts.indexOf(s.det), explain: explain(s), info: s, tr: s.tr,
  }
}

const qEnd = () => {
  const s = buildSentence(() => pick(['ein', 'kein', 'mein', 'dein', 'sein', 'ihr', 'unser']))
  const stem = s.fam
  const ending = s.det.slice(stem.length)
  const pool = ['', 'e', 'en', 'em', 'er', 'es']
  const wrong = shuffle(pool.filter((e) => e !== ending)).slice(0, 3)
  const opts = shuffle([ending, ...wrong])
  const lead = s.pre === ''
  return {
    kind: 'end', key: 'end',
    parts: [{ t: 'text', v: s.pre + (lead ? cap(stem) : stem) }, { t: 'gap', v: ending || '—', glue: true }, { t: 'text', v: ' ' + s.noun + s.post }],
    options: opts.map((o) => ({ label: o ? '-' + o : '—', raw: stem + o })), correct: opts.indexOf(ending), explain: `${explain(s)} → ${s.det}`, info: { ...s, stem, ending }, tr: s.tr,
  }
}

const qCase = () => {
  const s = buildSentence()
  const lead = s.pre === ''
  const np = (lead ? cap(s.det) : s.det) + ' ' + s.noun
  return {
    kind: 'case', key: 'case',
    parts: [{ t: 'text', v: s.pre }, { t: 'mark', v: np }, { t: 'text', v: s.post }],
    options: CASES.map((c, i) => ({ label: c, sub: QW[i], ci: i })), correct: s.ci, explain: explain(s), info: s, tr: s.tr,
  }
}

const qTable = () => {
  const fam = wpick(FAMS)
  const gs = fam === 'ein' ? ['m', 'f', 'n'] : ['m', 'f', 'n', 'p']
  const g = pick(gs)
  const correct = [0, 1, 2, 3].map((c) => detForm(fam, g, c))
  const key = (a) => a.join('|')
  const others = gs.filter((x) => x !== g)
  const cands = []
  for (const o of others) cands.push([0, 1, 2, 3].map((c) => detForm(fam, o, c)))
  for (let i = 0; i < 40; i++) {
    const m = [0, 1, 2, 3].map((c) => detForm(fam, pick(gs), c))
    const same = m.filter((x, i2) => x === correct[i2]).length
    if (same >= 2 && same < 4) cands.push(m)
  }
  const seen = new Set([key(correct)])
  const wrong = []
  for (const c of shuffle(cands)) { if (!seen.has(key(c))) { seen.add(key(c)); wrong.push(c) } if (wrong.length === 3) break }
  if (wrong.length < 3) return qSent()
  const opts = shuffle([correct, ...wrong])
  const main = (fam === 'def' ? 'der / die / das' : fam) + ' · ' + GENDER_LABEL[g] + (g === 'p' ? '' : ' (' + { m: 'm', f: 'f', n: 'n' }[g] + ')')
  return { kind: 'tbl', key: 'tbl', main, options: opts.map((f) => ({ forms: f })), correct: opts.findIndex((f) => key(f) === key(correct)), explain: `${fam === 'def' ? 'Artikel' : fam}: ${correct.join(' · ')}`, info: { fam, g, correct } }
}

// ---------- mir / mich ----------
const PR = [
  { lab: 'ich', nom: 'ich', akk: 'mich', dat: 'mir', pos: 'mein' },
  { lab: 'du', nom: 'du', akk: 'dich', dat: 'dir', pos: 'dein' },
  { lab: 'er', nom: 'er', akk: 'ihn', dat: 'ihm', pos: 'sein' },
  { lab: 'sie, f', nom: 'sie', akk: 'sie', dat: 'ihr', pos: 'ihre' },
  { lab: 'sie, Pl.', nom: 'sie', akk: 'sie', dat: 'ihnen', pos: 'ihre' },
  { lab: 'Sie', nom: 'Sie', akk: 'Sie', dat: 'Ihnen', pos: 'Ihre' },
]

const PRN = {
  ua: { ich: ['мене', 'мені', 'мною'], du: ['тебе', 'тобі', 'тобою'], er: ['його', 'йому', 'ним'], 'sie, f': ['її', 'їй', 'нею'], 'sie, Pl.': ['їх', 'їм', 'ними'], Sie: ['Вас', 'Вам', 'Вами'] },
  ru: { ich: ['меня', 'мне', 'мной'], du: ['тебя', 'тебе', 'тобой'], er: ['его', 'ему', 'им'], 'sie, f': ['её', 'ей', 'ею'], 'sie, Pl.': ['их', 'им', 'ими'], Sie: ['Вас', 'Вам', 'Вами'] },
}
const NAME_TR = { Martin: ['Мартін', 'Мартин'], Lena: ['Лена', 'Лена'], Anna: ['Анна', 'Анна'], Tom: ['Том', 'Том'], Mia: ['Мія', 'Мия'] }
const pronTr = (name, verb, lab, ci) => {
  const res = []
  for (const lang of ['ua', 'ru']) {
    const v = vf(lang, verb)
    if (!v || !PRN[lang][lab]) return null
    let cs = v.case
    const k = { acc: 0, gen: 0, dat: 1, ins: 2 }[cs]
    if (k === undefined) return null
    res.push(`${NAME_TR[name][LI(lang)]} ${v.er} ${v.prep ? v.prep + ' ' : ''}${PRN[lang][lab][k]}.`)
  }
  return res
}
const qPron = () => {
  const p = pick(PR)
  const dat = Math.random() < 0.5
  const ans = dat ? p.dat : p.akk
  const name = pick(NAMES)
  let pre, post, trig
  if (dat) {
    const [inf, , tail = '', label] = pick(DAT_V)
    pre = `${name} ${conj(inf)[2]} `; post = ` (${p.lab})${tail}.`; trig = { type: 'verb', v: label || inf }
  } else {
    const [inf, , tail = '', label] = pick(AKK_V.filter((v) => v[1] === P || v[1] === PT))
    pre = `${name} ${conj(inf)[2]} `; post = ` (${p.lab})${tail}.`; trig = { type: 'verb', v: label || inf }
  }
  const pool = [p.nom, p.akk, p.dat, p.pos].filter((x, i, a) => x !== ans && a.indexOf(x) === i)
  const extra = shuffle(PR.flatMap((q) => [q.nom, q.akk, q.dat]).filter((x) => x !== ans && !pool.includes(x)))
  const wrong = [...pool, ...extra].slice(0, 3)
  const opts = shuffle([ans, ...wrong])
  const ci = dat ? 2 : 1
  return {
    kind: 'pron', key: 'pron',
    tr: pronTr(name, trig.v, p.lab, ci),
    parts: [{ t: 'text', v: pre }, { t: 'gap', v: ans }, { t: 'text', v: post }],
    options: opts.map((o) => ({ label: o, raw: o })), correct: opts.indexOf(ans),
    explain: `${CASES[ci]} · ${QW[ci]} — ${trigShort(trig, ci)} · ${dat ? 'mir/dir' : 'mich/dich'}`,
    info: { ci, p, dat, ans, trig },
  }
}

export const makeCaseQuestion = () => {
  const f = wpick([[qSent, 30], [qEnd, 25], [qCase, 20], [qTable, 10], [qPron, 15]])
  return f()
}

export const makeCaseRound = (n = 10) => {
  const out = []; const seen = new Set()
  let guard = 0
  while (out.length < n && guard++ < 200) {
    const q = makeCaseQuestion()
    const sig = q.kind + '|' + (q.parts ? q.parts.map((p) => p.v).join('') : q.main)
    if (seen.has(sig)) continue
    seen.add(sig); out.push(q)
  }
  return out
}

// ================= Розбір правила =================
const GW = {
  ua: { m: 'чоловічий рід (der)', f: 'жіночий рід (die)', n: 'середній рід (das)', p: 'множина (die)' },
  ru: { m: 'мужской род (der)', f: 'женский род (die)', n: 'средний род (das)', p: 'множественное число (die)' },
}
const GWG = {
  ua: { m: 'чоловічого роду (der)', f: 'жіночого роду (die)', n: 'середнього роду (das)', p: 'множини (die)' },
  ru: { m: 'мужского рода (der)', f: 'женского рода (die)', n: 'среднего рода (das)', p: 'множественного числа (die)' },
}
const GSHORT = { m: 'Maskulin', f: 'Feminin', n: 'Neutrum', p: 'Plural' }
const CASE_DESC = {
  ua: ['підмет: хто/що виконує дію? (Wer/Was?)', 'прямий додаток: на кого/що спрямована дія? (Wen/Was?)', 'непрямий додаток: кому? (Wem?)', 'належність: чий/чого? (Wessen?)'],
  ru: ['подлежащее: кто/что делает действие? (Wer/Was?)', 'прямое дополнение: на кого/что направлено действие? (Wen/Was?)', 'косвенное дополнение: кому? (Wem?)', 'принадлежность: чей/чего? (Wessen?)'],
}
const PREP_AKK = 'für, ohne, durch, gegen, um'
const PREP_DAT = 'mit, von, bei, zu, aus, nach, seit'
const ENDS_ROW = { m: ['—', '-en', '-em', '-es'], f: ['-e', '-e', '-er', '-er'], n: ['—', '—', '-em', '-es'], p: ['-e', '-e', '-en', '-er'] }

// які (відмінок, рід) дають такий рядок
const matchesOf = (fam, str) => {
  const out = []
  for (const g of ['m', 'f', 'n', 'p']) for (let c = 0; c < 4; c++) if (detForm(fam, g, c) === str) out.push({ c, g })
  return out
}
const fmtMatches = (ms) => ms.map((m) => `${CASES[m.c]} ${GSHORT[m.g]}`).join(' / ')

const trigText = (t, ci, lang) => {
  const ru = lang === 'ru'
  if (t.type === 'subj') return ru ? 'Это подлежащее: оно отвечает на вопрос Wer/Was?, значит Nominativ.' : 'Це підмет: він відповідає на питання Wer/Was?, тому Nominativ.'
  if (t.type === 'poss') return ru ? 'В предложении сказано, кому принадлежит предмет: предмет, потом владелец. Владелец всегда в Genitiv, вопрос Wessen? Пример: das Heft des Bruders — тетрадь брата.' : 'У реченні сказано, кому належить предмет: предмет, потім власник. Власник завжди в Genitiv, питання Wessen? Приклад: das Heft des Bruders — зошит брата.'
  if (t.type === 'verb') {
    const q = QW[ci]
    return ru ? `Глагол «${t.v}» требует ${CASES[ci]}. Задай вопрос: ${q} Ответ — это слово в ${CASES[ci]}.` : `Дієслово «${t.v}» вимагає ${CASES[ci]}. Постав питання: ${q} Відповідь — це слово в ${CASES[ci]}.`
  }
  const list = ci === 1 ? PREP_AKK : PREP_DAT
  return ru ? `Предлог «${t.v}» всегда ставится с ${CASES[ci]}. Предлоги с ${CASES[ci]}: ${list}.` : `Прийменник «${t.v}» завжди вживається з ${CASES[ci]}. Прийменники з ${CASES[ci]}: ${list}.`
}

const nounNote = (s, lang) => {
  const ru = lang === 'ru'
  const n = s.n
  if (!n) return null
  if (s.plural && s.ci === 2 && s.noun !== n.pl) return ru ? `Dativ во множественном числе: к существительному добавляется -n (${n.pl} → ${s.noun}).` : `Dativ у множині: до іменника додається -n (${n.pl} → ${s.noun}).`
  if (!s.plural && s.ci === 3 && s.noun !== n.de) return WEAK[n.de]
    ? (ru ? `Слабое склонение (n-Deklination): ${n.de} → ${s.noun}.` : `Слабка відміна (n-Deklination): ${n.de} → ${s.noun}.`)
    : (ru ? `Genitiv мужского и среднего рода: существительное получает -s или -es (${n.de} → ${s.noun}). -es после s, ß, x, z, sch, tz и у односложных слов.` : `Genitiv чоловічого і середнього роду: іменник отримує -s або -es (${n.de} → ${s.noun}). -es після s, ß, x, z, sch, tz і в односкладових слів.`)
  if (!s.plural && s.ci > 0 && WEAK[n.de] && s.noun !== n.de) return ru ? `Слабое склонение (n-Deklination): ${n.de} → ${s.noun} во всех падежах, кроме Nominativ.` : `Слабка відміна (n-Deklination): ${n.de} → ${s.noun} в усіх відмінках, крім Nominativ.`
  return null
}

const row = (labels, vals, on) => ({ k: 'row', cells: labels.map((l, i) => ({ h: l, t: vals[i], on: i === on })) })

export const ruleLines = (q, sel, lang) => {
  const ru = lang === 'ru'
  const L = (a, b) => (ru ? b : a)
  const ok = sel === q.correct
  const lines = []
  const i = q.info
  const CL = ['Nom', 'Akk', 'Dat', 'Gen']

  if (q.kind === 'tbl') {
    const fam = i.fam; const g = i.g
    lines.push({ k: 'h', t: L('Як будується таблиця', 'Как строится таблица') })
    lines.push({ k: 'p', t: L(`Слово «${fam === 'def' ? 'der/die/das' : fam}» для ${GWG.ua[g]} змінюється за відмінками так:`, `Слово «${fam === 'def' ? 'der/die/das' : fam}» для ${GWG.ru[g]} изменяется по падежам так:`) })
    lines.push(row(CL, i.correct, -1))
    if (fam !== 'def') lines.push({ k: 'p', t: L(`Закінчення (-: без закінчення): ${ENDS_ROW[g].join(' · ')}. Так само змінюються ein, kein, mein, dein, sein, ihr, unser, euer.`, `Окончания (—: без окончания): ${ENDS_ROW[g].join(' · ')}. Так же изменяются ein, kein, mein, dein, sein, ihr, unser, euer.`) })
    if (!ok) {
      const chosen = q.options[sel].forms
      const bad = chosen.map((f, c) => (f === i.correct[c] ? null : `${CASES[c]}: «${f}» → ${L('треба', 'нужно')} «${i.correct[c]}»`)).filter(Boolean)
      lines.push({ k: 'bad', t: L('Помилки у вашому наборі: ', 'Ошибки в вашем наборе: ') + bad.join('; ') + '.' })
      for (const og of ['m', 'f', 'n', 'p']) {
        if (og !== g && [0, 1, 2, 3].every((c) => detForm(fam, og, c) === chosen[c])) lines.push({ k: 'bad', t: L(`Це набір для іншого роду: ${GSHORT[og]}.`, `Это набор для другого рода: ${GSHORT[og]}.`) })
      }
    }
    return lines
  }

  if (q.kind === 'pron') {
    const { p, dat, ans, trig } = i
    const ci = dat ? 2 : 1
    const pw = q.parts[0].v.trim().split(' ')
    const nameW = pw[0]; const verbW = pw[1]
    const tailW = q.parts[2].v.replace(/\(.*?\)/, '').replace(/[.\s]/g, '')
    const qw = dat ? 'Wem' : 'Wen'
    const who = { ich: ['я', 'я'], du: ['ти', 'ты'], er: ['він', 'он'], 'sie, f': ['вона', 'она'], 'sie, Pl.': ['вони', 'они'], Sie: ['Ви (ввічливо)', 'Вы (вежливо)'] }[p.lab]
    lines.push({ k: 'h', t: L('1. Кого чи кому?', '1. Кого или кому?') })
    lines.push({ k: 'p', t: L(
      `Дієслово «${trig.v}» вимагає ${dat ? 'Dativ (кому?)' : 'Akkusativ (кого?)'}. ${qw} ${verbW} ${nameW}${tailW ? ' ' + tailW : ''}? — ${ans}.`,
      `Глагол «${trig.v}» требует ${dat ? 'Dativ (кому?)' : 'Akkusativ (кого?)'}. ${qw} ${verbW} ${nameW}${tailW ? ' ' + tailW : ''}? — ${ans}.`) })
    lines.push({ k: 'h', t: L(`2. Яке слово для «${p.lab}» (${who[0]})`, `2. Какое слово для «${p.lab}» (${who[1]})`) })
    lines.push({ k: 'p', t: L(
      `У дужках стоїть «${p.lab}» (${who[0]}). Для ${dat ? 'Dativ (кому?)' : 'Akkusativ (кого?)'} це «${ans}». ${dat ? 'Для Akkusativ було б «' + p.akk + '»' : 'Для Dativ було б «' + p.dat + '»'}, але тут інший відмінок.`,
      `В скобках стоит «${p.lab}» (${who[1]}). Для ${dat ? 'Dativ (кому?)' : 'Akkusativ (кого?)'} это «${ans}». ${dat ? 'Для Akkusativ было бы «' + p.akk + '»' : 'Для Dativ было бы «' + p.dat + '»'}, но здесь другой падеж.`) })
    lines.push(row(['Nom', 'Akk', 'Dat'], [p.nom, p.akk, p.dat], ci))
    if (!ok) {
      const chosen = q.options[sel].raw
      const found = PR.flatMap((x) => ['nom', 'akk', 'dat'].filter((k) => x[k] === chosen).map((k) => `${x.lab}: ${{ nom: 'Nominativ', akk: 'Akkusativ', dat: 'Dativ' }[k]}`))
      const isPos = PR.some((x) => x.pos === chosen)
      const caseName = { nom: 'Nominativ', akk: 'Akkusativ', dat: 'Dativ' }[dat ? 'dat' : 'akk']
      const sameCase = PR.some((x) => x[dat ? 'dat' : 'akk'] === chosen)
      const base = L(`Ви обрали «${chosen}»: `, `Вы выбрали «${chosen}»: `) + (found.length ? found.slice(0, 3).join(', ') : isPos ? L('присвійне слово (мій, твій…), а не займенник', 'притяжательное слово (мой, твой…), а не местоимение') : '')
      const tail = sameCase
        ? L(`. Відмінок підходить, але це займенник іншої особи. У дужках стоїть «${p.lab}», тому потрібно «${ans}».`, `. Падеж подходит, но это местоимение другого лица. В скобках стоит «${p.lab}», поэтому нужно «${ans}».`)
        : L(`. Тут потрібен ${caseName}, тобто «${ans}».`, `. Здесь нужен ${caseName}, то есть «${ans}».`)
      lines.push({ k: 'bad', t: base + tail })
    }
    return lines
  }

  // sent / end / case: пояснення під конкретне речення
  const s = i
  const nd = s.n
  const lead = s.pre === ''
  const detC = lead ? cap(s.det) : s.det
  const np = `${s.det} ${s.noun}` // у середині речення
  const art = { m: 'der', f: 'die', n: 'das' }[s.g]
  const words = s.pre.trim().split(' ')
  const subjW = words[0] ? (words[0] === 'Ich' || words[0] === 'Du' || words[0] === 'Wir' ? words[0].toLowerCase() : words[0]) : ''
  const verbW = words[1] || ''
  const tail = s.post.replace(/[.\s]/g, '')
  const animate = P.includes(nd) || ANI.includes(nd)
  const t = s.trig
  lines.push({ k: 'h', t: L('1. Який відмінок?', '1. Какой падеж?') })
  if (t.type === 'subj') {
    const verbPart = s.post.trim().replace('.', '')
    const qq = verbPart.startsWith('sind') || verbPart.startsWith('ist') ? `Was ${verbPart.split(' ')[0]} neu?` : `Wer ${verbPart.split(' ')[0]} schon?`
    lines.push({ k: 'p', t: L(`${qq} — ${detC} ${s.noun}. Це підмет, тому Nominativ.`, `${qq} — ${detC} ${s.noun}. Это подлежащее, поэтому Nominativ.`) })
  } else if (t.type === 'verb') {
    const qw = s.ci === 2 ? 'Wem' : animate ? 'Wen' : 'Was'
    const q1 = `${qw} ${verbW} ${subjW}${tail ? ' ' + tail : ''}?`
    lines.push({ k: 'p', t: L(`Дієслово «${t.v}» вимагає ${CASES[s.ci]}. ${q1} — ${np}. Тож це ${CASES[s.ci]}.`, `Глагол «${t.v}» требует ${CASES[s.ci]}. ${q1} — ${np}. Значит, это ${CASES[s.ci]}.`) })
  } else if (t.type === 'prep') {
    lines.push({ k: 'p', t: L(`Прийменник «${t.v}» завжди вимагає ${CASES[s.ci]}, тому після нього «${np}» стоїть в ${CASES[s.ci]}.`, `Предлог «${t.v}» всегда требует ${CASES[s.ci]}, поэтому после него «${np}» стоит в ${CASES[s.ci]}.`) })
  } else {
    const thing = words[1] || ''
    lines.push({ k: 'p', t: L(`Wessen ${thing} ist neu? — ${np}. Власник стоїть після предмета і відповідає на Wessen?, тому це Genitiv.`, `Wessen ${thing} ist neu? — ${np}. Владелец стоит после предмета и отвечает на Wessen?, поэтому это Genitiv.`) })
  }
  lines.push({ k: 'h', t: L('2. Рід і число', '2. Род и число') })
  lines.push({ k: 'p', t: s.plural
    ? L(`«${nd.de}» тут у множині: die ${nd.pl}. У множині рід не важливий, форми спільні для всіх родів.`, `«${nd.de}» здесь во множественном числе: die ${nd.pl}. Во множественном числе род не важен, формы общие для всех родов.`)
    : L(`«${nd.de}» — ${GW.ua[s.g]}: ${art} ${nd.de}.`, `«${nd.de}» — ${GW.ru[s.g]}: ${art} ${nd.de}.`) })
  lines.push({ k: 'h', t: L('3. Форма слова', '3. Форма слова') })
  const gTxt = s.plural ? L('множина', 'множественное число') : GSHORT[s.g]
  const endTxt = s.fam === 'def' ? '' : (s.det.slice(s.fam === 'euer' && s.det !== 'euer' ? 3 : s.fam.length) || '')
  lines.push({ k: 'p', t: s.fam === 'def'
    ? L(`${CASES[s.ci]} + ${gTxt} → артикль «${s.det}».`, `${CASES[s.ci]} + ${gTxt} → артикль «${s.det}».`)
    : endTxt
      ? L(`${CASES[s.ci]} + ${gTxt}: до «${s.fam}» додається «-${endTxt}» → «${s.det}».`, `${CASES[s.ci]} + ${gTxt}: к «${s.fam}» добавляется «-${endTxt}» → «${s.det}».`)
      : L(`${CASES[s.ci]} + ${gTxt}: «${s.fam}» тут без закінчення → «${s.det}».`, `${CASES[s.ci]} + ${gTxt}: «${s.fam}» здесь без окончания → «${s.det}».`) })
  lines.push(row(CL, [0, 1, 2, 3].map((c) => detForm(s.fam, s.g, c)), s.ci))
  const note = nounNote(s, lang)
  if (note) { lines.push({ k: 'h', t: L('4. Іменник', '4. Существительное') }); lines.push({ k: 'p', t: note }) }
  if (q.kind === 'case') {
    if (!ok) {
      const c = q.options[sel].ci
      lines.push({ k: 'bad', t: L(`Ви обрали ${CASES[c]} (${QW[c]}), але тут ${CASES[s.ci]}: ${CASE_DESC.ua[s.ci]}.`, `Вы выбрали ${CASES[c]} (${QW[c]}), но здесь ${CASES[s.ci]}: ${CASE_DESC.ru[s.ci]}.`) })
    }
    return lines
  }
  if (!ok) {
    const chosenRaw = q.options[sel].raw
    const ms = matchesOf(s.fam, chosenRaw)
    let why
    if (ms.some((m) => m.c === s.ci)) why = L('Відмінок підходить, але рід або число інші.', 'Падеж подходит, но род или число другие.')
    else if (ms.some((m) => m.g === s.g)) why = L('Рід правильний, але відмінок інший.', 'Род правильный, но падеж другой.')
    else why = L('Це інший відмінок і інший рід.', 'Это другой падеж и другой род.')
    lines.push({ k: 'bad', t: L(`Ви обрали «${chosenRaw}»: це ${fmtMatches(ms)}. ${why} Тут потрібно: ${CASES[s.ci]} ${GSHORT[s.g]} → «${s.det}».`, `Вы выбрали «${chosenRaw}»: это ${fmtMatches(ms)}. ${why} Здесь нужно: ${CASES[s.ci]} ${GSHORT[s.g]} → «${s.det}».`) })
  }
  return lines
}
