import { blockWords } from './engine.js'

const ART = { m: 'der', f: 'die', n: 'das', p: 'die' }

export default function Words({ b, lang }) {
  const w = blockWords(b)
  return (
    <>
      {w.nouns.length > 0 && <div className="de-h2">Іменники · основні</div>}
      {[...w.nouns.filter((n) => n.core), ...(w.nouns.some((n) => n.core) && w.nouns.some((n) => !n.core) ? [{ sep: 1 }] : []), ...w.nouns.filter((n) => !n.core)].map((n) => n.sep ? <div key="sep" className="de-h2">Іменники · додаткові</div> : (
        <div key={n.de + n.g} className={'de-w' + (n.core ? ' core' : '')}><div className="de-w-t">
          <div className="de-w-de"><span className={'de-g g-' + (n.g === 'p' ? 'f' : n.g)}>{ART[n.g]}</span><span>{n.de}</span>
            <span className="de-w-pl">{n.g === 'p' ? '(лише мн.)' : n.pl ? 'die ' + n.pl : '—'}</span></div>
          <div className="de-w-tr">{n[lang]}</div></div></div>
      ))}
      {w.adjs.length > 0 && <div className="de-h2">Прикметники</div>}
      {w.adjs.map((a) => <div key={a.de} className={'de-w' + (a.core ? ' core' : '')}><div className="de-w-t"><div className="de-w-de"><span>{a.de}</span>{a.opp && <span className="de-w-pl">↔ {a.opp}</span>}</div><div className="de-w-tr">{a[lang]}</div></div></div>)}
      {w.verbs.length > 0 && <div className="de-h2">Дієслова</div>}
      {w.verbs.map((v) => <div key={v.de} className="de-w"><div className="de-w-t"><div className="de-w-de"><span>{v.de}</span></div><div className="de-w-tr">{v[lang]}</div><div className="de-w-pl" style={{ marginTop: 2 }}>{v.f[0]} · {v.f[1]} · {v.f[2]}</div></div></div>)}
    </>
  )
}



