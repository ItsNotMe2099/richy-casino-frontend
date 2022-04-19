import styles from './index.module.scss'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import {useTranslation} from 'next-i18next'

interface Props {
  className?: string
  yourTicket: number
  totalTickets: number
  winChance: number
}

export default function Statistics(props: Props) {
  const {t} = useTranslation()
  const TopItem = (prop:{title: string, number: string, className: string, classColor: string}) => {

    return (
      <div className={classNames(styles.item, prop.className)}>
        <div className={classNames(styles.title, prop.classColor)}>
          {prop.title}
        </div>
        <div className={styles.number}>
          {prop.number}
        </div>
      </div>
    )
  }

  return (
  <div className={classNames(styles.root, props.className)}>
    <TopItem title={t('lottery_your_ticket')} number={Formatter.formatNumber(props.yourTicket) ?? '-'} className={styles.your} classColor={styles.blue}/>
    <TopItem title={t('lottery_total_tickets')} number={Formatter.formatNumber(props.totalTickets) ?? '-'} className={styles.total} classColor={styles.green}/>
    <TopItem title={t('lottery_win_chance')} number={`${props.winChance ?? '-'}`} className={styles.win} classColor={styles.orange}/>
  </div>
  )
}

