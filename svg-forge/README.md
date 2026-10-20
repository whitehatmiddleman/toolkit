# SVG Forge

An offline logo & icon maker. Compose shapes, text, and paths on a canvas, arrange
them in layers, and export clean SVG — all in the browser, no dependencies.

## What it does

- Canvas presets (logo/icon sizes) or a custom size
- Add and edit shapes, text, and path layers with a layers panel
- Alignment, snapping, grid, zoom/fit, and undo/redo
- Multiple preview backgrounds (checker / dark / light)
- Exports optimized, self-contained SVG

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies.

### Optional: rasterize to PNG

`render-svg.sh` (see `svg2png.md`) is a small companion script for turning an exported
SVG into a PNG from the command line, for when you need a raster copy. It's optional —
the editor itself is fully client-side.

## Archive

There were several older HTML exports of this app. The newest was kept as `index.html`;
the rest are preserved in [`archive/`](archive/). The app was already offline and
handler-free; the redesign aligned its neutral palette to the shared dark theme while
keeping its cyan/green accent identity. All editing logic is unchanged.
