// Caching doesn't work well with independent static files
// Compiling during development will load everything via JS

// Load in our dependencies
const express = require('express');

// Define our port
const PORT = 3001;

// Define an async error handler
function catchAsyncError(fn) {
  return function catchAsyncErrorFn (req, res, next) {
    fn(req, res)
      .then(next)
      .catch(next);
  };
}

// Create and start our server
function main() {
  let app = express();
  app.use(function addProxyHeaders (req, res, next) {
    // https://github.com/zeit/now-cli/blob/15.3.0/src/commands/dev/lib/dev-server.ts#L588-L602
    req.headers['x-real-ip'] = req.ip;
    next();
  });
  app.get('/', catchAsyncError(require('./index.js')));
  app.use('/browser', express.static(__dirname + '/../browser'));

  app.listen(PORT, '127.0.0.1');
  console.log(`Server listening at http://localhost:${PORT}/`);
}
main();
