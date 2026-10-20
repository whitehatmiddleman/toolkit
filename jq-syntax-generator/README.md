# jq Syntax Generator

Paste JSON, render it as a clickable tree, and get the exact `jq` path for any
node — plus a filter-expression builder. Everything runs in the browser.

## What it does

- Paste JSON and render it as a collapsible, syntax-colored tree
- Click any node to get its `jq` path (with bracket notation for non-simple keys)
- Live "path test" that resolves the path against your JSON and shows the value
- Filter builder for `select(...)` expressions: `==`, `!=`, `<`, `>`, `contains`,
  `startswith`, `endswith`, `test` (regex with flags), and null checks
- One-click copy for both the path and the filter expression

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
Fully client-side — no build step, no dependencies.

## Archive

This was previously a Type 2 app whose `server.js` only served the HTML statically,
so it's now a single-file Type 1 app. The old `server.js`, `Dockerfile`, tests, and
build files are preserved in [`archive/`](archive/).
