// Caching doesn't work well with independent static files
// Compiling during development will load everything via JS

// Load in our dependencies
const express = require('express');

// Define our port
const PORT = 3001;

// Create and start our server
function main() {
  let app = express();
  app.get('/', require('./index.js'));
  app.listen(PORT, '127.0.0.1');
  console.log(`Server listening at http://localhost:${PORT}/`);
}
main();
