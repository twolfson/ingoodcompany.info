// Load in our dependencies
// DEV: We could increase boot time by pre-compiling all views to functions
const callbackify = require('util').callbackify;
const Glassdoor = require('./models/glassdoor');
const express = require('express');
const semverVersion = require('../package.json').version;

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
  semverVersion,
  pretty: !IS_PRODUCTION,
  MIXPANEL_PRODUCTION_TOKEN: process.env.MIXPANEL_PRODUCTION_TOKEN,
};

// Define our routes
function setCommonCache(res) {
  // Set up caching for our response
  // https://zeit.co/docs/v2/deployments/concepts/cdn-and-global-distribution/#full-cdn
  if (IS_PRODUCTION) {
    res.setHeader('Cache-Control', `public, s-maxage=${PRODUCTION_TTL}, max-age=${PRODUCTION_TTL}`);
  }
}
app.get('/', callbackify(async function rootShow(req, res) {
  setCommonCache(res);
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, app.locals.defaultQuery);
  res.render('index', {glassdoorInfo});
}));
app.get('/search', callbackify(async function searchShow(req, res) {
  setCommonCache(res);
  let query = req.query.query || '';
  let glassdoorInfo = await Glassdoor.findFirstCompany(req, query);
  res.render('search', {query, glassdoorInfo});
}));

// Export our app as our module.exports
module.exports = app;
