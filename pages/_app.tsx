import 'normalize.css'
import '../scss/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { setConfiguration } from 'react-grid-system'
import { AppWrapper } from 'context/state'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getSelectorsByUserAgent } from 'react-device-detect'
import App from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  setConfiguration({
    gutterWidth: 20,
    breakpoints: [700, 950, 1360],
    containerWidths: [950, 960, 1320],
  })

  return (
    <AppWrapper isMobile={pageProps.isMobile}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {   
  const props = await App.getInitialProps(appContext)   
  const ua = appContext.ctx.req?.headers['user-agent'] 
  if (ua) {     
    const { isMobile } = getSelectorsByUserAgent(ua)     
    props.pageProps.isMobile = isMobile   
  } 
  else {     
    props.pageProps.isMobile = false   
  }     
  return props 
}

export default appWithTranslation(MyApp)
