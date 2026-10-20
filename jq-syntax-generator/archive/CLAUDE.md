# Project Rules

## Context
A Node.js single-page application that accepts pasted JSON, renders it as a clickable tree in the browser, and produces a valid `jq` path expression whenever the user clicks a node. The server is a minimal `http` module server; the client is vanilla JS with no framework.

## Conventions
- Node.js `http` and `fs` built-ins only — no Express, no bundler
- Explicit over clever; avoid magic abstractions
- Immutable-by-default; prefer `const` and pure functions
- No silent error swallowing — errors surface or are handled explicitly
- JSON parsing errors must be shown to the user inline, not swallowed

## Boundaries
- Do not build a full jq REPL or expression evaluator
- Do not persist or transmit user JSON to any server beyond localhost
- Do not add a build step (webpack, esbuild, etc.) — single HTML file served statically

## Open Questions
- Should array indices be shown as `.[0]` or `.items[0]`? Assume standard jq `.[0]` notation.
Response: standard jq notation
- Should clicking a leaf copy the path, or should there be an explicit copy button? Assume both: auto-populate a text field + copy button.
Response: both