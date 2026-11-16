import { useEffect, useMemo, useRef, useState } from 'react'
import Splash from './Splash.jsx'
import Ic from './Icons.jsx'
import { post } from './api.js'
import Nouns from './Nouns.jsx'
import { Course, Errors, Calendar } from './Course.jsx'
import { Verbs, Adjectives, Pronouns, Numerals, Preps } from './Dict.jsx'

const SKEY = 'languages.session'
const ERR = {
  exists: 'Такий логін уже зайнятий', wrong: 'Невірний логін або пароль', locked: 'Забагато спроб. Зачекайте хвилину',
  bad_login: 'Логін: 3–32 символи (літери, цифри, _ . -)', bad_password: 'Пароль: від 4 символів',
  bad_email: 'Вкажіть правильну email-адресу', bad_phone: 'Телефон вказано неправильно', no_db: 'Сервер тимчасово недоступний',
}

const SLIDES = [
  ['Курс німецької A1 для українців', 'Пояснення рідною мовою, власні тексти й діалоги, 12 тем із життя: від чисел і родини до роботи й лікаря.'],
  ['Три місяці до результату', '12 тижнів по одній темі, 13-й тиждень на повторення й фінальний тест. 3 заняття на тиждень, розклад у календарі.'],
  ['Безкоштовно і Premium', 'Безкоштовно: перші 3 блоки курсу, весь Словник, робота над помилками. Premium: усі 12 блоків і фінальний тест. Без реклами.'],
  ['Натисни на слово', 'У тексті й діалогах тапни будь-яке слово: побачиш переклад і транскрипцію та почуєш озвучення. Вид транскрипції змінюється в Профілі.'],
]
const Intro = ({ onDone }) => {
  const [i, setI] = useState(0)
  return (
    <div className="de-intro">
      <h2>{SLIDES[i][0]}</h2><p>{SLIDES[i][1]}</p>
      <div className="de-dots">{SLIDES.map((_, k) => <span key={k} className={k === i ? 'on' : ''} />)}</div>
      <button className="de-btn" onClick={() => (i + 1 < SLIDES.length ? setI(i + 1) : onDone())}>{i + 1 < SLIDES.length ? 'Далі' : 'Почати'}</button>
      <button className="de-btn ghost" onClick={onDone}>Пропустити</button>
    </div>
  )
}

const Auth = ({ onAuth }) => {
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ login: '', password: '', email: '', phone: '', consent: false })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const go = async () => {
    setErr(''); setBusy(true)
    const body = mode === 'login' ? { action: 'login', login: f.login, password: f.password } : { action: 'register', ...f }
    const r = await post('/api/auth', body)
    setBusy(false)
    if (!r.ok) return setErr(ERR[r.error] || 'Помилка. Спробуйте ще раз')
    onAuth({ token: r.token, login: r.login, name: r.name }, r.state)
  }
  return (
    <div className="de-auth">
      <h1>LANGUAGES</h1>
      <p>{mode === 'login' ? 'Увійдіть у свій акаунт' : 'Створіть акаунт, щоб зберігати прогрес'}</p>
      <input className="de-search" placeholder="Логін" autoCapitalize="none" value={f.login} onChange={set('login')} />
      {mode === 'register' && <input className="de-search" type="email" placeholder="Email (обовʼязково)" value={f.email} onChange={set('email')} />}
      {mode === 'register' && <input className="de-search" type="tel" placeholder="Телефон (необовʼязково)" value={f.phone} onChange={set('phone')} />}
      <input className="de-search" type="password" placeholder="Пароль" value={f.password} onChange={set('password')} />
      {mode === 'register' && (
        <label className="de-chk"><input type="checkbox" checked={f.consent} onChange={set('consent')} />
          <span>Погоджуюсь отримувати повідомлення, листи та дзвінки щодо навчання й пропозицій (можна вимкнути в профілі)</span></label>
      )}
      {err && <div className="de-err">{err}</div>}
      <button className="de-btn" disabled={busy} onClick={go}>{mode === 'login' ? 'Увійти' : 'Зареєструватися'}</button>
      <button className="de-btn ghost" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErr('') }}>
        {mode === 'login' ? 'Створити акаунт' : 'Вже є акаунт'}
      </button>
    </div>
  )
}

export default function App() {
  const [splash, setSplash] = useState(true)
  const [sess, setSess] = useState(() => { try { return JSON.parse(localStorage.getItem(SKEY)) } catch { return null } })
  const [st, setSt] = useState(() => { try { return JSON.parse(localStorage.getItem('languages.state')) || {} } catch { return {} } })
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState(null)
  const timer = useRef(null)

  const update = (patch) => setSt((s) => ({ ...s, ...patch }))
  useEffect(() => {
    localStorage.setItem('languages.state', JSON.stringify(st))
    if (!sess) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => post('/api/sync', { login: sess.login, token: sess.token, state: st }), 1200)
  }, [st]) // eslint-disable-line

  const onAuth = (s, remote) => {
    localStorage.setItem(SKEY, JSON.stringify(s)); setSess(s)
    if (remote) setSt(remote)
  }
  const logout = () => { localStorage.removeItem(SKEY); setSess(null) }
  const lang = st.lang || 'uk'
  const tr = st.trans || lang
  const knownCount = Object.keys(st.known || {}).length
  const onAns = (id, ok) => setSt((s) => (ok
    ? (id.startsWith('w|') ? { ...s, known: { ...(s.known || {}), [id.split('|')[2]]: 1 } } : s)
    : { ...s, err: { ...(s.err || {}), [id]: 0 } }))
  const wantCount = useMemo(() => Object.keys(st.want || {}).length, [st.want])

  if (splash) return <div className="de-app"><Splash onDone={() => setSplash(false)} /></div>
  if (!sess) return <div className="de-app"><div className="de-main"><Auth onAuth={onAuth} /></div></div>

  const showIntro = !st.intro
  const nav = [['home', 'Головна', 'home'], ['learn', 'Поточне навчання', 'learn'], ['errors', 'Робота над помилками', 'alert'], ['profile', 'Профіль', 'person']]
  const go = (t) => { setTab(t); setScreen(null) }

  return (
    <div className="de-app">
      {showIntro && <Intro onDone={() => update({ intro: 1 })} />}
      <div className="de-main">
        {tab === 'home' && !screen && (
          <>
            <div className="de-hello">Привіт, {sess.name}!</div>
            <div className="de-h2" style={{ marginTop: 0 }}>Словник · {wantCount} до вивчення</div>
            <div className="de-grid">
              <button className="de-tile" onClick={() => setScreen('nouns')}><span className="de-tile-ic">📘</span><b>Іменники</b><small>з артиклями</small></button>
              <button className="de-tile" onClick={() => setScreen('verbs')}><span className="de-tile-ic">⚡</span><b>Дієслова</b><small>6 форм</small></button>
              <button className="de-tile" onClick={() => setScreen('adj')}><span className="de-tile-ic">🎨</span><b>Прикметники</b><small>і кольори</small></button>
              <button className="de-tile" onClick={() => setScreen('pron')}><span className="de-tile-ic">👤</span><b>Займенники</b><small>і питання</small></button>
              <button className="de-tile" onClick={() => setScreen('nums')}><span className="de-tile-ic">🔢</span><b>Числівники</b><small>0–100, порядкові</small></button>
              <button className="de-tile" onClick={() => setScreen('preps')}><span className="de-tile-ic">🧭</span><b>Прийменники</b><small>з відмінками</small></button>
            </div>
          </>
        )}
        {tab === 'home' && screen && (() => {
          const p = { lang, want: st.want || {}, setWant: (w) => update({ want: w }), onBack: () => setScreen(null) }
          const M = { cal: (q) => <Calendar st={st} update={update} onBack={q.onBack} />, nouns: Nouns, verbs: Verbs, adj: Adjectives, pron: Pronouns, nums: Numerals, preps: Preps }[screen]
          return screen === 'cal' ? M(p) : <M {...p} />
        })()}
        {tab === 'learn' && <Course st={st} update={update} lang={lang} tr={tr} onAns={onAns} />}
        {tab === 'errors' && <Errors st={st} update={update} lang={lang} tr={tr} />}
        {tab === 'profile' && (
          <>
            <div className="de-hello">{sess.name}</div>
            <div className="de-card"><b>Вивчено слів: {knownCount} / 500</b><div className="de-bar" style={{ marginTop: 8, marginBottom: 0 }}><div style={{ width: Math.min(100, knownCount / 5) + '%' }} /></div><div className="de-dim" style={{ marginTop: 6 }}>Слово зараховується, коли ти правильно відповів на нього у вправі.</div></div>
            <div className="de-h2">Мова перекладу</div>
            <div className="de-seg" style={{ width: 'fit-content' }}>
              <button className={lang === 'uk' ? 'on' : ''} onClick={() => update({ lang: 'uk' })}>UA</button>
              <button className={lang === 'ru' ? 'on' : ''} onClick={() => update({ lang: 'ru' })}>RU</button>
            </div>
            <label className="de-chk" style={{ marginTop: 20 }}><input type="checkbox" checked={!!st.dev} onChange={(e) => update({ dev: e.target.checked })} /><span>Тестовий режим: відкрити всі блоки курсу (буде прибрано перед релізом)</span></label>
            <div className="de-h2">Транскрипція при натисканні на слово</div>
            <div className="de-seg" style={{ width: 'fit-content' }}>
              {[['off', 'Вимкнена'], ['uk', 'Українськими'], ['ru', 'Російськими']].map(([k, l]) => <button key={k} className={tr === k ? 'on' : ''} onClick={() => update({ trans: k })}>{l}</button>)}
            </div>
            <div className="de-dim" style={{ marginTop: 6 }}>Транскрипція наближена й не замінює озвучення.</div>
            <button className="de-btn ghost" style={{ marginTop: 24 }} onClick={logout}>Вийти</button>
          </>
        )}
      </div>
      <nav className="de-nav">
        {nav.map(([id, label, ic]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => go(id)}>
            <span className="de-navic"><Ic id={ic} size={24} /></span><small>{label}</small>
          </button>
        ))}
      </nav>
    </div>
  )
}
