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
  max-width: 23px;
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
          <svg class="global-richy-logo" width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8287 9.50857C22.3383 12.3856 20.8766 14.569 18.4437 16.0586C18.0114 16.3233 17.7968 16.8508 17.9646 17.3319L20.5145 24.6453C20.7452 25.307 20.2583 26 19.5627 26H14.3509C13.9146 26 13.5278 25.7172 13.3921 25.2991L11.1948 18.5294C11.0591 18.1113 10.6722 17.8286 10.2359 17.8286H9.45556C8.96629 17.8286 8.54755 18.1825 8.46214 18.6683L7.32078 25.1603C7.23538 25.646 6.81664 26 6.32737 26H1.00918C0.381578 26 -0.0937267 25.4284 0.0157443 24.8053L4.22603 0.839849C4.31138 0.354031 4.73015 0 5.21947 0H14.6878C17.3646 0 19.5134 0.903809 21.1342 2.71143C22.755 4.49428 23.3198 6.76 22.8287 9.50857ZM11.3713 6.83429C10.882 6.83429 10.4631 7.18843 10.3779 7.67435L9.88763 10.4683C9.77831 11.0914 10.2536 11.6629 10.8811 11.6629H12.6986C13.4108 11.6876 14.0125 11.4895 14.5036 11.0686C15.0193 10.6476 15.3386 10.0533 15.4614 9.28571C15.5842 8.5181 15.4614 7.92381 15.093 7.50286C14.7492 7.05714 14.2089 6.83429 13.4722 6.83429H11.3713Z" fill="#FFD12F">
            </path>
          </svg>
        </div>
      </div>
      `}}
    />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
