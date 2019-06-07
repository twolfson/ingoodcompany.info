// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const assert = require('assert');
const Glassdoor = require('./models/glassdoor');
const express = require('express');
const semverVersion = require('../package.json').version;
const Sentry = require('@sentry/node');

// Define common constants
// DEV: NODE_ENV is set up by `now` (e.g. `development`, `production`)
const PRODUCTION_TTL = 10 * 60; // 10 minutes
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Build out our app
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.locals = {
  defaultQuery: 'Google',
  MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
  pretty: !IS_PRODUCTION,
  semverVersion,
};

// Set up the first part of our Sentry handler
// DEV: This must come before all other middlewares
const SENTRY_SERVER_DSN = process.env.SENTRY_SERVER_DSN;
assert(SENTRY_SERVER_DSN);
Sentry.init({
  dsn: SENTRY_SERVER_DSN,
  environment: process.env.NODE_ENV,
});
app.use(Sentry.Handlers.requestHandler());

// Define our routes
function wrapAsyncRoute(fn) {
  return function wrapAsyncRouteFn(req, res, next) {
    // DEV: We don't call `.then(next)` as `res.render` will have completed
    //   and `next()` will try to run `finalhandler` which has more headers/body
    fn(req, res).catch(next);
  };
}
function setCommonCache(res) {
  // Set up caching for our response
  // https://zeit.co/docs/v2/deployments/concepts/cdn-and-global-distribution/#full-cdn
  if (IS_PRODUCTION) {
    res.setHeader('Cache-Control', `public, s-maxage=${PRODUCTION_TTL}, max-age=${PRODUCTION_TTL}`);
  }
}
app.get('/', wrapAsyncRoute(async function rootShow(req, res) {
  setCommonCache(res);
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, app.locals.defaultQuery);
  res.render('index', {glassdoorInfo});
}));
app.get('/search', wrapAsyncRoute(async function searchShow(req, res) {
  setCommonCache(res);
  let query = req.query.query || '';
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, query);
  res.render('search', {query, glassdoorInfo});
}));

// Set up the last part of our Sentry handler
// DEV: This must come after all our controllers but before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Add forced flush to Sentry upon request error as they don't always get reported
//   https://spectrum.chat/zeit/now/does-now-sh-supports-sentry-io-for-tracking-errors~385d04d5-1bc3-4a99-921b-47cb045f80f6
//   https://github.com/getsentry/sentry-javascript/issues/1449#issuecomment-424600862
app.use(function (err, req, res, next) {
  // DEV: We use `flush` as `close` disables the client which can be bad in shared environments
  Sentry.getCurrentHub().getClient().flush(2000 /* ms */).then(() => {
    next(err);
  });
});

// Export our app as our module.exports
module.exports = app;
