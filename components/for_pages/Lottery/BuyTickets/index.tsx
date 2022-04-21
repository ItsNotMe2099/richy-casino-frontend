import styles from './index.module.scss'
import Panel from 'components/layout/Panel'
import BuyTicketsForm from './Form'
import Statistics from '../Statistics'
import HiddenXs from 'components/ui/HiddenXS'
import {useTranslation} from 'next-i18next'
import {ILotteryBuyResponse} from 'data/interfaces/ILotteryRound'

interface Props {
  yourTicket: number
  totalTickets: number
  winChance: number
  pricePerTicket: number
  onBuy: (data: ILotteryBuyResponse) => void
}

export default function BuyTickets(props: Props) {
  const {t} = useTranslation()


  return (
    <div className={styles.root}>
    <Panel className={styles.panel}>
      <HiddenXs>
        <Statistics className={styles.statistics} yourTicket={props.yourTicket} totalTickets={props.totalTickets} winChance={props.winChance}/>
      </HiddenXs>
      <div className={styles.buy}>
        {t('lottery_buy')}
      </div>
      <BuyTicketsForm pricePerTicket={props.pricePerTicket} onBuy={props.onBuy}/>
    </Panel>
    </div>
  )
}

