# Slugify

Turn arbitrary text — page titles, product names, spreadsheet rows — into clean
URL-safe slugs. Everything runs in the browser, live as you type.

## What it does

- Paste one entry per line (Excel/TSV paste works; pick which tab column to use)
- Unicode-aware: strips accents (`é → e`) and transliterates letters NFD can't
  decompose (`ß → ss`, `ø → o`, `æ → ae`, …)
- Configurable separator, repeat-collapsing, and edge trimming
- Custom character removal and `from=to` replacement pairs
- Live original → slug preview with a running count
- Copy slugs, or copy as TSV (original + slug); one-click clear

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

## Archive

The previous version of this app is preserved in [`archive/`](archive/).
