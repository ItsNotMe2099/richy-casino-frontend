import styles from './index.module.scss'
import classNames from 'classnames'
import Panel from 'components/layout/Panel'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useTranslation} from 'next-i18next'
import {useEffect, useState} from 'react'
import {ILotteryRound} from 'data/interfaces/ILotteryRound'
import LotteryRepository from 'data/repositories/LotteryRepository'
import Formatter from 'utils/formatter'
import Button from 'components/ui/Button'
import ArrowBackSvg from 'components/svg/ArrowBackSvg'



interface Props {
  roundId: number
}

export default function Table(props: Props) {
  const {t} = useTranslation()
  const [round, setRound] = useState<ILotteryRound | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      LotteryRepository.fetchRound(props.roundId <= 1 ? 1 : props.roundId -1).then(i => {
        setLoading(false)
        setRound(i)
      }),
    ]).then(() => setLoading(false))
  }, [])
  const handleNext = () => {

  }
  const handlePrev = () => {

  }
  return (
    <Panel className={styles.panel}>
      {!loading && round && <>
    <div className={styles.root}>
      <div className={styles.header}>
      <div className={styles.title}>
        {t('lottery_top_10')}
      </div>
        <div className={styles.headerRight}>
          <div className={styles.nav}>
            <Button type='button' className={classNames(styles.navButton, styles.prev,{[styles.disabled]: false})} size='submit' background='dark600' onClick={handleNext}>   <ArrowBackSvg/> <span>{t('lottery_top_10_older')}</span></Button>
            <Button type='button' className={classNames(styles.navButton, styles.next,{[styles.disabled]: true})} size='submit' background='dark600' onClick={handlePrev}>   <span>{t('lottery_top_10_newer')}</span>  <ArrowBackSvg/> </Button>

          </div>
          <div className={styles.totalTickets}> {t('lottery_top_10_total_tickets')} {round.totalTickets}</div>
        </div>
      </div>
      <HiddenXs>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>
            №
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_user_id')}
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_amount_won')}
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_tickets')}
          </div>
        </div>
        {round.roundWinners.slice(0, 3).map((item, index) =>
          <div className={classNames(styles.row, styles.rowInner)} key={index}>
            <div className={styles.cell}>
              <div className={styles.text}>
                #{index}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.id}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={classNames(styles.text, styles.amountText)}>
                {item.winAmount}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {Formatter.formatNumber(item.ticketsCount, ',')}
              </div>
            </div>
          </div>
            )}
      </div>
      </HiddenXs>
      <VisibleXs>
      <div className={styles.tableMobile}>
        <div className={styles.row}>
          <div className={styles.cell}>
            №
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_user_id')}
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_amount_won')}
          </div>
          <div className={styles.cell}>
            {t('lottery_top_10_tickets')}
          </div>
        </div>
        {round.roundWinners.map((item, index) =>
          <div className={classNames(styles.row, styles.rowInner)} key={index}>
            <div className={styles.cell}>
              <div className={styles.text}>
                #{item.id}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.id}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={classNames(styles.text, styles.amountText)}>
                {item.winAmount}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {Formatter.formatNumber(item.ticketsCount, ',')}
              </div>
            </div>
          </div>
            )}
      </div>
      </VisibleXs>
    </div>
      </>}
    </Panel>
  )
}

