const P = {
  words: <><path d="M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5z" /><path d="M5 17a3 3 0 0 1 3-3h9" /></>,
  phrases: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5v-8z" />,
  nouns: <><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7a1 1 0 0 1 .7.3l7.3 7.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.8 12.9a1 1 0 0 1-.3-.7z" /><circle cx="8" cy="8" r="1.3" /></>,
  verbs: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" />,
  modals: <><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8" /><path d="M16 7l2.5 2.5" /><path d="M14 9l2 2" /></>,
  sep: <><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="6.5" cy="17.5" r="2.5" /><path d="M8.5 8l11 9" /><path d="M8.5 16l11-9" /></>,
  past: <><path d="M4 12a8 8 0 1 0 2.5-5.8" /><path d="M4 4v4.5h4.5" /><path d="M12 8v4.2l2.8 1.8" /></>,
  cases: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  home: <><path d="M4 11.5L12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" /></>,
  person: <><circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" /></>,
  learn: <><path d="M3 7.5L12 4l9 3.5-9 3.5-9-3.5z" /><path d="M7 10v5c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6v-5" /><path d="M21 8v6" /></>,
  alert: <><path d="M12 3.5l9.5 16.5h-19L12 3.5z" /><path d="M12 10v4.5" /><circle cx="12" cy="17.2" r=".6" /></>,
  exam: <><path d="M6 3h12v4a6 6 0 0 1-12 0V3z" /><path d="M6 5H3.5v1.5A3 3 0 0 0 6.5 9.5" /><path d="M18 5h2.5v1.5a3 3 0 0 1-3 3" /><path d="M12 13v4" /><path d="M8.5 21h7" /><path d="M9.5 17h5v4h-5z" /></>,
  timer: <><circle cx="12" cy="13.5" r="7" /><path d="M12 10v3.8l2.4 1.4" /><path d="M9.5 3h5" /></>,
  skip: <><path d="M5 5l9 7-9 7V5z" /><path d="M18 5v14" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  chev: <path d="M9 6l6 6-6 6" />,
}
const Ic = ({ id, size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[id]}</svg>
)
export default Ic
