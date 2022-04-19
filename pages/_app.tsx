import 'normalize.css'
import '../scss/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
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
import NotificationBanner from 'components/for_pages/Common/NotificationBanner'
import HiddenXs from 'components/ui/HiddenXS'
import UserRepository from 'data/repositories/UserRepository'
function MyApp({ Component, pageProps }: AppProps) {
  setConfiguration({
    gutterWidth: 20,
    //breakpoints: [700, 950, 1360],
    //containerWidths: [950, 960, 1320],
  })
  return (
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} initialUser={pageProps.initialUser}>
      <AuthWrapper>
        <Component {...pageProps} />
        <ModalContainer/>
        <AuthUserFeatures/>
        <HiddenXs>
          <NotificationBanner/>
        </HiddenXs>
      </AuthWrapper>
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
  if ((appContext.ctx.req as any).cookies) {
    props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    props.pageProps.initialUser = await UserRepository.getUser(props.pageProps.token)
  }
  return props
}

export default appWithTranslation(MyApp)
