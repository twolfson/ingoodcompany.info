// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const Glassdoor = require('./models/glassdoor');
const finalhandler = require('finalhandler');
const pug = require('pug');
const Router = require('router');
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

// Build out our router
let router = Router();
function setCommonCache(req) {
  // Set up caching for our response
  // https://zeit.co/docs/v2/deployments/concepts/cdn-and-global-distribution/#full-cdn
  if (IS_PRODUCTION) {
    res.setHeader('Cache-Control', `public, s-maxage=${PRODUCTION_TTL}, max-age=${PRODUCTION_TTL}`);
  }
}
function render(res, filepath, locals) {
  // DEV: We separate `compileFile` from rendering to avoid conflating options into `locals` accidentally
  let viewFn = pug.compileFile(filepath, pugOptions);
  return viewFn(Object.assign({}, commonLocals, locals));
}
router.get('/', async function rootShow (req, res) {
  setCommonCache(req);
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, commonLocals.defaultQuery);
  res.end(render(__dirname + '/views/index.pug', { query, glassdoorInfo }));
});

// Define our main handler
async function main(req, res) {
}
module.exports = main;
