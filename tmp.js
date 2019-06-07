const assert = require('assert');
const express = require('express');
const app = express();
// const Sentry = require('@sentry/node');
const Raven = require('raven');

const SENTRY_SERVER_DSN = process.env.SENTRY_SERVER_DSN;
assert(SENTRY_SERVER_DSN);
// Sentry.init({ dsn: SENTRY_SERVER_DSN });
Raven.config(SENTRY_SERVER_DSN).install();

// The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler());
app.use(Raven.requestHandler());


// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.get('/debug-sentry', function mainHandler(req, res) {
  // process.nextTick(() => {
    throw new Error('My first Sentry error!');
  // });
});

// The error handler must be before any other error middleware
// app.use(Sentry.Handlers.errorHandler());
app.use(Raven.errorHandler());

app.listen(3000);

