import 'normalize.css'
import '../scss/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { AppWrapper } from 'context/state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import App from 'next/app'
import ModalContainer from 'components/layout/Modals'
import { AuthWrapper } from 'context/auth_state'
import { CookiesType } from 'types/enums'
import AuthUserFeatures from 'components/layout/AuthUserFeatures'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-input-range/lib/css/index.css'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-phone-number-input/style.css'
import NotificationBanner from 'components/for_pages/Common/NotificationBanner'
import HiddenXs from 'components/ui/HiddenXS'
import UserRepository from 'data/repositories/UserRepository'
import Snackbar from 'components/layout/Snackbar'
import { useEffect, useState } from 'react'
import { FavoriteWrapper } from 'context/favorite_state'
import nookies from 'nookies'
import { v4 as uuidv4 } from 'uuid'
import { CookiesLifeTime } from 'types/constants'
import BottomSheetContainer from 'components/bottom_sheet/BottomSheetContainer'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import ReactPWAInstallProvider from 'context/pwa_state'
import { TournamentWrapper } from '../context/tournament_state'
const PageLoader = () => {

}
function MyApp({ Component, pageProps }: AppProps) {
  const [clientVisible, setClientVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {

    if (pageProps.language !== i18n.language) {
      i18n.changeLanguage(pageProps.language)
    }
    setTimeout(() => {
      //  setIsLoading(false)
    }, 1000)
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      console.log('registerServiceWorker')
      navigator.serviceWorker.register('/pwabuilder-sw.js', { scope: './' })
    }
    if (typeof window !== 'undefined') {
      const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
      }
      appHeight()
      window.addEventListener('resize', appHeight)
    }
  }, [])

  return (
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} initialUser={pageProps.initialUser}>
      <AuthWrapper>
        <FavoriteWrapper>
          <TournamentWrapper>
            <ReactPWAInstallProvider enableLogging>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="twitter:title" content={t('seo_twitter_title')}/>
                <meta name="twitter:description" content={t('seo_twitter_description')}/>
                <meta name="keywords" content={t('seo_keywords')}/>
              </Head>
              <DefaultSeo
                title={t('seo_title')}
                defaultTitle={t('seo_default_title')}
                description={t('seo_description')}
                openGraph={{
                  title: t('seo_og_title'),
                  description: t('seo_og_description'),
                  site_name: t('seo_og_site_name'),
                  type: 'website',
                  locale: 'en_US',
                  url: 'https://richy.casino/',
                }}/>
              <Component {...pageProps} />
              {clientVisible && <ModalContainer />}
              {clientVisible && <BottomSheetContainer />}
            </ReactPWAInstallProvider>
          </TournamentWrapper>
        </FavoriteWrapper>

        {clientVisible && <AuthUserFeatures />}
        <HiddenXs>
          <NotificationBanner />
        </HiddenXs>

      </AuthWrapper>
      {clientVisible && <Snackbar />}
       </AppWrapper >
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent
  let ppDetails: any = {
    clickid: appContext.ctx.query.clickid,
    sub1: appContext.ctx.query.sub1,
    sub2: appContext.ctx.query.sub2,
    sub3: appContext.ctx.query.sub3,
    sub4: appContext.ctx.query.sub4,
    sub5: appContext.ctx.query.sub5,
    sub6: appContext.ctx.query.sub6,
    pid: appContext.ctx.query.pid,
    promocode: appContext.ctx.query.promocode
  }
   ppDetails = Object.fromEntries(Object.entries(ppDetails).filter(([_, v]) => v != null && !!v))
   if (Object.keys(ppDetails).length > 0) {
    nookies.set(appContext.ctx, CookiesType.ppDetails, JSON.stringify(ppDetails), {
      maxAge: CookiesLifeTime.ppDetails * 60 * 60 * 24,
      path: '/',
    })
  }
  if (ua) {
    const { isMobile } = getSelectorsByUserAgent(ua)
    props.pageProps.isMobile = isMobile
  }
  else {
    props.pageProps.isMobile = false
  }
  if ((appContext.ctx.req as any)?.cookies) {
    if (!(appContext.ctx.req as any).cookies[CookiesType.sessionId]) {
      const sessionId = uuidv4()

      nookies.set(appContext.ctx, CookiesType.sessionId, sessionId, {
        maxAge: CookiesLifeTime.sessionId * 60 * 60 * 24,
        path: '/',
      });
      (appContext.ctx.req as any).cookies[CookiesType.sessionId] = sessionId

    }
    props.pageProps.language = (appContext.ctx as any).req.cookies[CookiesType.language]
    props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    props.pageProps.initialUser = await UserRepository.getUser(props.pageProps.token)

    if (props.pageProps.initialUser === null) {
      props.pageProps.token = null
      nookies.destroy(appContext.ctx, CookiesType.accessToken)
    }
  }
  return props
}

export default appWithTranslation(MyApp, nextI18NextConfig)
