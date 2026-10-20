# Prototype: Tesseract OCR Image Processor

## Problem
Manually running `tesseract` per image is tedious for bulk scans. Users also want to visually verify OCR results by seeing highlighted words overlaid on the original image, which requires structured output (hOCR) rather than plain text.

## Approach
- `ocr.sh <input_dir> <output_dir>` with optional `--lang` flag (default: `eng`)
- Use `find` to locate `.png`, `.jpg`, `.jpeg`, `.tiff`, `.tif` in input dir
- For each image, run `tesseract <img> <output_base> txt hocr pdf` — produces `.txt`, `.hocr`, `.pdf`
- Mirror input subdirectory structure in output dir
- Log successes and failures to `<output_dir>/ocr.log`
- The `.hocr` file contains word bounding boxes; a simple `hocr-viewer.html` (single file) can render image + highlight overlay in-browser

## Data / State
- Input: image files (read-only)
- Output: `.txt`, `.hocr`, `.pdf` per image + `ocr.log`
- No persistent state between runs; re-running overwrites output for the same filename

## Open Questions
- `tesseract` PDF output embeds invisible text over the image — does that count as "highlight words from the image"? If the user wants visible highlights, an hOCR HTML viewer is the right path.
- Should existing output files be skipped (resume mode) or always overwritten? Skipping would make re-runs faster for large batches.
- Multi-page TIFFs: `tesseract` handles them natively, but output naming differs — verify behavior.

