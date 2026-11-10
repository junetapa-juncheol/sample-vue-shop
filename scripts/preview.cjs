const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../docs');
const prefix = '/sample-vue-shop/';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};
http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (!url.pathname.startsWith(prefix)) {
      res.writeHead(404).end();
      return;
    }
    const file = path.resolve(
      root,
      decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html',
    );
    if (
      !file.startsWith(root + path.sep) ||
      !fs.existsSync(file) ||
      !fs.statSync(file).isFile()
    ) {
      res.writeHead(404).end();
      return;
    }
    res.setHeader(
      'Content-Type',
      types[path.extname(file)] || 'application/octet-stream',
    );
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(file).pipe(res);
  })
  .listen(4174, '127.0.0.1', () =>
    console.log('http://127.0.0.1:4174/sample-vue-shop/'),
  );
