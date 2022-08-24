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
