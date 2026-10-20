# Tesseract OCR Image Processor

A two-part tool: a Bash script that batch-runs Tesseract OCR over images, and an
offline browser viewer that overlays word-position highlights on the original image
using the generated hOCR.

## Parts

- **`index.html`** — the hOCR viewer (single-file, client-only, no dependencies).
  Load an image and its `.hocr` file to draw a highlight box over every recognised word.
- **`ocr.sh`** — the batch OCR generator (requires the `tesseract` binary). This is a
  local CLI companion; the browser cannot run Tesseract offline without external
  dependencies, so OCR generation stays as a shell script.

## Generate hOCR

**Requirements:** `tesseract-ocr`, a language pack (e.g. `tesseract-ocr-eng`), `ghostscript`.

```bash
# Process every PNG/JPG/TIFF in input_dir
./ocr.sh input_dir output_dir

# With a different language
./ocr.sh input_dir output_dir --lang fra
```

Per image, three files are written (mirroring the input subdirectory structure):
`<name>.txt` (transcript), `<name>.hocr` (word bounding boxes), and `<name>.pdf`
(searchable PDF). A run log is written to `output_dir/ocr.log`.

## View highlights

Open `index.html` in a browser (or serve it statically), select the original image
and its matching `.hocr` file, then click **Render highlights**.

## Archive

The previous viewer (`hocr-viewer.html`) and the Docker/build files are preserved in
[`archive/`](archive/). The viewer was redesigned to the shared dark theme and renamed
to `index.html`; `ocr.sh` is unchanged.
