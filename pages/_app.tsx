import 'normalize.css'
import '../scss/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { setConfiguration } from 'react-grid-system'
import { AppWrapper } from 'context/state'

function MyApp({ Component, pageProps }: AppProps) {
  setConfiguration({
    gutterWidth: 20,
    breakpoints: [700, 950, 1360],
    containerWidths: [950, 960, 1320],
  })

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default appWithTranslation(MyApp)
