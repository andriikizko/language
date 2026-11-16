import { useEffect, useState } from 'react'
import { LEVELS, blockById, poolFor, session, testSet, pick, shuffle, speak, speakAll, cleanDe, srsDue } from './engine.js'
import Practice from './Practice.jsx'
import Tap from './Tap.jsx'
import Words from './Words.jsx'

// Граматика за тижнями (урок 2 кожного тижня)
const SCHED = {
  a1: [['g_articles', 'g_plural'], ['g_sein_haben'], ['g_present'], ['g_possessive'], ['g_akkusativ'], ['g_negation'], ['g_preps'], ['g_questions'], ['g_modal'], ['g_separable'], ['g_wordorder'], ['g_perfekt']],
  a2: [['g2_perfekt_haben', 'g2_perfekt_sein'], ['g2_praeteritum'], ['g2_dativ'], ['g2_wechsel'], ['g2_adjektiv'], ['g2_komparativ'], ['g2_nebensatz'], ['g2_reflexiv'], ['g2_imperativ'], ['g2_konjunktiv'], ['g2_zu'], ['g2_futur']],
}
const PASS = 70
const KINDS = ['Слова й топік', 'Граматика й вправи', 'Діалоги й тест']
const FREE_WEEKS = 1
const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0')

function useTimer(active) {
  const [sec, setSec] = useState(0)
  useEffect(() => { if (!active) return; const t = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(t) }, [active])
  return [sec, setSec]
}

export default function Tutor({ st, update, lang, tr, onAns, level, onBack, onPrem }) {
  const L = LEVELS[level]
  const sched = SCHED[level]
  const T = st.tutor || {}
  const key = (n) => level + n
  const get = (n) => T[key(n)] || {}
  const set = (n, patch) => update({ tutor: { ...(st.tutor || {}), [key(n)]: { ...((st.tutor || {})[key(n)] || {}), ...patch } } })
  const [cur, setCur] = useState(null)   // номер уроку 1..36
  const [run, setRun] = useState(null)
  const [stage, setStage] = useState(null) // 'test' | 'warn'
  const [open, setOpen] = useState(null)
  const [run2, setRun2] = useState(0)
  const [paused, setPaused] = useState(false)
  const [sec, setSec] = useTimer(cur != null && !paused && !run)
  const [tsec, setTsec] = useTimer(stage === 'test' && !!run)

  const lessonOf = (n) => { const w = Math.floor((n - 1) / 3); return { w, k: (n - 1) % 3 + 1, b: L.blocks[w] } }
  const total = L.blocks.length * 3
  const isOpen = (n) => n === 1 || !!get(n - 1).done
  const isLocked = (n) => lessonOf(n).w >= FREE_WEEKS && !st.dev

  // ---------- список уроків ----------
  if (cur == null) {
    return (
      <>
        <div className="de-row"><button className="de-back" onClick={onBack}>‹</button><b style={{ fontSize: 17 }}>Курс-репетитор {L.name}</b><span /></div>
        <div className="de-card" style={{ marginBottom: 12 }}>
          <b>Як це працює</b>
          <div className="de-dim">12 тижнів, у кожному 3 уроки. Урок: тест по домашці з минулого уроку (таймер без пауз, зараховано від {PASS}%), нове, вправи й домашка. Наступний урок відкривається, коли здана домашка. Повертатися до пройдених можна завжди. Рекомендований час уроку: 3 години (година із застосунком і дві самостійно), таймер можна ставити на паузу.</div>
        </div>
        {L.blocks.map((b, w) => (
          <div key={b.id}>
            <div className="de-h2">Тиждень {w + 1} · {b.title}</div>
            {[1, 2, 3].map((k) => {
              const n = w * 3 + k; const d = get(n); const open_ = isOpen(n); const lk = isLocked(n)
              return (
                <button key={n} className={'de-blk' + (!open_ || lk ? ' lock' : '')} onClick={() => lk ? onPrem() : open_ ? (setCur(n), setStage(null), setOpen(null), setSec(d.sec || 0)) : alert('Спершу заверши попередній урок і здай домашку.')}>
                  <span className="n">{n}</span><span><b>Урок {n}</b><small>{KINDS[k - 1]}</small></span>
                  <span className="de-pill">{lk ? '🔒 Premium' : d.done ? '✓ ' + (d.best != null ? d.best + '%' : 'пройдено') : open_ ? 'почати' : '🔒'}</span>
                </button>
              )
            })}
          </div>
        ))}
      </>
    )
  }

  const n = cur; const { w, k, b } = lessonOf(n); const d = get(n)
  const gids = sched[w] || []
  const grams = gids.map((id) => blockById(id)).filter(Boolean)
  const prev = n > 1 ? get(n - 1) : null
  const exit = () => { set(n, { sec }); setCur(null); setStage(null); setRun(null) }

  // ---------- тест по домашці (без пауз, без виходу) ----------
  if (run && stage === 'test') {
    return (
      <>
        <div className="de-card" style={{ marginBottom: 8 }}><b>Тест по домашці · {fmt(tsec)}</b><div className="de-dim">Таймер не зупиняється, підказок немає. Вийти не можна без втрати результату.</div></div>
        <Practice ids={run.ids} lang={lang} tr="off" title="Тест по домашці" onAnswer={onAns}
          onBack={() => { if (window.confirm('Вийти з тесту? Результат буде 0%.')) { set(n, { test: 0 }); setRun(null); setStage('warn') } }}
          onDone={(sc, cnt) => { const pct = Math.round(sc / cnt * 100); set(n, { test: pct }); setRun(null); setStage(pct >= PASS ? 'ok' : 'warn') }} />
      </>
    )
  }
  if (run) return <Practice ids={run.ids} lang={lang} tr={tr} title={run.title} onAnswer={onAns} onBack={() => setRun(null)} onDone={(sc, cnt) => { run.after && run.after(sc, cnt); setRun(null) }} />

  const needTest = n > 1 && prev && prev.hw && prev.hw.length && d.test == null
  if (needTest && stage !== 'warn' && stage !== 'ok') {
    return (
      <>
        <div className="de-row"><button className="de-back" onClick={exit}>‹</button><b style={{ fontSize: 17 }}>Урок {n}</b><span /></div>
        <div className="de-card">
          <h4>Спочатку тест по домашці</h4>
          <p>Питання тільки з домашки уроку {n - 1}. Таймер іде без пауз, підказок і транскрипції немає, з тесту вийти не можна: вихід зараховується як 0%. Зараховано від {PASS}%.</p>
          <button className="de-btn" onClick={() => { setTsec(0); setStage('test'); setRun({ ids: shuffle(prev.hw).slice(0, 10) }) }}>Почати тест</button>
        </div>
      </>
    )
  }
  if (d.test != null && d.test < PASS && !d.ack) {
    return (
      <>
        <div className="de-row"><button className="de-back" onClick={exit}>‹</button><b style={{ fontSize: 17 }}>Урок {n}</b><span /></div>
        <div className="de-card">
          <h4>Результат: {d.test}%</h4>
          <p>Ти не засвоїв попередній урок. Далі буде важче. Повторити чи продовжити? Бали за урок не нараховуються, поки не повториш.</p>
          <button className="de-btn" onClick={() => { set(n, { test: null }); setCur(n - 1); setStage(null); setSec(get(n - 1).sec || 0) }}>Повторити урок {n - 1}</button>
          <button className="de-btn ghost" onClick={() => { set(n, { ack: 1 }); setStage(null) }}>Продовжити все одно</button>
        </div>
      </>
    )
  }

  // ---------- урок ----------
  const mark = (patch) => set(n, patch)
  const homework = () => {
    let ids = []
    if (k === 1) ids = [...pick(poolFor(b, 'tr'), 5), ...pick(poolFor(b, 'art'), 3), ...pick(poolFor(b, 'pl'), 2)]
    else if (k === 2) ids = [...grams.flatMap((g) => pick(poolFor(g, 'gap'), 5)), ...pick(poolFor(b, 'gap'), 4)]
    else ids = [...pick(poolFor(b, 'listen'), 2), ...pick(poolFor(b, 'order'), 3), ...pick(poolFor(b, 'tr'), 3)]
    ids = [...ids, ...pick(srsDue(st.srs), 3)]
    return shuffle(ids).slice(0, 12)
  }
  const hw = d.hw || null
  const modes = [['tr', 'Слово → переклад'], ['de', 'Переклад → слово'], ['art', 'Артикль'], ['pl', 'Множина'], ['order', 'Склади речення'], ['gap', 'Речення з пропуском']].filter(([m]) => poolFor(b, m).length >= 3)
  const exTask = (ids, title) => setRun({ ids, title, after: () => mark({ ex: (d.ex || 0) + 1 }) })
  const t = (key_, title, badge, children) => (
    <div className="de-acc"><button onClick={() => setOpen(open === key_ ? null : key_)}><span>{open === key_ ? '▾' : '▸'}</span>{title}{badge && <small>{badge}</small>}</button>{open === key_ && <div className="de-acc-b">{children}</div>}</div>
  )
  const sample = b.topic.s.slice(0, 3)
  const canFinish = d.content && d.ex && d.hwDone && (d.write || '').trim().split('\n').filter(Boolean).length >= 3
  const finish = () => { mark({ done: 1, sec }); setCur(null) }

  return (
    <>
      <div className="de-row"><button className="de-back" onClick={exit}>‹</button><b style={{ fontSize: 17 }}>Урок {n} · {b.title}</b>
        <span className="de-dim" onClick={() => setPaused(!paused)} style={{ cursor: 'pointer' }}>{paused ? '▶' : '⏸'} {fmt(sec)}</span></div>
      <div className="de-dim" style={{ marginBottom: 8 }}>{KINDS[k - 1]}. Таймер уроку (пауза за кнопкою ⏸). Рекомендовано до 3 годин.</div>

      {k === 1 && <>
        {t('c1', 'Крок 1 · Пояснення', d.content ? '✓' : '', (lang === 'ru' && b.explain_ru ? b.explain_ru : b.explain).map((s, i) => <div key={i}><h4>{s.h}</h4><p>{s.p}</p></div>))}
        {t('c2', 'Крок 2 · Нові слова', '', <Words b={b} lang={lang} />)}
        {t('c3', 'Крок 3 · Топік', '', <>
          <div className="de-h2" style={{ marginTop: 0 }}>{b.topic.title}</div>
          <button className="de-btn ghost" style={{ margin: '0 0 6px' }} onClick={() => speakAll(b.topic.s.map((x) => cleanDe(x.de)))}>▶ Прослухати</button>
          {b.topic.s.map((x, i) => <div key={i} className="de-line"><div className="de"><Tap text={x.de} lang={lang} tr={tr} /> <span style={{ cursor: 'pointer' }} onClick={() => speak(cleanDe(x.de))}>🔊</span></div><div className="de-w-tr">{x[lang]}</div></div>)}
        </>)}
        {!d.content && <button className="de-btn" onClick={() => mark({ content: 1 })}>Я прочитав, далі</button>}
      </>}

      {k === 2 && <>
        {grams.map((g) => t('g' + g.id, 'Граматика · ' + (lang === 'ru' ? g.title_ru : g.title), '', (lang === 'ru' ? g.explain_ru : g.explain).map((x, i) => <div key={i}><h4>{x.h}</h4><p>{x.p}</p></div>)))}
        {!d.content && <button className="de-btn" onClick={() => mark({ content: 1 })}>Я прочитав, далі</button>}
      </>}

      {k === 3 && <>
        {b.dialogs.map((dl, di) => t('d' + di, 'Діалог · ' + dl.title, '', <>
          <button className="de-btn ghost" style={{ margin: '0 0 6px' }} onClick={() => speakAll(dl.lines.map((l) => l.de))}>▶ Прослухати діалог</button>
          {dl.lines.map((l, i) => <div key={i} className="de-line"><b>{l.who}</b><div className="de"><Tap text={l.de} lang={lang} tr={tr} /> <span style={{ cursor: 'pointer' }} onClick={() => speak(l.de)}>🔊</span></div><div className="de-w-tr">{l[lang]}</div></div>)}
        </>))}
        {!d.content && <button className="de-btn" onClick={() => mark({ content: 1 })}>Я прослухав, далі</button>}
      </>}

      {d.content && <>
        <div className="de-h2">Вправи {d.ex ? '✓' : ''}</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {k === 1 && modes.map(([m, tt]) => <button key={m} className="de-btn ghost" style={{ margin: 0 }} onClick={() => exTask(session(b, m, 10), tt)}>{tt}</button>)}
          {k === 2 && <>
            {grams.map((g) => <button key={g.id} className="de-btn ghost" style={{ margin: 0 }} onClick={() => exTask(session(g, 'gap', 6), g.title)}>Вправи: {g.title}</button>)}
            <button className="de-btn ghost" style={{ margin: 0 }} onClick={() => exTask(session(b, 'gap', 10), 'Речення з пропуском')}>Речення з теми «{b.title}»</button>
          </>}
          {k === 3 && <>
            <button className="de-btn ghost" style={{ margin: 0 }} onClick={() => exTask(poolFor(b, 'listen'), 'Питання до діалогів')}>Питання до діалогів</button>
            <button className="de-btn ghost" style={{ margin: 0 }} onClick={() => exTask(session(b, 'order', 8), 'Склади речення')}>Склади речення</button>
            <button className="de-btn" style={{ margin: 0 }} onClick={() => setRun({ ids: testSet(b), title: 'Тест по блоку', after: (sc, cnt) => mark({ ex: (d.ex || 0) + 1, best: Math.max(Math.round(sc / cnt * 100), d.best || 0) }) })}>Тест по блоку «{b.title}»</button>
          </>}
        </div>

        {d.ex && <>
          <div className="de-h2">Домашка {d.hwDone ? '✓' : ''}</div>
          <div className="de-card">
            <p>1) Вправи на повторення слів і граматики цього уроку. 2) Напиши 3 речення із новими словами, кожне з нового рядка. Зразок: застосунок не перевіряє письмо, звір себе.</p>
            <button className="de-btn" onClick={() => { const ids = hw || homework(); if (!hw) mark({ hw: ids }); setRun({ ids, title: 'Домашка', after: () => mark({ hwDone: 1, hw: ids }) }) }}>{d.hwDone ? 'Пройти домашку ще раз' : 'Виконати вправи домашки'}</button>
            <textarea className="de-search" rows={4} placeholder="Склади 3 речення (кожне з нового рядка)" value={d.write || ''} onChange={(e) => mark({ write: e.target.value })} style={{ width: '100%', marginTop: 8 }} />
            {(d.write || '').trim().split('\n').filter(Boolean).length >= 3 && <div className="de-dim" style={{ marginTop: 6 }}>Зразок для звірки:<br />{sample.map((x, i) => <div key={i}>{x.de}</div>)}</div>}
          </div>
        </>}
        <button className="de-btn" disabled={!canFinish} style={{ marginTop: 12 }} onClick={finish}>Завершити урок</button>
        {!canFinish && <div className="de-dim" style={{ marginTop: 4 }}>Щоб завершити: вправи, вправи домашки й три речення.</div>}
      </>}
    </>
  )
}
