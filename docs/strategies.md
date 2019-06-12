# Strategies
Here are the various strategies we've considered for [ingoodcompany.info][]:

[ingoodcompany.info]: https://ingoodcompany.info/

- Search by company name
  - Very poor results when names are frequently shared/similar and we're using first result (e.g. Aero, Signal)
- Search by company name then use search for similar logos on sites
  - Overly complex, seems like it would work in practice though
- Search by company website on search engine (e.g. `underdog.io site:angel.co`) (best)
  - So damn simple, works so well. Main concern is blowing through rate limits
  - Sadly can't find an affordable way to do this. Generic web searches cost a decent amount of money (e.g. $5 for 1000 queries (Google); $0.005/query -- for a request with 6 queries, that's $0.03/request. If we get a DoS, then it can easily add up)
    - There are other providers like Yandex which have low request limits (e.g. 50 queries/hour), https://tech.yandex.com/xml/
    - Gigablast might be plausible at $1 for 1000 queries ($0.001/query -> $0.006/request)
- Provide fields for both company name and website so we search by name and attempt to find first match for website
  - Requires API setup with every site, some like Stackshare still don't have this
