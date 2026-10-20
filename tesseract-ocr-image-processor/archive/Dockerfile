FROM debian:12-slim

# tesseract-ocr: OCR engine
# tesseract-ocr-eng: English language data for tesseract
# imagemagick: generate test images with text during build verification
# fonts-dejavu-core: TrueType fonts required by imagemagick text rendering
# ghostscript: required by tesseract's PDF output backend (via libgs)
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-eng \
    imagemagick \
    fonts-dejavu-core \
    ghostscript \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

RUN chmod +x /app/ocr.sh

# Create test images at build time (network required, so this is fine here)
RUN mkdir -p /test/input/subdir \
    && convert -size 700x120 xc:white \
        -font /usr/share/fonts/truetype/dejavu/DejaVuSans.ttf \
        -pointsize 32 -fill black \
        -gravity center -annotate 0 "Hello World OCR Test" \
        /test/input/test1.png \
    && convert -size 700x120 xc:white \
        -font /usr/share/fonts/truetype/dejavu/DejaVuSans.ttf \
        -pointsize 26 -fill black \
        -gravity center -annotate 0 "Subdirectory image batch test" \
        /test/input/subdir/test2.png

CMD ["/bin/bash", "-c", \
    "/app/ocr.sh /test/input /test/output \
    && echo '' \
    && echo '=== ocr.log ===' \
    && cat /test/output/ocr.log \
    && echo '' \
    && echo '=== test1.txt ===' \
    && cat /test/output/test1.txt \
    && echo '=== subdir/test2.txt ===' \
    && cat /test/output/subdir/test2.txt \
    && echo '' \
    && echo '=== Output files ===' \
    && find /test/output -type f | sort"]
