import { useMemo, useRef, useState } from 'react'
import { LEVELS, poolFor, pick, makeQuestion, examIds, speakAll } from './engine.js'

// Ступені складності: 1-2 = A1, 3-5 = A2
const poolStep = (s) => {
  const A1 = LEVELS.a1, A2 = LEVELS.a2
  if (s === 1) return A1.blocks.flatMap((b) => [...poolFor(b, 'art'), ...poolFor(b, 'tr')])
  if (s === 2) return A1.grammar.flatMap((g) => poolFor(g, 'gap'))
  if (s === 3) return A2.blocks.flatMap((b) => [...poolFor(b, 'tr'), ...poolFor(b, 'gap')])
  if (s === 4) return A2.grammar.flatMap((g) => poolFor(g, 'gap'))
  return ['lesen', 'schreiben', 'hoeren'].flatMap((k) => examIds(k, 'a2'))
}
const MIN = 12, MAX = 24

export const recommend = (steps) => {
  const w = steps.slice(-8); const ab = w.reduce((a, b) => a + b, 0) / w.length
  if (ab < 2.5) return { level: 'a1', ab }
  return { level: 'a2', ab, more: ab >= 4.3 }
}

export default function Placement({ lang, tr, guest, onDone, onSkip, onAuth }) {
  const used = useRef(new Set())
  const pools = useMemo(() => [0, 1, 2, 3, 4, 5].map((s) => (s ? poolStep(s) : [])), [])
  const draw = (step) => {
    for (let d = 0; d < 5; d++) for (const s of [step - d, step + d]) {
      if (s < 1 || s > 5) continue
      const free = pools[s].filter((id) => !used.current.has(id))
      for (const id of pick(free, 6)) { const q = makeQuestion(id, lang); if (q && q.type === 'choice') { used.current.add(id); return { q, s } } }
    }
    return null
  }
  const [cur, setCur] = useState(() => draw(2))
  const [step, setStep] = useState(2)
  const [hist, setHist] = useState([])
  const [sel, setSel] = useState(null)
  const [res, setRes] = useState(null)
  if (res) {
    const L = res.level === 'a1' ? 'A1' : 'A2'
    const wrong = hist.filter((h) => !h.ok)
    return (
      <div className="de-main">
        <div className="de-hello">Твій рівень: {L}{res.more ? '+' : ''}</div>
        <div className="de-card">
          Судячи з відповідей, радимо почати з рівня <b>{L}</b>.{res.more ? ' Ти впевнено пройшов A2, тож згодом тобі підійде B1 (він скоро з’явиться).' : ''}
          <div className="de-dim" style={{ marginTop: 6 }}>Це орієнтовна оцінка за {hist.length} питань. Рівень можна змінити будь-коли.</div>
        </div>
        {wrong.length > 0 && <div className="de-h2">Розбір помилок</div>}
        {wrong.map((h, i) => (
          <div className="de-card" key={i} style={{ marginBottom: 8 }}>
            <div className="de-dim">{h.q.prompt}</div>
            <div>Твоя відповідь: <b>{h.q.opts[h.sel]}</b></div>
            <div>{h.q.explain}</div>
            {h.q.wmap && h.q.wmap[h.q.opts[h.sel]] && <div className="de-dim">Чому не так: {h.q.wmap[h.q.opts[h.sel]]}.</div>}
          </div>
        ))}
        {guest
          ? <><div className="de-dim" style={{ margin: '10px 0' }}>Щоб зберегти результат і почати навчання, зареєструйся.</div><button className="de-btn" onClick={() => onAuth(res.level)}>Зареєструватися</button></>
          : <button className="de-btn" onClick={() => onDone(res.level)}>Розпочати навчання на {L}</button>}
        <button className="de-btn ghost" onClick={onSkip}>Вибрати рівень самому</button>
      </div>
    )
  }
  if (!cur) return <div className="de-empty">Немає питань<button className="de-btn" onClick={onSkip}>Назад</button></div>
  const { q } = cur
  const answered = sel !== null
  const answer = (k) => {
    if (answered) return
    setSel(k)
  }
  const next = () => {
    const ok = sel === q.correct
    const nh = [...hist, { q, sel, ok, s: cur.s }]
    const steps = nh.map((h) => h.s)
    const ns = Math.max(1, Math.min(5, cur.s + (ok ? 1 : -1)))
    const last = steps.slice(-6)
    const stable = nh.length >= MIN && Math.max(...last) - Math.min(...last) <= 1
    const lowFail = nh.length >= 8 && nh.slice(-4).filter((h) => !h.ok).length >= 3 && cur.s === 1
    if (nh.length >= MAX || stable || lowFail) { setHist(nh); setRes(recommend(steps)); return }
    const n = draw(ns)
    if (!n) { setHist(nh); setRes(recommend(steps)); return }
    setHist(nh); setStep(ns); setCur(n); setSel(null)
  }
  const ok = answered && sel === q.correct
  return (
    <div className="de-main">
      <div className="de-row"><button className="de-back" onClick={onSkip}>‹</button><b>Тест рівня</b><span className="de-dim">{hist.length + 1}</span></div>
      <div className="de-bar"><div style={{ width: Math.min(100, (hist.length + (answered ? 1 : 0)) / MIN * 100) + '%' }} /></div>
      <div className="de-q-card">
        <div className="de-q-hint">{q.hint}</div>
        {q.text && <div className="de-card" style={{ whiteSpace: 'pre-line', marginBottom: 10 }}>{q.text}</div>}
        {q.audio && <button className="de-btn ghost" style={{ margin: '0 0 10px' }} onClick={() => speakAll(q.audio)}>▶ Прослухати діалог</button>}
        <div style={{ fontSize: 22, fontWeight: 800 }}>{q.prompt}</div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {q.opts.map((o, k) => <button key={k} className={'de-opt' + (answered ? (k === q.correct ? ' right' : k === sel ? ' bad' : '') : '')} disabled={answered} onClick={() => answer(k)}>{o}</button>)}
      </div>
      {answered && (
        <>
          <div className={'de-expl' + (ok ? ' ok' : ' no')}>{ok ? '✓ Правильно. ' : '✗ Неправильно. '}{q.explain}{!ok && q.wmap && q.wmap[q.opts[sel]] && <div>Чому не так: {q.wmap[q.opts[sel]]}.</div>}</div>
          <button className="de-btn" onClick={next}>Далі</button>
        </>
      )}
    </div>
  )
}
