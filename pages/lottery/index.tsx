import PageTitle from 'components/for_pages/Common/PageTitle'
import {useEffect, useRef, useState} from 'react'
import styles from 'pages/lottery/index.module.scss'
import Timer from 'components/for_pages/Lottery/Timer'
import Table from 'components/for_pages/Lottery/Table'
import Prizes from 'components/for_pages/Lottery/Prizes'
import BuyTickets from 'components/for_pages/Lottery/BuyTickets'
import Statistics from 'components/for_pages/Lottery/Statistics'
import VisibleXs from 'components/ui/VisibleXS'
import {ILotteryBuyResponse, ILotteryRoundCurrent} from 'data/interfaces/ILotteryRound'
import LotteryRepository from 'data/repositories/LotteryRepository'
import {useTranslation} from 'next-i18next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {useAppContext} from 'context/state'
import {NextSeo} from 'next-seo'
import ContentLoader from 'components/ui/ContentLoader'
import Head from 'next/head'
import ErrorBoundary from 'components/ui/ErrorBoundary'
import {useInterval} from 'react-use'
import {GetServerSideProps} from 'next'
import {getServerSideTranslation} from 'utils/i18'
export default function Lottery() {
  const {t} = useTranslation()
 const appContext = useAppContext()
  const [currentRound, setCurrentRound] = useState<ILotteryRoundCurrent | null>(null)
  const [loading, setLoading] = useState(true)
  const [isShow, setIsShow] = useState(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    Promise.all([
      LotteryRepository.fetchCurrentActiveRound().then(i => {
        setCurrentRound(i)
        setLoading(false)
        setIsUpdating(false)
      }),
    ]).then(() => setLoading(false)).catch(() => {
      setLoading(false)
      setIsUpdating(false)
    })
  }, [appContext.auth])
  useInterval(() => {
    setIsUpdating(true)
    abortControllerRef.current = new AbortController()

    LotteryRepository.fetchCurrentActiveRound().then(i => {
      setCurrentRound(i)
      setIsUpdating(false)
      abortControllerRef.current = null
    })

  }, isUpdating ? null : 2000)
  const handleBuy = async (data: ILotteryBuyResponse) => {
    setIsUpdating(true)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    LotteryRepository.fetchCurrentActiveRound().then(i => {
      setCurrentRound(i)
      setIsUpdating(false)
    })
  }

  return (
    <WithGameFilterLayout>
      <Head>
        <meta name="twitter:title" content={t('seo_lottery_twitter_title')}/>
        <meta name="twitter:description" content={t('seo_lottery_twitter_description')}/>
        <meta name="keywords" content={t('seo_lottery_keywords')}/>
      </Head>
      <NextSeo
        title={t('seo_lottery_title')}
        description={t('seo_lottery_description')}
        openGraph={{
          title: t('seo_lottery_og_title'),
          description: t('seo_lottery_og_description'),
          site_name: t('seo_lottery_og_site_name'),
          type: 'website',
          locale: 'en_US',
          url: 'https://richy.casino/lottery',
        }}
      />
        <PageTitle icon='/img/Lottery/lottery.svg' title={t('lottery_title')} onClick={() => isShow ? setIsShow(false) : setIsShow(true)} lottery/>
      {loading && <ContentLoader style={'block'} isOpen={true}/>}
      {!loading && currentRound?.roundEndTime && <><Timer roundId={currentRound.roundId} expiredAt={new Date(currentRound?.roundEndTime)}/>
        <VisibleXs>
          <ErrorBoundary>
          <Statistics className={styles.statistics}
                      yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                      winChance={currentRound?.currentUserInfo?.chancePercent}
                      totalTickets={currentRound?.totalTickets}
          />
          </ErrorBoundary>
        </VisibleXs>
        <div className={styles.row}>
          <ErrorBoundary>
          <BuyTickets  yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                       winChance={currentRound?.currentUserInfo?.chancePercent}
                       totalTickets={currentRound?.totalTickets}
                       pricePerTicket={parseFloat(currentRound?.ticketCost?.amount as string)}
                       currency={currentRound?.ticketCost?.currencyIso}
                       onBuy={handleBuy}
          />
          </ErrorBoundary>
          <ErrorBoundary>
          <Prizes slots={currentRound?.slots}/>
          </ErrorBoundary>
        </div>
        {currentRound &&        <ErrorBoundary><Table roundId={currentRound.roundId}/></ErrorBoundary>}
      </>}
    </WithGameFilterLayout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
