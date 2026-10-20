# Password Generator

A sleek, dark-themed password generator that runs entirely in your browser — no dependencies, no network.

## What it does

- Adjustable password length (8–64) via slider
- Toggle uppercase, lowercase, numbers, and symbols
- Guarantees at least one character from each selected type
- Cryptographically secure randomness (`crypto.getRandomValues`, no modulo bias)
- Live strength meter based on estimated entropy
- One-click copy to clipboard with visual feedback (works on `file://` via fallback)
- Responsive layout for mobile and desktop

## Usage

Open `index.html` directly in a browser:

```bash
xdg-open index.html      # Linux
open index.html          # macOS
```

Or serve it statically (e.g. `python3 -m http.server`) and visit the page. No build step, no install.
