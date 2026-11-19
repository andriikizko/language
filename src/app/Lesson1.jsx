import { useEffect, useMemo, useRef, useState } from 'react'
import { STEPS, BLOCKS, GRADED, resolve, norm, numDe, countryDe, COUNTRY_NAMES } from './lesson1.js'

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null
const Svg = ({ children, s = 20 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
const IcSpk = () => <Svg><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16.5 8.5a5 5 0 010 7" /></Svg>
const IcMic = () => <Svg s={26}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></Svg>
const IcSlow = () => <Svg><path d="M5 4h14M7 4c0 6 3 7 5 8-2 1-5 2-5 8M17 4c0 6-3 7-5 8 2 1 5 2 5 8M5 20h14" /></Svg>
const IcBack = () => <Svg><path d="M15 6l-6 6 6 6" /></Svg>
const IcX = () => <Svg><path d="M6 6l12 12M18 6L6 18" /></Svg>

const tx = (x, lang) => (x && typeof x === 'object' ? (lang === 'ru' ? x.r : x.u) : x)
// розбір {німецька} у тексті
const parts = (s) => String(s).split(/\{([^}]+)\}/).map((p, i) => ({ de: i % 2 === 1, t: p })).filter((p) => p.t)

function lev(a, b) {
  const m = a.length, n = b.length
  if (!m) return n
  if (!n) return m
  const d = Array.from({ length: m + 1 }, (_, i) => [i])
  for (let j = 1; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[m][n]
}
const score = (expected, heard, fixed) => {
  const exp = norm(fixed || expected).split(' ').filter(Boolean)
  const got = norm(heard).split(' ').filter(Boolean)
  if (!exp.length) return 0
  let ok = 0
  const used = new Set()
  for (const e of exp) {
    const gi = got.findIndex((g, i) => !used.has(i) && (g === e || (e.length >= 4 && lev(g, e) <= 1)))
    if (gi >= 0) { used.add(gi); ok++ }
  }
  return ok / exp.length
}

export default function Lesson1({ lang, st, update, saved, onSave, onExit, onFinish }) {
  const L = lang === 'ru' ? 'ru' : 'uk'
  const [i, setI] = useState(Math.min(saved.i || 0, STEPS.length - 1))
  const [pts, setPts] = useState(saved.pts || {})
  const [sec, setSec] = useState(saved.sec || 0)
  const [voice, setVoice] = useState('all') // all | de | off
  const [local, setLocal] = useState({})
  const [listening, setListening] = useState(false)
  const recRef = useRef(null)
  const me = st.me || {}
  const s = STEPS[i]
  const total = STEPS.length

  useEffect(() => { const t = setInterval(() => setSec((x) => x + 1), 1000); return () => clearInterval(t) }, [])
  useEffect(() => () => { try { window.speechSynthesis.cancel() } catch (e) { /* */ } try { recRef.current && recRef.current.abort() } catch (e) { /* */ } }, [])
  useEffect(() => { onSave({ i, pts }) }, [i, pts]) // eslint-disable-line

  // ---------- голос ----------
  const talk = (text, rate) => {
    try {
      if (!window.speechSynthesis || voice === 'off') return
      window.speechSynthesis.cancel()
      parts(text).forEach((p) => {
        if (!p.de && voice === 'de') return
        const u = new SpeechSynthesisUtterance(p.t)
        u.lang = p.de ? 'de-DE' : (L === 'ru' ? 'ru-RU' : 'uk-UA')
        u.rate = rate || (p.de ? 0.85 : 0.98)
        window.speechSynthesis.speak(u)
      })
    } catch (e) { /* */ }
  }
  const sayDe = (de, slow) => {
    try {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(de); u.lang = 'de-DE'; u.rate = slow ? 0.55 : 0.85
      window.speechSynthesis.speak(u)
    } catch (e) { /* */ }
  }
  const ph = (de) => de // фраза вже без розмітки

  // автоозвучення при вході в крок
  useEffect(() => {
    setLocal({})
    const t = setTimeout(() => {
      if (s.k === 'say') talk(tx(s.t, L))
      else if (s.k === 'ch') talk(tx(s.q, L))
      else if (s.k === 'ty' || s.k === 'bd') talk(tx(s.q, L))
      else if (s.k === 'in') talk(tx(s.q, L))
      else if (s.k === 'rep' || s.k === 'me') sayDe(resolve(s, me))
      else if (s.k === 'conv') sayDe(s.ask)
    }, 250)
    return () => { clearTimeout(t); try { window.speechSynthesis.cancel() } catch (e) { /* */ } }
  }, [i]) // eslint-disable-line

  const addPts = (v) => setPts((p) => ({ ...p, [i]: Math.max(p[i] || 0, v) }))
  const next = () => {
    if (i < total - 1) { setI(i + 1); window.scrollTo && window.scrollTo(0, 0) }
  }
  const back = () => { if (i > 0) setI(i - 1) }

  // ---------- розпізнавання ----------
  const expected = (s.k === 'rep' || s.k === 'me' || s.k === 'conv') ? resolve(s, me) : ''
  const listen = () => {
    if (listening) { try { recRef.current.stop() } catch (e) { /* */ } return }
    if (!SR) { setLocal((l) => ({ ...l, nosr: true })); return }
    try { window.speechSynthesis.cancel() } catch (e) { /* */ }
    const r = new SR(); recRef.current = r
    r.lang = 'de-DE'; r.interimResults = false; r.maxAlternatives = 3
    let got = ''
    r.onresult = (e) => { const alts = [...e.results[0]].map((a) => a.transcript); let best = alts[0], bs = -1; alts.forEach((a) => { const sc = score(expected, a, s.fixed); if (sc > bs) { bs = sc; best = a } }); got = best }
    r.onerror = (e) => setLocal((l) => ({ ...l, err: e.error === 'not-allowed' ? 'perm' : e.error === 'no-speech' ? 'none' : 'fail' }))
    r.onend = () => {
      setListening(false)
      if (!got) return
      const sc = score(expected, got, s.fixed)
      setLocal((l) => { const tries = (l.tries || 0) + 1; return { ...l, got, sc, tries, err: null, pass: sc >= 0.7 || l.pass } })
      addPts(sc >= 0.7 ? (local.tries ? 0.7 : 1) : sc * 0.6)
    }
    setLocal((l) => ({ ...l, err: null }))
    setListening(true)
    try { r.start() } catch (e) { setListening(false) }
  }

  // ---------- готовність до «Далі» ----------
  const answered = local.done || local.pass
  const canNext = (() => {
    if (s.k === 'say') return true
    if (s.k === 'rep' || s.k === 'me' || s.k === 'conv') return !!(local.pass || (local.tries || 0) >= 2 || local.skip || local.ack)
    if (s.k === 'ch') return local.sel === s.a
    if (s.k === 'ty') return !!local.ok
    if (s.k === 'bd') return !!local.ok
    if (s.k === 'in') return !!(local.ok || me[s.field])
    return true
  })()

  const pctNow = useMemo(() => {
    const ids = STEPS.map((x, k) => (GRADED.has(x.k) ? k : -1)).filter((k) => k >= 0)
    const sum = ids.reduce((a, k) => a + (pts[k] || 0), 0)
    return Math.round(sum / ids.length * 100)
  }, [pts])

  const fmt = (x) => String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0')
  const T = (u, r) => (L === 'ru' ? r : u)
  const bl = BLOCKS[s.blk]

  // ---------- вміст кроку ----------
  const body = () => {
    if (s.k === 'say') return (
      <>
        <h2 className="ls-h">{tx(s.h, L)}</h2>
        <p className="ls-t">{parts(tx(s.t, L)).map((p, k) => p.de ? <button key={k} className="ls-de" onClick={() => sayDe(p.t)}>{p.t}</button> : <span key={k}>{p.t}</span>)}</p>
      </>
    )
    if (s.k === 'rep' || s.k === 'me' || s.k === 'conv') {
      const de = expected
      return (
        <>
          {s.k === 'conv' && <div className="ls-bub"><small>{T('Викладач', 'Преподаватель')}</small><b>{s.ask}</b><button className="ls-ic" onClick={() => sayDe(s.ask)}><IcSpk /></button></div>}
          <div className="ls-lead">{s.k === 'conv' ? T('Відповідай уголос про себе', 'Отвечай вслух о себе') : s.k === 'me' ? tx(s.u, L) : T('Слухай і повтори', 'Слушай и повтори')}</div>
          <div className="ls-big">{ph(de)}</div>
          {s.k === 'rep' && <div className="ls-tr">{tx(s.u, L)}</div>}
          {s.tip && <div className="ls-tip">{tx(s.tip, L)}</div>}
          <div className="ls-row">
            <button className="ls-b" onClick={() => sayDe(de)}><IcSpk />{T('Послухати', 'Послушать')}</button>
            <button className="ls-b" onClick={() => sayDe(de, true)}><IcSlow />{T('Повільно', 'Медленно')}</button>
          </div>
          <button className={'ls-mic' + (listening ? ' on' : '')} onClick={listen}><span><IcMic /></span><b>{listening ? T('Слухаю... говори', 'Слушаю... говори') : T('Натисни й повтори', 'Нажми и повтори')}</b></button>
          {local.err && <div className="ls-fb no">{local.err === 'perm' ? T('Дозволь доступ до мікрофона в браузері й спробуй ще раз.', 'Разреши доступ к микрофону в браузере и попробуй ещё раз.') : local.err === 'none' ? T('Нічого не почула. Спробуй ще раз.', 'Ничего не услышала. Попробуй ещё раз.') : T('Не вдалося записати. Спробуй ще раз.', 'Не удалось записать. Попробуй ещё раз.')}</div>}
          {local.got && <div className={'ls-fb ' + (local.sc >= 0.7 ? 'ok' : 'no')}>
            <b>{local.sc >= 0.7 ? T('Чудово!', 'Отлично!') : local.sc >= 0.4 ? T('Майже. Спробуй ще раз.', 'Почти. Попробуй ещё раз.') : T('Не розібрала. Послухай і повтори.', 'Не разобрала. Послушай и повтори.')}</b>
            <div className="ls-dim">{T('Я почула', 'Я услышала')}: «{local.got}»</div></div>}
          {(local.nosr || !SR) && <div className="ls-fb no">{T('Цей браузер не слухає голос. Повтори вголос і натисни «Я повторив».', 'Этот браузер не слушает голос. Повтори вслух и нажми «Я повторил».')}
            <button className="ls-b" style={{ marginTop: 8 }} onClick={() => { setLocal((l) => ({ ...l, ack: 1 })); addPts(0.8) }}>{T('Я повторив', 'Я повторил')}</button></div>}
          {!canNext && <button className="ls-skip" onClick={() => setLocal((l) => ({ ...l, skip: 1 }))}>{T('Пропустити', 'Пропустить')}</button>}
        </>
      )
    }
    if (s.k === 'ch') return (
      <>
        <div className="ls-lead">{T('Вибери відповідь', 'Выбери ответ')}</div>
        <h2 className="ls-h">{tx(s.q, L)}</h2>
        {s.o.map((o, k) => {
          const picked = local.sel !== undefined
          const cls = !picked ? '' : k === s.a ? ' ok' : k === local.sel ? ' no' : ''
          return <button key={k} className={'ls-opt' + cls} onClick={() => { if (local.sel === s.a) return; setLocal((l) => ({ ...l, sel: k, wrong: k !== s.a ? (l.wrong || 0) + 1 : l.wrong })); if (k === s.a) addPts(local.wrong ? 0.5 : 1) }}>{tx(o, L)}</button>
        })}
        {local.sel !== undefined && <div className={'ls-fb ' + (local.sel === s.a ? 'ok' : 'no')}>{tx(s.why[local.sel], L)}{local.sel !== s.a && <div className="ls-dim">{T('Спробуй ще раз.', 'Попробуй ещё раз.')}</div>}</div>}
      </>
    )
    if (s.k === 'ty') return (
      <>
        <div className="ls-lead">{T('Впиши відповідь', 'Впиши ответ')}</div>
        <h2 className="ls-h">{tx(s.q, L)}</h2>
        <input className="ls-in" value={local.v || ''} autoCapitalize="off" autoCorrect="off" placeholder={T('Німецькою', 'По-немецки')} onChange={(e) => setLocal((l) => ({ ...l, v: e.target.value, ok: l.ok, bad: false }))}
          onKeyDown={(e) => { if (e.key === 'Enter') checkTy() }} />
        <button className="ls-b" style={{ marginTop: 10 }} onClick={checkTy}>{T('Перевірити', 'Проверить')}</button>
        {local.bad && <div className="ls-fb no">{T('Ще ні. Перевір написання й спробуй знову.', 'Ещё нет. Проверь написание и попробуй снова.')}</div>}
        {local.ok && <div className="ls-fb ok">{tx(s.why, L)}</div>}
      </>
    )
    if (s.k === 'bd') {
      const used = local.b || []
      const full = used.length === s.w.length
      const good = used.join(' ') === s.ans
      return (
        <>
          <div className="ls-lead">{T('Склади речення', 'Составь предложение')}</div>
          <h2 className="ls-h">{tx(s.q, L)}</h2>
          <div className="ls-line">{used.map((w, k) => <button key={k} className="ls-chip on" onClick={() => setLocal((l) => ({ ...l, b: used.filter((_, j) => j !== k), ok: false }))}>{w}</button>)}</div>
          <div className="ls-chips">{[...s.w].sort((a, b) => a.localeCompare(b)).map((w) => <button key={w} className={'ls-chip' + (used.includes(w) ? ' used' : '')} onClick={() => { if (used.includes(w)) return; const nb = [...used, w]; setLocal((l) => ({ ...l, b: nb, ok: nb.join(' ') === s.ans, wrong: nb.length === s.w.length && nb.join(' ') !== s.ans ? (l.wrong || 0) + 1 : l.wrong })); if (nb.join(' ') === s.ans) { addPts(local.wrong ? 0.5 : 1); sayDe(nb.join(' ')) } }}>{w}</button>)}</div>
          {full && <div className={'ls-fb ' + (good ? 'ok' : 'no')}>{good ? tx(s.why, L) : T('Ще ні. Натисни на слово, щоб прибрати його, і спробуй інший порядок.', 'Ещё нет. Нажми на слово, чтобы убрать его, и попробуй другой порядок.')}</div>}
        </>
      )
    }
    if (s.k === 'in') {
      const f = s.field
      const val = local.v !== undefined ? local.v : (me[f] || '')
      const cd = f === 'country' ? countryDe(val) : null
      return (
        <>
          <div className="ls-lead">{T('Про тебе', 'О тебе')}</div>
          <h2 className="ls-h">{tx(s.q, L)}</h2>
          <input className="ls-in" value={val} list={f === 'country' ? 'ls-c' : undefined} inputMode={f === 'age' ? 'numeric' : 'text'} placeholder={tx(s.ph, L)} onChange={(e) => setLocal((l) => ({ ...l, v: e.target.value, ok: false, err: null }))} />
          {f === 'country' && <datalist id="ls-c">{COUNTRY_NAMES.map((c) => <option key={c} value={c} />)}</datalist>}
          <button className="ls-b" style={{ marginTop: 10 }} onClick={() => {
            const v = (val || '').trim()
            if (!v) return setLocal((l) => ({ ...l, err: T('Впиши відповідь.', 'Впиши ответ.') }))
            if (f === 'age') { const n = parseInt(v, 10); if (!(n >= 3 && n <= 99)) return setLocal((l) => ({ ...l, err: T('Впиши вік числом від 3 до 99.', 'Впиши возраст числом от 3 до 99.') })); update({ me: { ...me, age: n } }) }
            else if (f === 'country') { const c = countryDe(v); update({ me: { ...me, country: v, countryDe: c || v } }); setLocal((l) => ({ ...l, ok: true, v, note: !c })); return }
            else update({ me: { ...me, [f]: v } })
            setLocal((l) => ({ ...l, ok: true, v }))
          }}>{T('Зберегти', 'Сохранить')}</button>
          {local.err && <div className="ls-fb no">{local.err}</div>}
          {local.ok && cd && <div className="ls-fb ok">{T('Так і скажемо: ', 'Так и скажем: ')}<b>aus {cd}</b></div>}
          {local.ok && f === 'country' && local.note && <div className="ls-fb no">{T('Цієї країни немає в моєму списку, тож я використаю твій запис як є. Якщо знаєш німецьку назву, впиши її, і форма буде точною.', 'Этой страны нет в моём списке, поэтому я использую твою запись как есть. Если знаешь немецкое название, впиши его, и форма будет точной.')}</div>}
          {local.ok && f === 'age' && <div className="ls-fb ok">{T('Німецькою: ', 'По-немецки: ')}<b>{numDe(+me.age)}</b></div>}
        </>
      )
    }
    if (s.k === 'end') {
      const pct = pctNow
      const passed = pct >= 70
      return (
        <>
          <h2 className="ls-h">{T('Урок завершено', 'Урок завершён')}</h2>
          <div className="ls-score"><b>{pct}%</b><span>{T('результат уроку', 'результат урока')}</span></div>
          <p className="ls-t">{passed ? T('Дуже добре. Ти вмієш привітатися, назвати себе, сказати звідки ти, скільки тобі років і де ти живеш, а ще лічити до двадцяти.', 'Очень хорошо. Ты умеешь поздороваться, назвать себя, сказать откуда ты, сколько тебе лет и где ты живёшь, а ещё считать до двадцати.')
            : T('Непоганий початок, але частину матеріалу варто повторити. Поверни урок назад і пройди слабкі місця ще раз, потім переходь далі.', 'Неплохое начало, но часть материала стоит повторить. Вернись назад и пройди слабые места ещё раз, потом переходи дальше.')}</p>
          <div className="ls-card"><b>{T('Домашка', 'Домашка')}</b><div className="ls-dim">{T('Повтори вголос свій діалог три рази: привіт, ім’я, країна, вік, місто, бувай. Завтра в уроці 2 ми почнемо з нього.', 'Повтори вслух свой диалог три раза: привет, имя, страна, возраст, город, пока. Завтра в уроке 2 мы начнём с него.')}</div></div>
          <div className="ls-card"><b>{T('Що ми вивчили', 'Что мы выучили')}</b>
            <div className="ls-dim">Hallo · Guten Tag · Tschüss · Ich heiße… · Wie geht’s? · Ich komme aus… · Ich bin … Jahre alt · Ich wohne in… · 0–20</div></div>
        </>
      )
    }
    return null
  }
  function checkTy() {
    const v = norm(local.v || '').replace(/\s/g, '')
    const ok = s.ans.some((a) => norm(a).replace(/\s/g, '') === v)
    setLocal((l) => ({ ...l, ok, bad: !ok, wrong: ok ? l.wrong : (l.wrong || 0) + 1 }))
    if (ok) { addPts(local.wrong ? 0.5 : 1); sayDe(s.ans[0]) }
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <button className="ls-x" onClick={() => { try { window.speechSynthesis.cancel() } catch (e) { /* */ } onExit(sec) }} aria-label={T('Вийти', 'Выйти')}><IcX /></button>
        <div className="ls-cnt"><b>{bl ? tx(bl, L) : ''}</b><span>{T('Крок', 'Шаг')} {i + 1} {T('з', 'из')} {total} · {fmt(sec)}</span></div>
        <button className="ls-vc" onClick={() => setVoice(voice === 'all' ? 'de' : voice === 'de' ? 'off' : 'all')}>{voice === 'all' ? T('Голос', 'Голос') : voice === 'de' ? 'DE' : T('Тихо', 'Тихо')}</button>
      </div>
      <div className="ls-prog"><i style={{ width: ((i + 1) / total * 100) + '%' }} /></div>
      <div className="ls-body">{body()}</div>
      <div className="ls-foot">
        <button className="ls-bk" onClick={back} disabled={i === 0} aria-label={T('Назад', 'Назад')}><IcBack /></button>
        {(s.k === 'say') && <button className="ls-bk" onClick={() => talk(tx(s.t, L))} aria-label={T('Ще раз', 'Ещё раз')}><IcSpk /></button>}
        {s.k === 'end'
          ? <button className="ls-go" onClick={() => onFinish(pctNow, sec)}>{T('Завершити урок', 'Завершить урок')}</button>
          : <button className="ls-go" disabled={!canNext} onClick={next}>{canNext ? T('Далі', 'Далее') : s.k === 'rep' || s.k === 'me' || s.k === 'conv' ? T('Повтори вголос', 'Повтори вслух') : s.k === 'in' ? T('Збережи відповідь', 'Сохрани ответ') : T('Дай відповідь', 'Дай ответ')}</button>}
      </div>
    </div>
  )
}
