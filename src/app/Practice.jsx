import { useMemo, useState } from 'react'
import { makeQuestion, speakAll } from './engine.js'
import Tap from './Tap.jsx'

const norm = (s) => s.trim().toLowerCase().replace(/[.,!?;:«»"„“]/g, '').replace(/\s+/g, ' ').replace(/^die\s+/, '')

export default function Practice({ ids, lang, tr = 'off', title, onAnswer, onDone, onBack }) {
  const qs = useMemo(() => ids.map((id) => makeQuestion(id, lang)).filter(Boolean), []) // eslint-disable-line
  const [i, setI] = useState(0)
  const [sel, setSel] = useState(null)
  const [txt, setTxt] = useState('')
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState([])
  const [fin, setFin] = useState(false)
  const [built, setBuilt] = useState([])
  if (!qs.length) return <div className="de-empty">Немає завдань<button className="de-btn" onClick={onBack}>Назад</button></div>
  if (fin) {
    return (
      <div className="de-empty">
        <div className="de-result-n" style={{ fontSize: 56, fontWeight: 800, color: 'var(--o-600)' }}>{score}<small style={{ fontSize: 24, color: 'var(--dim)' }}>/{qs.length}</small></div>
        <div style={{ margin: '10px 0' }}>{score === qs.length ? 'Без помилок!' : wrong.length + ' помилок додано в «Роботу над помилками»'}</div>
        <button className="de-btn" onClick={() => onDone && onDone(score, qs.length)}>Готово</button>
      </div>
    )
  }
  const q = qs[i]
  const answered = sel !== null
  const check = (ok, value) => {
    setSel(value)
    if (ok) setScore((s) => s + 1); else setWrong((w) => [...w, q.id])
    onAnswer && onAnswer(q.id, ok)
  }
  const ok = answered && (q.type === 'choice' ? sel === q.correct : q.type === 'order' ? sel === q.answer : norm(sel) === norm(q.answer))
  const next = () => { setSel(null); setTxt(''); setBuilt([]); if (i + 1 >= qs.length) setFin(true); else setI(i + 1) }
  return (
    <>
      <div className="de-row"><button className="de-back" onClick={onBack}>‹</button><b>{title}</b><span className="de-dim">{i + 1}/{qs.length}</span></div>
      <div className="de-bar"><div style={{ width: ((i + (answered ? 1 : 0)) / qs.length * 100) + '%' }} /></div>
      <div className="de-q-card">
        <div className="de-q-hint">{q.hint}</div>
        {q.text && <div className="de-card" style={{ whiteSpace: 'pre-line', marginBottom: 10 }}>{q.text}</div>}
        {q.audio && <button className="de-btn ghost" style={{ margin: '0 0 10px' }} onClick={() => speakAll(q.audio)}>{q.audioLabel || '▶ Прослухати діалог (можна кілька разів)'}</button>}
        <div style={{ fontSize: 22, fontWeight: 800 }}>{q.de ? <Tap text={q.prompt} lang={lang} tr={tr} /> : q.prompt}</div>
        {q.sub && <div className="de-dim" style={{ marginTop: 6 }}>{q.sub}</div>}
      </div>
      {q.type === 'order' ? (
        <>
          <div className="de-built">{built.map((k) => <button key={k} className="de-tok" disabled={answered} onClick={() => setBuilt(built.filter((x) => x !== k))}>{q.tokens[k]}</button>)}</div>
          <div>{q.tokens.map((t, k) => <button key={k} className={'de-tok' + (built.includes(k) ? ' used' : '')} disabled={built.includes(k) || answered} onClick={() => setBuilt([...built, k])}>{t}</button>)}</div>
          {!answered && <button className="de-btn" disabled={built.length !== q.tokens.length} onClick={() => { const a = built.map((k) => q.tokens[k]).join(' '); check(a === q.answer, a) }}>Перевірити</button>}
        </>
      ) : q.type === 'choice' ? (
        <div style={{ display: 'grid', gap: 8 }}>
          {q.opts.map((o, k) => {
            const st = answered ? (k === q.correct ? ' right' : k === sel ? ' bad' : '') : ''
            return <button key={k} className={'de-opt' + st} disabled={answered} onClick={() => check(k === q.correct, k)}>{o}</button>
          })}
        </div>
      ) : (
        <>
          <input className="de-search" placeholder="Твоя відповідь" value={txt} disabled={answered} autoCapitalize="none"
            onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && txt.trim() && !answered && check(norm(txt) === norm(q.answer), txt)} />
          {!answered && <button className="de-btn" disabled={!txt.trim()} onClick={() => check(norm(txt) === norm(q.answer), txt)}>Перевірити</button>}
        </>
      )}
      {answered && (
        <>
          <div className={'de-expl' + (ok ? ' ok' : ' no')}>{ok ? '✓ Правильно. ' : '✗ Неправильно. '}{!ok && q.tpl && q.type === 'choice' && q.opts[sel] != null && <div>Твій варіант: «{q.tpl.replace('___', q.opts[sel])}» — тут він не підходить.</div>}{!ok && q.type === 'choice' && !q.tpl && q.opts[sel] != null && <div>Ти вибрав: «{q.opts[sel]}».</div>}{!ok && q.wmap && q.opts[sel] != null && q.wmap[q.opts[sel]] && <div>Чому не так: {q.wmap[q.opts[sel]]}.</div>}{q.explain}</div>
          <button className="de-btn" onClick={next}>{i + 1 >= qs.length ? 'Завершити' : 'Далі'}</button>
        </>
      )}
    </>
  )
}
