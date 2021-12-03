import 'normalize.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { AppWrapper } from 'context/state'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default appWithTranslation(MyApp)
