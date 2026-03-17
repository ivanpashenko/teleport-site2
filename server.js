const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3004;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function send(res, code, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(code, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.normalize(path.join(ROOT, reqPath));
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, 'Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err) return send(res, 404, 'Not found');

    let target = filePath;
    if (stat.isDirectory()) target = path.join(filePath, 'index.html');

    fs.readFile(target, (readErr, data) => {
      if (readErr) return send(res, 404, 'Not found');
      const ext = path.extname(target).toLowerCase();
      send(res, 200, data, MIME[ext] || 'application/octet-stream');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Teleport site2 running at http://localhost:${PORT}`);
});
