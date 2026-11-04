import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import './german.css'
import {
  DATA, TABS, PRONOUNS, makeQuestion, pickItems, conj, articleSet, keinSet,
} from './lib'
import { makeCaseRound, ruleLines } from './cases'
import { PAST, PAST_LABELS, makePastQuestion } from './past'
import { NEED_OK, toMistake, buildErrorRound, mergeState } from './errors'

// Акаунти (без сервера): хеші sha256("логін:пароль"). Історія зберігається в цьому браузері окремо для кожного акаунта.
const ACCOUNTS = {
  platon: { name: 'Platon', hash: 'a4b80ffb5761a33128d4199d32d24e6517774e0b6b04fbefa14d5b1aa418cf31' },
  anna: { name: 'Anna Oleksandrovna❤️', hash: 'bf4281c9e33af49fbe1f1390f51aa89b6dd05a55f2052223ea6f72545ffe1f9d' },
  andrii: { name: 'Andrii', hash: '24c9e12839d61e13cc7fd34c718e5d188094048582b7cbac36a5c5c075457adf' },
}
const sha256 = async (txt) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v) } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } },
}

const GCOL = { m: 'g-m', f: 'g-f', n: 'g-n' }
const GLAB = { m: 'der', f: 'die', n: 'das' }
const PAGE = 40
const mk = (lang) => (ua, ru) => (lang === 'ru' ? ru : ua)

const Forms = ({ forms, compact, labels }) => (
  <div className={'de-forms' + (compact ? ' compact' : '')}>
    {forms.map((f, i) => (
      <div key={i} className="de-form"><span className="de-pr">{(labels || PRONOUNS)[i]}</span><b>{f}</b></div>
    ))}
  </div>
)

const Art = ({ set, kein }) => (
  <div className="de-art">
    {[['Nominativ', 'nom'], ['Akkusativ', 'akk'], ['Plural', 'pl']].map(([t, k]) => (
      <div key={k} className="de-art-col">
        <span className="de-pr">{t}</span>
        <b>{set[k]}</b>
        <i>{kein[k]}</i>
      </div>
    ))}
  </div>
)

// ---------- Навчання ----------
const Learn = ({ tab, trans, lang }) => {
  const L = mk(lang)
  const [q, setQ] = useState('')
  const [shown, setShown] = useState(PAGE)
  useEffect(() => { setShown(PAGE); setQ('') }, [tab])
  const items = useMemo(() => {
    const s = q.trim().toLowerCase()
    const all = tab === 'past' ? PAST : DATA[tab]
    if (!s) return all
    return all.filter((it) => (it.de || it.inf || '').toLowerCase().includes(s) || (it[lang] || '').toLowerCase().includes(s))
  }, [tab, q, lang])
  return (
    <div className="de-learn">
      <input className="de-search" placeholder={L('Пошук…', 'Поиск…')} value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE) }} />
      {items.slice(0, shown).map((it) => (
        <div className="de-card" key={it.id}>
          {tab === 'nouns' ? (
            <>
              <div className="de-card-title"><span className={'de-g ' + GCOL[it.g]}>{GLAB[it.g]}</span> {it.de}<small className="de-pl"> · die {it.pl === '-' ? '—' : it.pl}</small></div>
              <Art set={articleSet(it.g)} kein={keinSet(articleSet(it.g))} />
            </>
          ) : tab === 'past' ? (
            <>
              <div className="de-card-title">{it.inf}</div>
              <Forms forms={it.forms} labels={PAST_LABELS} compact />
            </>
          ) : tab === 'verbs' || tab === 'sep' || tab === 'modals' ? (
            <>
              <div className="de-card-title">{it.inf}</div>
              <Forms forms={it.forms} compact />
              {tab === 'modals' && <div className="de-ex">{it.ex}{trans && <div className="de-tr">{lang === 'ua' ? it.exUa : it.exRu}</div>}</div>}
            </>
          ) : (
            <div className="de-card-title">{it.de}</div>
          )}
          {trans && <div className="de-tr">{it[lang]}</div>}
        </div>
      ))}
      {shown < items.length && <button className="de-btn ghost" onClick={() => setShown(shown + PAGE)}>{L('Показати ще', 'Показать ещё')} ({items.length - shown})</button>}
      {!items.length && <div className="de-empty">{L('Нічого не знайдено', 'Ничего не найдено')}</div>}
    </div>
  )
}

// ---------- Тест ----------
const Quiz = ({ tab, trans, lang, stats, mistakes, onStat, onResult, onExit }) => {
  const L = mk(lang)
  const [round, setRound] = useState(0)
  const questions = useMemo(
    () => (tab === 'errors' ? buildErrorRound(mistakes, lang) : tab === 'cases' ? makeCaseRound(10).map((q) => ({ ...q, tab: 'cases' })) : tab === 'past' ? pickItems('past', stats, 10, PAST).map((it) => ({ ...makePastQuestion(it, lang), tab })) : pickItems(tab, stats, 10).map((it) => ({ ...makeQuestion(tab, it, lang), tab }))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tab, round],
  )
  const [i, setI] = useState(0)
  const [sel, setSel] = useState(null)
  const [score, setScore] = useState(0)
  const q = questions[i]
  const done = i >= questions.length

  const choose = (idx) => {
    if (sel !== null) return
    setSel(idx)
    const ok = idx === q.correct
    if (ok) setScore((s) => s + 1)
    onStat(q.tab + ':' + (q.item ? q.item.id : q.key), ok)
    onResult(q, ok, tab === 'errors')
  }
  const next = () => { setSel(null); setI(i + 1) }
  const again = () => { setI(0); setSel(null); setScore(0); setRound(round + 1) }

  if (tab === 'errors' && !questions.length) {
    return <div className="de-empty">{L('Помилок немає. Так тримати!', 'Ошибок нет. Так держать!')}</div>
  }
  if (done) {
    return (
      <div className="de-result">
        <div className="de-result-n">{score}<small>/{questions.length}</small></div>
        <div className="de-result-t">{score === questions.length ? L('Бездоганно!', 'Безупречно!') : score >= questions.length * 0.7 ? L('Дуже добре!', 'Очень хорошо!') : L('Ще потренуємось', 'Ещё потренируемся')}</div>
        <button className="de-btn" onClick={again}>{L('Ще раз', 'Ещё раз')}</button>
        {tab !== 'cases' && tab !== 'errors' && <button className="de-btn ghost" onClick={onExit}>{L('До навчання', 'К обучению')}</button>}
      </div>
    )
  }
  const hint = {
    tr: q.prompt && q.prompt.hideTrans ? L('Оберіть німецьке слово', 'Выберите немецкое слово') : L('Оберіть переклад', 'Выберите перевод'),
    art: L('Оберіть артиклі: Nominativ · Akkusativ · Plural', 'Выберите артикли: Nominativ · Akkusativ · Plural'),
    sent: L('Оберіть правильне слово', 'Выберите правильное слово'),
    pron: L('Оберіть правильне слово', 'Выберите правильное слово'),
    end: L('Оберіть правильне закінчення', 'Выберите правильное окончание'),
    case: L('Який це відмінок?', 'Какой это падеж?'),
    tbl: L('Оберіть правильні форми: Nom · Akk · Dat · Gen', 'Выберите правильные формы: Nom · Akk · Dat · Gen'),
    forms: q.tab === 'past' ? L('Оберіть форми: Präteritum · Partizip II · Perfekt', 'Выберите формы: Präteritum · Partizip II · Perfekt') : q.tab === 'sep' ? L('Оберіть форми Präsens (префікс у кінці)', 'Выберите формы Präsens (приставка в конце)') : L('Оберіть правильні 6 форм Präsens', 'Выберите правильные 6 форм Präsens'),
  }[q.kind]
  return (
    <div className="de-quiz">
      <div className="de-bar"><div style={{ width: `${(i / questions.length) * 100}%` }} /></div>
      <div className="de-q-card">
        <div className="de-q-hint">{hint}</div>
        {q.parts ? (
          <div className="de-q-main de-sentence">
            {q.parts.map((pt, k) => {
              if (pt.t === 'gap') return <span key={k} className={'de-gap' + (sel !== null ? ' filled' : '')}>{sel !== null ? pt.v : (q.kind === 'end' ? '__' : '___')}</span>
              if (pt.t === 'mark') return <mark key={k} className="de-mark">{pt.v}</mark>
              return <span key={k}>{pt.v}</span>
            })}
          </div>
        ) : (
          <div className="de-q-main">{q.prompt ? q.prompt.main : q.main}</div>
        )}
        {q.kind === 'tbl' && <div className="de-q-main">{q.main}</div>}
        {trans && q.prompt && q.prompt.sub && q.kind !== 'tr' && <div className="de-tr">{q.prompt.sub}</div>}
        {q.item && q.item.g && <div className="de-pl">Plural: die {q.item.pl === '-' ? '—' : q.item.pl}</div>}
        {trans && q.tr && <div className="de-tr">{q.tr[lang === 'ua' ? 0 : 1]}</div>}
        {tab === 'errors' && <div className="de-tip">{L('Прогрес', 'Прогресс')}: {q.mdone}/{NEED_OK}</div>}
        {q.kind === 'pron' && <div className="de-tip">{L('Кому? → Dativ: mir, dir, ihm, ihr · Кого? → Akkusativ: mich, dich, ihn, sie', 'Кому? → Dativ: mir, dir, ihm, ihr · Кого? → Akkusativ: mich, dich, ihn, sie')}</div>}
      </div>
      <div className={'de-opts ' + q.kind}>
        {q.options.map((o, k) => {
          const cls = 'de-opt' + (sel !== null ? (k === q.correct ? ' ok' : k === sel ? ' bad' : ' dim') : '')
          return (
            <button key={k} className={cls} onClick={() => choose(k)}>
              {['tr', 'sent', 'end', 'case', 'pron'].includes(q.kind) && <span>{o.label}{o.sub && <small className="de-sub">{o.sub}</small>}</span>}
              {q.kind === 'tbl' && <Forms forms={o.forms} labels={['Nom', 'Akk', 'Dat', 'Gen']} compact />}
              {q.kind === 'art' && <Art set={o.set} kein={o.kein} />}
              {q.kind === 'forms' && <Forms forms={o.forms} labels={q.tab === 'past' ? PAST_LABELS : undefined} compact />}
            </button>
          )
        })}
      </div>
      {sel !== null && (
        <div className="de-foot">
          <span className={sel === q.correct ? 'ok-t' : 'bad-t'}>{sel === q.correct ? L('Правильно!', 'Правильно!') : L('Неправильно', 'Неправильно')}</span>
          <button className="de-btn" onClick={next}>{i + 1 === questions.length ? L('Результат', 'Результат') : L('Далі', 'Далее')}</button>
        </div>
      )}
      {sel !== null && q.tab === 'cases' && (
        <div className={'de-rule ' + (sel === q.correct ? 'ok' : 'bad')}>
          <div className="de-rule-top">{sel === q.correct ? L('Правильно, і ось чому', 'Правильно, и вот почему') : L('Помилка. Розберемо правило', 'Ошибка. Разберём правило')}</div>
          {ruleLines(q, sel, lang).map((ln, k) => (ln.k === 'row'
            ? (
              <div key={k} className="de-rule-row">
                {ln.cells.map((c, j) => <div key={j} className={'de-rule-cell' + (c.on ? ' on' : '')}><span>{c.h}</span><b>{c.t}</b></div>)}
              </div>
            )
            : <div key={k} className={'de-rule-' + ln.k}>{ln.t}</div>))}
        </div>
      )}
    </div>
  )
}

// ---------- Акаунт ----------
const Account = ({ lang, acct, onLogin, onLogout }) => {
  const L = mk(lang)
  const [login, setLogin] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setErr(''); setBusy(true)
    const key = login.trim().toLowerCase()
    let ok = false
    try { ok = !!ACCOUNTS[key] && (await sha256(key + ':' + pw)) === ACCOUNTS[key].hash } catch { ok = false }
    setBusy(false)
    if (ok) { onLogin(key); setPw('') } else setErr(L('Невірний логін або пароль', 'Неверный логин или пароль'))
  }
  if (acct) {
    return (
      <div className="de-acct">
        <div className="de-card-title">{L('Ви увійшли як', 'Вы вошли как')}: {acct.name}</div>
        <div className="de-tr">{L('Результати та помилки зберігаються для цього акаунта на цьому пристрої.', 'Результаты и ошибки сохраняются для этого аккаунта на этом устройстве.')}</div>
        <button className="de-btn ghost" onClick={onLogout}>{L('Вийти', 'Выйти')}</button>
      </div>
    )
  }
  return (
    <form className="de-acct" onSubmit={submit}>
      <div className="de-card-title">{L('Вхід', 'Вход')}</div>
      <input className="de-search" placeholder={L('Логін', 'Логин')} value={login} autoCapitalize="none" autoCorrect="off" autoComplete="username" onChange={(e) => setLogin(e.target.value)} />
      <input className="de-search" type="password" placeholder={L('Пароль', 'Пароль')} value={pw} autoComplete="current-password" onChange={(e) => setPw(e.target.value)} />
      {err && <div className="de-acct-st err">{err}</div>}
      <button className="de-btn" type="submit" disabled={busy || !login || !pw}>{L('Увійти', 'Войти')}</button>
    </form>
  )
}

// ---------- Застосунок ----------
const GermanApp = () => {
  const ns = 'de:app:'
  const [tab, setTab] = useState(() => ls.get(ns + 'tab', 'words'))
  const [mode, setMode] = useState('learn')
  const [trans, setTrans] = useState(() => ls.get(ns + 'trans', true))
  const [lang, setLang] = useState(() => ls.get(ns + 'lang', 'ru'))
  const [acct, setAcct] = useState(() => {
    const k = ls.get('de:session', null)
    return k && ACCOUNTS[k] ? { login: k, name: ACCOUNTS[k].name } : null
  })
  // дані: окремі для кожного акаунта; без входу — спільні для профілю
  const dns = acct ? 'de:acct:' + acct.login + ':' : ns
  const dnsRef = useRef(dns)
  dnsRef.current = dns
  const [stats, setStats] = useState(() => ls.get(dns + 'stats', {}))
  const [mistakes, setMistakes] = useState(() => ls.get(dns + 'mistakes', {}))
  const dataRef = useRef({ stats, mistakes })
  dataRef.current = { stats, mistakes }

  useEffect(() => { ls.set(ns + 'tab', tab) }, [tab, ns])
  useEffect(() => { ls.set(ns + 'trans', trans) }, [trans, ns])
  useEffect(() => { ls.set(ns + 'lang', lang) }, [lang, ns])

  useEffect(() => {
    document.title = 'Deutsch'
    const t = document.querySelector('meta[name="theme-color"]')
    if (t) t.setAttribute('content', '#FFFFFF')
    document.body.style.background = '#FFFFFF'
    const ic = document.querySelector('link[rel="apple-touch-icon"]')
    if (ic) ic.setAttribute('href', '/icon-de-192.png')
    document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"]').forEach((l) => l.setAttribute('href', '/icon-de-192.png'))
  }, [])

  const onStat = useCallback((key, ok) => {
    setStats((st) => {
      const c = st[key] || { ok: 0, bad: 0 }
      const n = { ...st, [key]: ok ? { ...c, ok: c.ok + 1 } : { ...c, bad: c.bad + 1 } }
      ls.set(dnsRef.current + 'stats', n)
      return n
    })
  }, [])

  // помилки: з'являються при неправильній відповіді, зникають після NEED_OK правильних у розділі «Помилки»
  const onResult = useCallback((q, ok, inErrors) => {
    setMistakes((m) => {
      let n = m
      if (inErrors) {
        const cur = m[q.mkey]
        if (ok && cur) {
          const done = (cur.done || 0) + 1
          n = { ...m }
          if (done >= NEED_OK) delete n[q.mkey]; else n[q.mkey] = { ...cur, done }
        }
      } else if (!ok) {
        const mm = toMistake(q)
        if (!m[mm.key]) n = { ...m, [mm.key]: mm }
      }
      if (n !== m) ls.set(dnsRef.current + 'mistakes', n)
      return n
    })
  }, [])

  const onLogin = (key) => {
    const nsA = 'de:acct:' + key + ':'
    // дані без акаунта переносимо в акаунт і очищаємо
    const merged = mergeState(
      { stats: ls.get(nsA + 'stats', {}), mistakes: ls.get(nsA + 'mistakes', {}) },
      { stats: ls.get(ns + 'stats', {}), mistakes: ls.get(ns + 'mistakes', {}) },
    )
    ls.set(nsA + 'stats', merged.stats); ls.set(nsA + 'mistakes', merged.mistakes)
    ls.set(ns + 'stats', {}); ls.set(ns + 'mistakes', {})
    ls.set('de:session', key)
    setStats(merged.stats); setMistakes(merged.mistakes)
    setAcct({ login: key, name: ACCOUNTS[key].name })
  }
  const onLogout = () => {
    ls.set('de:session', null)
    setAcct(null)
    setStats(ls.get(ns + 'stats', {})); setMistakes(ls.get(ns + 'mistakes', {}))
  }

  const L = mk(lang)
  const quizOnly = tab === 'cases' || tab === 'errors'
  const totals = useMemo(() => Object.values(stats).reduce((a, s) => ({ ok: a.ok + s.ok, bad: a.bad + s.bad }), { ok: 0, bad: 0 }), [stats])

  return (
    <div className="de-app">
      <header className="de-head">
        <div className="de-head-row">
          <div className="de-logo">De</div>
          <div className="de-title"><b>Deutsch</b>{acct && <span>{acct.name}</span>}</div>
          <div className="de-score" title={L('Правильних відповідей', 'Правильных ответов')}>✓ {totals.ok}</div>
        </div>
        <div className="de-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={'de-tab' + (tab === t.id ? ' on' : '')} onClick={() => { setTab(t.id); setMode(t.id === 'cases' || t.id === 'errors' ? 'quiz' : 'learn') }}>
              {t[lang]}{t.id === 'errors' && Object.keys(mistakes).length > 0 ? ` (${Object.keys(mistakes).length})` : ''}
            </button>
          ))}
        </div>
        {tab !== 'account' && <div className="de-ctrl">
          {!quizOnly && <div className="de-seg">
            <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>{L('Вчити', 'Учить')}</button>
            <button className={mode === 'quiz' ? 'on' : ''} onClick={() => setMode('quiz')}>{L('Тест', 'Тест')}</button>
          </div>}
          <label className="de-switch">
            <input type="checkbox" checked={trans} onChange={(e) => setTrans(e.target.checked)} />
            <span className="de-sw" />
            {L('з перекладом', 'с переводом')}
          </label>
        </div>}
      </header>
      <main className="de-main">
        {tab === 'account'
          ? <Account lang={lang} acct={acct} onLogin={onLogin} onLogout={onLogout} />
          : mode === 'learn' && !quizOnly
            ? <Learn tab={tab} trans={trans} lang={lang} />
            : <Quiz key={tab} tab={tab} trans={trans} lang={lang} stats={stats} mistakes={mistakes} onStat={onStat} onResult={onResult} onExit={() => setMode('learn')} />}
      </main>
      {(
        <div className="de-langbar">
          <span>{L('мова', 'язык')}:</span>
          <button className={lang === 'ua' ? 'on' : ''} onClick={() => setLang('ua')}>укр</button>
          <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>рус</button>
        </div>
      )}
    </div>
  )
}

export default GermanApp
