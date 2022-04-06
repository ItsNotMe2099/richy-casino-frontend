import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  amount: number
  currency: string
  type: 'win' | 'lose' | 'bet'
}

export default function ChessGameAmountColumn(props: Props) {
 return ( <div className={classNames(styles.root, {[styles.green]: ['win', 'bet'].includes(props.type), [styles.red]: props.type === 'lose'})}>
   <span className={styles.amount}>{props.type !== 'bet' ? '+' : ''}{props.amount}</span>&nbsp;<span className={styles.currency}> {(props.currency ?? 'btc'.toUpperCase())}</span>
 </div>)
}
