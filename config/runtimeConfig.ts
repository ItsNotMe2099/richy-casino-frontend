import getConfig from 'next/config'

interface IRuntimeConfig {
  HOST: string
  GAMES_HOST: string
  GAMES_API_SECRET: string
  ROBOTS_FILE: string
  NODE_ENV: 'development' | 'production'
  DEV: boolean
  PROD: boolean
  FAKE_BONUS: boolean
  GAME_CHESS_ID: string,
  GAME_POKER_ID: string,
}

function getRuntimeConfig(): IRuntimeConfig {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() ?? {}
  return publicRuntimeConfig ?? serverRuntimeConfig
}

export const runtimeConfig = getRuntimeConfig()
