import Document, { Html, Head, Main, NextScript } from 'next/document'
import { colors } from 'scss/variables'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content={colors.dark800} />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
          <link rel="alternate" hrefLang="x-default" href="https://richy.casino/"/>
          <link rel="alternate" hrefLang="en" href="https://richy.casino/" title="English"/>
          <link rel="alternate" hrefLang="en-US" href="https://richy.casino/" title="English (USA)"/>
          <link rel="alternate" hrefLang="ru" href="https://richy.casino/ru" title="Русский"/>
          <link rel="alternate" hrefLang="de" href="https://richy.casino/de" title="German"/>
          </Head>
                  <body>
                    <Main />
                    <NextScript />
                  </body>
                </Html>
                )
  }
}

                export default MyDocument
