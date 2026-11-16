// Наближена транскрипція німецьких слів кирилицею (UA / RU). Не замінює аудіо.
const V = 'aeiouäöüy'
const MAP = {
  uk: { ae: 'е', oe: 'ьо', ue: 'ю', y: 'ю', yo: 'ьо', ya: 'я', i: 'і', ie: 'і', e: 'е', ei: 'ай', eu: 'ой', ch: 'х', soft: 'г' },
  ru: { ae: 'э', oe: 'ё', ue: 'ю', y: 'ю', i: 'и', ie: 'и', e: 'е', ei: 'ай', eu: 'ой', ch: 'х' },
}
const uk0 = (l) => (l === 'uk' ? 0 : 1)
export const translit = (word, lang) => {
  const m = MAP[lang]; if (!m) return ''
  const OV = { handy: ['хенді', 'хэнди'], computer: ['компʼютер', 'компьютер'], laptop: ['лептоп', 'лэптоп'], café: ['кафе', 'кафе'], 'e-mail': ['імейл', 'имейл'], job: ['джоб', 'джоб'], deutsch: ['дойч', 'дойч'], ich: ['іх', 'их'] }
  const ov = OV[word.toLowerCase()]; if (ov) return ov[uk0(lang)]
  let w = word.toLowerCase().replace(/ß/g, 'ss').replace(/ig$/, 'ich')
  const out = []; let i = 0
  const at = (s) => w.startsWith(s, i)
  const isV = (c) => c && V.includes(c)
  const uk = lang === 'uk'
  while (i < w.length) {
    const c = w[i], n = w[i + 1], p = w[i - 1]
    if (at('tsch')) { out.push('ч'); i += 4; continue }
    if (at('sch')) { out.push('ш'); i += 3; continue }
    if (i === 0 && (at('sp') || at('st'))) { out.push('ш' + (c === 's' && n === 'p' ? 'п' : 'т')); i += 2; continue }
    if (at('ch')) { out.push('х'); i += 2; continue }
    if (at('ck')) { out.push('к'); i += 2; continue }
    if (at('pf')) { out.push('пф'); i += 2; continue }
    if (at('ph')) { out.push('ф'); i += 2; continue }
    if (at('th')) { out.push('т'); i += 2; continue }
    if (at('qu')) { out.push('кв'); i += 2; continue }
    if (at('ng')) { out.push('нг'); i += 2; continue }
    if (at('ie')) { out.push(m.ie); i += 2; continue }
    if (at('ei')) { out.push('ай'); i += 2; continue }
    if (at('eu') || at('äu')) { out.push('ой'); i += 2; continue }
    if (at('au')) { out.push('ау'); i += 2; continue }
    if (c === 'ä') { out.push(m.ae); i++; continue }
    if (c === 'ö') { out.push(m.oe); i++; continue }
    if (c === 'ü') { out.push(m.ue); i++; continue }
    if (c === 'j') { out.push('й'); i++; continue }
    if (c === 'v') { out.push('ф'); i++; continue }
    if (c === 'w') { out.push('в'); i++; continue }
    if (c === 'z') { out.push('ц'); i++; continue }
    if (c === 's') { out.push(isV(n) ? 'з' : 'с'); i += (n === 's' ? 2 : 1); continue }
    if (c === 'x') { out.push('кс'); i++; continue }
    if (c === 'y') { out.push(m.y); i++; continue }
    if (c === 'e' && i === w.length - 1 && i > 0) { out.push('е'); i++; continue }
    if (c === 'e' && n === 'r' && i === w.length - 2) { out.push('ер'); i += 2; continue }
    if (c === 'h' && isV(p) ) { i++; continue }
    const dbl = n === c && !isV(c)
    const map = { a: 'а', b: 'б', c: 'к', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х', i: uk ? 'і' : 'и', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', q: 'к', r: 'р', t: 'т', u: 'у' }
    let ch = map[c] || c
    if (i === w.length - 1 || !isV(n) && n !== 'l' && n !== 'r' && i === w.length - 1) {
      if (c === 'b') ch = 'п'
      if (c === 'd') ch = 'т'
      if (c === 'g') ch = 'к'
    }
    out.push(ch); i += dbl ? 2 : 1
  }
  return out.join('')
}
