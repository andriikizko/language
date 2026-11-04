// Невеликий клієнт Upstash Redis через REST (змінні підставляє Vercel після підключення бази).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

export const dbReady = () => !!(URL_ && TOKEN)

export const cmd = async (...args) => {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error)
  return j.result
}
