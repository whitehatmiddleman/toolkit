#!/usr/bin/env bash
#
# render-svg.sh — rasterize an SVG to one or more PNG sizes.
#
# Each size is rendered at 4x then downscaled with ImageMagick for clean
# antialiasing, and the result's dimensions + channels are printed so you
# can confirm the alpha channel survived.
#
# Usage:
#   ./render-svg.sh <input.svg> <output_prefix> <WxH> [WxH ...]
#
# Examples:
#   ./render-svg.sh logo.svg   watcher_logo  190x64 380x128 759x256
#   ./render-svg.sh emblem.svg watcher_icon  64x64 128x128 256x256
#
# Requires: python3 + cairosvg  (pip install cairosvg),  ImageMagick (convert, identify)

set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "usage: $0 <input.svg> <output_prefix> <WxH> [WxH ...]" >&2
  exit 1
fi

src="$1"
prefix="$2"
shift 2

[ -r "$src" ] || { echo "error: cannot read '$src'" >&2; exit 1; }

for dim in "$@"; do
  # Validate and split the WxH token.
  if [[ ! "$dim" =~ ^[0-9]+x[0-9]+$ ]]; then
    echo "error: '$dim' is not a valid WxH size" >&2
    exit 1
  fi
  w="${dim%x*}"
  h="${dim#*x}"

  # Supersample at 4x for smoother edges on downscale.
  sw=$(( w * 4 ))
  sh=$(( h * 4 ))

  tmp="$(mktemp --suffix=.png)"
  # Pass paths/sizes as argv (not string interpolation) to avoid quoting issues.
  python3 - "$src" "$tmp" "$sw" "$sh" <<'PY'
import sys, cairosvg
src, out, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
cairosvg.svg2png(url=src, write_to=out, output_width=w, output_height=h)
PY

  out="${prefix}_${w}x${h}.png"
  convert "$tmp" -resize "${w}x${h}" "$out"
  rm -f "$tmp"

  identify -format "%f: %wx%h %[channels]\n" "$out"
done
