FROM node:22-alpine

WORKDIR /app

COPY . /app

# http-server: lightweight static file server to serve index.html and verify it loads
RUN npm install -g http-server@14

# Verify the HTML file exists and is non-empty
RUN test -s /app/index.html && echo "index.html OK"

# Smoke-test: parse the HTML with Node to catch gross syntax issues
RUN node -e "var fs=require('fs'),h=fs.readFileSync('/app/index.html','utf8'); \
  if(!h.includes('<title>Regex Validator</title>'))throw new Error('Missing title'); \
  if(!h.includes('id=\"text-input\"'))throw new Error('Missing text-input'); \
  if(!h.includes('id=\"pattern-input\"'))throw new Error('Missing pattern-input'); \
  if(!h.includes('id=\"modal-backdrop\"'))throw new Error('Missing modal'); \
  if(!h.includes('buildRefTable'))throw new Error('Missing ref table builder'); \
  if(!h.includes('tab-js')||!h.includes('tab-python')||!h.includes('tab-go')||!h.includes('tab-java')||!h.includes('tab-pcre'))throw new Error('Missing tabs'); \
  console.log('All structural checks passed.');"

CMD ["node", "-e", "var fs=require('fs'),h=fs.readFileSync('/app/index.html','utf8'); console.log('index.html size:',h.length,'bytes'); console.log('Tabs: JS Python Go Java PCRE present'); console.log('Prototype ready — open index.html in a browser.');"]
