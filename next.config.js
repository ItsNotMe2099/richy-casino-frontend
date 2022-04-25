const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    GAMES_HOST: process.env.GAMES_HOST,
    GAMES_API_SECRET: process.env.GAMES_API_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
  },
  serverRuntimeConfig: {
    HOST: process.env.HOST,
    GAMES_HOST: process.env.GAMES_HOST,
    GAMES_API_SECRET: process.env.GAMES_API_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  }
}
