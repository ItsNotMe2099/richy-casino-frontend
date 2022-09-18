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
          <link rel="mask-icon" href="/safari-pinned-tab.svg?v1" color="#FFD12F" />
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
           <svg fill="none" viewBox="0 0 66 66" style="color: rgb(123, 210, 69); overflow: visible; width: 140px;"><circle cx="33" cy="33" fill="none" r="28" stroke="rgb(123, 210, 69, 0.2)" stroke-width="4.8"></circle><circle cx="33" cy="33" fill="none" r="28" stroke="currentColor" stroke-dasharray="1, 174" stroke-dashoffset="306" stroke-linecap="round" stroke-width="4.8" style="animation: 1.4s linear 0s infinite normal none running spinners-react-circular;"></circle></svg>
          </div>
          <div class="global-richy-logo"><span style="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"><span style="box-sizing:border-box;display:block;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;max-width:100%"><img style="display:block;max-width:100%;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0" alt="" aria-hidden="true" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"></span><img src="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=128&amp;q=75" decoding="async" data-nimg="intrinsic" style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%" srcset="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=128&amp;q=75 2x"><noscript><img srcSet="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=64&amp;q=75 1x, /_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=128&amp;q=75 2x" src="/_next/image?url=%2Fimg%2Flayout%2Flogo_mobile.png&amp;w=128&amp;q=75" decoding="async" data-nimg="intrinsic" style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%" loading="lazy"/></noscript></span></div>

        </div>
      </div>
      `}}
    />

          <Main />
          <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html:`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/628546d9b0d10b6f3e72e8f1/1g3c9ph38';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`,
          }}
        />
        </body>
      </Html>
    )
  }
}

export default MyDocument
