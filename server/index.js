// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const dayjs = require('dayjs');
const pug = require('pug');

// Preload our views
// TODO: NODE_ENV is set up by default by `now` but we should make it explicit in a file too
let pugOptions = {
  cache: process.env.NODE_ENV === 'production',
  pretty: process.env.NODE_ENV !== 'production',
};
let commonLocals = { dayjs };

// Define our main handler
function main(req, res) {
  // TODO: Add cache header to response
  // DEV: We separate `compileFile` from rendering to avoid conflating options into `locals` accidentally
  let indexView = pug.compileFile(__dirname + '/views/index.pug', pugOptions);
  res.end(indexView(commonLocals));
}
module.exports = main;
