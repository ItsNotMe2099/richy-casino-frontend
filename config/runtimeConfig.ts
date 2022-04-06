import getConfig from 'next/config'

interface IRuntimeConfig {
  HOST: string
  GAMES_HOST: string
  GAMES_API_SECRET: string
  NODE_ENV: 'development' | 'production'
  DEV: boolean
  PROD: boolean
}

function getRuntimeConfig(): IRuntimeConfig {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() ?? {}
  return publicRuntimeConfig ?? serverRuntimeConfig
}

export const runtimeConfig = getRuntimeConfig()
