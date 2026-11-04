import { useEffect, useState } from 'react'

// Заставка 3 секунди: білі літери з поступовою появою
const Splash = ({ onDone }) => {
  const [out, setOut] = useState(false)
  useEffect(() => {
    const a = setTimeout(() => setOut(true), 2500)
    const b = setTimeout(onDone, 3000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [onDone])
  return (
    <div className={'de-splash' + (out ? ' out' : '')}>
      <div className="de-splash-name">
        {'LANGUAGES'.split('').map((c, i) => <span key={i} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>{c}</span>)}
      </div>
      <div className="de-splash-by">prod by Dijix</div>
    </div>
  )
}

export default Splash
