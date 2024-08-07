import 'normalize.css'
import '../scss/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { AppWrapper } from 'context/state'
import {getSelectorsByUserAgent, isSafari} from 'react-device-detect'
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
import Snackbar from 'components/layout/Snackbar'
import {useEffect, useRef, useState} from 'react'
import { FavoriteWrapper } from 'context/favorite_state'
import nookies from 'nookies'
import { v4 as uuidv4 } from 'uuid'
import { CookiesLifeTime } from 'types/constants'
import BottomSheetContainer from 'components/bottom_sheet/BottomSheetContainer'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import ReactPWAInstallProvider from 'context/pwa_state'
import { TournamentWrapper } from '../context/tournament_state'
import ErrorBoundary from 'components/ui/ErrorBoundary'
import {useRouter} from 'next/router'
import App, {AppContext} from 'next/app'
import {getLangFromHeader} from 'utils/language'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {LANGS} from 'types/langs'
const PageLoader = () => {

}

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

const getToken = () => {
  const cookies =  nookies.get(null) ?? {}
  return cookies[CookiesType.accessToken]
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [clientVisible, setClientVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { t, i18n } = useTranslation()
  const currentLangLoaded = useRef(false)

  useEffect(() => {


    setTimeout(() => {
      //  setIsLoading(false)
    }, 1000)
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && !isSafari) {
       navigator.serviceWorker.register('/pwabuilder-sw.js?v2', { scope: './' })
    }
    if (typeof window !== 'undefined') {
      const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
      }
      appHeight()
      window.addEventListener('resize', appHeight)
      if(pageProps.isMobile){
        document.body.classList.add('mobile-ua')
        document.documentElement.className = 'mobile-ua'
      }
    }

  }, [])
  useEffect(() => {
    (window as any).i18n = i18n
    if(i18n.language) {
      i18n.reloadResources( i18n.language, ['common'])
    }
  }, [])


  return (
    <AppWrapper isMobile={pageProps.isMobile} token={getToken()} initialUser={pageProps.initialUser}>
      <AuthWrapper>
        <FavoriteWrapper>
          <TournamentWrapper>
            <ReactPWAInstallProvider enableLogging>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
                <meta name="twitter:title" content={t('seo_twitter_title')}/>
                <meta name="twitter:description" content={t('seo_twitter_description')}/>
                <meta name="keywords" content={t('seo_keywords')}/>
                <meta prefix="og: http://ogp.me/ns#" />
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
                  url: 'https://richy.casino',
                  images: [
                    {
                      url: 'https://richy.casino/img/og_image.jpg',
                      width: 578,
                      height: 578,
                      type: 'image/jpeg',
                    },
                  ],

                }}/>
              <Component {...pageProps} />
              {clientVisible && <ErrorBoundary><ModalContainer /></ErrorBoundary>}
              {clientVisible && <ErrorBoundary><BottomSheetContainer /></ErrorBoundary>}
            </ReactPWAInstallProvider>
          </TournamentWrapper>
        </FavoriteWrapper>
        {clientVisible && <ErrorBoundary><AuthUserFeatures /></ErrorBoundary>}
        <HiddenXs>
          <ErrorBoundary><NotificationBanner /></ErrorBoundary>
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
    const { isMobile, isTablet } = getSelectorsByUserAgent(ua)
    const data = getSelectorsByUserAgent(ua)
    if(isTablet && typeof window !== 'undefined' && window.screen.width >= 1024){

      props.pageProps.isMobile = false
    }else{
      props.pageProps.isMobile = isMobile
    }

  }
  else {
    props.pageProps.isMobile = false
  }

  if ((appContext.ctx.req as any)) {
    const acceptLang = getLangFromHeader(appContext.ctx.req.headers['accept-language'])
    const cookies = nookies.get(appContext.ctx)
    const cookie = cookies[CookiesType.language]
    if (!(appContext.ctx.req as any).cookies[CookiesType.sessionId]) {
      const sessionId = uuidv4()

      nookies.set(appContext.ctx, CookiesType.sessionId, sessionId, {
        maxAge: CookiesLifeTime.sessionId * 60 * 60 * 24,
        path: '/',
      });
      (appContext.ctx.req as any).cookies[CookiesType.sessionId] = sessionId

    }

    const prop = await serverSideTranslations( LANGS.includes(cookie ?? acceptLang) ? (cookie ?? acceptLang) :  'en', ['common'])
    props.pageProps = {...props.pageProps,...prop}

  }else{
    const acceptedLang = getLangFromHeader(navigator.language)
    const cookies = nookies.get(null)
    const cookie = cookies[CookiesType.language]

    //globalI18n.state
    props.pageProps = {...props.pageProps,   _nextI18Next: {
        initialI18nStore:      (window as any)?.i18n?.store?.data,
        initialLocale: LANGS.includes(cookie ?? acceptedLang) ? (cookie ?? acceptedLang) :  'en',
        ns: [ 'common' ],
        userConfig: null
      }
    }
  }


  return props
}



export default appWithTranslation(MyApp, nextI18NextConfig)
