import nounsData from './data/nouns.json'
import verbs from './data/verbs.json'
import dict from './data/dict.json'

// Фіксований набір із 50 слів для гостя: 25 іменників (по 2–3 з кожної теми), 12 дієслів, 13 прикметників.
const every = (arr, n) => (arr.length <= n ? arr : Array.from({ length: n }, (_, i) => arr[Math.floor(i * arr.length / n)]))
const byDe = (a, b) => a.de.localeCompare(b.de, 'de')
const topics = Object.keys(nounsData.topics).filter((t) => !t.startsWith('a2_'))
const nouns = topics.flatMap((t, i) => every(nounsData.words.filter((w) => w.topic === t && w.core && w.g !== 'p').sort(byDe), i < 3 ? 3 : 2))
export const GUEST = {
  nouns: new Set(nouns.map((w) => w.de + '|' + w.g)),
  verbs: new Set(every(verbs.filter((v) => v.lvl !== 'a2' && v.core && v.type !== 'aux').sort(byDe), 12).map((v) => v.de)),
  adj: new Set(every(dict.adj.filter((a) => a.lvl !== 'a2' && a.core).sort(byDe), 13).map((a) => a.de)),
}
export const GUEST_TEXT = 'Щоб бачити весь словник і користуватися всіма перевагами застосунку, зареєструйтесь.'
