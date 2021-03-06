// Caching doesn't work well with independent static files
// Compiling during development will load everything via JS

// Load in our dependencies
const baseApp = require('./index');
const express = require('express');

// Define our port
const PORT = 3001;

// Wrap our server with CDN logic and start listening
function main() {
  let app = express();
  app.use(function addProxyHeaders(req, res, next) {
    // https://github.com/zeit/now-cli/blob/15.3.0/src/commands/dev/lib/dev-server.ts#L588-L602
    req.headers['x-real-ip'] = req.ip;
    next();
  });
  app.use('/browser', express.static(__dirname + '/../browser'));
  app.use(baseApp);

  app.listen(PORT, '127.0.0.1');
  console.log(`Server listening at http://localhost:${PORT}/`); // eslint-disable-line no-console
}
main();
