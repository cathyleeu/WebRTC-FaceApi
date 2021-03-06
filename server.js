const {createServer: https} = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// TLS
const httpsOptions = {
  key: fs.readFileSync('./.cert/localhost.key'),
  cert: fs.readFileSync('./.cert/localhost.crt')
};

app.prepare().then(() => {
  https(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log(`> HTTPS: Ready on https://localhost:3000`);
  });
});