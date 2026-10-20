# ffmpeg Generator

Build an `ffmpeg` / `ffprobe` command from a few dropdowns, copy it, and run it.
Nothing leaves the page — it just generates the command text for you.

## What it does

- **Generator** mode with tabs for common jobs:
  - **Video** — H.264/H.265/VP9, CPU or NVENC/AMF GPU encoding, CRF/quality,
    downscale, fps, audio bitrate, faststart, compatibility pixel format
  - **Audio** — extract/convert to MP3, M4A, Opus, WAV, FLAC
  - **GIF** — palette-based high-quality animated GIFs
  - **Trim** — copy (fast) or re-encode (frame-accurate) clipping
  - **Frames** — single poster, thumbnail sequence, or contact-sheet grid
  - **Inspect** — `ffprobe` quick / summary / full-JSON
- **Concat** mode — join multiple clips via the concat filter, normalizing size,
  fps, pixel format, and audio (with optional silent-track insertion)
- **Batch** a whole folder, with correct loop syntax per **shell** (bash / PowerShell / cmd)
- Syntax-highlighted command output, an optional `-y` overwrite toggle, and a
  `file://`-safe copy button
- A **Help** tab covering GPU detection and NVENC/AMF setup

## Usage

Open `index.html` in a browser, or serve it statically (e.g. `python3 -m http.server`).
No build step, no dependencies. (You run the generated commands with your own local
`ffmpeg`/`ffprobe` install.)

## Archive

There were two loose HTML exports and no `index.html`. The newer, more complete one
became `index.html`; both originals are preserved in [`archive/`](archive/). The
redesign aligned the neutral palette to the shared dark theme and added a header pill;
all command-building logic is unchanged.
