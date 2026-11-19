import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const STEPS = [
  { tab: 'home', t: 'hero', h: 'Твій наступний урок', p: 'Тут видно, на якому ти уроці й скільки пройдено. Кнопка веде одразу до навчання.' },
  { tab: 'home', t: 'today', h: 'Що закріпити сьогодні', p: 'Слова на повторення й помилки, які варто розібрати. Торкнись плитки, щоб перейти.' },
  { tab: 'learn', t: 'nav-learn', h: 'Навчання', p: 'Курс з репетитором: уроки по тижнях, граматика й іспит у форматі Goethe.' },
  { tab: 'learn', t: 'fab', h: 'Словник під рукою', p: 'Оранжева кнопка є на кожному екрані. Натисни, і словник відкриється зверху, не виходячи з уроку.' },
  { tab: 'dict', t: 'nav-dict', h: 'Словник на весь екран', p: 'Іменники, дієслова, прикметники та інше. Познач слова, які хочеш вивчити.' },
  { tab: 'profile', t: 'nav-profile', h: 'Профіль', p: 'Рівень, мова перекладу, мета, вигляд головної. Тут же можна пройти тур ще раз.' },
  { tab: 'home', t: null, h: 'Готово', p: 'Починай з наступного уроку на головній. Удачі!' },
]

export default function Tour({ onTab, onClose }) {
  const [i, setI] = useState(0)
  const [r, setR] = useState(null)
  const root = useRef(null)
  const s = STEPS[i]

  useEffect(() => { onTab(s.tab) }, [i]) // eslint-disable-line
  const measure = () => {
    const box = root.current && root.current.parentElement
    if (!box) return
    const b = box.getBoundingClientRect()
    const el = s.t && document.querySelector('[data-tour="' + s.t + '"]')
    if (!el) { setR({ none: true, W: b.width, H: b.height }); return }
    const q = el.getBoundingClientRect()
    setR({ x: q.left - b.left - 6, y: q.top - b.top - 6, w: q.width + 12, h: q.height + 12, W: b.width, H: b.height, rad: q.width < 80 ? 999 : 18 })
  }
  useLayoutEffect(() => {
    setR(null)
    const t = setTimeout(measure, 120)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure) }
  }, [i]) // eslint-disable-line

  const last = i === STEPS.length - 1
  let tip = {}
  if (r) {
    if (r.none) tip = { top: r.H / 2 - 90 }
    else if (r.y + r.h / 2 < r.H / 2) tip = { top: Math.min(r.H - 230, r.y + r.h + 12) }
    else tip = { bottom: r.H - r.y + 12 }
  }
  return (
    <div className="de-tour" ref={root}>
      {r && !r.none && <div className="de-tour-hole" style={{ left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: r.rad }} />}
      {r && r.none && <div className="de-tour-full" />}
      {r && (
        <div className="de-tour-tip" style={tip}>
          <div className="de-tour-dots">{STEPS.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}</div>
          <b>{s.h}</b>
          <p>{s.p}</p>
          <div className="de-tour-bt">
            {!last ? <button className="skip" onClick={onClose}>Пропустити</button> : <span />}
            <span>
              {i > 0 && <button className="back" onClick={() => setI(i - 1)}>Назад</button>}
              <button className="next" onClick={() => (last ? onClose() : setI(i + 1))}>{last ? 'Почати' : 'Далі'}</button>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
