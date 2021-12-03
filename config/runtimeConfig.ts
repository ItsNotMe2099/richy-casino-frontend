import getConfig from 'next/config'

interface IRuntimeConfig {
  HOST: string
  NODE_ENV: 'development' | 'production'
  DEV: boolean
  PROD: boolean
}

function getRuntimeConfig(): IRuntimeConfig {
  const { publicRuntimeConfig } = getConfig()
  return publicRuntimeConfig
}

export const runtimeConfig = getRuntimeConfig()
