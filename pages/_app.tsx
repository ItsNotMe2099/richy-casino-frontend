import 'normalize.css'
import '../scss/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import SEO from '../next-seo.config'
import { setConfiguration } from 'react-grid-system'
import { AppWrapper } from 'context/state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import App from 'next/app'
import ModalContainer from 'components/layout/Modals'
import { AuthWrapper } from 'context/auth_state'
import {CookiesType} from 'types/enums'
import AuthUserFeatures from 'components/layout/AuthUserFeatures'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-input-range/lib/css/index.css'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import NotificationBanner from 'components/for_pages/Common/NotificationBanner'
import HiddenXs from 'components/ui/HiddenXS'
import UserRepository from 'data/repositories/UserRepository'
import Snackbar from 'components/layout/Snackbar'
import {useEffect, useState} from 'react'
import {FavoriteWrapper} from 'context/favorite_state'
import nookies from 'nookies'
import { v4 as uuidv4 } from 'uuid'
import {CookiesLifeTime} from 'types/constants'
import BottomSheetContainer from 'components/bottom_sheet/BottomSheetContainer'
import Head from 'next/head'
import {DefaultSeo} from 'next-seo'
import ContentLoader from 'components/ui/ContentLoader'
import ReactPWAInstallProvider from 'context/pwa_state'
function MyApp({ Component, pageProps }: AppProps) {
  const [clientVisible, setClientVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    if (typeof  navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/pwabuilder-sw.js', {scope: './'})
    }
  }, [])
  setConfiguration({
    gutterWidth: 20,
    //breakpoints: [700, 950, 1360],
    //containerWidths: [950, 960, 1320],
  })
  return (
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} initialUser={pageProps.initialUser}>
      <AuthWrapper>
        <FavoriteWrapper>
          <ReactPWAInstallProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          </Head>
          <DefaultSeo {...SEO} />
        <Component {...pageProps} />
          {clientVisible && <ModalContainer/>}
          {clientVisible && <BottomSheetContainer/>}
          </ReactPWAInstallProvider>
        </FavoriteWrapper>

        <AuthUserFeatures/>
        <HiddenXs>
          <NotificationBanner/>
        </HiddenXs>
      </AuthWrapper>
      {clientVisible && <Snackbar/>}
      {clientVisible  && <ContentLoader style={'fullscreen'} isOpen={isLoading}/>}
    </AppWrapper>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua =  appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent

  if (ua) {
    const { isMobile } = getSelectorsByUserAgent(ua)
    props.pageProps.isMobile = isMobile
  }
  else {
    props.pageProps.isMobile = false
  }
  if ((appContext.ctx.req as any)?.cookies) {
    if(!(appContext.ctx.req as any).cookies[CookiesType.sessionId]){
      nookies.set(appContext.ctx, CookiesType.sessionId, uuidv4(), {
        maxAge: CookiesLifeTime.sessionId * 60 * 60 * 24 ,
        path: '/',
      })
    }
    props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    props.pageProps.initialUser = await UserRepository.getUser(props.pageProps.token)

    if( props.pageProps.initialUser === null){
      props.pageProps.token = null
      nookies.destroy(appContext.ctx, CookiesType.accessToken)
    }
  }
  return props
}

export default appWithTranslation(MyApp, nextI18NextConfig)
