import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from './Timer'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'footer' | 'wallet'
  timer?: boolean
}

export default function BonusSmallBanner(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  const bannerClass = classNames({
    [styles.footer]: props.style === 'footer',
    [styles.wallet]: props.style === 'wallet'
  })

  return (
    <div className={classNames(styles.root, bannerClass)}
         onClick={() => appContext.showModal(ModalType.bonus)}>
      {props.style === 'footer' &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        console.log('ClockBtn')
        props.onRequestClose()
      }}>
        <img src='/img/icons/close-bonus.svg' alt=''/>
      </div>}
      <div className={styles.hero}><img
        src='/img/ShortBanner/hero.svg' alt=''/>
      </div>
      <HiddenXs>
      <>
      <div className={styles.money}>
        <img src='/img/ShortBanner/money.svg' alt=''/>
      </div>
      <div
        className={styles.money2}>
        <img src='/img/ShortBanner/money2.svg' alt=''/>
      </div>
      </>
      </HiddenXs>
      <VisibleXs>
        <>
        <div className={styles.money}>
          <img src='/img/ShortBanner/money-mobile-reg.svg' alt=''/>
        </div>
        <div className={styles.money2}>
          <img src='/img/ShortBanner/money-mobile-reg-r.svg' alt=''/>
        </div>
        <div className={styles.moneyWallet}>
          <img src='/img/ShortBanner/money-mobile-wallet-r.svg' alt=''/>
        </div>
        <div className={styles.moneyWallet2}>
          <img src='/img/ShortBanner/money-mobile-wallet-l.svg' alt=''/>
        </div>
        <div className={styles.moneyBlurWallet}>
          <img src='/img/ShortBanner/money-blur-mobile-wallet.svg' alt=''/>
        </div>
        </>
      </VisibleXs>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span className={styles.bonusTimer}>Бонус</span><br
            className={styles.break}/> 30 000 ₽ + 300 FS
          </div>
          <div className={styles.bottom}>
          <div className={styles.satoshi}>
              10 Лотерейных билетов
            </div>
            <div className={styles.satoshi}>
              50 Satoshi
            </div>
          </div>
        </div>
        {props.timer && <div className={styles.timer}><Timer expiredAt={expiredAt}/></div>}
      </div>
    </div>
  )
}

