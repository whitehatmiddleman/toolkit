# Prototype: Regex Validator

## Problem
Developers frequently need to test regex patterns against sample text and quickly look up syntax differences across languages. Existing tools are either too minimal (no reference) or too heavy (require accounts, backends). A lightweight, self-contained browser tool with live highlighting and a built-in reference panel would eliminate the context-switching.

## Approach
- Build as a single `index.html` with inline CSS and JS — zero build step, opens in any browser
- Three-panel layout via CSS Grid: `[left] [right-top / right-bottom]`
- Left panel: `<textarea>` for pasting text; on regex match, wrap matched spans in `<mark>` highlights using a content-editable div or overlay technique
- Right-top panel: `<input>` for the pattern + flag checkboxes (g, i, m, s); run `new RegExp(pattern, flags)` on every keystroke with debounce (~150ms)
- Right-bottom panel: static HTML reference content in tab groups (one `<section>` per language, toggled via tab buttons)
- "Escape for JSON" button: takes the raw pattern string, runs `JSON.stringify(pattern).slice(1, -1)`, and shows the result in a small output area or copies to clipboard
- Error state: if `new RegExp()` throws, display the error message in the right-top panel instead of running matching

## Data / State
- `patternText` — current regex string (string)
- `flags` — set of active flags (Set<string>)
- `inputText` — user's pasted content (string)
- `activeTab` — currently selected reference tab (string, e.g. `"python"`)
- No persistence required for the prototype

## Open Questions
- Highlight approach: `<textarea>` doesn't support inline styling, so match highlighting requires either a mirrored `<div>` overlay or switching to a `contenteditable` div — need to pick one before building
Response: Lets go for `contenteditable` 
- Tab content: how much depth is needed for the reference panel? (Quick-reference cards vs. full syntax tables)
Response: Full syntax tables
- Should the JSON-escape output replace the input or appear separately?
Response: Modal window with copy button
