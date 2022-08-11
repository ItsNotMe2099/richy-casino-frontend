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
          <link rel="canonical" href="https://richy.casino/"/>
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
          <link rel="alternate" hrefLang="x-default" href="https://richy.casino/" />
          <link rel="alternate" hrefLang="en" href="https://richy.casino/" title="English" />
          <link rel="alternate" hrefLang="en-US" href="https://richy.casino/" title="English (USA)" />
          <link rel="alternate" hrefLang="ru" href="https://richy.casino/ru" title="Русский" />
          <link rel="alternate" hrefLang="de" href="https://richy.casino/de" title="German" />
        </Head>
        <body>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-421XSKMJH2"
        />
        <script style={{display: 'none'}} async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-login="richygames_bot" data-size="small" data-userpic="false" ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-421XSKMJH2');

            `,
          }}
        />
        <div
      dangerouslySetInnerHTML={{__html: `
      <style type='text/css'>
      .global-page-loader{
        display: flex;
        position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background: #14151B;
    z-index: 40;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out;
        opacity:1;
}
.global-richy-loader{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.global-spinner{
  font-size: 0;
}
.global-richy-logo{
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  z-index: 2;
  background-color: transparent;
  filter: drop-shadow(0px 0px 24px rgba(255, 215, 71, 0.2));

}
@keyframes spinners-react-circular {
  0% { stroke-dashoffset: 306; }
  50% { stroke-dasharray: 40, 134; }
  100% {
    stroke-dasharray: 1, 174;
    stroke-dashoffset: 132;
  }
}
      </style>
      <div class="global-page-loader" id="global-page-loader">
        <div class="global-richy-loader">
          <div class="global-spinner">
            <svg fill="none" style="color:#427BF8;overflow:visible;width:92px" viewBox="0 0 66 66">
              <circle cx="33" cy="33" fill="none" r="28" stroke="rgba(66,123,248,0.2)" stroke-width="7.2"></circle>
              <circle cx="33" cy="33" fill="none" r="28" stroke="currentColor" stroke-dasharray="1, 174" stroke-dashoffset="306" stroke-linecap="round" stroke-width="7.2" style="animation:spinners-react-circular 1.4s linear infinite"></circle>
            </svg>
          </div>
          <div class="global-richy-logo"><span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;"><span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;"><img alt="" aria-hidden="true" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"></span><img srcset="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=48&amp;q=75 1x, /_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=96&amp;q=75 2x" src="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=96&amp;q=75" decoding="async" data-nimg="intrinsic" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;"><noscript></noscript></span></div>

        </div>
      </div>
      `}}
    />

          <Main />
          <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html:'',
          }}
        />
        </body>
      </Html>
    )
  }
}

export default MyDocument
