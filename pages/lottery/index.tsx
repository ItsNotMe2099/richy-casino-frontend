import PageTitle from 'components/for_pages/Common/PageTitle'
import {useEffect, useState} from 'react'
import styles from 'pages/lottery/index.module.scss'
import Timer from 'components/for_pages/Lottery/Timer'
import Table from 'components/for_pages/Lottery/Table'
import Prizes from 'components/for_pages/Lottery/Prizes'
import BuyTickets from 'components/for_pages/Lottery/BuyTickets'
import Statistics from 'components/for_pages/Lottery/Statistics'
import VisibleXs from 'components/ui/VisibleXS'
import {GetServerSideProps} from 'next'
import {ILotteryBuyResponse, ILotteryRoundCurrent} from 'data/interfaces/ILotteryRound'
import LotteryRepository from 'data/repositories/LotteryRepository'
import {useTranslation} from 'next-i18next'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {getServerSideTranslation} from 'utils/i18'
import {useAppContext} from 'context/state'

export default function Lottery() {
  const {t} = useTranslation()
 const appContext = useAppContext()
  const [currentRound, setCurrentRound] = useState<ILotteryRoundCurrent | null>(null)
  const [loading, setLoading] = useState(true)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    Promise.all([
      LotteryRepository.fetchCurrentActiveRound().then(i => {
        setCurrentRound(i)
        setLoading(false)
      }),
    ]).then(() => setLoading(false))
  }, [appContext.auth])
  const handleBuy = async (data: ILotteryBuyResponse) => {
    console.log('handleBuy', data)
    setCurrentRound(round => ({...round,
      ...(data.roundInfo ? {totalTickets: data.roundInfo.totalTicketsInRound ?? 0} : {}),
        ...(round.currentUserInfo.ticketsCount ? {currentUserInfo: {...round.currentUserInfo, ticketsCount: round.currentUserInfo.ticketsCount - 1}} : {} )
    }))
    LotteryRepository.fetchCurrentActiveRound().then(i => {
      setCurrentRound(i)
    })
  }

  return (
    <WithGameFilterLayout>
        <PageTitle icon='/img/Lottery/lottery.svg' title={t('lottery_title')} onClick={() => isShow ? setIsShow(false) : setIsShow(true)} lottery/>
      {!loading && currentRound?.roundEndTime && <><Timer roundId={currentRound.roundId} expiredAt={new Date(currentRound?.roundEndTime)}/>
        <VisibleXs>
          <Statistics className={styles.statistics}
                      yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                      winChance={currentRound?.currentUserInfo?.chancePercent}
                      totalTickets={currentRound?.totalTickets}
          />
        </VisibleXs>
        <div className={styles.row}>
          <BuyTickets  yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                       winChance={currentRound?.currentUserInfo?.chancePercent}
                       totalTickets={currentRound?.totalTickets}
                       pricePerTicket={parseFloat(currentRound?.ticketCost?.amount as string)}
                       currency={currentRound?.ticketCost?.currencyIso}
                       onBuy={handleBuy}
          />
          <Prizes slots={currentRound?.slots}/>
        </div>
      {currentRound && <Table roundId={currentRound.roundId}/>}
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
