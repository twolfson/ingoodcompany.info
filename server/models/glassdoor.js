// Load in our dependencies
const assert = require('assert');
const fetch = require('node-fetch');
const querystring = require('querystring');
const nextTickPromise = require('util').promisify(process.nextTick);

// Define our Glassdoor resolver
exports.findFirstCompany = async function (req, searchTerm) {
  // Load in our required data
  let reqIp = req.headers['x-real-ip'];
  assert(reqIp, 'Missing `x-real-ip` for incoming request');
  let reqUserAgent = req.headers['user-agent'];
  assert(reqUserAgent, 'Missing `user-agent` for incoming request');
  let glassdoorApiId = process.env.GLASSDOOR_API_ID;
  assert(glassdoorApiId, 'Missing `process.env.GLASSDOOR_API_ID`');
  let glassdoorApiKey = process.env.GLASSDOOR_API_KEY;
  assert(glassdoorApiKey, 'Missing `process.env.GLASSDOOR_API_KEY`');

  // If there's no search term, then return nothing
  // DEV: We use `nextTick` to guarantee async response time
  if (!searchTerm) {
    await nextTickPromise();
    return null;
  }

  // Perform our search
  // https://www.glassdoor.com/developer/companiesApiActions.htm
  let apiUrl = 'https://api.glassdoor.com/api/api.htm?' + querystring.stringify({
    v: 1,
    format: 'json',
    't.p': glassdoorApiId,
    't.k': glassdoorApiKey,
    userip: reqIp,
    useragent: reqUserAgent,
    action: 'employers',
    q: searchTerm,
    pn: 1, // Page number
    ps: 1, // Page size (default is 20)
  });
  let apiRes = await fetch(apiUrl);

  // If we had a bad response, then return nothing
  // DEV: Empty responses are still successful
  //   {status: 200} + {success: true, status: 'OK', response: {'attributionURL': ..., employers: []}
  if (apiRes.status !== 200) {
    throw new Error('Unexpected Glassdoor status (' + apiRes.status + ') for search "' + searchTerm + '". Expected 200');
  }
  let apiJson = await apiRes.json();
  if (apiJson.success !== true) {
    throw new Error('Unexpected Glassdoor success (' + apiRes.success + ') for search "' + searchTerm + '". Expected `success: true`');
  }

  // Unpack our data
  // apiJson = { success: true,
  //   status: 'OK',
  //   jsessionid: '',
  //   response:
  //    { attributionURL: 'https://www.glassdoor.com/Reviews/google-com-reviews-SRCH_KE0,10.htm',
  //      currentPageNumber: 1,
  //      totalNumberOfPages: 21,
  //      totalRecordCount: 21,
  //      employers: [{ id: 9079,
  //        name: 'Google',
  //        website: 'www.google.com',
  //        isEEP: false,
  //        exactMatch: false,
  //        industry: 'Internet',
  //        numberOfRatings: 10837,
  //        squareLogo: 'https://media.glassdoor.com/sqll/9079/google-squarelogo-1441130773284.png',
  //        overallRating: '4.3',
  //        ratingDescription: 'Very Satisfied',
  //        cultureAndValuesRating: '4.2',
  //        seniorLeadershipRating: '3.8',
  //        compensationAndBenefitsRating: '4.3',
  //        careerOpportunitiesRating: '4.1',
  //        workLifeBalanceRating: '4.1',
  //        recommendToFriendRating: 87,
  //        sectorId: 10013,
  //        sectorName: 'Information Technology',
  //        industryId: 200063,
  //        industryName: 'Internet',
  //        featuredReview: {...}
  //        ceo: { name: 'Sundar Pichai',
  //          title: 'CEO',
  //          numberOfRatings: 3496,
  //          pctApprove: 93,
  //          pctDisapprove: 7,
  //          image: {...} } }
  if (apiJson.response.employers.length === 0) {
    return null;
  }
  let employer = apiJson.response.employers[0];
  return {
    search: {
      url: apiJson.response.attributionURL
    },
    profile: Object.assign({
      // https://www.glassdoor.com/Overview/Working-at-Google-EI_IE9079.11,17.htm
      // DEV: We removed `11,17` as multiple numbers seem to work including none
      url: 'https://www.glassdoor.com/Overview/Working-at-' + encodeURIComponent(employer.name) +
        '-EI_IE' + encodeURIComponent(employer.id) + '.htm',
    }, employer)
  };
};

// If we're being run directly, then run a search
// DEV: We need to run `export $(cat .env | xargs)` first to get our environment variables
if (require.main === module) {
  // DEV: Request info pulled from `console.log(req)` in `now dev`
  exports.findFirstCompany({
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
  }, 'google.com')
  .then(console.info);
}
