// Caching doesn't work well with independent static files
// Compiling during development will load everything via JS

// Load in our dependencies
const express = require('express');

// Create and start our server
function main() {
  let app = express();
  app.get('/', require('./index.js'));
  app.listen(3001, '127.0.0.1');
}
main();
