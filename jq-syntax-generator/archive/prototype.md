# Prototype: JQ Syntax Generator

## Problem
Writing `jq` paths by hand against deeply nested JSON is error-prone and slow. Users need a visual way to click into a JSON structure and get the correct filter expression immediately.

## Approach
- Serve a single `index.html` from a Node.js `http` server (`server.js`)
- `<textarea>` for JSON input with a "Parse" button
- On parse, recursively build a `<ul>`/`<li>` tree from the JSON object using vanilla JS
- Each `<li>` element stores its full jq path in a `data-path` attribute, built at render time
- On click, read `data-path` and write it to a read-only `<input>` with a copy button
- Path building rules: object key → `.key`, array index → `.[N]`, nested → concatenate

## Data / State
- `currentJson` — the last successfully parsed JSON object (in-memory only)
- `selectedPath` — the currently displayed jq path string
- No server-side state; all state lives in the browser

## Open Questions
- How to handle keys with spaces or special characters? Needs bracket notation: `.["key with space"]`
Response: use bracketed notation
- Should the tool validate the generated path against the JSON (test mode)? Out of scope for prototype.
Response: yes have the tool test
- Render strategy for very large JSON (10k+ keys) — virtual scrolling may be needed but skip for v1.
Response: json file will be small. 
