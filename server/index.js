const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const bs = require('browser-sync').create();

const server = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

const resolve = file => path.resolve(__dirname, file);
const serve = (path_, cache) => express.static(resolve(path_), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

server.use('/static', serve('../app', true));
server.use('/static', serve('../dist', true));

// support parsing of application/json type post data
server.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: false }));


// Always return the main index.html
// so router render the route in the client
server.get('*', (req, res) => {
  const file = path.basename(url.parse(req.url).pathname);
  const mime_ = mime.lookup(file);
  mime_ && res.setHeader('Content-Type', mime_);
  res.sendFile(resolve('../app/index.html'));
});

server.listen(port, listening);

function listening() {
  bs.init({
    ui: false,
    notify: false,
    logLevel: 'info',
    proxy: 'localhost:' + port,
    files: ['app/index.html', 'dist/**/*.js', 'dist/**/*.css']
  });
}
