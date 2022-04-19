import styles from './index.module.scss'
import classNames from 'classnames'
import { Col } from 'react-grid-system'
import {format} from 'date-fns'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {IFreeBitcoinSlot} from 'data/interfaces/IFreeBitcoinSlot'
import {IFreeBitcoinHistory} from 'data/interfaces/IFreeBitcoinHistory'
import {useTranslation} from 'next-i18next'

interface Props {
  history?: boolean
  items: IFreeBitcoinSlot[] | IFreeBitcoinHistory[]
}

export default function Table(props: Props) {
  const {t} = useTranslation()
  const formatHistory = (item: IFreeBitcoinHistory) => {
    return format(new Date(item.unixtimestamp), 'dd.MM.yyyy hh:mm')
  }
  const formatSlot = (item: IFreeBitcoinSlot) => {
    if(item.maxNumber && item.minNumber){
      return `${item.minNumber} - ${item.maxNumber}`
    }else{
      return item.minNumber || item.maxNumber
    }
  }

  const formatHistoryAmount = (item: IFreeBitcoinHistory) => {
    return item.moneyAmount
  }
  const formatHistoryCurrency = (item: IFreeBitcoinHistory) => {
    return item.moneyCurrency
  }

  const formatSlotAmount = (item: IFreeBitcoinSlot) => {
    return item.sumWinning
  }
  const formatSlotCurrency = (item: IFreeBitcoinSlot) => {
    return item.currency
  }

  return (
    <Col className={classNames(styles.col, {[styles.last]: props.history})}>
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.cell}>
              {props.history ? t('freebitcoin_last_wins'): t('freebitcoin_lucky_number')}
            </th>
            <th className={styles.cell}>
              {!props.history ? <div className={classNames(styles.text, styles.payout)}>{t('freebitcoin_payout')}</div> : null}
            </th>
          </tr>
        </thead>
        <tbody>
        <Scrollbars className={styles.scroll}>
        {props.items.map((item, index) =>
          <tr className={classNames(styles.row, styles.rowInner)} key={index}>
            {props.history ? <td className={styles.cell}>
                <div className={classNames(styles.text, {[styles.date]: true})}>
                  {formatHistory(item)}
                </div>
              </td>
              :
              <td className={styles.cell}>
              <div className={classNames(styles.text)}>
                {formatSlot(item)}
              </div>
            </td>}
            <td className={classNames(styles.cell, {[styles.cellPayout]: props.history})}>
              <div className={styles.text}>
                {props.history ? formatHistoryAmount(item) : formatSlotAmount(item)}
                <span>{props.history ? formatHistoryCurrency(item)?.toUpperCase() : formatSlotCurrency(item)?.toUpperCase()}</span>
              </div>
            </td>
          </tr>
            )}
          </Scrollbars>
        </tbody>
      </table>
    </div>
    </Col>
  )
}

