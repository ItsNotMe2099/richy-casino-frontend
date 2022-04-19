import Filter from 'components/for_pages/Common/Filter'
import PageTitle from 'components/for_pages/Common/PageTitle'
import Layout from 'components/layout/Layout'
import {useEffect, useState} from 'react'
import { Row, Col } from 'react-grid-system'
import styles from 'pages/lottery/index.module.scss'
import Timer from 'components/for_pages/Lottery/Timer'
import Table from 'components/for_pages/Lottery/Table'
import Prizes from 'components/for_pages/Lottery/Prizes'
import BuyTickets from 'components/for_pages/Lottery/BuyTickets'
import Statistics from 'components/for_pages/Lottery/Statistics'
import VisibleXs from 'components/ui/VisibleXS'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {ILotteryRound, ILotteryRoundCurrent} from 'data/interfaces/ILotteryRound'
import LotteryRepository from 'data/repositories/LotteryRepository'
import {useTranslation} from 'next-i18next'

export default function Lottery() {
  const {t} = useTranslation()
  const games = [

  ]
  const [currentRound, setCurrentRound] = useState<ILotteryRoundCurrent | null>(null)
  const [round, setRound] = useState<ILotteryRound | null>(null)
  const [loading, setLoading] = useState(true)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    Promise.all([
      LotteryRepository.fetchRound().then(i => setRound(i)),
      LotteryRepository.fetchCurrentActiveRound().then(i => setCurrentRound(i)),
    ]).then(() => setLoading(false))
  }, [])
  const someDate = '2023-12-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  const topWinners = [
    {number: 1, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 2, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 3, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 4, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 5, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 6, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 7, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 8, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 9, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
    {number: 10, id: 45116113, amount: 0.00051566123, tickets: '21,451'},
  ]

  return (
    <Layout>
      <Row>
      <Filter state={isShow} onClick={() => setIsShow(false)}/>
      <Col className={styles.content}>
        <PageTitle icon='/img/Lottery/lottery.svg' title={t('lottery_title')} onClick={() => isShow ? setIsShow(false) : setIsShow(true)} lottery/>
        <Timer expiredAt={expiredAt}/>
        <VisibleXs>
          <Statistics className={styles.statistics}
                      yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                      winChance={currentRound?.currentUserInfo?.chancePercent}
                      totalTickets={currentRound?.totalTicketsCount}
          />
        </VisibleXs>
        <Row className={styles.row}>
          <BuyTickets  yourTicket={currentRound?.currentUserInfo?.ticketsCount}
                       winChance={currentRound?.currentUserInfo?.chancePercent}
                       totalTickets={currentRound?.totalTicketsCount}/>
          <Prizes/>
        </Row>
        <Table items={topWinners}/>
      </Col>
      </Row>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
