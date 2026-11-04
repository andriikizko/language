import { DATA, shuffle } from './lib'

// inf: [Präteritum er, Partizip II, hilfsverb]
const S = 's'; const H = 'h'
const STRONG = {
  sein: ['war', 'gewesen', S], haben: ['hatte', 'gehabt', H], werden: ['wurde', 'geworden', S], wissen: ['wusste', 'gewusst', H], tun: ['tat', 'getan', H],
  kommen: ['kam', 'gekommen', S], schreiben: ['schrieb', 'geschrieben', H], geben: ['gab', 'gegeben', H], gehen: ['ging', 'gegangen', S], stehen: ['stand', 'gestanden', H],
  sehen: ['sah', 'gesehen', H], lesen: ['las', 'gelesen', H], sprechen: ['sprach', 'gesprochen', H], finden: ['fand', 'gefunden', H], lassen: ['ließ', 'gelassen', H],
  kennen: ['kannte', 'gekannt', H], verstehen: ['verstand', 'verstanden', H], bleiben: ['blieb', 'geblieben', S], nehmen: ['nahm', 'genommen', H], helfen: ['half', 'geholfen', H],
  laufen: ['lief', 'gelaufen', S], beginnen: ['begann', 'begonnen', H], erkennen: ['erkannte', 'erkannt', H], denken: ['dachte', 'gedacht', H], bringen: ['brachte', 'gebracht', H],
  liegen: ['lag', 'gelegen', H], tragen: ['trug', 'getragen', H], rufen: ['rief', 'gerufen', H], heißen: ['hieß', 'geheißen', H], fallen: ['fiel', 'gefallen', S],
  halten: ['hielt', 'gehalten', H], sitzen: ['saß', 'gesessen', H], verlieren: ['verlor', 'verloren', H], bestehen: ['bestand', 'bestanden', H], essen: ['aß', 'gegessen', H],
  treffen: ['traf', 'getroffen', H], schlagen: ['schlug', 'geschlagen', H], fahren: ['fuhr', 'gefahren', S], nennen: ['nannte', 'genannt', H], schließen: ['schloss', 'geschlossen', H],
  entstehen: ['entstand', 'entstanden', S], bitten: ['bat', 'gebeten', H], steigen: ['stieg', 'gestiegen', S], unterstreichen: ['unterstrich', 'unterstrichen', H],
  ziehen: ['zog', 'gezogen', H], enthalten: ['enthielt', 'enthalten', H], unterscheiden: ['unterschied', 'unterschieden', H], verraten: ['verriet', 'verraten', H],
  beschreiben: ['beschrieb', 'beschrieben', H], gelten: ['galt', 'gegolten', H], trinken: ['trank', 'getrunken', H], werfen: ['warf', 'geworfen', H], vergessen: ['vergaß', 'vergessen', H],
  schaffen: ['schuf', 'geschaffen', H], schlafen: ['schlief', 'geschlafen', H], singen: ['sang', 'gesungen', H], binden: ['band', 'gebunden', H], heben: ['hob', 'gehoben', H],
  verlassen: ['verließ', 'verlassen', H], scheinen: ['schien', 'geschienen', H], entscheiden: ['entschied', 'entschieden', H], begegnen: ['begegnete', 'begegnet', S],
  riechen: ['roch', 'gerochen', H], springen: ['sprang', 'gesprungen', S], verschwinden: ['verschwand', 'verschwunden', S], verbinden: ['verband', 'verbunden', H],
  vergleichen: ['verglich', 'verglichen', H], hängen: ['hing', 'gehangen', H], erscheinen: ['erschien', 'erschienen', S], gewinnen: ['gewann', 'gewonnen', H],
  fressen: ['fraß', 'gefressen', H], pfeifen: ['pfiff', 'gepfiffen', H], wiegen: ['wog', 'gewogen', H], versprechen: ['versprach', 'versprochen', H],
  verhalten: ['verhielt', 'verhalten', H], erfahren: ['erfuhr', 'erfahren', H], streiten: ['stritt', 'gestritten', H], erfinden: ['erfand', 'erfunden', H],
  fliegen: ['flog', 'geflogen', S], brennen: ['brannte', 'gebrannt', H], bieten: ['bot', 'geboten', H], übernehmen: ['übernahm', 'übernommen', H],
  besitzen: ['besaß', 'besessen', H], beweisen: ['bewies', 'bewiesen', H], erhalten: ['erhielt', 'erhalten', H], rennen: ['rannte', 'gerannt', S],
  begreifen: ['begriff', 'begriffen', H], reiben: ['rieb', 'gerieben', H], unterhalten: ['unterhielt', 'unterhalten', H], beschließen: ['beschloss', 'beschlossen', H],
  streichen: ['strich', 'gestrichen', H], schießen: ['schoss', 'geschossen', H], sterben: ['starb', 'gestorben', S], messen: ['maß', 'gemessen', H],
  sinken: ['sank', 'gesunken', S], fließen: ['floss', 'geflossen', S], wachsen: ['wuchs', 'gewachsen', S], schwimmen: ['schwamm', 'geschwommen', S],
  empfehlen: ['empfahl', 'empfohlen', H], verbrennen: ['verbrannte', 'verbrannt', H], reißen: ['riss', 'gerissen', H], klingen: ['klang', 'geklungen', H],
  raten: ['riet', 'geraten', H], schieben: ['schob', 'geschoben', H], verzeihen: ['verzieh', 'verziehen', H], erraten: ['erriet', 'erraten', H],
  waschen: ['wusch', 'gewaschen', H], bekommen: ['bekam', 'bekommen', H], schreien: ['schrie', 'geschrien', H], fangen: ['fing', 'gefangen', H],
  verbringen: ['verbrachte', 'verbracht', H], vermeiden: ['vermied', 'vermieden', H], benennen: ['benannte', 'benannt', H],
  bellen: ['bellte', 'gebellt', H],
}
const SEIN_REG = new Set(['reisen', 'wandern', 'landen', 'folgen', 'hüpfen'])
const SKIP = new Set(['starten', 'tauchen', 'treten', 'darstellen', 'aufpassen'])
const NO_GE = /^(be|ver|er|ent|zer|ge|miss|über|unter)/

const needE = (stem) => /[dt]$/.test(stem) || /(?:[bcdfgkpstvwxz]|ch)[mn]$/.test(stem)

const regular = (inf) => {
  const stem = inf.endsWith('en') ? inf.slice(0, -2) : inf.slice(0, -1)
  const e = needE(stem) ? 'e' : ''
  const noGe = /ieren$/.test(inf) || NO_GE.test(inf)
  return [stem + e + 'te', (noGe ? '' : 'ge') + stem + e + 't', SEIN_REG.has(inf) ? S : H]
}
const pret = (inf) => (STRONG[inf] ? STRONG[inf] : regular(inf))

const wirOf = (p) => (p.endsWith('e') ? p + 'n' : p + 'en')
const ihrOf = (p) => (/[dt]$/.test(p) ? p + 'et' : p + 't')
const auxIch = { h: 'habe', s: 'bin' }
const auxEr = { h: 'hat', s: 'ist' }

export const PAST_LABELS = ['Prät. ich/er/sie/es', 'Prät. wir/sie/Sie', 'Prät. ihr', 'Partizip II', 'Perfekt ich', 'Perfekt er/sie/es']

const build = (p, pp, aux) => [p, wirOf(p), ihrOf(p), pp, `${auxIch[aux]} ${pp}`, `${auxEr[aux]} ${pp}`]

export const PAST = DATA.verbs.filter((v) => !SKIP.has(v.inf)).map((v) => {
  const [p, pp, aux] = pret(v.inf)
  return { id: v.inf, inf: v.inf, ua: v.ua, ru: v.ru, strong: !!STRONG[v.inf], pretEr: p, pp, aux, forms: build(p, pp, aux) }
})

// «Неправильні» варіанти: типові помилки
const wrongSets = (it) => {
  const { inf, pretEr: p, pp, aux } = it
  const reg = regular(inf)
  const other = aux === 'h' ? 's' : 'h'
  const out = []
  if (it.strong && reg[0] !== p) out.push(build(reg[0], reg[1], aux)) // як правильне, ніби слабке
  if (it.strong) out.push(build(p, reg[1], aux)) // pret правильний, Partizip слабкий
  if (it.strong) out.push(build(reg[0], pp, aux))
  out.push(build(p, pp, other)) // не той допоміжний
  const noGe = pp.replace(/^ge/, '')
  if (noGe !== pp) out.push(build(p, noGe, aux))
  else out.push(build(p, 'ge' + pp, aux))
  out.push(build(p, p, aux)) // Partizip = Präteritum
  const w = build(p, pp, aux); w[2] = p + 'n'; out.push(w)
  const w2 = build(p, pp, aux); w2[1] = p; out.push(w2)
  const w3 = build(p, pp, aux); w3[4] = `${auxEr[aux]} ${pp}`; out.push(w3)
  return out
}

export const makePastQuestion = (item, lang) => {
  const key = (f) => f.join('|')
  const right = item.forms
  const seen = new Set([key(right)])
  const wrong = []
  for (const w of shuffle(wrongSets(item))) {
    if (!seen.has(key(w))) { seen.add(key(w)); wrong.push(w) }
    if (wrong.length === 3) break
  }
  let guard = 0
  while (wrong.length < 3 && guard++ < 20) {
    const w = right.slice(); const i = Math.floor(Math.random() * 3)
    w[i] = w[i] + (i === 0 ? 'e' : 'e')
    if (!seen.has(key(w))) { seen.add(key(w)); wrong.push(w) }
  }
  const opts = shuffle([right, ...wrong])
  return { kind: 'forms', item, prompt: { main: item.inf, sub: item[lang] }, options: opts.map((f) => ({ forms: f })), correct: opts.findIndex((f) => key(f) === key(right)) }
}
