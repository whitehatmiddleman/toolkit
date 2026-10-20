# Project Rules

## Context
A Node.js single-page application with a three-panel layout. Top-right: template input with `{% varName %}` syntax. Bottom-right: an editable data grid (spreadsheet-like) that accepts CSV/TSV paste from Excel or manual entry; column headers define variable names. Left panel: output showing one expanded snippet per data row, stacked with spacing, rendered on **Generate** button click. The server is a minimal `http` module server; all rendering is client-side vanilla JS.

## Conventions
- Node.js `http` and `fs` built-ins only — no Express, no bundler, no frontend framework
- Explicit over clever; avoid magic abstractions
- Immutable-by-default; prefer `const` and pure functions for substitution logic
- No silent error swallowing — substitution warnings (undefined variable, empty row) must surface visibly in the output panel

## Boundaries
- Do not persist template or data to the server — everything lives in the browser
- Do not support nested or conditional variable expressions — simple string replacement only
- Do not require a build step — single `index.html` served statically

## Decisions
- **Undefined variables** (present in template but no matching column header): highlighted as an error in the output — red background, `{% varName %}` preserved.
- **Grid headers**: editable in row 0; columns can be added/removed dynamically via toolbar buttons.
- **Rendering trigger**: explicit **Generate** button — no live re-render on every keystroke.
- **Variable names**: camelCase (no spaces); token syntax is `{% camelCaseName %}`.
- **Row labels**: each snippet has a collapsible `<details>` header showing "Row N"; open by default.
- **Row limit**: `MAX_ROWS = 50` data rows (constant at top of script in `index.html`).
- **Deployment**: Dockerfile provided (`node:22-alpine`) since the host has no Node.js installed.