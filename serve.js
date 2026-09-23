// Servidor local simples, para ver o site sem instalar nada.
// Uso: node serve.js   (depois abra http://127.0.0.1:8080/joaosinho-trinta-instituto/index.html)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8080;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(
      '<!doctype html><meta charset="utf-8"><title>Site 10K</title>' +
      '<body style="font:16px/1.6 system-ui;margin:60px auto;max-width:40em">' +
      '<h1>Instituto Joãosinho Trinta</h1>' +
      '<p>Versão em andamento (identidade do Instituto), em 5 páginas:</p><ul>' +
      '<li><a href="/joaosinho-trinta-instituto/index.html"><b>Home</b></a></li>' +
      '<li><a href="/joaosinho-trinta-instituto/joaosinho.html">O artista</a></li>' +
      '<li><a href="/joaosinho-trinta-instituto/instituto.html">O Instituto</a></li>' +
      '<li><a href="/joaosinho-trinta-instituto/atuacao.html">Atuação e projetos</a></li>' +
      '<li><a href="/joaosinho-trinta-instituto/equipe.html">Quem faz e o acervo</a></li>' +
      '</ul>'
    );
    return;
  }
  if (rel.endsWith('/')) rel += 'index.html';
  const alvo = path.join(ROOT, path.normalize(rel));
  if (!alvo.startsWith(ROOT)) {
    res.writeHead(403).end('403');
    return;
  }
  fs.readFile(alvo, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Não encontrado: ' + rel);
      return;
    }
    res.writeHead(200, {
      'content-type': TIPOS[path.extname(alvo).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-cache',
    }).end(buf);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor local em http://127.0.0.1:${PORT}/`);
  console.log(`  http://127.0.0.1:${PORT}/joaosinho-trinta-instituto/index.html`);
});
