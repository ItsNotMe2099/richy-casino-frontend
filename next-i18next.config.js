/*const ChainedBackend = require('i18next-chained-backend')
const FSBackend = require('i18next-fs-backend/cjs')
const LocizeBackend = require('i18next-locize-backend/cjs')

const locizeOptions = {
  projectId: 'e49d82a2-9ff5-4788-8767-e0fb830c4fcc',
  ...(process.env.NODE_ENV === 'development' ? { apiKey: '85e9e05e-08e7-49d0-8593-84624f4e42b2'} : {}),
  version: 'latest'
}

module.exports = {
  debug: true,
  i18n: {
    defaultNS: 'common',
    defaultLocale: 'en',
    fallbackLng: ['en', 'ru'],
    otherLanguages: ['ru'],
    locales: ['en', 'ru', 'ru-RU'],
    localeDetection: false,
  },
...(process.env.NODE_ENV === 'production'  || process.env.NODE_ENV === 'development' ? {

  backend: {
  ...locizeOptions,
    referenceLng: 'ru'
  },
  serializeConfig: false,
  use: [
    require('i18next-locize-backend/cjs')
  ],
  ns: ['common'],
} : {
  backend: {
    backends: [
      FSBackend,
      LocizeBackend
    ],
    backendOptions: [{ // make sure public/locales_cache/en and public/locales_cache/de exists
      loadPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      addPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      expirationTime: 60 * 30 * 1000 // all 60 minutes the cache should be deleted
    }, {
      ...locizeOptions,
      referenceLng: 'en'
    }]
  },
  use: [ChainedBackend],
  ns: ['common', 'footer', 'second-page'],
}),

}
*/
const allLangs = ['en', 'ru',
  'uz',
  'az',
  'tr',
  'hi',
  'fa',
  'uk',
  'kk',
  'es',
  'fr',
  'hy',
  'pt-BR',
  'th',
  'vi',
  'es-MX',
  'es-CL',
  'es-PE',
  'pt',
  'be',
  'cs-CZ',
  'pl',
  'ro',
  'bn',
  'hu-HU',
  'fi-FI',
  'ne',
  'sw',
  'de',
  'it']

const HttpBackend = require('i18next-http-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'
module.exports = {
  debug: false,
  backend: {
    backendOptions: [{ expirationTime: 60 * 60 * 1000 }, {}], // 1 hour
    backends: isBrowser ? [LocalStorageBackend, HttpBackend]: [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
  i18n: {
    defaultLocale: 'en',
    locales: [...allLangs],
    localeDetection: false,
  },
}


