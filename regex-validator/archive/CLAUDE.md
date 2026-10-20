# Project Rules

## Context
This is a single-page, client-only regex validator tool. The user pastes text into a left panel, enters a regex pattern into a right-top panel (with flags), and sees matches highlighted in real time. A right-bottom panel serves as a reference guide with tabbed views for different language regex formats (JS, Python, Go, Java, PCRE). A button reformats the current regex into a JSON-escaped string. The UI is dark mode only.

## Conventions
- Node.js built-ins preferred over npm packages; justify any dependency added
- Explicit over clever; avoid magic abstractions
- Immutable-by-default; prefer `const` and pure functions
- No silent error swallowing — errors surface or are handled explicitly
- All regex execution happens in the browser via the native `RegExp` API — no server calls
- Keep all logic in vanilla JS unless a framework is explicitly chosen and justified

## Boundaries
- Do not add user accounts, cloud storage, or any persistence beyond `localStorage`
- Do not support regex engines other than JS `RegExp` for actual matching (reference tabs are informational only)
- Do not add a light mode toggle — dark mode is the fixed design

## Open Questions
- Should match highlighting show all matches simultaneously, or step through them one at a time?
Response: show all matches simultaneously
- Which languages should be included in the reference tabs at launch? (Assumed: JS, Python, Go, Java, PCRE)
Response: Yes all the assumed languages
- Should the "Escape for JSON" button copy to clipboard, replace the input in-place, or show a modal?
Response: show a modal, not sure if other languages would also require special escape characters, that can be added in the to do list
