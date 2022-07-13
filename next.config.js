const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
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
  },
  images: {
    domains: ['stage-backend.richy.casino', 'api.richy-trk.com'],
    formats: ['image/webp'],
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
