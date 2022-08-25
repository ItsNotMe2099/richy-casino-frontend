import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {CookiesType} from 'types/enums'
import {SSRConfig} from 'next-i18next'
import getLangFromRequest from 'utils/language'
export const getServerSideTranslation = (context): Promise<SSRConfig> => {
  const acceptLang = context.req ? getLangFromRequest(context.req) : null
  return serverSideTranslations(context.req?.cookies[CookiesType.language] ?? acceptLang ?? context.locale ?? 'en', ['common'])
}
