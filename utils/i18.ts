import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CookiesType} from 'types/enums'
import {SSRConfig} from 'next-i18next'
export const getServerSideTranslation = (context): Promise<SSRConfig> => {
  return serverSideTranslations(context.req.cookies[CookiesType.Language] ?? context.locale ?? 'en', ['common'])
}
