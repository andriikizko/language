// В Android-оболонці сторінка відкривається з https://localhost, тож API викликаємо за повною адресою.
export const BASE = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.() ? 'https://language-snowy.vercel.app' : ''
export const post = async (url, body) => {
  const r = await fetch(BASE + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  let j = {}
  try { j = await r.json() } catch { /* ignore */ }
  return { ok: r.ok, status: r.status, ...j }
}
