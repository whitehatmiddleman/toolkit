# Project Rules

## Context
A Bash script (`ocr.sh`) that wraps `tesseract` to batch-process images from an input directory and write OCR results to an output directory. The key feature is producing hOCR output (or a searchable PDF) so that word positions are embedded, enabling highlight-on-image viewing in a browser or PDF viewer.

## Conventions
- Bash and standard GNU tools only — `tesseract`, `find`, `basename`; no Python wrappers
- Explicit over clever; avoid magic abstractions
- Immutable-by-default; use `readonly` for config variables at the top
- No silent error swallowing — check `tesseract` exit code per file and log failures with the filename

## Boundaries
- Do not modify or delete source images
- Do not implement a viewer — output hOCR/PDF and let existing tools handle rendering
- Do not process non-image files silently; skip with a warning

## Open Questions
- Should the script produce `.hocr` + `.txt` separately, or a single searchable PDF per image? Assume both: `.txt` for quick reading, `.hocr` for overlay capability.
- `tesseract` can also produce PDF with embedded text layer directly (`pdf` output type) — which format enables "highlight words on original image"? The `hocr` output + an hOCR viewer does; the PDF approach embeds text invisibly. Clarify with user.
Response: pdf approach
