import { useMemo, useState } from 'react'
import verbs from './data/verbs.json'
import dict from './data/dict.json'
import { GUEST, GUEST_TEXT } from './guest.js'

const GuestFoot = ({ onGate }) => <div className="de-card" style={{ marginTop: 12 }}><div className="de-dim">{GUEST_TEXT}</div><button className="de-btn" onClick={onGate}>Зареєструватися</button></div>

const Back = ({ title, onBack, extra }) => (
  <div className="de-row"><button className="de-back" onClick={onBack}>‹</button><b style={{ fontSize: 17 }}>{title}</b><span className="de-dim">{extra}</span></div>
)
const Want = ({ k, want, setWant, guest, onGate }) => (
  <input type="checkbox" checked={!!want[k]} aria-label="хочу вивчити" onChange={() => { if (guest) return onGate(); const n = { ...want }; if (n[k]) delete n[k]; else n[k] = 1; setWant(n) }} />
)
const Filter = ({ only, setOnly }) => (
  <div className="de-seg"><button className={only === 'all' ? 'on' : ''} onClick={() => setOnly('all')}>Усі</button><button className={only === 'want' ? 'on' : ''} onClick={() => setOnly('want')}>Хочу вивчити</button></div>
)

export const Verbs = ({ lang, want, setWant, onBack, guest, onGate }) => {
  const [type, setType] = useState('all')
  const [only, setOnly] = useState('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return verbs.filter((v) => (!guest || GUEST.verbs.has(v.de)) && (type === 'all' || (type === 'refl' ? v.refl : type === 'a2' ? v.lvl === 'a2' : type === 'b1' ? v.lvl === 'b1' : v.type === type)) &&
      (only === 'all' || want['v:' + v.de]) && (!s || v.de.includes(s) || v.uk.toLowerCase().includes(s) || v.ru.toLowerCase().includes(s)))
  }, [type, only, q, want])
  const T = [['regular', 'Звичайні'], ['modal', 'Модальні'], ['sep', 'Відокремлювані'], ['refl', 'Зворотні'], ['a2', 'Рівень A2'], ['b1', 'Рівень B1'], ['all', 'Усі']]
  return (
    <>
      <Back title="Дієслова" onBack={onBack} extra={list.length + ' слів'} />
      <input className="de-search" placeholder="Пошук" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="de-chips">{T.map(([k, l]) => <button key={k} className={'de-tab' + (type === k ? ' on' : '')} onClick={() => setType(k)}>{l}</button>)}</div>
      <div className="de-row"><Filter only={only} setOnly={setOnly} /></div>
      {list.map((v) => (
        <div key={v.de} className={'de-w de-v' + (v.core ? ' core' : '')} style={{ flexWrap: 'wrap' }}>
          <div className="de-w-t" onClick={() => setOpen(open === v.de ? null : v.de)} style={{ cursor: 'pointer' }}>
            <div className="de-w-de"><span>{v.de}</span></div>
            <div className="de-w-tr">{v[lang]}</div>
          </div>
          <Want k={'v:' + v.de} want={want} setWant={setWant} guest={guest} onGate={onGate} />
          {open === v.de && (
            <div className="de-forms">
              {v.f.map((f, i) => <div key={i} className={v.irr[i] ? 'irr' : ''}>{f}</div>)}
              {v.p2 && <div style={{ gridColumn: '1 / -1', marginTop: 6 }}><b>Perfekt:</b> {v.aux === 'sein' ? 'ist' : 'hat'} {v.p2} · <b>Präteritum:</b> {v.pr}</div>}
            </div>
          )}
        </div>
      ))}
      {!list.length && <div className="de-empty">Нічого не знайдено</div>}
      {guest && <GuestFoot onGate={onGate} />}
    </>
  )
}

export const Adjectives = ({ lang, want, setWant, onBack, guest, onGate }) => {
  const [only, setOnly] = useState('all')
  const [topic, setTopic] = useState('all')
  const [q, setQ] = useState('')
  const TP = [['all', 'Усі'], ['colors', 'Кольори'], ['basic', 'Основні'], ['feel', 'Стани й характер'], ['food', 'Смак']]
  const list = dict.adj.filter((a) => (!guest || GUEST.adj.has(a.de)) && (topic === 'all' || a.topic === topic) && (only === 'all' || want['a:' + a.de]) &&
    (!q.trim() || a.de.includes(q.trim().toLowerCase()) || a.uk.toLowerCase().includes(q.trim().toLowerCase()) || a.ru.toLowerCase().includes(q.trim().toLowerCase())))
  return (
    <>
      <Back title="Прикметники" onBack={onBack} extra={list.length + ' слів'} />
      <input className="de-search" placeholder="Пошук" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="de-chips">{TP.map(([k, l]) => <button key={k} className={'de-tab' + (topic === k ? ' on' : '')} onClick={() => setTopic(k)}>{l}</button>)}</div>
      <div className="de-row"><Filter only={only} setOnly={setOnly} /></div>
      {list.map((a) => (
        <div key={a.de} className={'de-w' + (a.core ? ' core' : '')}>
          <div className="de-w-t">
            <div className="de-w-de"><span>{a.de}</span>{a.opp && <span className="de-w-pl">↔ {a.opp}</span>}</div>
            {a.komp && <div className="de-w-pl">{a.komp} · {a.sup}</div>}
            <div className="de-w-tr">{a[lang]}</div>
          </div>
          <Want k={'a:' + a.de} want={want} setWant={setWant} guest={guest} onGate={onGate} />
        </div>
      ))}
      {guest && <GuestFoot onGate={onGate} />}
    </>
  )
}

export const Pronouns = ({ lang, onBack }) => {
  const G = [['personal', 'Особові (Nom · Akk · Dat)'], ['poss', 'Присвійні'], ['quest', 'Питальні слова'], ['other', 'Інші']]
  return (
    <>
      <Back title="Займенники й питальні слова" onBack={onBack} />
      {G.map(([k, t]) => (
        <div key={k}>
          <div className="de-h2">{t}</div>
          {dict.pron.filter((p) => p.cat === k).map((p) => (
            <div key={p.de} className="de-w"><div className="de-w-t">
              <div className="de-w-de"><span>{p.de}</span></div>
              <div className="de-w-tr">{p[lang]}</div>
              <div className="de-w-pl" style={{ marginTop: 2 }}>{p.note}</div>
            </div></div>
          ))}
        </div>
      ))}
    </>
  )
}

export const Numerals = ({ onBack }) => {
  const [m, setM] = useState('card')
  const list = m === 'card' ? [...dict.nums.cardinal, ...dict.nums.extra] : dict.nums.ordinal
  return (
    <>
      <Back title="Числівники" onBack={onBack} />
      <div className="de-row"><div className="de-seg"><button className={m === 'card' ? 'on' : ''} onClick={() => setM('card')}>Кількісні</button><button className={m === 'ord' ? 'on' : ''} onClick={() => setM('ord')}>Порядкові</button></div></div>
      {list.map((x) => (
        <div key={x.n + x.de} className="de-w"><div className="de-w-t"><div className="de-w-de"><span style={{ color: 'var(--o-600)', minWidth: 44 }}>{m === 'card' ? x.n : x.n + '.'}</span><span>{x.de}</span></div></div></div>
      ))}
    </>
  )
}

export const Preps = ({ lang, onBack }) => {
  const G = [['akk', 'Akkusativ'], ['dat', 'Dativ'], ['wechsel', 'Wechselpräpositionen (Akk або Dat)']]
  return (
    <>
      <Back title="Прийменники" onBack={onBack} />
      {G.map(([k, t]) => (
        <div key={k}>
          <div className="de-h2">{t}</div>
          {dict.preps.filter((p) => p.case === k).map((p) => (
            <div key={p.de} className="de-w"><div className="de-w-t">
              <div className="de-w-de"><span>{p.de}</span></div>
              <div className="de-w-tr">{p[lang]}</div>
              <div className="de-w-pl" style={{ marginTop: 3 }}>{p.ex}</div>
              <div className="de-w-tr">{p['ex_' + lang]}</div>
            </div></div>
          ))}
        </div>
      ))}
    </>
  )
}
