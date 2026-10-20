# Regex Validator

A dark-mode regex testing tool: paste text, write a pattern, and see matches
highlighted live — with a per-language syntax reference and an escape helper.
Everything runs in the browser via the native JS `RegExp` engine.

## What it does

- **Live highlighting** of all matches as you type; step through them one at a time
  (current match highlighted distinctly) with a match count and inline error display
- **Match inspector** — position, full match, and numbered/named capture groups
- **Flag toggles** (`g i m s u`) and a `/pattern/flags` copy button
- **Escape Strings** modal — the pattern escaped for JSON, Python (raw/escaped),
  Go (backtick/escaped), Java, and a JS RegExp literal, each with a copy button
- **Reference panel** — tabbed syntax tables for JS, Python, Go (RE2), Java, PCRE, POSIX
- **Share** — copies a permalink with the pattern and flags encoded in the URL hash

The text editor uses a transparent `<textarea>` over a highlighted mirror `<div>`,
avoiding `contenteditable` cursor-management complexity.

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

## Archive

The previous version, plus its Docker/build files, is preserved in [`archive/`](archive/).
The redesign restyled the UI to the shared dark theme; all matching logic is unchanged.
