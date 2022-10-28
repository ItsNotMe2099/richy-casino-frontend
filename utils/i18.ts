import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {SSRConfig} from 'next-i18next'
import {GetServerSidePropsContext, PreviewData} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {getLangFromHeader} from 'utils/language'
import {CookiesType} from 'types/enums'
export const getServerSideTranslation = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>): Promise<SSRConfig> => {
  const acceptLang = getLangFromHeader(context.req.headers['accept-language'])
  const cookie = context.req.cookies[CookiesType.language]
  return serverSideTranslations( cookie ?? acceptLang ?? context.locale ?? 'en', ['common'])
}
export const getStaticPropsTranslations = (context): Promise<SSRConfig> => {

  return serverSideTranslations( context.locale ?? 'en', ['common'])
}
