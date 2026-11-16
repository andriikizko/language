export const post = async (url, body) => {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  let j = {}
  try { j = await r.json() } catch { /* ignore */ }
  return { ok: r.ok, status: r.status, ...j }
}
