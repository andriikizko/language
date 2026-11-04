# Deutsch

PWA для изучения немецкого по школьному учебнику: словарь, фразы, существительные с артиклями, глаголы (Präsens), модальные, отделяемые, прошедшее время (Präteritum, Partizip II, Perfekt), падежи с разбором правил, работа над ошибками, аккаунты.

React 18 + Vite. Данные: `src/german/data/`. Логика: `src/german/lib.js`, `cases.js`, `past.js`, `errors.js`. Интерфейс: `src/german/GermanApp.jsx`.

```
npm install
npm run dev
npm run build
```

Прогресс хранится в localStorage браузера (отдельно для каждого аккаунта). Сервера нет.
