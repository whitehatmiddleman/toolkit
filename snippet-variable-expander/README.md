# Snippet Variable Expander

Generate repeated text blocks with different values. Define a template with
`{% varName %}` placeholders, fill in a spreadsheet of values, and get every
expanded snippet rendered instantly — all in the browser.

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

1. **Template** (top-right): type your text using `{% camelCaseName %}` placeholders.
2. **Data Grid** (bottom-right): row 0 is headers — each header must match a
   placeholder. Rows 1+ are data. Paste directly from Excel (TSV) or CSV.
3. **Generate** (output panel): expand all data rows against the template.

### Grid keyboard shortcuts

| Key | Action |
|-----|--------|
| Tab / Shift-Tab | Move right / left |
| Enter | Move down |
| Arrow keys | Navigate cells |

### Copy

- **Copy** on each snippet copies that snippet's text.
- **Copy All** copies every snippet joined by `---` separators.

## Behaviour

- **Undefined variables** (placeholder with no matching column header) are
  highlighted in red in the output.
- **Empty rows** surface a visible warning instead of silent blank output.
- **Row limit:** 50 data rows (`MAX_ROWS` in `index.html`). Paste auto-expands the
  grid and truncates at the limit.

## Archive

Previously a Type 2 app whose `server.js` only served the HTML statically, this is
now a single-file Type 1 app. The redesign also removed an inline `onclick` handler
(now attached in JS) and the light-theme toggle (the app is dark-only to match the
rest of the collection). The old `server.js`, `Dockerfile`, and prototype files are
preserved in [`archive/`](archive/).
