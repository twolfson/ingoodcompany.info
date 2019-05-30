// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const pug = require('pug');

// WARNING: `now dev` seems to not cache bust when we adjust `index.pug`,
//   even with this `renderFile` inline approach...

// Preload our views
// TODO: NODE_ENV is set up by default by `now` but we should make it explicit in a file too
let pugOptions = {
  cache: process.env.NODE_ENV === 'production',
  pretty: process.env.NODE_ENV !== 'production',
};

// Define our main handler
function main(req, res) {
  // TODO: Add cache header to response
  res.end(pug.renderFile(__dirname + '/views/index.pug', pugOptions));
}
module.exports = main;
