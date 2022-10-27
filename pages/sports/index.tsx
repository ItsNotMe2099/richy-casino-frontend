import styles from './index.module.scss'
import Layout from 'components/layout/Layout'
import {NextSeo} from 'next-seo'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import Head from 'next/head'
import {useEffect, useState} from 'react'
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
  const [betting, setBetting] = useState<IBettingStartResponse | null>(null)
  const init = async () => {
    const betting =  await BettingRepository.start()
    console.log('ScriptUrl', betting)
    const script = document.createElement('script')
    script.src = betting.scriptUrl
    script.async = true
    script.onload = () => {
      setLoading(false)
      const bt = new (window as any).BTRenderer().initialize({
        brand_id: betting.brandId,
        token: betting.token,
        onTokenExpired: function () {
          alert('Token expired. Please log in again')
        },
        themeName: betting.themeName,
        lang: betting.language,
        target: document.getElementById(bettingWrapperId),
        betSlipOffsetTop: 0,
        betslipZIndex: 1,
        onRouteChange: function () {
          console.log('Route changed')
        },
        onLogin: function () {
          appContext.showModal(ModalType.login)
        },
        onRegister: function () {

          appContext.showModal(ModalType.registration)
        },
        onSessionRefresh: function () {
          console.log('Session refreshed')
          window.location.reload()
        },
        onBetSlipStateChange: function () {
          console.log('Bet slip state changed')
        }
      })

    }

    document.body.appendChild(script)
    setBetting(betting)

  }
  useEffect(() => {
    init()
  }, [])
  return (
    <Layout>
      <Head>
        <meta name="twitter:title" content={t('seo_betting_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_betting_twitter_description')}/>
        <meta name="keywords" content={t('seo_betting_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_betting_title')}
        description={t('seo_betting_description')}
        openGraph={{
          title: t('seo_betting_og_title'),
          description: t('seo_betting_og_description'),
          site_name: t('seo_betting_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/betting',
        }}
      />
        <div className={styles.root} >
         <div className={classNames(styles.wrapper, {[styles.hidden]: false})} id={'betting-wrapper'}>
          </div>
          {loading && <ContentLoader style={'block'} isOpen={loading}/>}
        </div>
    </Layout>
  )
}
