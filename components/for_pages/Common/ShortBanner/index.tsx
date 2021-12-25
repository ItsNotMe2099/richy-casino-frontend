import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function ShortBanner(props: Props) {

  return (
      <div className={styles.root}>
        <div className={styles.hero}><img src='/img/ShortBanner/hero.svg' alt=''/></div>
        <div className={styles.money}><img src='/img/ShortBanner/money.svg' alt=''/></div>
        <div className={styles.money2}><img src='/img/ShortBanner/money2.svg' alt=''/></div>
        <div>
        <div className={styles.title}>
          Бонус 30 000 ₽ + 300 FS 
        </div>
        <div className={styles.bottom}>
          <div className={styles.satoshi}>
            50 Satoshi
          </div>
          <div className={styles.satoshi}>
            10 Лотерейных билетов
          </div>
        </div>
        </div>
        </div>
  )
}

