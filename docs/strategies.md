# Strategies
Here are the various strategies we've considered for [ingoodcompany.info][]:

[ingoodcompany.info]: https://ingoodcompany.info/

- Search by company name
  - Very poor results when names are frequently shared/similar and we're using first result (e.g. Aero, Signal)
- Search by company name then use search for similar logos on sites
  - Overly complex, seems like it would work in practice though
- Search by company website on search engine (e.g. `underdog.io site:angel.co`) (best)
  - So damn simple, works so well. Main concern is blowing through rate limits
