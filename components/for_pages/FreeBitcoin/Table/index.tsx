import styles from './index.module.scss'
import classNames from 'classnames'
import {format} from 'date-fns'
import {IFreeBitcoinSlot} from 'data/interfaces/IFreeBitcoinSlot'
import {IFreeBitcoinHistory} from 'data/interfaces/IFreeBitcoinHistory'
import {useTranslation} from 'next-i18next'
import Button from 'components/ui/Button'
import ArrowBackSvg from 'components/svg/ArrowBackSvg'
import ContentLoader from 'components/ui/ContentLoader'

interface Props {
  history?: boolean
  items: IFreeBitcoinSlot[] | IFreeBitcoinHistory[]
  onNext?: ()=> void
  onPrev?: () => void
  nextDisabled?: boolean
  prevDisabled?: boolean
  loading?: boolean
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
    <div className={classNames(styles.col, {[styles.last]: props.history})}>
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>


            {props.history && <th colSpan={2} className={classNames(styles.cell, styles.cellHeader, styles.headerHistory)}>
             <div> {t('freebitcoin_last_wins')}</div>
              <div className={styles.nav}>
                <Button type='button' disabled={props.loading} className={classNames(styles.navButton, styles.prev,{[styles.disabled]: props.prevDisabled})} size='submit' background='dark600' onClick={props.onPrev}>   <ArrowBackSvg/></Button>
                <Button type='button'  disabled={props.loading} className={classNames(styles.navButton, styles.next,{[styles.disabled]: props.nextDisabled})} size='submit' background='dark600' onClick={props.onNext}>    <ArrowBackSvg/> </Button>

              </div>
            </th>}
            {!props.history && <>
            <th className={classNames(styles.cell, styles.cellHeader)}>
              {t('freebitcoin_lucky_number')}
            </th>
            <th className={classNames(styles.cell, styles.cellHeader)}>
              <div className={classNames(styles.payout)}>{t('freebitcoin_payout')}</div>
                </th>
            </>}

          </tr>
        </thead>
        <tbody>
        {props.loading && <td className={styles.loaderCell} colSpan={2}><ContentLoader style={'block'} isOpen/> </td>}
        {!props.loading && props.items.map((item, index) =>
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
                <span> {props.history ? formatHistoryCurrency(item)?.toUpperCase() : formatSlotCurrency(item)?.toUpperCase()}</span>
              </div>
            </td>
          </tr>
            )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

