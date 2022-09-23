// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN || 'https://f806b6ce9e80463d8395984c109166e9@o1232066.ingest.sentry.io/6684045',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
})
