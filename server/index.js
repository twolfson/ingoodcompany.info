// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const pug = require('pug');

// Preload our views
// TODO: Set up NODE_ENV for project
let pugOptions = {
  pretty: process.env.NODE_ENV === 'production'
};
const indexView = pug.compileFile(__dirname + '/views/index.pug', pugOptions);

// Define our main handler
function main(req, res) {
  res.end(indexView());
}
module.exports = main;
