# Prototype: Snippet Variable Expander

## Problem
Generating repeated text blocks with different values (emails, configs, messages) requires either manual copy-paste or a heavy templating system. A lightweight browser tool that takes a snippet and a spreadsheet of values fills this gap without any toolchain.

## Approach
- Single `index.html` served by `server.js` (Node.js `http` module)
- CSS grid layout: left half = output panel, right half split top/bottom
- Top-right: `<textarea>` for the template; parse `{% varName %}` tokens on input
- Bottom-right: contenteditable grid (`<table>`) — row 0 is editable headers, subsequent rows are data
  - Paste handler: detect Tab-separated (Excel) or comma-separated (CSV); split into cells
  - Keyboard navigation: Tab/Enter to move between cells like a spreadsheet
- Left panel: on every template or grid change, iterate each data row, replace all `{% varName %}` tokens, append to output with `<hr>` separator
- Undefined variable: wrap in `<span class="error">` in the output
- "Copy All" button on left panel; each snippet also gets an individual copy icon

## Data / State
- `templateString` — raw template text (in-memory)
- `gridData` — 2D array of strings: `[headers[], ...rows[]]` (in-memory)
- No server-side state; no localStorage in v1

## Open Questions
- How to handle `{% varName %}` tokens with spaces inside (e.g., `{% var name %}`)? Assume no spaces in variable names — use camelCase or underscores.
Response: all variables will be with camelCase.
- Should the output panel show row numbers or a header identifying which row produced each snippet? Useful for debugging — add as a collapsed label above each snippet.
Response: header with the add the collapsed label.
- Performance: at what row count does live re-render become sluggish? Debounce at 100+ rows.
Response: We should max the rows to 50, but a variable in the code and modify that if necessary