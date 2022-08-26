import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {SSRConfig} from 'next-i18next'
import getLangFromRequest from 'utils/language'
export const getServerSideTranslation = (context): Promise<SSRConfig> => {
  const acceptLang = context.req ? getLangFromRequest(context.req) : null
  console.log('CookieLang', context.locale)
  return serverSideTranslations( context.locale ?? 'en', ['common'])
}
