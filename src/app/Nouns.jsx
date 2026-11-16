import { useMemo, useState } from 'react'
import data from './data/nouns.json'
import { GUEST, GUEST_TEXT } from './guest.js'

const ART = { m: 'der', f: 'die', n: 'das', p: 'die' }
const keyOf = (w) => w.de + '|' + w.g
const first = (s) => s[0].toUpperCase()

const Row = ({ w, lang, on, toggle }) => (
  <div className={'de-w' + (w.core ? ' core' : '')}>
    <div className="de-w-t">
      <div className="de-w-de">
        <span className={'de-g g-' + (w.g === 'p' ? 'f' : w.g)} style={w.g === 'p' ? { background: '#7C3AED' } : null}>{ART[w.g]}</span>
        <span>{w.de}</span>
        {w.g !== 'p' && <span className="de-w-pl">{w.pl ? 'die ' + w.pl : '—'}</span>}
        {w.g === 'p' && <span className="de-w-pl">(лише мн.)</span>}
      </div>
      <div className="de-w-tr">{w[lang]}{w.alt ? ' · ' + w.alt : ''}</div>
    </div>
    <input type="checkbox" checked={on} onChange={toggle} aria-label="хочу вивчити" />
  </div>
)

export default function Nouns({ lang, want, setWant, onBack, guest, onGate }) {
  const [view, setView] = useState('abc')
  const [only, setOnly] = useState('all')
  const [topic, setTopic] = useState('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return data.words.filter((w) =>
      (!guest || GUEST.nouns.has(keyOf(w))) &&
      (only === 'all' || want[keyOf(w)]) &&
      (topic === 'all' || w.topic === topic) &&
      (!s || w.de.toLowerCase().includes(s) || w.uk.toLowerCase().includes(s) || w.ru.toLowerCase().includes(s)))
  }, [q, only, topic, want])

  const toggle = (w) => { if (guest) return onGate(); const k = keyOf(w); const n = { ...want }; if (n[k]) delete n[k]; else n[k] = 1; setWant(n) }
  const row = (w) => <Row key={keyOf(w)} w={w} lang={lang} on={!!want[keyOf(w)]} toggle={() => toggle(w)} />

  let body
  if (view === 'abc') {
    let prev = ''
    body = list.flatMap((w) => {
      const L = first(w.de); const out = []
      if (L !== prev) { prev = L; out.push(<div key={'l' + L} className="de-letter">{L}</div>) }
      out.push(row(w)); return out
    })
  } else {
    const topics = topic === 'all' ? Object.keys(data.topics) : [topic]
    body = topics.flatMap((t) => {
      const items = list.filter((w) => w.topic === t)
      if (!items.length) return []
      const core = items.filter((w) => w.core), ext = items.filter((w) => !w.core)
      return [
        <div key={t} className="de-h2">{data.topics[t]}</div>,
        ...core.map(row),
        ...(ext.length ? [<div key={t + 'x'} className="de-dim" style={{ margin: '8px 0 6px' }}>Розширений список</div>, ...ext.map(row)] : []),
      ]
    })
  }

  return (
    <>
      <div className="de-row">
        <button className="de-back" onClick={onBack}>‹</button>
        <b style={{ fontSize: 17 }}>Іменники</b>
        <span className="de-dim">{list.length} слів</span>
      </div>
      <input className="de-search" placeholder="Пошук" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="de-row">
        <div className="de-seg"><button className={view === 'abc' ? 'on' : ''} onClick={() => setView('abc')}>А–Z</button><button className={view === 'topic' ? 'on' : ''} onClick={() => setView('topic')}>Теми</button></div>
        <div className="de-seg"><button className={only === 'all' ? 'on' : ''} onClick={() => setOnly('all')}>Усі</button><button className={only === 'want' ? 'on' : ''} onClick={() => setOnly('want')}>Хочу вивчити</button></div>
      </div>
      <div className="de-chips">
        <button className={'de-tab' + (topic === 'all' ? ' on' : '')} onClick={() => setTopic('all')}>Усі теми</button>
        {Object.entries(data.topics).map(([k, v]) => <button key={k} className={'de-tab' + (topic === k ? ' on' : '')} onClick={() => setTopic(k)}>{v}</button>)}
      </div>
      {body.length ? body : <div className="de-empty">Нічого не знайдено</div>}
      {guest && <div className="de-card" style={{ marginTop: 12 }}><div className="de-dim">{GUEST_TEXT}</div><button className="de-btn" onClick={onGate}>Зареєструватися</button></div>}
    </>
  )
}
