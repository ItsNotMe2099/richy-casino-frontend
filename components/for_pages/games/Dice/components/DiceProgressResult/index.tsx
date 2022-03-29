import styles from './index.module.scss'
import cx from 'classnames'

interface Props{
  value: string,
  isWin: boolean
}
export const DiceProgressResult = (props: Props) => {
  const { value } = props
  return (
    <div className={cx(styles.root)}>
      <div className={styles.wrapper}  style={{transform: `translateX(${value}%)`}}>
      <div className={styles.bones}>
        <div className={cx(styles.value, {[styles.red]: !props.isWin, [styles.green]: props.isWin})}>{value}</div>
        <img src={'/img/Games/dice/bones.svg'} className={styles.icon}/>
      </div>
      </div>
    </div>
  )
}
DiceProgressResult.defaultProps = {
}
