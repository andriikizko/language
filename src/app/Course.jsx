import { useState } from 'react'
import { LEVELS, blockWords, blockById, poolFor, session, testSet, speak, speakAll, cleanDe, finalSet, srsUpdate, srsDue, examIds } from './engine.js'
import Tap from './Tap.jsx'
import Practice from './Practice.jsx'
import Words from './Words.jsx'
import Tutor from './Tutor.jsx'

const ART = { m: 'der', f: 'die', n: 'das', p: 'die' }

const Acc = ({ title, badge, open, onToggle, children }) => (
  <div className="de-acc">
    <button onClick={onToggle}><span>{open ? '▾' : '▸'}</span>{title}{badge && <small>{badge}</small>}</button>
    {open && <div className="de-acc-b">{children}</div>}
  </div>
)

const MODES = [['order', 'Склади речення (з топіку)'], ['tr', 'Слово → переклад'], ['de', 'Переклад → слово'], ['art', 'Артикль'], ['pl', 'Множина (вписати)'], ['gap', 'Речення з пропуском'], ['err', 'Яке речення правильне?'], ['dict', 'Диктант (на слух)']]

export function Course({ st, update, lang, tr, onAns }) {
  const [cur, setCur] = useState(null)
  const [open, setOpen] = useState('expl')
  const [run, setRun] = useState(null)
  const [prem, setPrem] = useState(false)
  const [tutor, setTutor] = useState(false)
  const done = st.done || {}
  const mark = (id, patch) => update({ done: { ...done, [id]: { ...(done[id] || {}), ...patch } } })

  const level = st.level && LEVELS[st.level]?.blocks.length ? st.level : 'a1'
  const L = LEVELS[level]
  const locked = (i) => i >= L.free && !st.dev

  if (run) {
    return <Practice ids={run.ids} lang={lang} tr={tr} title={run.title} onAnswer={onAns}
      onBack={() => setRun(null)} onDone={(sc, n) => { run.after && run.after(sc, n); setRun(null) }} />
  }

  if (tutor) return <Tutor st={st} update={update} lang={lang} tr={tr} onAns={onAns} level={level} onBack={() => setTutor(false)} onPrem={() => { setTutor(false); setPrem(true) }} />

  if (prem) {
    return (
      <>
        <div className="de-row"><button className="de-back" onClick={() => setPrem(false)}>‹</button><b style={{ fontSize: 17 }}>Premium</b><span /></div>
        <div className="de-card">
          <h4>Тарифи</h4>
          <p><b>Безкоштовно.</b> 50 слів на кожну тему, решта слів теми відкривається після відео. Перші блоки курсу.</p>
          <p><b>4,90 €.</b> Повний словник без реклами.</p>
          <p><b>9,90 €.</b> Слова, речення, повторення за розкладом, робота над помилками.</p>
          <p><b>19,90 €.</b> Повний курс-репетитор: 12 тижнів, урок за уроком із домашкою й тестами, доступ на півроку.</p>
          <button className="de-btn" disabled>Купити</button>
          <div className="de-dim" style={{ marginTop: 6 }}>Оплата зʼявиться в Android-версії застосунку після публікації в Google Play.</div>
        </div>
      </>
    )
  }

  if (!cur) {
    return (
      <>
        <div className="de-hello">Курс німецької {L.name}</div>
        {LEVELS.a2.blocks.length > 0 && <div className="de-seg" style={{ width: 'fit-content', marginBottom: 10 }}>{Object.entries(LEVELS).filter(([, v]) => v.blocks.length).map(([k, v]) => <button key={k} className={level === k ? 'on' : ''} onClick={() => update({ level: k })}>{v.name}</button>)}</div>}
        <div className="de-dim" style={{ marginBottom: 12 }}>{L.free ? `Перші ${L.free} блоки безкоштовні, решта — за підпискою.` : 'Рівень доступний за підпискою.'}</div>
        <button className="de-btn" style={{ marginBottom: 12 }} onClick={() => setTutor(true)}>▶ Курс-репетитор {L.name}: урок за уроком</button>
        {L.blocks.map((b, i) => {
          const d = done[b.id] || {}
          return (
            <button key={b.id} className={'de-blk' + (locked(i) ? ' lock' : '')} onClick={() => (locked(i) ? setPrem(true) : (setCur(b.id), setOpen('expl')))}>
              <span className="n">{i + 1}</span><span><b>{b.title}</b><small>{b.sub}</small></span>
              <span className="de-pill">{locked(i) ? '🔒 Premium' : d.test != null ? 'тест ' + d.test + '%' : 'почати'}</span>
            </button>
          )
        })}
        <div className="de-h2">Граматика {L.name}</div>
        {L.grammar.map((g, i) => {
          const d = done[g.id] || {}; const lk = i >= L.freeG && !st.dev
          return (
            <button key={g.id} className={'de-blk' + (lk ? ' lock' : '')} onClick={() => (lk ? setPrem(true) : setCur(g.id))}>
              <span className="n">{i + 1}</span><span><b>{lang === 'ru' ? g.title_ru : g.title}</b><small>{g.sub}</small></span>
              <span className="de-pill">{lk ? '🔒 Premium' : d.test != null ? d.test + '/6' : 'почати'}</span>
            </button>
          )
        })}
        <div className="de-h2">Іспит у стилі Goethe {L.name}</div>
        {[['lesen', 'Lesen · читання', '15 завдань'], ['schreiben', 'Schreiben · письмо', 'анкета й повідомлення'], ['hoeren', 'Hören · слухання', '8 завдань, озвучення тимчасове']].map(([k, t, sub]) => (
          <button key={k} className={'de-blk' + (st.dev ? '' : ' lock')} onClick={() => !st.dev ? setPrem(true) : setRun({ ids: examIds(k, level), title: t, after: (sc, n) => update({ exam: { ...(st.exam || {}), [k]: Math.round(sc / n * 100) } }) })}>
            <span className="n">✎</span><span><b>{t}</b><small>{sub}</small></span>
            <span className="de-pill">{st.dev ? ((st.exam || {})[k] != null ? st.exam[k] + '%' : 'почати') : '🔒 Premium'}</span>
          </button>
        ))}
        <div className="de-dim" style={{ margin: '4px 0 10px' }}>Складено, якщо кожна частина від 60%. Говоріння застосунок не перевіряє: тренуй діалоги з уроків вголос.</div>
        <button className={'de-blk' + (st.dev ? '' : ' lock')} onClick={() => !st.dev ? setPrem(true) : setRun({ ids: finalSet(level), title: 'Фінальний тест', after: (sc, n) => update({ final: Math.max(Math.round(sc / n * 100), st.final || 0) }) })}>
          <span className="n">★</span><span><b>Фінальний тест</b><small>основні слова з усіх блоків</small></span>
          <span className="de-pill">{st.dev ? (st.final != null ? st.final + '%' : 'почати') : '🔒 Premium'}</span>
        </button>
      </>
    )
  }

  const b = blockById(cur)
  const d = done[b.id] || {}
  if (b.kind === 'grammar') {
    const ex = lang === 'ru' ? b.explain_ru : b.explain
    return (
      <>
        <div className="de-row"><button className="de-back" onClick={() => setCur(null)}>‹</button><b style={{ fontSize: 17 }}>{lang === 'ru' ? b.title_ru : b.title}</b><span /></div>
        <div className="de-card">{ex.map((x, i) => <div key={i}><h4>{x.h}</h4><p>{x.p}</p></div>)}</div>
        <button className="de-btn" onClick={() => setRun({ ids: session(b, 'gap', 10), title: b.title, after: (sc) => mark(b.id, { test: Math.max(sc, d.test || 0) }) })}>Вправа: речення з пропуском</button>
      </>
    )
  }
  const modes = [...MODES, ...(b.numq ? [['num', 'Числа цифрами']] : [])].filter(([m]) => poolFor(b, m).length >= 3)
  const start = (mode, title) => setRun({ ids: session(b, mode, 10), title, after: (sc, n) => mark(b.id, { ex: { ...(d.ex || {}), [mode]: Math.max(sc, (d.ex || {})[mode] || 0) } }) })
  const tog = (k) => { setOpen(open === k ? null : k); if (k === 'expl' || k === 'words') mark(b.id, { [k]: 1 }) }

  return (
    <>
      <div className="de-row"><button className="de-back" onClick={() => setCur(null)}>‹</button><b style={{ fontSize: 17 }}>{b.title}</b><span /></div>
      <Acc title="Урок 1 · Пояснення" badge={d.expl ? '✓' : ''} open={open === 'expl'} onToggle={() => tog('expl')}>
        {(lang === 'ru' && b.explain_ru ? b.explain_ru : b.explain).map((s, i) => <div key={i}><h4>{s.h}</h4><p>{s.p}</p></div>)}
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
    if (id in e || run?.srs) update({ srs: srsUpdate(st.srs, id, ok) })
    if (!(id in e)) return
    if (ok) { e[id] = (e[id] || 0) + 1; if (e[id] >= 5) delete e[id] } else e[id] = 0
    update({ err: e })
  }
  const due = srsDue(st.srs)
  if (run) return <Practice ids={run.ids} lang={lang} tr={tr} title={run.srs ? 'Повторення' : 'Робота над помилками'} onAnswer={onAnswer} onBack={() => setRun(null)} onDone={() => setRun(null)} />
  return (
    <>
      <div className="de-hello">Повторення й помилки</div>
      <div className="de-card" style={{ marginBottom: 12 }}><b>Повторення за розкладом: {due.length}</b>
        <div className="de-dim">Слова й завдання, які пора повторити: через 1, 3, 7, 14 і 30 днів після правильної відповіді.</div>
        {due.length > 0 && <button className="de-btn" onClick={() => setRun({ srs: 1, ids: due.sort(() => Math.random() - 0.5).slice(0, 10) })}>Повторити ({Math.min(due.length, 10)})</button>}
      </div>
      <div className="de-h2" style={{ marginTop: 0 }}>Робота над помилками</div>
      {!ids.length ? <div className="de-empty">Помилок немає. Вони з'являться тут після вправ і тестів.</div> : (
        <>
          <div className="de-dim" style={{ marginBottom: 10 }}>У списку: {ids.length}. Завдання зникає після 5 правильних відповідей; помилка скидає лічильник.</div>
          <button className="de-btn" onClick={() => setRun({ ids: ids.sort(() => Math.random() - 0.5).slice(0, 10) })}>Тренувати ({Math.min(ids.length, 10)})</button>
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
      {LEVELS[(st.level && LEVELS[st.level]?.blocks.length) ? st.level : 'a1'].blocks.map((b, i) => {
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
