# Excel → Markdown Table

Paste cells copied from Excel or Google Sheets and get a clean, column-aligned
GitHub-flavored markdown table. Runs entirely in the browser.

## What it does

- Paste TSV/CSV cells directly from a spreadsheet — or a raw markdown table to reformat it
- Live spreadsheet-style preview grid with row/column headers
- Optional "first row is header" and left/center/right column alignment
- Nicely padded, aligned markdown output
- One-click copy (with a `file://` clipboard fallback)

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

## Archive

The previous version (which used external Google Fonts and a light/dark toggle) is
preserved in [`archive/`](archive/).
