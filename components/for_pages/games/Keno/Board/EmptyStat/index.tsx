import styles from './index.module.scss'
import classNames from 'classnames'

interface Props{}
export default function EmptyStat(props: Props) {
  return (
    <div className={styles.root}>
      <div className={classNames(styles.block)}>Выберите от 1 до 10 номеров для вашей ставки.</div>
      <div className={classNames(styles.block, styles.block2)}></div>
    </div>
  )
}


