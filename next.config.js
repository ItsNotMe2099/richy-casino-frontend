const { i18n } = require('./next-i18next.config')
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    GAMES_HOST: process.env.GAMES_HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    FAKE_BONUS: process.env.FAKE_BONUS,
    GAME_CHESS_ID: process.env.GAME_CHESS_ID,
    GAME_POKER_ID: process.env.GAME_POKER_ID,
    GAME_AVIATOR_ID: process.env.GAME_AVIATOR_ID,
    RICHY_PROVIDER_ID: process.env.RICHY_PROVIDER_ID,
  },
  serverRuntimeConfig: {
    HOST: process.env.HOST,
    GAMES_HOST: process.env.GAMES_HOST,
    GAMES_API_SECRET: process.env.GAMES_API_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    GAME_CHESS_ID: process.env.GAME_CHESS_ID,
    GAME_POKER_ID: process.env.GAME_POKER_ID,
    GAME_AVIATOR_ID: process.env.GAME_AVIATOR_ID,
    RICHY_PROVIDER_ID: process.env.RICHY_PROVIDER_ID,
  },
  images: {
    domains: ['api-rc.grtestdemo.com', 'api.richy-trk.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots'
      },
      {
        source: '/manifest.json',
        destination: '/api/manifest'
      },

    ]
  }
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
