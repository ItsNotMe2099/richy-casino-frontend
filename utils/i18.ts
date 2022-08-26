import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {SSRConfig} from 'next-i18next'
export const getServerSideTranslation = (context): Promise<SSRConfig> => {
  return serverSideTranslations( context.locale ?? 'en', ['common'])
}
