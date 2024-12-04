# ingoodcompany.info [![Build status](https://circleci.com/gh/twolfson/ingoodcompany.info/tree/master.svg?style=svg)](https://circleci.com/gh/twolfson/ingoodcompany.info/tree/master)

Website to research potential employers, [ingoodcompany.info][]

This was an invaluable piece of [findwork.co][] that we wanted to preserve despite shutting down the broader site. It helps to quickly surface company compatibility information

[ingoodcompany.info]: https://ingoodcompany.info/
[findwork.co]: https://web.archive.org/web/20180829191029/https://findwork.co/

## Getting started
To run our staging server locally, run the following:

```bash
# Clone the repository
git clone https://github.com/twolfson/ingoodcompany.info
cd ingoodcompany.info

# Install our dependencies
yarn install

# Create a `.env` file based on our example
#   Sorry, no secrets provided =(
cp .env.example .env
pico .env

# Run the Vercel server locally
yarn start
# Ready! Available at http://localhost:3000
```

The server should be accessible via your browser at <http://localhost:3000/>

## Documentation
### Architecture
We built `ingoodcompany.info` on top of [Vercel][], a serverless platform with good tooling and low friction setup

In addition to this, we have the following setup and have made the following choices:

- `browser/` is public facing assets (e.g. images, CSS)
- `server/` is server-run code (e.g. models, controllers)
  - JavaScript version is ES2017 due to its support for `async`, `await`, and template strings which we're trying out for visually simpler code
- There is no database, we're relying strictly on CDN caching to align with third party rate limit expectations
  - This may eventually require a database and queue system but we're trying to see if lower effort is tolerable for now
- CI is done via [CircleCI][] which allows for easy debugging via SSH
- Analytics is done via Mixpanel, chosen to see if it's an improvement over Google Analytics
  - We have analytics in general to get insight into visitor counts and site usage

[Vercel]: https://vercel.com/
[CircleCI]: http://circleci.com/

### Development
As of May 31 2019, `vercel dev` doesn't cache-bust consistently. As a result, we use an `express` server with restarts powered by `nodemon` for development

To run our development server, run the following:

```bash
yarn run start-dev
# Server listening at http://localhost:3001/
```

The server should be accessible via your browser at <http://localhost:3001/>

### Environment variables and secrets
To add a new environment variable:

- For development, add to `.env` (e.g. `MY_ENV_VAR=foo`)
  - This will not be uploaded to production based on our testing
- For production, add the secret via [Vercel's UI](https://vercel.com/docs/projects/environment-variables/managing-environment-variables#declare-an-environment-variable)
- Relevant documentation
  - https://vercel.com/docs/projects/environment-variables

### Updating favicons
Favicons are maintained via <https://realfavicongenerator.net/> with `resources/favicon.svg`

Follow the instructions provided by the website

### Releasing
To perform a release, run the following:

```bash
# If this is your first release, then login to `vercel` and install `foundry.cli`
./node_modules/.bin/vercel login
npm install -g foundry.cli

# Update the changelog
pico CHANGELOG.md

# Perform a release
foundry release <version>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `yarn run lint` and test via `yarn test`.

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me

## Unlicense
As of May 29 2019, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
