# Pixl — Image Editor

A fast, offline image editor: crop, resize, rotate, draw, remove backgrounds, and
export — with a from-scratch EXIF viewer that preserves metadata on export.
Everything runs on `<canvas>` in the browser; no image ever leaves the page.

## What it does

- **Import** JPG / PNG / WebP by drag-drop or file picker
- **Crop** (rule-of-thirds guides), **lasso** and **free-select** with cut/crop-to-selection
- **Adjust** — grayscale and pixelate sliders
- **Resize** with optional aspect-ratio lock
- **Transform** — 90° rotate, flip H/V, and fine rotation with live preview
- **Draw** — pen, line, and box tools with color and width
- **Remove background** via corner flood-fill to transparency
- **EXIF panel** — a dependency-free JPEG/TIFF parser showing camera, exposure, and
  GPS data; metadata is re-injected on JPG/WebP export
- **Export** to JPG, PNG, WebP, or SVG (raster embedded)
- Zoom/pan viewport, full undo/redo history, and keyboard shortcuts
  (`Ctrl+Z`/`Ctrl+Y`, `+`/`-`, `0` fit, `1` actual size, `Esc`/`Enter`)

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

## Archive

The previous version is preserved in [`archive/`](archive/). The redesign brought the
app to the shared standards: the external Google Fonts import was removed (system font
stack), the accent recolored to the shared palette, and ~37 inline `on*` handlers were
replaced with listeners attached in JavaScript. All editing logic is unchanged.
