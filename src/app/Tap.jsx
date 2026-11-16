import { useState } from 'react'
import lex from './data/lexicon.json'
import { translit } from './translit.js'
import { speak } from './engine.js'

const look = (w) => {
  const k = w.toLowerCase()
  if (lex[k]) return lex[k]
  for (const suf of ['en', 'e', 'er', 'es', 'em', 'n', 's', 't']) {
    if (k.endsWith(suf) && lex[k.slice(0, -suf.length)]) return lex[k.slice(0, -suf.length)]
  }
  return null
}

// Німецький текст, де кожне слово клікабельне: переклад + транскрипція + озвучення
export default function Tap({ text, lang, tr, className }) {
  const [sel, setSel] = useState(null)
  const parts = text.split(/([A-Za-zÄÖÜäöüß-]+)/)
  const t = sel && look(sel)
  return (
    <span className={className}>
      {parts.map((p, i) => (/^[A-Za-zÄÖÜäöüß-]+$/.test(p)
        ? <span key={i} className={'de-tapw' + (sel === p ? ' on' : '')} onClick={(e) => { e.stopPropagation(); setSel(sel === p ? null : p); speak(p) }}>{p}</span>
        : <span key={i}>{p}</span>))}
      {sel && (
        <span className="de-bubble" onClick={(e) => { e.stopPropagation(); setSel(null) }}>
          <b>{sel}</b>
          {tr !== 'off' && <i> [{translit(sel, tr)}]</i>}
          {' — '}{t ? t[lang] : 'немає в словнику'}
        </span>
      )}
    </span>
  )
}
