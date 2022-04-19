import styles from './index.module.scss'
import classNames from 'classnames'
import Panel from 'components/layout/Panel'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useTranslation} from 'next-i18next'

interface IWinner {
  number: number
  id: number
  amount: number
  tickets: string
}

interface Props {
  items: IWinner[]
}

export default function Table(props: Props) {
  const {t} = useTranslation()
  return (
    <Panel className={styles.panel}>
    <div className={styles.root}>
      <div className={styles.title}>
        {t('lottery_top_10')}
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
        {props.items.slice(0, 3).map((item, index) =>
          <div className={classNames(styles.row, styles.rowInner)} key={index}>
            <div className={styles.cell}>
              <div className={styles.text}>
                #{item.number}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.id}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={classNames(styles.text, styles.amountText)}>
                {item.amount}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.tickets}
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
            User ID
          </div>
          <div className={styles.cell}>
            Amount won
          </div>
          <div className={styles.cell}>
            Tickets
          </div>
        </div>
        {props.items.map((item, index) =>
          <div className={classNames(styles.row, styles.rowInner)} key={index}>
            <div className={styles.cell}>
              <div className={styles.text}>
                #{item.number}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.id}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={classNames(styles.text, styles.amountText)}>
                {item.amount}
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.text}>
                {item.tickets}
              </div>
            </div>
          </div>
            )}
      </div>
      </VisibleXs>
    </div>
    </Panel>
  )
}

