import { useState } from 'react'
import { BLOCKS, FREE_BLOCKS, blockWords, blockById, poolFor, session, testSet, speak, speakAll, cleanDe, finalSet } from './engine.js'
import Tap from './Tap.jsx'
import Practice from './Practice.jsx'

const ART = { m: 'der', f: 'die', n: 'das', p: 'die' }

const Acc = ({ title, badge, open, onToggle, children }) => (
  <div className="de-acc">
    <button onClick={onToggle}><span>{open ? '▾' : '▸'}</span>{title}{badge && <small>{badge}</small>}</button>
    {open && <div className="de-acc-b">{children}</div>}
  </div>
)

const Words = ({ b, lang }) => {
  const w = blockWords(b)
  return (
    <>
      {w.nouns.length > 0 && <div className="de-h2">Іменники</div>}
      {w.nouns.map((n) => (
        <div key={n.de + n.g} className={'de-w' + (n.core ? ' core' : '')}><div className="de-w-t">
          <div className="de-w-de"><span className={'de-g g-' + (n.g === 'p' ? 'f' : n.g)}>{ART[n.g]}</span><span>{n.de}</span>
            <span className="de-w-pl">{n.g === 'p' ? '(лише мн.)' : n.pl ? 'die ' + n.pl : '—'}</span></div>
          <div className="de-w-tr">{n[lang]}</div></div></div>
      ))}
      {w.adjs.length > 0 && <div className="de-h2">Прикметники</div>}
      {w.adjs.map((a) => <div key={a.de} className={'de-w' + (a.core ? ' core' : '')}><div className="de-w-t"><div className="de-w-de"><span>{a.de}</span>{a.opp && <span className="de-w-pl">↔ {a.opp}</span>}</div><div className="de-w-tr">{a[lang]}</div></div></div>)}
      {w.verbs.length > 0 && <div className="de-h2">Дієслова</div>}
      {w.verbs.map((v) => <div key={v.de} className="de-w"><div className="de-w-t"><div className="de-w-de"><span>{v.de}</span></div><div className="de-w-tr">{v[lang]}</div><div className="de-w-pl" style={{ marginTop: 2 }}>{v.f[0]} · {v.f[1]} · {v.f[2]}</div></div></div>)}
    </>
  )
}

const MODES = [['order', 'Склади речення (з топіку)'], ['tr', 'Слово → переклад'], ['de', 'Переклад → слово'], ['art', 'Артикль'], ['pl', 'Множина (вписати)'], ['gap', 'Речення з пропуском']]

export function Course({ st, update, lang, tr, onAns }) {
  const [cur, setCur] = useState(null)
  const [open, setOpen] = useState('expl')
  const [run, setRun] = useState(null)
  const done = st.done || {}
  const mark = (id, patch) => update({ done: { ...done, [id]: { ...(done[id] || {}), ...patch } } })

  const locked = (i) => i >= FREE_BLOCKS && !st.dev

  if (run) {
    return <Practice ids={run.ids} lang={lang} tr={tr} title={run.title} onAnswer={onAns}
      onBack={() => setRun(null)} onDone={(sc, n) => { run.after && run.after(sc, n); setRun(null) }} />
  }

  if (!cur) {
    return (
      <>
        <div className="de-hello">Курс німецької A1</div>
        <div className="de-dim" style={{ marginBottom: 12 }}>Перші {FREE_BLOCKS} блоки безкоштовні, решта — за підпискою.</div>
        <div className="de-card" style={{ marginBottom: 12 }}><b>План на 13 тижнів</b><div className="de-dim">Тиждень на блок, 3 уроки: 1) пояснення, слова, топік; 2) вправи; 3) аудіювання й тест. 13-й тиждень — повторення й фінальний тест. Дивись у «Календарі».</div></div>
        {BLOCKS.map((b, i) => {
          const d = done[b.id] || {}
          return (
            <button key={b.id} className={'de-blk' + (locked(i) ? ' lock' : '')} onClick={() => !locked(i) && (setCur(b.id), setOpen('expl'))}>
              <span className="n">{i + 1}</span><span><b>{b.title}</b><small>{b.sub}</small></span>
              <span className="de-pill">{locked(i) ? '🔒 Premium' : d.test != null ? 'тест ' + d.test + '%' : 'почати'}</span>
            </button>
          )
        })}
        <button className={'de-blk' + (st.dev ? '' : ' lock')} onClick={() => st.dev && setRun({ ids: finalSet(), title: 'Фінальний тест', after: (sc, n) => update({ final: Math.max(Math.round(sc / n * 100), st.final || 0) }) })}>
          <span className="n">★</span><span><b>Фінальний тест</b><small>основні слова з усіх блоків</small></span>
          <span className="de-pill">{st.dev ? (st.final != null ? st.final + '%' : 'почати') : '🔒 Premium'}</span>
        </button>
      </>
    )
  }

  const b = blockById(cur)
  const d = done[b.id] || {}
  const modes = [...MODES, ...(b.numq ? [['num', 'Числа цифрами']] : [])].filter(([m]) => poolFor(b, m).length >= 3)
  const start = (mode, title) => setRun({ ids: session(b, mode, 10), title, after: (sc, n) => mark(b.id, { ex: { ...(d.ex || {}), [mode]: Math.max(sc, (d.ex || {})[mode] || 0) } }) })
  const tog = (k) => { setOpen(open === k ? null : k); if (k === 'expl' || k === 'words') mark(b.id, { [k]: 1 }) }

  return (
    <>
      <div className="de-row"><button className="de-back" onClick={() => setCur(null)}>‹</button><b style={{ fontSize: 17 }}>{b.title}</b><span /></div>
      <Acc title="Урок 1 · Пояснення" badge={d.expl ? '✓' : ''} open={open === 'expl'} onToggle={() => tog('expl')}>
        {b.explain.map((s, i) => <div key={i}><h4>{s.h}</h4><p>{s.p}</p></div>)}
        {lang === 'ru' && <div className="de-dim" style={{ marginTop: 10 }}>Російська версія пояснень буде додана пізніше.</div>}
      </Acc>
      <Acc title="Урок 1 · Слова блоку" badge={d.words ? '✓' : ''} open={open === 'words'} onToggle={() => tog('words')}><Words b={b} lang={lang} /></Acc>
      <Acc title="Урок 1 · Топік (вивчити напам'ять)" badge={d.topic ? '✓' : ''} open={open === 'topic'} onToggle={() => tog('topic')}>
        <div className="de-h2" style={{ marginTop: 0 }}>{b.topic.title}</div>
        {b.topic.note && <div className="de-dim" style={{ marginBottom: 8 }}>{b.topic.note}</div>}
        <button className="de-btn ghost" style={{ margin: '0 0 6px' }} onClick={() => speakAll(b.topic.s.map((x) => cleanDe(x.de)))}>▶ Прослухати топік</button>
        {b.topic.s.map((x, k) => (
          <div key={k} className="de-line"><div className="de"><Tap text={x.de} lang={lang} tr={tr} /> <span style={{ cursor: 'pointer' }} onClick={() => speak(cleanDe(x.de))}>🔊</span></div><div className="de-w-tr">{x[lang]}</div></div>
        ))}
        <div className="de-dim" style={{ margin: '8px 0' }}>Натисни на будь-яке слово — побачиш переклад і транскрипцію.</div>
        <button className="de-btn" onClick={() => setRun({ ids: session(b, 'order', 8), title: 'Склади речення', after: () => mark(b.id, { topic: 1 }) })}>Вправа: склади речення</button>
      </Acc>
      <Acc title="Урок 2 · Вправи" open={open === 'ex'} onToggle={() => tog('ex')}>
        <div style={{ display: 'grid', gap: 8 }}>
          {modes.map(([m, t]) => <button key={m} className="de-btn ghost" style={{ margin: 0 }} onClick={() => start(m, t)}>{t}{(d.ex || {})[m] != null ? ' · найкращий ' + d.ex[m] : ''}</button>)}
        </div>
      </Acc>
      <Acc title="Урок 3 · Аудіювання" badge={d.listen ? '✓' : ''} open={open === 'listen'} onToggle={() => tog('listen')}>
        {b.dialogs.map((dl, di) => (
          <div key={di} style={{ marginBottom: 14 }}>
            <div className="de-h2" style={{ marginTop: 8 }}>{dl.title}</div>
            <button className="de-btn ghost" style={{ margin: '0 0 6px' }} onClick={() => speakAll(dl.lines.map((l) => l.de))}>▶ Прослухати діалог</button>
            {dl.lines.map((l, k) => (
              <div key={k} className="de-line"><b>{l.who}</b><div className="de"><Tap text={l.de} lang={lang} tr={tr} /> <span style={{ cursor: 'pointer' }} onClick={() => speak(l.de)}>🔊</span></div><div className="de-w-tr">{l[lang]}</div></div>
            ))}
            <button className="de-btn" onClick={() => setRun({ ids: dl.qs.map((_, qi) => `l|${b.id}|${di}|${qi}`), title: dl.title, after: () => mark(b.id, { listen: 1 }) })}>Питання до діалогу</button>
          </div>
        ))}
        <div className="de-dim">Озвучення тимчасове (голос браузера). Професійні аудіо додамо пізніше.</div>
      </Acc>
      <Acc title="Урок 3 · Тест" badge={d.test != null ? d.test + '%' : ''} open={open === 'test'} onToggle={() => tog('test')}>
        <p className="de-dim" style={{ marginBottom: 8 }}>Мікс завдань по блоку. Зараховано від 70%.</p>
        <button className="de-btn" onClick={() => setRun({ ids: testSet(b), title: 'Тест: ' + b.title, after: (sc, n) => mark(b.id, { test: Math.max(Math.round(sc / n * 100), d.test || 0) }) })}>Почати тест</button>
      </Acc>
    </>
  )
}

export function Errors({ st, update, lang, tr }) {
  const [run, setRun] = useState(null)
  const err = st.err || {}
  const ids = Object.keys(err)
  const onAnswer = (id, ok) => {
    const e = { ...(st.err || {}) }
    if (!(id in e)) return
    if (ok) { e[id] = (e[id] || 0) + 1; if (e[id] >= 5) delete e[id] } else e[id] = 0
    update({ err: e })
  }
  if (run) return <Practice ids={run} lang={lang} tr={tr} title="Робота над помилками" onAnswer={onAnswer} onBack={() => setRun(null)} onDone={() => setRun(null)} />
  return (
    <>
      <div className="de-hello">Робота над помилками</div>
      {!ids.length ? <div className="de-empty">Помилок немає. Вони з'являться тут після вправ і тестів.</div> : (
        <>
          <div className="de-dim" style={{ marginBottom: 10 }}>У списку: {ids.length}. Завдання зникає після 5 правильних відповідей; помилка скидає лічильник.</div>
          <button className="de-btn" onClick={() => setRun(ids.sort(() => Math.random() - 0.5).slice(0, 10))}>Тренувати ({Math.min(ids.length, 10)})</button>
        </>
      )}
    </>
  )
}

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
const monday = (d) => { const x = new Date(d); const k = (x.getDay() + 6) % 7; x.setDate(x.getDate() - k); x.setHours(0, 0, 0, 0); return x }
const fmt = (d) => d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })
export function Calendar({ st, update, onBack }) {
  const today = new Date().toISOString().slice(0, 10)
  const cal = st.cal || { days: [0, 2, 4], time: '19:00' }
  const start = cal.start || today
  const set = (p) => update({ cal: { ...cal, ...p } })
  const tog = (i) => set({ days: cal.days.includes(i) ? cal.days.filter((x) => x !== i) : [...cal.days, i].sort() })
  const done = st.done || {}
  const m0 = monday(start)
  const now = new Date()
  const days = cal.days.length ? cal.days : [0, 2, 4]
  const lessonsDone = (b) => { const d = done[b.id] || {}; return [d.expl && d.words && d.topic, d.ex && Object.keys(d.ex).length > 0, d.listen && d.test != null] }
  return (
    <>
      <div className="de-row"><button className="de-back" onClick={onBack}>‹</button><b style={{ fontSize: 17 }}>Календар: 13 тижнів</b><span /></div>
      <div className="de-dim" style={{ marginBottom: 10 }}>Тиждень на блок, 3 уроки по 60 хвилин, плюс 30 хвилин слів з останнього уроку. На 13-му тижні — повторення й фінальний тест.</div>
      <div className="de-h2">Початок курсу</div>
      <input className="de-search" type="date" value={start} onChange={(e) => set({ start: e.target.value })} />
      <div className="de-h2">Дні занять</div>
      <div className="de-chips">{DAYS.map((d, i) => <button key={d} className={'de-day' + (cal.days.includes(i) ? ' on' : '')} onClick={() => tog(i)}>{d}</button>)}</div>
      <div className="de-h2">Час</div>
      <input className="de-search" type="time" value={cal.time} onChange={(e) => set({ time: e.target.value })} />
      {BLOCKS.map((b, i) => {
        const ws = new Date(m0); ws.setDate(ws.getDate() + i * 7)
        const we = new Date(ws); we.setDate(we.getDate() + 6)
        const cur = now >= ws && now <= new Date(we.getTime() + 86399000)
        const ld = lessonsDone(b)
        const dayName = (k) => DAYS[days[k % days.length]]
        return (
          <div key={b.id} className={'de-week' + (cur ? ' now' : '')}>
            <b>Тиждень {i + 1}: {b.title}</b><small>{fmt(ws)} — {fmt(we)}</small>
            {['Пояснення, слова, топік', 'Вправи', 'Аудіювання й тест'].map((t, k) => (
              <small key={k}>{ld[k] ? '✓' : '○'} Урок {k + 1} · {dayName(k)} {cal.time} · {t}</small>
            ))}
          </div>
        )
      })}
      {(() => { const ws = new Date(m0); ws.setDate(ws.getDate() + 12 * 7); const we = new Date(ws); we.setDate(we.getDate() + 6)
        return <div className="de-week"><b>Тиждень 13: повторення й фінальний тест</b><small>{fmt(ws)} — {fmt(we)}</small><small>{st.final != null ? '✓ фінальний тест ' + st.final + '%' : '○ Фінальний тест'}</small></div> })()}
      <div className="de-dim" style={{ marginTop: 8 }}>Нагадування на пошту й у Telegram підключимо разом із серверною частиною; в Android будуть пуш-сповіщення.</div>
    </>
  )
}
