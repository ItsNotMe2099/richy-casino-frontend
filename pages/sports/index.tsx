import styles from './index.module.scss'
import Layout from 'components/layout/Layout'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import Head from 'next/head'
import {useEffect, useRef, useState} from 'react'
import {IBettingStartResponse} from 'data/interfaces/IBettingStartResponse'
import BettingRepository from 'data/repositories/BetttngRepository'
import ContentLoader from 'components/ui/ContentLoader'
import classNames from 'classnames'
import {ModalType} from 'types/enums'

export default function Betting(){
  const bettingWrapperId = 'betting-wrapper'
  const {t} = useTranslation()

  const appContext = useAppContext()
  const [loading, setLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [betSlipOpened, setBetSlipOpened] = useState(false)
  const betRendererRef = useRef(null)
  const scriptLoaded = useRef<boolean>(false)
  const scriptRef = useRef<any>(null)
  const bettingRef = useRef<IBettingStartResponse | null>(null)
  const initBtRenderer = () => {
    const betting = bettingRef.current
    betRendererRef.current = new (window as any).BTRenderer().initialize({
      brand_id: betting.brandId,
      token: betting.token,
      onTokenExpired: function () {
        alert('Token expired. Please log in again')
      },
      betSlipOffsetTop:  appContext.isMobile ? 0 : 143,
      betSlipOffsetBottom: appContext.isMobile ? 82 : 0,
      stickyTop: appContext.isMobile ? 72: 0,
      themeName: betting.themeName,
      lang: betting.language,
      target: document.getElementById(bettingWrapperId),
      betslipZIndex: 249,
      onRouteChange: function () {

       },
      onLogin: function () {
        appContext.showModal(ModalType.login)
      },
      onRegister: function () {

        appContext.showModal(ModalType.registration)
      },
      onSessionRefresh: function () {
        window.location.reload()
      },
      onBetSlipStateChange:  ({isOpen}: {isOpen: boolean}) => {
        console.log('Bet slip state changed', isOpen)
        if(appContext.isMobile){
          setBetSlipOpened(isOpen)

          betRendererRef.current.updateOptions({
          ...(isOpen ? {
            betSlipOffsetBottom: 0,
          } : {betSlipOffsetBottom: 82})
          })
          if(isOpen){
            document.body.classList.add('modal-open')
          }else{

            document.body.classList.remove('modal-open')
          }
        }
      }
    })
  }
  const killBtRenderer = () => {
    if(betRendererRef.current){
      betRendererRef.current.kill()
    }
  }
  const init = async () => {
    const betting =  await BettingRepository.start()
    bettingRef.current = betting
    if((window as any).BTRenderer){
      initBtRenderer()
    }else{
      const script = document.createElement('script')
      scriptRef.current = script
      script.src = betting.scriptUrl
      script.async = true
      script.onload = () => {
        scriptLoaded.current = true
        setLoading(false)
        initBtRenderer()

      }
      document.body.appendChild(script)
    }



  }
  useEffect(() => {
    init()
    const subscription1 = appContext.authUpdateState$.subscribe((auth) => {
      killBtRenderer()
      init()
    })
    const subscription2 = appContext.langChangedState$.subscribe((auth) => {
      killBtRenderer()
      init()
    })
    const subscription3 = appContext.mainCurrencyChangedState$.subscribe((auth) => {
      killBtRenderer()
      init()
    })
    return () => {
      subscription1.unsubscribe()
      subscription2.unsubscribe()
      subscription3.unsubscribe()
      if(scriptRef.current) {
        scriptRef.current.onload = null
      }
      killBtRenderer()
    }
  }, [])
  return (
    <Layout hideMenu={appContext.isMobile} fixedHeader={!betSlipOpened && appContext.isMobile}>
      <Head>
        <meta name="twitter:title" content={t('seo_betting_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_betting_twitter_description')}/>
        <meta name="keywords" content={t('seo_betting_keywords')}/>
      </Head>
        <div className={styles.root} >
         <div className={classNames(styles.wrapper, {[styles.hidden]: false})} id={'betting-wrapper'}>
          </div>
          {loading && <ContentLoader style={'block'} isOpen={loading}/>}
        </div>
    </Layout>
  )
}
