const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const INDEX = path.join(__dirname, 'index.html');

http.createServer((req, res) => {
  if (req.method !== 'GET' || (req.url !== '/' && req.url !== '/index.html')) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  fs.readFile(INDEX, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Snippet Variable Expander running at http://localhost:${PORT}`);
});
