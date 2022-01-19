import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from './Timer'

interface Props {
  children?: React.ReactNode
  className?: string
  reverse?: boolean
  timer?: boolean
}

export default function ShortBanner(props: Props) {

  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
      <div className={styles.root}>
        <div className={styles.hero}><img src='/img/ShortBanner/hero.svg' alt=''/></div>
        <div className={styles.money}><img src='/img/ShortBanner/money.svg' alt=''/></div>
        <div className={styles.money2}><img src='/img/ShortBanner/money2.svg' alt=''/></div>
        <div className={styles.content}>
        <div className={styles.left}>
        <div className={styles.title}>
          Бонус 30 000 ₽ + 300 FS 
        </div>
        <div className={classNames(styles.bottom, {[styles.reverse]: props.reverse})}>
          <div className={styles.satoshi}>
            50 Satoshi
          </div>
          <div className={styles.satoshi}>
            10 Лотерейных билетов
          </div>
        </div>
        </div>
        {props.timer && <div className={styles.timer}><Timer expiredAt={expiredAt}/></div>}
        </div>
        </div>
  )
}

