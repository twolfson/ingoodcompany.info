// Load in our dependencies
const assert = require('assert');

// Define our Glassdoor resolver
exports.findFirstCompany = function (req, searchTerm) {
  // Load in our required data
  let reqIp = req.headers['x-real-ip'];
  assert(reqIp, 'Missing `x-real-ip` for incoming request');
  let reqUserAgent = req.headers['user-agent'];
  assert(reqUserAgent, 'Missing `user-agent` for incoming request');
  let glassdoorApiId = process.env.GLASSDOOR_API_ID;
  assert(glassdoorApiId, 'Missing `process.env.GLASSDOOR_API_ID`');
  let glassdoorApiKey = process.env.GLASSDOOR_API_KEY;
  assert(glassdoorApiKey, 'Missing `process.env.GLASSDOOR_API_KEY`');

  // TODO: If there's no search term, then return nothing

  // https://www.glassdoor.com/developer/companiesApiActions.htm
  let apiUrl = 'https://api.glassdoor.com/api/api.htm?' + querystring.stringify({
    v: 1,
    format: 'json',
    't.p': glassdoorApiId,
    't.k': glassdoorApiKey,
    userip: reqIp,
    useragent: useragent,
    action: 'employers',
    q: searchTerm,
    pn: 1, // Page number
    ps: 1, // Page size (default is 20)
  });
};

// If we're being run directly, then run a search
if (require.main === module) {
  // DEV: Request info pulled from `console.log(req)` in `now dev`
  console.log(exports.findFirstCompany({
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:67.0) Gecko/20100101 Firefox/67.0',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.5',
      'accept-encoding': 'gzip, deflate',
      connection: 'close',
      cookie: 'foo=bar',
      'upgrade-insecure-requests': '1',
      'x-forwarded-host': 'localhost:3000',
      'x-forwarded-proto': 'http',
      'x-forwarded-for': '::ffff:127.0.0.1',
      'x-real-ip': '::ffff:127.0.0.1',
      'x-now-trace': 'dev1',
      'x-now-deployment-url': 'localhost:3000',
      'x-now-id': 'sun-AAA-BBB',
      'x-now-log-id': 'BBB',
      'x-zeit-co-forwarded-for': '::ffff:127.0.0.1'
    }
  }, 'Google'));
}