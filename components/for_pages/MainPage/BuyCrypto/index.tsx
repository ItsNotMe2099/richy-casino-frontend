import Button from 'components/ui/Button'
import styles from './index.module.scss'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function BuyCrypto(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.no}>
        No Crypto? Take it
      </div>
      <div className={styles.pay}>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/google-pay.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/master-card.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/visa.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/apple.svg' alt=''/>
        </div>
        <div>
        <img src='/img/BuyCrypto/samsung-pay.svg' alt=''/>
        </div>
      </div>
      <Button className={styles.btn} size='normal' background='payGradient500'>Buy Crypto</Button>
    </div>
  )
}

