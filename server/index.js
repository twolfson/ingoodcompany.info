// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const Glassdoor = require('./models/glassdoor');
const pug = require('pug');
const semverVersion = require('../package.json').version;

// Define common constants
// DEV: NODE_ENV is set up by `now` (e.g. `development`, `production`)
const PRODUCTION_TTL = 10 * 60; // 10 minutes
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
let pugOptions = {
  cache: IS_PRODUCTION,
  pretty: !IS_PRODUCTION,
};
let commonLocals = {
  defaultQuery: 'Google',
  semverVersion
};

// Define our main handler
async function main(req, res) {
  // Set up caching for our response
  // https://zeit.co/docs/v2/deployments/concepts/cdn-and-global-distribution/#full-cdn
  if (IS_PRODUCTION) {
    res.setHeader('Cache-Control', `public, s-maxage=${PRODUCTION_TTL}, max-age=${PRODUCTION_TTL}`);
  }

  // Resolve our company info
  let query = commonLocals.defaultQuery;
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, query);

  // Perform our render
  // DEV: We separate `compileFile` from rendering to avoid conflating options into `locals` accidentally
  let indexView = pug.compileFile(__dirname + '/views/search.pug', pugOptions);
  res.end(indexView(Object.assign({}, commonLocals, { query, glassdoorInfo })));
}
module.exports = main;
