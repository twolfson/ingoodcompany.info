// Define our Glassdoor resolver
exports.findFirstCompany = function (req, searchTerm) {

};

// If we're being run directly, then run a search
if (require.main === module) {
  // DEV: Request info pulled from `console.log(req)` in `now dev`
  console.log(exports.findFirstCompany({
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
  }, 'Google'));
}
