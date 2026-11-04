import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import './german.css'
import {
  DATA, TABS, PRONOUNS, makeQuestion, pickItems, poolSize, conj, articleSet, keinSet,
} from './lib'
import { makeCaseRound, ruleLines } from './cases'
import { PAST, PAST_LABELS, makePastQuestion } from './past'
import { NEED_OK, toMistake, buildErrorRound, mergeState } from './errors'

import Ic from './Icons.jsx'
import { NOUN_TOPICS, TOPIC_OF } from './topics'
import Splash from './Splash'
import { post } from './api'

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
const topicName = (t, lang) => (lang === 'ua' ? t.ua : t.ru)
const nounCount = (id, testOnly) => DATA.nouns.filter((n) => (id === 'all' || TOPIC_OF[n.de] === id) && (!testOnly || n.pl !== '-')).length
const TopicChips = ({ topic, onPick, lang, testOnly }) => {
  const L = mk(lang)
  return (
    <div className="de-topics">
      <button className={topic === 'all' ? 'on' : ''} onClick={() => onPick('all')}>{L('Усі теми', 'Все темы')} <i>{nounCount('all', testOnly)}</i></button>
      {NOUN_TOPICS.map((t) => <button key={t.id} className={topic === t.id ? 'on' : ''} onClick={() => onPick(t.id)}>{topicName(t, lang)} <i>{nounCount(t.id, testOnly)}</i></button>)}
    </div>
  )
}
const mineIds = (want, tab) => new Set(Object.entries(want || {}).filter(([k, v]) => v.on && k.startsWith(tab + ':')).map(([k]) => k.slice(tab.length + 1)))
const Learn = ({ tab, trans, lang, want, onWant }) => {
  const L = mk(lang)
  const [scope, setScope] = useState('all')
  const [topic, setTopic] = useState('all')
  const [q, setQ] = useState('')
  const mine = useMemo(() => mineIds(want, tab), [want, tab])
  const [shown, setShown] = useState(PAGE)
  useEffect(() => { setShown(PAGE); setQ(''); setScope('all'); setTopic('all') }, [tab])
  const items = useMemo(() => {
    const s = q.trim().toLowerCase()
    const base = tab === 'past' ? PAST : DATA[tab]
    let all = scope === 'mine' ? base.filter((it) => mine.has(String(it.id))) : base
    if (tab === 'nouns' && topic !== 'all') all = all.filter((it) => TOPIC_OF[it.de] === topic)
    if (!s) return all
    return all.filter((it) => (it.de || it.inf || '').toLowerCase().includes(s) || (it[lang] || '').toLowerCase().includes(s))
  }, [tab, q, lang, scope, mine, topic])
  return (
    <div className="de-learn">
      <div className="de-seg de-scope">
        <button className={scope === 'all' ? 'on' : ''} onClick={() => { setScope('all'); setShown(PAGE) }}>{L('Усі', 'Все')}</button>
        <button className={scope === 'mine' ? 'on' : ''} onClick={() => { setScope('mine'); setShown(PAGE) }}>{L('Хочу вивчити', 'Хочу выучить')} · {mine.size}</button>
      </div>
      {tab === 'nouns' && <TopicChips topic={topic} lang={lang} onPick={(t) => { setTopic(t); setShown(PAGE) }} />}
      <input className="de-search" placeholder={L('Пошук…', 'Поиск…')} value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE) }} />
      {items.slice(0, shown).map((it) => (
        <div className="de-item" key={it.id}>
          <div className="de-item-body">
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
          <button className={'de-check' + (mine.has(String(it.id)) ? ' on' : '')} onClick={() => onWant(tab + ':' + it.id)} aria-label={L('Хочу вивчити', 'Хочу выучить')} aria-pressed={mine.has(String(it.id))}><Ic id="check" size={18} /></button>
        </div>
      ))}
      {shown < items.length && <button className="de-btn ghost" onClick={() => setShown(shown + PAGE)}>{L('Показати ще', 'Показать ещё')} ({items.length - shown})</button>}
      {!items.length && <div className="de-empty">{scope === 'mine' && !q ? L('Поки порожньо. Відмітьте слова галочкою у вкладці «Усі».', 'Пока пусто. Отметьте слова галочкой во вкладке «Все».') : L('Нічого не знайдено', 'Ничего не найдено')}</div>}
    </div>
  )
}

// ---------- Тест ----------
const EXAM_N = 30
const fmt = (t) => String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0')
const withTab = (qs, tab) => qs.map((q) => ({ ...q, tab }))
const roundOf = (tab, stats, lang, n, only) => (tab === 'cases'
  ? withTab(makeCaseRound(n), 'cases')
  : tab === 'past'
    ? pickItems('past', stats, n, PAST, only).map((it) => ({ ...makePastQuestion(it, lang), tab }))
    : pickItems(tab, stats, n, undefined, only).map((it) => ({ ...makeQuestion(tab, it, lang), tab })))
// іспит: мікс з усіх розділів
const buildExam = (stats, lang, n = EXAM_N) => {
  const per = Math.ceil(n / TABS.length) + 1
  const all = []
  for (const t of TABS) all.push(...roundOf(t.id, stats, lang, per))
  return all.sort(() => Math.random() - 0.5).slice(0, n)
}
const buildRound = (tab, stats, mistakes, lang, n, only) => (tab === 'errors' ? buildErrorRound(mistakes, lang, n) : tab === 'exam' ? buildExam(stats, lang) : roundOf(tab, stats, lang, n, only))
const examPoints = (qs, ans) => {
  let ok = 0; let bad = 0
  qs.forEach((q, k) => { if (ans[k] != null) { if (ans[k] === q.correct) ok++; else bad++ } })
  return { ok, bad, pts: Math.max(0, ok * 2 - bad * 2) }
}

const Quiz = ({ tab, trans, lang, stats, mistakes, initialRun, best, want, onStat, onResult, onRun, onRoundDone, onExamDone, onGoErrors, onExit }) => {
  const L = mk(lang)
  const exam = tab === 'exam'
  const errs = tab === 'errors'
  const init = initialRun && initialRun.qs ? initialRun : null
  const [questions, setQuestions] = useState(() => (init ? init.qs : errs ? buildRound('errors', stats, mistakes, lang, 20) : null))
  const [ans, setAns] = useState(() => (init ? (init.ans || init.qs.map(() => null)) : (questions ? questions.map(() => null) : [])))
  const [i, setI] = useState(() => (init ? Math.min(init.i || 0, init.qs.length - 1) : 0))
  const [t, setT] = useState(() => (init ? init.t || 0 : 0))
  const [finished, setFinished] = useState(false)
  const [review, setReview] = useState(false)
  const [confirmEnd, setConfirmEnd] = useState(false)
  const [n, setN] = useState(() => ls.get('de:n', 20))
  const [scope, setScope] = useState('all')
  const [topic, setTopic] = useState('all')
  const mine = useMemo(() => mineIds(want, tab), [want, tab])
  const only = useMemo(() => {
    let set = scope === 'mine' ? mine : null
    if (tab === 'nouns' && topic !== 'all') {
      const ids = DATA.nouns.filter((n) => TOPIC_OF[n.de] === topic && n.pl !== '-' && (!set || set.has(String(n.id)))).map((n) => String(n.id))
      set = new Set(ids)
    }
    return set
  }, [scope, mine, tab, topic])
  const canMine = !exam && !errs && tab !== 'cases'
  const stripRef = useRef(null)
  const pool = useMemo(() => (only ? only.size : tab === 'cases' ? 999 : tab === 'past' ? poolSize('past', PAST) : poolSize(tab)), [tab, only])
  const total = questions ? questions.length : 0

  useEffect(() => {
    if (!questions || finished) return undefined
    const id = setInterval(() => setT((x) => x + 1), 1000)
    return () => clearInterval(id)
  }, [questions, finished])
  useEffect(() => {
    const el = stripRef.current && stripRef.current.children[i]
    if (el && el.scrollIntoView) el.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [i, questions])

  useEffect(() => { const m = document.querySelector('.de-main'); if (m) m.scrollTo(0, 0) }, [i, finished, review, !!questions])
  const save = (qs, an, ci, tt) => { if (!errs) onRun({ qs, ans: an, i: ci, t: tt }) }
  const start = (size) => {
    ls.set('de:n', size)
    const qs = buildRound(tab, stats, mistakes, lang, exam ? EXAM_N : size, only || undefined)
    const an = qs.map(() => null)
    setQuestions(qs); setAns(an); setI(0); setT(0); setFinished(false); setReview(false)
    save(qs, an, 0, 0)
  }

  const nextFree = (from, an = ans) => {
    for (let k = 1; k <= total; k++) { const idx = (from + k) % total; if (an[idx] == null) return idx }
    return -1
  }
  const go = (idx) => { setI(idx); setConfirmEnd(false); save(questions, ans, idx, t) }
  const finish = (an = ans) => {
    setFinished(true); setReview(false); setConfirmEnd(false)
    if (!errs) onRun(null)
    const ok = questions.reduce((a, q, k) => a + (an[k] === q.correct ? 1 : 0), 0)
    onRoundDone(ok, total)
    if (exam) onExamDone(examPoints(questions, an).pts, t, ok, total)
  }
  const choose = (idx) => {
    if (ans[i] != null || finished) return
    const q = questions[i]
    const an = ans.slice(); an[i] = idx
    setAns(an)
    const ok = idx === q.correct
    onStat(q.tab + ':' + (q.item ? q.item.id : q.key), ok)
    onResult(q, ok, errs)
    save(questions, an, i, t)
  }
  const forward = () => {
    const nx = nextFree(i)
    if (nx < 0) finish(); else go(nx)
  }

  // ---- старт ----
  if (!questions) {
    const sizes = [10, 20, 30].filter((x) => x <= pool)
    const opts = sizes.length ? sizes : [pool]
    const size = opts.includes(n) ? n : opts[opts.length - 1]
    return (
      <div className="de-start">
        <div className="de-start-ic"><Ic id={exam ? 'exam' : 'timer'} size={30} /></div>
        <div className="de-start-t">{exam ? L('Іспит', 'Экзамен') : L('Тест', 'Тест')}</div>
        {exam ? (
          <>
            <div className="de-start-p">{L(`${EXAM_N} питань з усіх розділів у випадковому порядку. Час іде, відповіді та правильні варіанти видно лише в кінці. За вірну відповідь +2 бали, за невірну −2.`, `${EXAM_N} вопросов из всех разделов в случайном порядке. Время идёт, ответы и правильные варианты видны только в конце. За верный ответ +2 балла, за неверный −2.`)}</div>
            {best && <div className="de-best"><Ic id="exam" size={18} /> {L('Кращий результат', 'Лучший результат')}: <b>{best.pts} {L('балів', 'баллов')}</b> · {fmt(best.time)}</div>}
            <button className="de-btn" onClick={() => start(EXAM_N)}>{L('Почати іспит', 'Начать экзамен')}</button>
          </>
        ) : (
          <>
            <div className="de-start-p">{L(`${only ? 'У вибраному' : 'У розділі'} ${tab === 'cases' ? 'безліч' : pool} різних питань. Кожен тест бере випадкові, щоразу інші. Помилки потрапляють у «Помилки».`, `${only ? 'В выбранном' : 'В разделе'} ${tab === 'cases' ? 'множество' : pool} разных вопросов. Каждый тест берёт случайные, каждый раз другие. Ошибки попадают в «Ошибки».`)}</div>
            {tab === 'nouns' && !exam && <TopicChips topic={topic} lang={lang} onPick={setTopic} testOnly />}
            {canMine && mine.size > 0 && (
              <div className="de-seg de-scope">
                <button className={scope === 'all' ? 'on' : ''} onClick={() => setScope('all')}>{L('Усі слова', 'Все слова')}</button>
                <button className={scope === 'mine' ? 'on' : ''} onClick={() => setScope('mine')}>{L('Хочу вивчити', 'Хочу выучить')} · {mine.size}</button>
              </div>
            )}
            <div className="de-start-l">{L('Скільки питань у тесті', 'Сколько вопросов в тесте')}</div>
            <div className="de-sizes">
              {opts.map((x) => <button key={x} className={x === size ? 'on' : ''} onClick={() => setN(x)}>{x}</button>)}
            </div>
            <button className="de-btn" disabled={pool < 1} onClick={() => start(size)}>{L('Почати тест', 'Начать тест')}</button>
          </>
        )}
      </div>
    )
  }
  if (errs && !questions.length) return <div className="de-empty">{L('Помилок немає. Так тримати!', 'Ошибок нет. Так держать!')}</div>

  const okN = questions.reduce((a, q, k) => a + (ans[k] === q.correct ? 1 : 0), 0)
  const answered = ans.filter((x) => x != null).length
  const ex = exam ? examPoints(questions, ans) : null

  // ---- результат ----
  if (finished && !review) {
    const pct = okN / total
    return (
      <div className="de-result">
        <div className="de-result-ic"><Ic id={exam ? 'exam' : 'check'} size={30} /></div>
        <div className="de-result-n">{okN}<small>/{total}</small></div>
        <div className="de-result-t">{pct === 1 ? L('Бездоганно!', 'Безупречно!') : pct >= 0.7 ? L('Дуже добре!', 'Очень хорошо!') : L('Ще потренуємось', 'Ещё потренируемся')}</div>
        <div className="de-result-meta">
          <span><Ic id="timer" size={16} /> {fmt(t)}</span>
          {exam && <span><Ic id="exam" size={16} /> {ex.pts} {L('балів', 'баллов')}</span>}
          {answered < total && <span>{L(`Без відповіді: ${total - answered}`, `Без ответа: ${total - answered}`)}</span>}
        </div>
        {exam && best && ex.pts < best.pts && <div className="de-tr">{L(`Кращий результат: ${best.pts} балів · ${fmt(best.time)}`, `Лучший результат: ${best.pts} баллов · ${fmt(best.time)}`)}</div>}
        <div className="de-strip result">
          {questions.map((q, k) => <button key={k} className={'de-chip ' + (ans[k] == null ? 'skip' : ans[k] === q.correct ? 'ok' : 'bad')} onClick={() => { setI(k); setReview(true) }}>{k + 1}</button>)}
        </div>
        <div className="de-tr" style={{ textAlign: 'center' }}>{L('Натисніть номер, щоб переглянути питання', 'Нажмите номер, чтобы посмотреть вопрос')}</div>
        {total - okN > 0 && !errs && <button className="de-btn" onClick={onGoErrors}>{L('Відпрацювати помилки', 'Отработать ошибки')}</button>}
        <button className={'de-btn' + (total - okN > 0 && !errs ? ' ghost' : '')} onClick={() => { if (errs) { const qs = buildRound('errors', stats, mistakes, lang, 20); setQuestions(qs); setAns(qs.map(() => null)); setI(0); setT(0); setFinished(false) } else { setQuestions(null); setFinished(false) } }}>{L('Ще раз', 'Ещё раз')}</button>
        <button className="de-btn ghost" onClick={onExit}>{L('На головну', 'На главную')}</button>
      </div>
    )
  }

  const q = questions[i]
  const sel = ans[i]
  const reveal = sel != null && (!exam || finished)
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
  const label = exam ? L('Іспит', 'Экзамен') : errs ? L('Помилки', 'Ошибки') : L('Тест', 'Тест')
  const chipCls = (k) => {
    const a = ans[k]
    const base = k === i ? ' cur' : ''
    if (a == null) return 'de-chip' + base
    if (exam && !finished) return 'de-chip done' + base
    return 'de-chip ' + (a === questions[k].correct ? 'ok' : 'bad') + base
  }
  return (
    <div className="de-quiz">
      <div className="de-qtop">
        <span className="de-pill">{label}</span>
        <b>{L(`Питання ${i + 1} з ${total}`, `Вопрос ${i + 1} из ${total}`)}</b>
        <span className="de-timer"><Ic id="timer" size={15} /> {fmt(t)}</span>
      </div>
      <div className="de-bar"><div style={{ width: `${(answered / total) * 100}%` }} /></div>
      <div className="de-strip" ref={stripRef}>
        {questions.map((_, k) => <button key={k} className={chipCls(k)} onClick={() => go(k)}>{k + 1}</button>)}
      </div>
      <div className="de-q-card">
        <div className="de-q-hint">{hint}</div>
        {q.parts ? (
          <div className="de-q-main de-sentence">
            {q.parts.map((pt, k) => {
              if (pt.t === 'gap') return <span key={k} className={'de-gap' + (reveal ? ' filled' : '')}>{reveal ? pt.v : (q.kind === 'end' ? '__' : '___')}</span>
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
        {errs && <div className="de-tip">{L('Прогрес', 'Прогресс')}: {q.mdone}/{NEED_OK}</div>}
        {q.kind === 'pron' && <div className="de-tip">{L('Кому? → Dativ: mir, dir, ihm, ihr · Кого? → Akkusativ: mich, dich, ihn, sie', 'Кому? → Dativ: mir, dir, ihm, ihr · Кого? → Akkusativ: mich, dich, ihn, sie')}</div>}
      </div>
      <div className={'de-opts ' + q.kind}>
        {q.options.map((o, k) => {
          const cls = 'de-opt' + (reveal ? (k === q.correct ? ' ok' : k === sel ? ' bad' : ' dim') : sel === k ? ' picked' : sel != null ? ' dim' : '')
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
      {finished ? (
        <div className="de-foot"><span className={sel == null ? '' : sel === q.correct ? 'ok-t' : 'bad-t'}>{sel == null ? L('Без відповіді', 'Без ответа') : sel === q.correct ? L('Правильно!', 'Правильно!') : L('Неправильно', 'Неправильно')}</span><button className="de-btn" onClick={() => setReview(false)}>{L('До результату', 'К результату')}</button></div>
      ) : (
        <div className="de-foot">
          {sel == null
            ? <span className="de-hintline">{L('Оберіть відповідь або пропустіть питання', 'Выберите ответ или пропустите вопрос')}</span>
            : exam ? <span className="de-hintline">{L('Відповідь збережено', 'Ответ сохранён')}</span>
              : <span className={sel === q.correct ? 'ok-t' : 'bad-t'}>{sel === q.correct ? L('Правильно!', 'Правильно!') : L('Неправильно', 'Неправильно')}</span>}
          {sel == null
            ? <button className="de-btn ghost" disabled={nextFree(i) < 0} onClick={() => go(nextFree(i))}><Ic id="skip" size={16} /> {L('Пропустити', 'Пропустить')}</button>
            : <button className="de-btn" onClick={forward}>{nextFree(i) < 0 ? L('Результат', 'Результат') : L('Далі', 'Далее')}</button>}
        </div>
      )}
      {!finished && (
        <div className="de-endrow">
          {!confirmEnd
            ? <button className="de-link" onClick={() => (answered === total ? finish() : setConfirmEnd(true))}>{L('Завершити тест', 'Завершить тест')}</button>
            : (
              <div className="de-confirm">
                <span>{L(`Без відповіді: ${total - answered}. Завершити?`, `Без ответа: ${total - answered}. Завершить?`)}</span>
                <button className="de-btn" onClick={() => finish()}>{L('Так', 'Да')}</button>
                <button className="de-btn ghost" onClick={() => setConfirmEnd(false)}>{L('Ні', 'Нет')}</button>
              </div>
            )}
        </div>
      )}
      {reveal && q.tab === 'cases' && (
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

// ---------- Розділи, прогрес ----------
const DESC = {
  words: ['Слова з підручника з перекладом: картки для вивчення й тест', 'Слова из учебника с переводом: карточки для изучения и тест'],
  phrases: ['Готові фрази для розмови. Вчіть і перевіряйте себе', 'Готовые фразы для разговора. Учите и проверяйте себя'],
  nouns: ['Рід і артикль: der, die, das, kein. Тест на відмінювання', 'Род и артикль: der, die, das, kein. Тест на склонение'],
  verbs: ['Дієслова в теперішньому часі (Präsens): усі 6 форм', 'Глаголы в настоящем времени (Präsens): все 6 форм'],
  modals: ['können, müssen, wollen та інші: форми й речення', 'können, müssen, wollen и другие: формы и предложения'],
  sep: ['Дієслова з відокремлюваним префіксом: aufstehen → ich stehe auf', 'Глаголы с отделяемой приставкой: aufstehen → ich stehe auf'],
  past: ['Минулий час: Präteritum, Partizip II і Perfekt', 'Прошедшее время: Präteritum, Partizip II и Perfekt'],
  exam: ['Змішаний тест з усіх розділів: 30 питань, таймер, бали. Відповіді видно в кінці', 'Смешанный тест из всех разделов: 30 вопросов, таймер, баллы. Ответы видны в конце'],
  cases: ['Тести на 4 відмінки з поясненням правила до кожного завдання', 'Тесты на 4 падежа с объяснением правила к каждому заданию'],
}
const EXAM_T = { id: 'exam', ua: 'Іспит', ru: 'Экзамен' }
const ALL = [EXAM_T, ...TABS]
const secTitle = (id, lang) => { const t = ALL.find((x) => x.id === id); return t ? t[lang] : id }
const secStats = (stats, id) => {
  let ok = 0; let bad = 0
  for (const [k, v] of Object.entries(stats)) if (k.startsWith(id + ':')) { ok += v.ok; bad += v.bad }
  return { ok, bad, n: ok + bad, pct: ok + bad ? Math.round((ok * 100) / (ok + bad)) : 0 }
}
const mergeProg = (a, b) => {
  const out = { sections: { ...((a && a.sections) || {}) }, last: (a && a.last) || null }
  if ((a && a.want) || (b && b.want)) {
    out.want = { ...((a && a.want) || {}) }
    for (const [k, v] of Object.entries((b && b.want) || {})) if (!out.want[k] || v.t > out.want[k].t) out.want[k] = v
  }
  const ea = a && a.exam; const eb = b && b.exam
  if (ea || eb) out.exam = !ea ? eb : !eb ? ea : (eb.pts > ea.pts || (eb.pts === ea.pts && eb.time < ea.time) ? eb : ea)
  const bs = (b && b.sections) || {}
  for (const [id, v] of Object.entries(bs)) if (!out.sections[id] || (v.last || 0) > (out.sections[id].last || 0)) out.sections[id] = v
  const la = out.sections[out.last] ? out.sections[out.last].last || 0 : 0
  const lb = b && b.last && bs[b.last] ? bs[b.last].last || 0 : 0
  if (lb > la) out.last = b.last
  return out
}

// ---------- Вхід / реєстрація ----------
const ERR = {
  exists: ['Такий логін уже зайнятий', 'Такой логин уже занят'],
  wrong: ['Невірний логін або пароль', 'Неверный логин или пароль'],
  locked: ['Забагато спроб. Зачекайте хвилину', 'Слишком много попыток. Подождите минуту'],
  bad_login: ['Логін: 3–32 символи (літери, цифри, _ . -)', 'Логин: 3–32 символа (буквы, цифры, _ . -)'],
  bad_password: ['Пароль: мінімум 4 символи', 'Пароль: минимум 4 символа'],
  no_db: ['Сервер ще не налаштований', 'Сервер ещё не настроен'],
  net: ['Немає зв\'язку з сервером', 'Нет связи с сервером'],
}
const AuthForm = ({ lang, onAuth }) => {
  const L = mk(lang)
  const [kind, setKind] = useState('in')
  const [login, setLogin] = useState('')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const up = kind === 'up'
  const submit = async (e) => {
    e.preventDefault()
    if (up && pw !== pw2) { setErr(L('Паролі не збігаються', 'Пароли не совпадают')); return }
    setErr(''); setBusy(true)
    try {
      const r = await post('/api/auth', { action: up ? 'register' : 'login', login, password: pw })
      if (r.ok && r.token) { onAuth({ login: r.login, name: r.name, token: r.token }, r.state); setPw(''); setPw2('') } else {
        const m = ERR[r.error] || ERR.net
        setErr(L(m[0], m[1]))
      }
    } catch { setErr(L(ERR.net[0], ERR.net[1])) }
    setBusy(false)
  }
  return (
    <form className="de-acct" onSubmit={submit}>
      <div className="de-seg">
        <button type="button" className={!up ? 'on' : ''} onClick={() => { setKind('in'); setErr('') }}>{L('Вхід', 'Вход')}</button>
        <button type="button" className={up ? 'on' : ''} onClick={() => { setKind('up'); setErr('') }}>{L('Реєстрація', 'Регистрация')}</button>
      </div>
      <div className="de-tr">{up
        ? L('Придумайте логін і пароль. Прогрес збережеться й буде доступний на будь-якому пристрої.', 'Придумайте логин и пароль. Прогресс сохранится и будет доступен на любом устройстве.')
        : L('Введіть логін і пароль, щоб продовжити з того місця, де зупинились.', 'Введите логин и пароль, чтобы продолжить с того места, где остановились.')}</div>
      <input className="de-search" placeholder={L('Логін', 'Логин')} value={login} autoCapitalize="none" autoCorrect="off" autoComplete="username" onChange={(e) => setLogin(e.target.value)} />
      <input className="de-search" type="password" placeholder={L('Пароль', 'Пароль')} value={pw} autoComplete={up ? 'new-password' : 'current-password'} onChange={(e) => setPw(e.target.value)} />
      {up && <input className="de-search" type="password" placeholder={L('Повторіть пароль', 'Повторите пароль')} value={pw2} autoComplete="new-password" onChange={(e) => setPw2(e.target.value)} />}
      {err && <div className="de-acct-st err">{err}</div>}
      <button className="de-btn" type="submit" disabled={busy || !login || !pw}>{busy ? '…' : up ? L('Створити акаунт', 'Создать аккаунт') : L('Увійти', 'Войти')}</button>
    </form>
  )
}

// ---------- Застосунок ----------
const GermanApp = () => {
  const [splash, setSplash] = useState(true)
  const [skipped, setSkipped] = useState(false)
  const [view, setView] = useState('home') // home | profile | current | errors | section
  const [sec, setSec] = useState(null)
  const [mode, setMode] = useState('learn')
  const [openN, setOpenN] = useState(0)
  const [trans, setTrans] = useState(() => ls.get('de:trans', true))
  const [lang, setLang] = useState(() => ls.get('de:lang', 'ua'))
  const [acct, setAcct] = useState(() => ls.get('de:session', null))
  const [sync, setSync] = useState('')
  const [navCompact, setNavCompact] = useState(false)
  const lastTop = useRef(0)
  const onScrollCap = (e) => {
    const top = e.target.scrollTop || 0; const d = top - lastTop.current
    if (top < 24) setNavCompact(false); else if (d > 8) setNavCompact(true); else if (d < -8) setNavCompact(false)
    if (Math.abs(d) > 8 || top < 24) lastTop.current = top
  }
  useEffect(() => { lastTop.current = 0; setNavCompact(false) }, [view, sec])

  // дані: окремо для кожного акаунта; без входу — локальні для пристрою
  const dns = acct ? 'de:acct:' + acct.login + ':' : 'de:anon:'
  const dnsRef = useRef(dns)
  dnsRef.current = dns
  const [stats, setStats] = useState(() => ls.get(dns + 'stats', {}))
  const [mistakes, setMistakes] = useState(() => ls.get(dns + 'mistakes', {}))
  const [prog, setProg] = useState(() => ls.get(dns + 'prog', { sections: {}, last: null }))
  const stampRef = useRef(ls.get(dns + 't', 0))
  const dataRef = useRef({ stats, mistakes, prog })
  dataRef.current = { stats, mistakes, prog }

  useEffect(() => { ls.set('de:trans', trans) }, [trans])
  useEffect(() => { ls.set('de:lang', lang) }, [lang])
  useEffect(() => {
    document.title = 'LANGUAGES'
    document.body.style.background = '#FFFFFF'
  }, [])

  const touch = useCallback(() => { stampRef.current = Date.now(); ls.set(dnsRef.current + 't', stampRef.current) }, [])

  const onStat = useCallback((key, ok) => {
    setStats((st) => {
      const c = st[key] || { ok: 0, bad: 0 }
      const n = { ...st, [key]: ok ? { ...c, ok: c.ok + 1 } : { ...c, bad: c.bad + 1 } }
      ls.set(dnsRef.current + 'stats', n)
      return n
    })
    touch()
  }, [touch])

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
    touch()
  }, [touch])

  const updProg = useCallback((id, fn) => {
    setProg((p) => {
      const cur = (p.sections && p.sections[id]) || { rounds: 0, run: null }
      const n = { sections: { ...p.sections, [id]: { ...cur, ...fn(cur), last: Date.now() } }, last: id }
      ls.set(dnsRef.current + 'prog', n)
      return n
    })
    touch()
  }, [touch])

  const onWant = useCallback((key) => {
    setProg((p) => {
      const cur = p.want && p.want[key]
      const n = { ...p, want: { ...(p.want || {}), [key]: { on: !(cur && cur.on), t: Date.now() } } }
      ls.set(dnsRef.current + 'prog', n)
      return n
    })
    touch()
  }, [touch])

  const onExamDone = useCallback((pts, time) => {
    setProg((p) => {
      const cur = p.exam
      const n = cur && (cur.pts > pts || (cur.pts === pts && cur.time <= time)) ? p : { ...p, exam: { pts, time } }
      if (n !== p) ls.set(dnsRef.current + 'prog', n)
      return n
    })
    touch()
  }, [touch])

  const openSection = (id, m) => {
    setSec(id); setMode(id === 'cases' || id === 'exam' ? 'quiz' : m); setView('section'); setOpenN((x) => x + 1)
    updProg(id, () => ({}))
  }

  // --- синхронізація з сервером ---
  const push = useCallback(async (a) => {
    if (!a) return
    setSync('busy')
    try {
      const r = await post('/api/sync', { login: a.login, token: a.token, state: { ...dataRef.current, t: stampRef.current } })
      setSync(r.ok ? 'ok' : 'err')
      if (r.status === 401) { setAcct(null); ls.set('de:session', null) }
    } catch { setSync('err') }
  }, [])
  useEffect(() => {
    if (!acct) return undefined
    const id = setTimeout(() => push(acct), 1500)
    return () => clearTimeout(id)
  }, [stats, mistakes, prog, acct, push])
  useEffect(() => {
    if (!acct) return
    post('/api/sync', { login: acct.login, token: acct.token }).then((r) => {
      if (r.status === 401) { setAcct(null); ls.set('de:session', null); return }
      const sv = r.state
      if (sv && (sv.t || 0) > stampRef.current) {
        setStats(sv.stats || {}); setMistakes(sv.mistakes || {}); setProg(sv.prog || { sections: {}, last: null })
        ls.set(dns + 'stats', sv.stats || {}); ls.set(dns + 'mistakes', sv.mistakes || {}); ls.set(dns + 'prog', sv.prog || { sections: {}, last: null })
        stampRef.current = sv.t; ls.set(dns + 't', sv.t)
      }
    }).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAuth = (a, serverState) => {
    const nsA = 'de:acct:' + a.login + ':'
    const local = { stats: ls.get(nsA + 'stats', {}), mistakes: ls.get(nsA + 'mistakes', {}), prog: ls.get(nsA + 'prog', { sections: {}, last: null }) }
    const anon = { stats: ls.get('de:anon:stats', {}), mistakes: ls.get('de:anon:mistakes', {}), prog: ls.get('de:anon:prog', { sections: {}, last: null }) }
    const base = mergeState(local, anon)
    const srv = serverState ? mergeState(base, serverState) : base
    const prg = mergeProg(mergeProg(local.prog, anon.prog), serverState && serverState.prog)
    ls.set(nsA + 'stats', srv.stats); ls.set(nsA + 'mistakes', srv.mistakes); ls.set(nsA + 'prog', prg)
    ls.set('de:anon:stats', {}); ls.set('de:anon:mistakes', {}); ls.set('de:anon:prog', { sections: {}, last: null })
    ls.set('de:session', a)
    setStats(srv.stats); setMistakes(srv.mistakes); setProg(prg)
    dnsRef.current = nsA
    touch()
    setAcct(a)
  }
  const onLogout = () => {
    ls.set('de:session', null)
    setAcct(null)
    setStats({}); setMistakes({}); setProg({ sections: {}, last: null }); setSync('')
    setView('home')
  }

  const L = mk(lang)
  const errN = Object.keys(mistakes).length
  const started = ALL.filter((t) => prog.sections[t.id] || secStats(stats, t.id).n > 0).sort((x, y) => ((prog.sections[y.id] || {}).last || 0) - ((prog.sections[x.id] || {}).last || 0))

  if (splash) return <Splash onDone={() => setSplash(false)} />
  if (!acct && !skipped) {
    return (
      <div className="de-app">
        <main className="de-main de-gate">
          <div className="de-logo big">L</div>
          <div className="de-hello">{L('Створіть акаунт', 'Создайте аккаунт')}</div>
          <AuthForm lang={lang} onAuth={(a, st) => { onAuth(a, st); setView('home') }} />
          <button className="de-btn ghost" onClick={() => setSkipped(true)}>{L('Пропустити', 'Пропустить')}</button>
          <div className="de-tr" style={{ textAlign: 'center', marginTop: 8 }}>{L('Без акаунта прогрес зберігається лише на цьому пристрої.', 'Без аккаунта прогресс сохраняется только на этом устройстве.')}</div>
        </main>
      </div>
    )
  }

  const runInfo = (id) => {
    const r = prog.sections[id] && prog.sections[id].run
    if (!r || !r.qs) return null
    const a = (r.ans || []).filter((x) => x != null).length
    const w = id === 'exam' ? L('Іспит', 'Экзамен') : L('Тест', 'Тест')
    return L(`${w}: відповідей ${a} з ${r.qs.length}`, `${w}: ответов ${a} из ${r.qs.length}`)
  }
  const resume = (id) => openSection(id, prog.sections[id] && prog.sections[id].run ? 'quiz' : 'learn')

  const SecCard = ({ id, big }) => {
    const ri = runInfo(id); const ex = id === 'exam' && prog.exam
    return (
      <div className={'de-sec' + (big ? ' big' : '')}>
        <div className="de-sec-top"><span className="de-ic"><Ic id={id} size={20} /></span><b>{secTitle(id, lang)}</b></div>
        <div className="de-sec-sub">{ri || (ex ? L(`Кращий результат: ${ex.pts} балів · ${fmt(ex.time)}`, `Лучший результат: ${ex.pts} баллов · ${fmt(ex.time)}`) : prog.sections[id] ? L('Відкривали, тест не розпочато', 'Открывали, тест не начат') : L('Ще не починали', 'Ещё не начинали'))}</div>
        {ri && ex && <div className="de-sec-sub">{L(`Кращий результат: ${ex.pts} балів · ${fmt(ex.time)}`, `Лучший результат: ${ex.pts} баллов · ${fmt(ex.time)}`)}</div>}
        <button className="de-btn" onClick={() => resume(id)}>{ri ? L('Продовжити', 'Продолжить') : prog.sections[id] ? L('Відкрити', 'Открыть') : L('Почати', 'Начать')}</button>
      </div>
    )
  }

  const navIn = view === 'section' ? 'home' : view
  const NAV = [
    ['home', 'home', L('Головна', 'Главная')],
    ['profile', 'person', L('Профіль', 'Профиль')],
    ['current', 'learn', L('Навчання', 'Обучение')],
    ['errors', 'alert', L('Помилки', 'Ошибки')],
  ]

  return (
    <div className="de-app" onScrollCapture={onScrollCap}>
      {view !== 'section' ? (
        <header className="de-head">
          <div className="de-head-row">
            <div className="de-logo">L</div>
            <div className="de-title"><b>LANGUAGES</b>{acct && <span>{acct.name}</span>}</div>
            <div className="de-langmini">
              <button className={lang === 'ua' ? 'on' : ''} onClick={() => setLang('ua')}>укр</button>
              <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>рус</button>
            </div>
          </div>
        </header>
      ) : (
        <header className="de-head">
          <div className="de-head-row">
            <button className="de-back" onClick={() => setView('home')} aria-label="back">←</button>
            <div className="de-title row"><span className="de-ic"><Ic id={sec} size={20} /></span><b>{secTitle(sec, lang)}</b></div>
            <span style={{ width: 36 }} />
          </div>
          <div className="de-ctrl">
            {sec !== 'cases' && sec !== 'exam' ? (
              <div className="de-seg">
                <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>{L('Вчити', 'Учить')}</button>
                <button className={mode === 'quiz' ? 'on' : ''} onClick={() => setMode('quiz')}>{L('Тест', 'Тест')}</button>
              </div>
            ) : <span />}
            <label className="de-switch">
              <input type="checkbox" checked={trans} onChange={(e) => setTrans(e.target.checked)} />
              <span className="de-sw" />
              {L('з перекладом', 'с переводом')}
            </label>
          </div>
        </header>
      )}

      <main className="de-main">
        {view === 'home' && (
          <>
            <div className="de-hello">{acct ? L(`Привіт, ${acct.name}`, `Привет, ${acct.name}`) : L('Оберіть розділ', 'Выберите раздел')}</div>
            {prog.last && prog.sections[prog.last] && prog.sections[prog.last].run && (
              <div className="de-cont">
                <div><small>{L('Продовжити', 'Продолжить')}</small><b>{secTitle(prog.last, lang)}</b><span>{runInfo(prog.last)}</span></div>
                <button className="de-btn" onClick={() => resume(prog.last)}>▶</button>
              </div>
            )}
            <div className="de-intro">{L('Тут ви вивчаєте німецьку за шкільним підручником. Відкрийте розділ, оберіть «Вчити» щоб прочитати матеріал або «Тест» щоб перевірити себе. Помилки потрапляють у «Помилки», а прогрес зберігається в «Профілі».', 'Здесь вы учите немецкий по школьному учебнику. Откройте раздел, выберите «Учить» чтобы прочитать материал или «Тест» чтобы проверить себя. Ошибки попадают в «Ошибки», а прогресс сохраняется в «Профиле».')}</div>
            <div className="de-list">
              <button className="de-card exam" onClick={() => openSection('exam', 'quiz')}>
                <span className="de-ic"><Ic id="exam" size={22} /></span>
                <span className="de-card-t"><b>{L('Іспит', 'Экзамен')}</b><small>{DESC.exam[lang === 'ua' ? 0 : 1]}</small>{prog.exam && <em>{L(`Кращий результат: ${prog.exam.pts} балів · ${fmt(prog.exam.time)}`, `Лучший результат: ${prog.exam.pts} баллов · ${fmt(prog.exam.time)}`)}</em>}</span>
                <span className="de-chev"><Ic id="chev" size={18} /></span>
              </button>
              {TABS.map((t) => {
                return (
                  <button key={t.id} className="de-card" onClick={() => openSection(t.id, 'learn')}>
                    <span className="de-ic"><Ic id={t.id} size={22} /></span>
                    <span className="de-card-t"><b>{t[lang]}</b><small>{DESC[t.id][lang === 'ua' ? 0 : 1]}</small></span>
                    <span className="de-chev"><Ic id="chev" size={18} /></span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {view === 'section' && (
          mode === 'learn' && sec !== 'cases' && sec !== 'exam'
            ? <Learn tab={sec} trans={trans} lang={lang} want={prog.want} onWant={onWant} />
            : <Quiz key={sec + ':' + openN + ':' + mode} tab={sec} trans={trans} lang={lang} stats={stats} mistakes={mistakes}
                initialRun={prog.sections[sec] && prog.sections[sec].run} best={prog.exam} want={prog.want} onStat={onStat} onResult={onResult} onExamDone={onExamDone} onGoErrors={() => { setView('errors'); setOpenN((x) => x + 1) }}
                onRun={(run) => updProg(sec, () => ({ run }))}
                onRoundDone={(score, total) => updProg(sec, (c) => ({ rounds: (c.rounds || 0) + 1, lastScore: `${score}/${total}`, run: null }))}
                onExit={() => setView('home')} />
        )}

        {view === 'errors' && (
          <>
            <div className="de-hello">{L('Робота над помилками', 'Работа над ошибками')}</div>
            <div className="de-tr" style={{ marginBottom: 12 }}>{L(`Питання зникає після ${NEED_OK} правильних відповідей тут. Залишилось: ${errN}`, `Вопрос исчезает после ${NEED_OK} правильных ответов здесь. Осталось: ${errN}`)}</div>
            <Quiz key={'errors:' + errN + ':' + openN} tab="errors" trans={trans} lang={lang} stats={stats} mistakes={mistakes} initialRun={null}
              onStat={onStat} onResult={onResult} onRun={() => {}} onRoundDone={() => {}} onExamDone={() => {}} onGoErrors={() => {}} onExit={() => setView('home')} />
          </>
        )}

        {view === 'current' && (
          <>
            <div className="de-hello">{L('Поточне навчання', 'Текущее обучение')}</div>
            {started.length === 0 && <div className="de-empty">{L('Ви ще нічого не почали. Оберіть розділ на головній.', 'Вы ещё ничего не начали. Выберите раздел на главной.')}</div>}
            {prog.last && prog.sections[prog.last] && <SecCard id={prog.last} big />}
            {started.filter((t) => t.id !== prog.last).slice(0, 5).map((t) => <SecCard key={t.id} id={t.id} />)}
          </>
        )}

        {view === 'profile' && (
          <>
            <div className="de-hello">{acct ? acct.name : L('Профіль', 'Профиль')}</div>
            {!acct ? <AuthForm lang={lang} onAuth={onAuth} /> : (
              <>
                {sync && <div className={'de-acct-st ' + sync}>{{ ok: L('Збережено на сервері', 'Сохранено на сервере'), busy: L('Зберігаю…', 'Сохраняю…'), err: L('Не вдалося зберегти. Повторю пізніше', 'Не удалось сохранить. Повторю позже') }[sync]}</div>}
                <div className="de-h2">{L('Мій прогрес', 'Мой прогресс')}</div>
                {started.length === 0 && <div className="de-empty">{L('Поки що порожньо', 'Пока пусто')}</div>}
                {started.map((t) => <SecCard key={t.id} id={t.id} />)}
                <button className="de-btn ghost" onClick={onLogout}>{L('Вийти', 'Выйти')}</button>
              </>
            )}
          </>
        )}
      </main>

      <nav className={'de-nav' + (navCompact ? ' compact' : '')}>
        {NAV.map(([id, ic, label]) => (
          <button key={id} className={navIn === id ? 'on' : ''} onClick={() => { setView(id); if (id === 'errors') setOpenN((x) => x + 1) }}>
            <span className={id === 'current' ? 'de-round' : 'de-navic'}><Ic id={ic} size={id === 'current' ? 21 : 24} />{id === 'errors' && errN > 0 && <i>{errN}</i>}</span>
            <small>{label}</small>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default GermanApp
