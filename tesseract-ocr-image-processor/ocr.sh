#!/usr/bin/env bash
set -euo pipefail

readonly DEFAULT_LANG="eng"

usage() {
    echo "Usage: $(basename "$0") <input_dir> <output_dir> [--lang <lang>]" >&2
    exit 1
}

if [[ $# -lt 2 ]]; then
    usage
fi

INPUT_DIR="$1"
OUTPUT_DIR="$2"
LANG="$DEFAULT_LANG"
shift 2

while [[ $# -gt 0 ]]; do
    case "$1" in
        --lang)
            if [[ $# -lt 2 ]]; then
                echo "Error: --lang requires an argument" >&2
                usage
            fi
            LANG="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage
            ;;
    esac
done

readonly INPUT_DIR OUTPUT_DIR LANG

if [[ ! -d "$INPUT_DIR" ]]; then
    echo "Error: input directory does not exist: $INPUT_DIR" >&2
    exit 1
fi

mkdir -p "$OUTPUT_DIR"
readonly LOG_FILE="$OUTPUT_DIR/ocr.log"

log() {
    echo "$1" | tee -a "$LOG_FILE"
}

log "OCR run started: $(date -Iseconds)"
log "Input:  $INPUT_DIR"
log "Output: $OUTPUT_DIR"
log "Lang:   $LANG"

SUCCESS=0
FAILURE=0
SKIPPED=0

while IFS= read -r -d '' img; do
    rel="${img#"$INPUT_DIR"/}"
    filename="$(basename "$img")"
    ext="${filename##*.}"
    ext_lower="${ext,,}"

    if [[ ! "$ext_lower" =~ ^(png|jpg|jpeg|tiff|tif)$ ]]; then
        log "SKIP (unsupported extension): $rel"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    base="${rel%.*}"
    out_base="$OUTPUT_DIR/$base"
    out_dir="$(dirname "$out_base")"
    mkdir -p "$out_dir"

    log "Processing: $rel"
    exit_code=0
    tesseract "$img" "$out_base" -l "$LANG" txt hocr pdf 2>>"$LOG_FILE" || exit_code=$?
    if [[ $exit_code -eq 0 ]]; then
        log "OK: $base (.txt .hocr .pdf)"
        SUCCESS=$((SUCCESS + 1))
    else
        log "FAIL: $rel (exit code $exit_code)"
        FAILURE=$((FAILURE + 1))
    fi

done < <(find "$INPUT_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.tiff" -o -iname "*.tif" \) -print0)

log ""
log "Done: $SUCCESS succeeded, $FAILURE failed, $SKIPPED skipped"

if [[ $FAILURE -gt 0 ]]; then
    exit 1
fi
