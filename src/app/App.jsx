import { useEffect, useMemo, useRef, useState } from 'react'
import Splash from './Splash.jsx'
import Ic from './Icons.jsx'
import { post, BASE } from './api.js'
import Nouns from './Nouns.jsx'
import { Course, Errors, Calendar } from './Course.jsx'
import { srsUpdate } from './engine.js'
import { Verbs, Adjectives, Pronouns, Numerals, Preps } from './Dict.jsx'

import Placement from './Placement.jsx'
const SKEY = 'languages.session'
const ERR = {
  exists: 'Такий логін уже зайнятий', wrong: 'Невірний логін або пароль', locked: 'Забагато спроб. Зачекайте хвилину',
  bad_login: 'Логін: 3–32 символи (літери, цифри, _ . -)', bad_password: 'Пароль: від 4 символів',
  bad_email: 'Вкажіть правильну email-адресу', bad_phone: 'Телефон вказано неправильно', no_db: 'Сервер тимчасово недоступний', google_failed: 'Не вдалося увійти через Google', no_google: 'Вхід через Google ще не налаштований', bad_name: 'Вкажіть імʼя',
}

const LV = [['a1', 'A1', 'З нуля: базові фрази, числа, родина, їжа, місто'], ['a2', 'A2', 'Знаєш основи: розмови про здоров’я, роботу, житло, подорожі'], ['b1', 'B1', 'Середній рівень: робота, житло, довкілля, суспільство, офіційні справи'], ['b2', 'B2', 'Вище середнього: політика, наука, право, медіа, психологія']]
const Start = ({ onTest, onPick }) => {
  const [pick, setPick] = useState(false)
  return (
    <div className="de-auth">
      <h1>{pick ? 'Обери рівень' : 'Який у тебе рівень німецької?'}</h1>
      {!pick ? (
        <>
          <p>Пройди короткий тест: покажемо, з чого почати, і одразу спробуєш навчання. Без реєстрації й оплати.</p>
          <button className="de-btn" onClick={onTest}>Пройти тест</button>
          <button className="de-btn ghost" onClick={() => setPick(true)}>Пропустити, вибрати рівень самому</button>
        </>
      ) : (
        <>
          {LV.map(([k, n, d]) => (
            <button key={k} className="de-btn ghost" disabled={k === 'b2'} style={{ textAlign: 'left', opacity: k === 'b2' ? 0.55 : 1 }} onClick={() => onPick(k)}><b>{n}</b> · {d}</button>
          ))}
          <button className="de-btn ghost" onClick={() => setPick(false)}>Назад</button>
        </>
      )}
    </div>
  )
}

const GoogleBtn = ({ onCred }) => {
  const ref = useRef(null)
  const [ok, setOk] = useState(null)
  useEffect(() => {
    let dead = false
    fetch(BASE + '/api/config').then((r) => r.json()).then((c) => {
      if (dead || !c.googleClientId) return setOk(false)
      const init = () => {
        window.google.accounts.id.initialize({ client_id: c.googleClientId, callback: (r) => onCred(r.credential) })
        window.google.accounts.id.renderButton(ref.current, { theme: 'outline', size: 'large', width: 300, text: 'continue_with', locale: 'uk' })
        setOk(true)
      }
      if (window.google?.accounts?.id) return init()
      const sc = document.createElement('script')
      sc.src = 'https://accounts.google.com/gsi/client'; sc.async = true; sc.onload = init; sc.onerror = () => setOk(false)
      document.head.appendChild(sc)
    }).catch(() => setOk(false))
    return () => { dead = true }
  }, []) // eslint-disable-line
  return <div style={{ display: ok === false ? 'none' : 'flex', justifyContent: 'center', minHeight: 44 }} ref={ref} />
}

const ProfileSetup = ({ sess, onDone }) => {
  const [f, setF] = useState({ name: '', phone: '', consent: false })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const go = async () => {
    setErr('')
    const r = await post('/api/auth', { action: 'profile', login: sess.login, token: sess.token, ...f })
    if (!r.ok) return setErr(ERR[r.error] || 'Помилка. Спробуйте ще раз')
    onDone(r.name, f.consent)
  }
  return (
    <div className="de-auth">
      <h1>Майже готово</h1>
      <p>Вкажіть, як до вас звертатися. Email {sess.login} підтверджено через Google.</p>
      <input className="de-search" placeholder="Імʼя" value={f.name} onChange={set('name')} />
      <input className="de-search" type="tel" placeholder="Телефон (необовʼязково)" value={f.phone} onChange={set('phone')} />
      <label className="de-chk"><input type="checkbox" checked={f.consent} onChange={set('consent')} />
        <span>Погоджуюсь отримувати повідомлення, листи та дзвінки щодо навчання й пропозицій (можна вимкнути в профілі)</span></label>
      {err && <div className="de-err">{err}</div>}
      <button className="de-btn" onClick={go}>Продовжити</button>
    </div>
  )
}

const Auth = ({ onAuth, onGuest }) => {
  const onCred = async (credential) => {
    const r = await post('/api/auth', { action: 'google', credential })
    if (!r.ok) return setErr(ERR[r.error] || 'Помилка. Спробуйте ще раз')
    onAuth({ token: r.token, login: r.login, name: r.name }, r.state, r.needProfile, r.consent)
  }
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
    onAuth({ token: r.token, login: r.login, name: r.name }, r.state, false, r.consent)
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
      <div className="de-dim" style={{ textAlign: 'center', margin: '6px 0' }}>або</div>
      <a className="de-dim" style={{ display: 'block', textAlign: 'center', margin: '0 0 8px' }} href={BASE + '/privacy.html'} target="_blank" rel="noreferrer">Політика конфіденційності</a>
      <GoogleBtn onCred={onCred} />
      <button className="de-btn ghost" onClick={onGuest}>Продовжити як гість</button>
    </div>
  )
}

export default function App() {
  const [splash, setSplash] = useState(true)
  const [sess, setSess] = useState(() => { try { return JSON.parse(localStorage.getItem(SKEY)) } catch { return null } })
  const [st, setSt] = useState(() => { try { return JSON.parse(localStorage.getItem('languages.state')) || {} } catch { return {} } })
  const [guest, setGuest] = useState(() => localStorage.getItem('languages.guest') === '1')
  const [needProfile, setNeedProfile] = useState(false)
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState(null)
  const [dScreen, setDScreen] = useState(null)
  const [pop, setPop] = useState(false)
  const [pScreen, setPScreen] = useState(null)
  const [testing, setTesting] = useState(false)
  const timer = useRef(null)

  const update = (patch) => setSt((s) => ({ ...s, ...patch }))
  useEffect(() => {
    localStorage.setItem('languages.state', JSON.stringify(st))
    if (!sess) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => post('/api/sync', { login: sess.login, token: sess.token, state: st }), 1200)
  }, [st]) // eslint-disable-line

  const onAuth = (s, remote, np, consent) => {
    localStorage.setItem(SKEY, JSON.stringify(s)); setSess(s)
    localStorage.removeItem('languages.guest'); setGuest(false)
    setSt({ ...(remote || {}), consent: !!consent })
    setNeedProfile(!!np)
  }
  const startGuest = () => { localStorage.setItem('languages.guest', '1'); setGuest(true) }
  const toAuth = () => { localStorage.removeItem('languages.guest'); setGuest(false); setTab('home'); setScreen(null) }
  const logout = () => { localStorage.removeItem(SKEY); setSess(null) }
  const lang = st.lang || 'uk'
  const tr = st.trans || lang
  const knownCount = Object.keys(st.known || {}).length
  const onAns = (id, ok) => setSt((s0) => {
    const s = { ...s0, srs: srsUpdate(s0.srs, id, ok) }
    return ok
      ? (id.startsWith('w|') ? { ...s, known: { ...(s.known || {}), [id.split('|')[2]]: 1 } } : s)
      : { ...s, err: { ...(s.err || {}), [id]: 0 } }
  })
  const wantCount = useMemo(() => Object.keys(st.want || {}).length, [st.want])

  if (splash) return <div className="de-app"><Splash onDone={() => setSplash(false)} /></div>
  if (!sess && !guest) return <div className="de-app"><div className="de-main"><Auth onAuth={onAuth} onGuest={startGuest} /></div></div>
  if (sess && needProfile) return <div className="de-app"><div className="de-main"><ProfileSetup sess={sess} onDone={(name, c) => { update({ consent: !!c }); const n = { ...sess, name }; localStorage.setItem(SKEY, JSON.stringify(n)); setSess(n); setNeedProfile(false) }} /></div></div>
  const isGuest = !sess
  if (testing) return <div className="de-app"><Placement lang={st.lang || 'uk'} tr={st.trans || st.lang || 'uk'} guest={isGuest}
    onDone={(lv) => { update({ level: lv, placed: 1, intro: 1 }); setTesting(false); setTab('learn'); setScreen(null) }}
    onSkip={() => { setTesting(false); update({ placed: 0 }) }}
    onAuth={(lv) => { update({ level: lv }); setTesting(false); toAuth() }} /></div>
  if (!st.placed && !st.intro) return <div className="de-app"><div className="de-main"><Start onTest={() => setTesting(true)}
    onPick={(lv) => update({ level: lv, placed: 1, intro: 1 })} /></div></div>
  const Gate = () => (
    <div className="de-empty">
      <b>Тільки для зареєстрованих</b>
      <div style={{ margin: '8px 0 14px' }}>{'Щоб бачити весь словник і користуватися всіма перевагами застосунку, зареєструйтесь.'}</div>
      <button className="de-btn" onClick={toAuth}>Увійти або зареєструватися</button>
    </div>
  )

  const nav = [['home', 'Головна', 'home'], ['learn', 'Навчання', 'learn'], ['dict', 'Словник', 'book'], ['errors', 'Помилки', 'alert'], ['profile', 'Профіль', 'person']]
  const dictView = (scr, setScr) => {
    const p = { lang, want: st.want || {}, setWant: (w) => update({ want: w }), onBack: () => setScr(null), guest: isGuest, onGate: () => setScr('gate'), unl: st.unl || {}, setUnl: (u) => update({ unl: u }), full: !!st.dev || !!st.fullDict }
    if (scr === 'gate') return <Gate />
    if (scr) { const M = { nouns: Nouns, verbs: Verbs, adj: Adjectives, pron: Pronouns, nums: Numerals, preps: Preps }[scr]; return <M {...p} /> }
    const gt = (k) => () => (isGuest && ['pron', 'nums', 'preps'].includes(k) ? setScr('gate') : setScr(k))
    return (
      <>
        <div className="de-hello">Словник{isGuest ? ' · 50 слів' : ' · ' + wantCount + ' до вивчення'}</div>
        <div className="de-grid">
          <button className="de-tile" onClick={gt('nouns')}><span className="de-tile-ic">📘</span><b>Іменники</b><small>з артиклями</small></button>
          <button className="de-tile" onClick={gt('verbs')}><span className="de-tile-ic">⚡</span><b>Дієслова</b><small>6 форм</small></button>
          <button className="de-tile" onClick={gt('adj')}><span className="de-tile-ic">🎨</span><b>Прикметники</b><small>і кольори</small></button>
          <button className="de-tile" onClick={gt('pron')}><span className="de-tile-ic">👤</span><b>Займенники</b><small>і питання</small></button>
          <button className="de-tile" onClick={gt('nums')}><span className="de-tile-ic">🔢</span><b>Числівники</b><small>0–100, порядкові</small></button>
          <button className="de-tile" onClick={gt('preps')}><span className="de-tile-ic">🧭</span><b>Прийменники</b><small>з відмінками</small></button>
        </div>
      </>
    )
  }
  const go = (t) => { setTab(t); setScreen(null) }

  return (
    <div className="de-app">
      <div className="de-main">
        {tab === 'home' && !screen && (() => {
          const pct = Math.min(100, Math.round(knownCount / 5))
          const lv = (st.level || 'a1').toUpperCase()
          return (
            <div className={'de-home ' + (st.home === 'a' ? 'ha' : 'hb')}>
              <div className="de-hello">{isGuest ? 'Привіт!' : 'Привіт, ' + sess.name + '!'}</div>
              <div className="de-hero">
                <div className="de-ring">
                  <svg viewBox="0 0 220 220"><defs><linearGradient id="dgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FDBA74" /><stop offset="1" stopColor="#EA580C" /></linearGradient></defs>
                    <circle cx="110" cy="110" r="94" stroke="rgba(255,255,255,.1)" strokeWidth="14" fill="none" />
                    <circle cx="110" cy="110" r="94" stroke="url(#dgr)" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray="590" strokeDashoffset={590 * (1 - pct / 100)} transform="rotate(-90 110 110)" /></svg>
                  <div className="de-ring-t"><b>{pct}%</b><small>рівень {lv}</small></div>
                </div>
                <button className="de-go" onClick={() => (isGuest ? setScreen('gate') : go('learn'))}>Продовжити навчання</button>
              </div>
              <div className="de-grid" style={{ marginTop: 12 }}>
                <button className="de-tile" onClick={() => (isGuest ? setScreen('gate') : go('learn'))}><span className="de-tile-ic">🎓</span><b>Курс</b><small>12 блоків</small></button>
                <button className="de-tile" onClick={() => (isGuest ? setScreen('gate') : setScreen('cal'))}><span className="de-tile-ic">📅</span><b>Календар</b><small>13 тижнів</small></button>
              </div>
            </div>
          )
        })()}
        {tab === 'home' && screen && (() => {
          if (screen === 'gate') return <Gate />
          const p = { lang, want: st.want || {}, setWant: (w) => update({ want: w }), onBack: () => setScreen(null), guest: isGuest, onGate: () => setScreen('gate'), unl: st.unl || {}, setUnl: (u) => update({ unl: u }), full: !!st.dev || !!st.fullDict }
          return <Calendar st={st} update={update} onBack={p.onBack} />
        })()}
        {tab === 'dict' && dictView(dScreen, setDScreen)}
        {isGuest && tab !== 'home' && tab !== 'dict' && <Gate />}
        {!isGuest && tab === 'learn' && <Course st={st} update={update} lang={lang} tr={tr} onAns={onAns} />}
        {!isGuest && tab === 'errors' && <Errors st={st} update={update} lang={lang} tr={tr} />}
        {!isGuest && tab === 'profile' && (
          <>
            <div className="de-hello">{sess.name}</div>
            <div className="de-card"><b>Вивчено слів: {knownCount} / 500</b><div className="de-bar" style={{ marginTop: 8, marginBottom: 0 }}><div style={{ width: Math.min(100, knownCount / 5) + '%' }} /></div><div className="de-dim" style={{ marginTop: 6 }}>Слово зараховується, коли ти правильно відповів на нього у вправі.</div></div>
            <div className="de-h2">Мій рівень</div>
            <div className="de-card"><b>{(st.level || 'a1').toUpperCase()}</b>
              <div className="de-seg" style={{ width: 'fit-content', margin: '8px 0' }}>{['a1', 'a2', 'b1', 'b2'].map((k) => <button key={k} className={(st.level || 'a1') === k ? 'on' : ''} onClick={() => update({ level: k })}>{k.toUpperCase()}</button>)}</div>
              <button className="de-btn ghost" style={{ marginTop: 8 }} onClick={() => setTesting(true)}>Пройти тест рівня ще раз</button></div>
            <div className="de-h2">Вигляд головної</div>
            <div className="de-seg" style={{ width: 'fit-content' }}>
              <button className={st.home !== 'a' ? 'on' : ''} onClick={() => update({ home: 'b' })}>Темний</button>
              <button className={st.home === 'a' ? 'on' : ''} onClick={() => update({ home: 'a' })}>Світлий</button>
            </div>
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
            <label className="de-chk" style={{ marginTop: 20 }}><input type="checkbox" checked={!!st.consent} onChange={(e) => { update({ consent: e.target.checked }); post('/api/auth', { action: 'consent', login: sess.login, token: sess.token, consent: e.target.checked }) }} /><span>Отримувати повідомлення, листи та пропозиції</span></label>
            <button className="de-btn ghost" style={{ marginTop: 24 }} onClick={logout}>Вийти</button>
            <a className="de-dim" style={{ display: 'block', marginTop: 16 }} href={BASE + '/privacy.html'} target="_blank" rel="noreferrer">Політика конфіденційності</a>
            <button className="de-btn ghost" style={{ marginTop: 12, color: '#c0392b' }} onClick={async () => {
              if (!window.confirm('Видалити акаунт і весь прогрес? Це безповоротно.')) return
              const r = await post('/api/auth', { action: 'delete', login: sess.login, token: sess.token })
              if (!r.ok) return window.alert('Не вдалося видалити. Спробуйте ще раз')
              localStorage.removeItem('languages.state'); setSt({}); logout()
            }}>Видалити акаунт</button>
          </>
        )}
      </div>
      {tab !== 'dict' && !pop && <button className="de-fab" aria-label="Словник" onClick={() => { setPScreen(null); setPop(true) }}><Ic id="book" size={26} /></button>}
      {pop && (
        <div className="de-pop" onClick={() => setPop(false)}>
          <div className="de-pop-in" onClick={(e) => e.stopPropagation()}>
            <div className="de-pop-bar"><b>Словник</b><button onClick={() => setPop(false)} aria-label="Закрити">✕</button></div>
            <div className="de-pop-body">{dictView(pScreen, setPScreen)}</div>
          </div>
        </div>
      )}
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
