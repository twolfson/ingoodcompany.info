# ingoodcompany.info [![Build status](https://travis-ci.org/twolfson/ingoodcompany.info.svg?branch=master)](https://travis-ci.org/twolfson/ingoodcompany.info)

Website to research potential employers, [ingoodcompany.info][]

[findwork.co][] might be shutting down soon. If that's the case, then we'd like to preserve the company research feature elsewhere as we've found its information to be invaluable during past searches (quickly surfaced compatibility information)

[ingoodcompany.info]: https://ingoodcompany.info/
[findwork.co]: https://findwork.co/

## Getting started
To run our development server locally, run the following:

```bash
# Clone the repository
git clone https://github.com/twolfson/ingoodcompany.info
cd ingoodcompany.info

# Install our dependencies
npm install

# Run the server
npm start
# Ready! Available at http://localhost:3000
```

The server should be accessible via your browser at <http://localhost:3000/>

## Documentation
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
