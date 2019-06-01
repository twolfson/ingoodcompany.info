# ingoodcompany.info [![Build status](https://travis-ci.org/twolfson/ingoodcompany.info.svg?branch=master)](https://travis-ci.org/twolfson/ingoodcompany.info)

Website to research potential employers, [ingoodcompany.info][]

[findwork.co][] might be shutting down soon. If that's the case, then we'd like to preserve the company research feature elsewhere as we've found its information to be invaluable during past searches (quickly surfaced compatibility information)

[ingoodcompany.info]: https://ingoodcompany.info/
[findwork.co]: https://findwork.co/

## Getting started
To run our staging server locally, run the following:

```bash
# Clone the repository
git clone https://github.com/twolfson/ingoodcompany.info
cd ingoodcompany.info

# Install our dependencies
npm install

# Create a `.env` file based on `now.json` contents
#   https://zeit.co/docs/v2/deployments/environment-variables-and-secrets
#   Sorry, no secrets provided =(
pico .env

# Run the server
npm start
# Ready! Available at http://localhost:3000
```

The server should be accessible via your browser at <http://localhost:3000/>

## Documentation
### Architecture
We built `ingoodcompany.info` on top of [ZEIT Now][], a serverless platform with good tooling and low friction setup

In addition to this, we have the following setup and have made the following choices:

- `browser/` is public facing assets (e.g. images, CSS)
- `server/` is server-run code (e.g. models, controllers)
- There is no database, we're relying strictly on CDN caching to align with third party rate limit expectations
    - This may eventually require a database and queue system but we're trying to see if lower effort is tolerable for now

[ZEIT Now]: https://zeit.co/now

### Development
`now dev` doesn't cache-bust consistently. As a result, we use an `express` server with restarts powered by `nodemon` for development

To run our development server, run the following:

```bash
npm run start-dev
# Server listening at http://localhost:3001/
```

The server should be accessible via your browser at <http://localhost:3001/>

### Environment variables and secrets
`now` is a bit tricky to work with for environment variables and secrets. To add a new environment variable:

- Add to `.env` for development (e.g. `MY_ENV_VAR=foo`)
  - This nor any similar files will not be uploaded to production based on our testing
- Add to `now.json#env` for production
  - If the environment variable is not a secret, then this will be `MY_ENV_VAR: 'foo'`
  - If the environment variable is a secret, then:
    - Add our secret via `now secrets` (e.g. `now secrets add my_env_var foo`)
    - Use secret in `now.json` via `MY_ENV_VAR: '@my_env_var'`
- Relevant documentation
  - https://zeit.co/docs/v2/deployments/environment-variables-and-secrets

### Updating favicons
Favicons are maintained via <https://realfavicongenerator.net/> with `resources/favicon.svg`

Follow the instructions provided by the website

### Releasing
To perform a release, run the following:

```bash
# If this is your first release, then login to `now` and install `foundry.cli`
./node_modules/.bin/now login
npm install -g foundry.cli

# Update the changelog
pico CHANGELOG.md

# Perform a release
foundry release <version>
```

## Contributing
*Coming soon!*

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me

## Unlicense
As of May 29 2019, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
