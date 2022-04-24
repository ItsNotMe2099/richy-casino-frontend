import styles from './index.module.scss'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'


interface Props {
  selected?: boolean
  limit?: number
}
export const CryptoCurrencyIcons = (props: Props) => {
  const context = useAppContext()
  const currencies = context.currencies.filter(i => i.flags.isCrypto)
  const limit = props.limit ?? 3
  const mainColor = props.selected ? '#628CFF' : '#373945'
  const iconColor = props.selected ? '#fff' : '#cacaca'

  return (
    <div className={classNames(styles.root, {[styles.selected]: props.selected})}>
      {(currencies.length > limit ? currencies.slice(0, limit) : currencies).map(i => <div key={i.iso} className={styles.card}><CurrencySvg className={styles.icon} currencyIso={i.iso}/></div>)}
      {currencies.length > limit && <div className={classNames(styles.card, styles.number)}>+{currencies.length - limit}</div>}
    </div>
  )
}
