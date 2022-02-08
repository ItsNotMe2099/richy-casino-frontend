import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useEffect, useState } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'footer' | 'wallet' | 'registration' | 'profileBurger'
}

export default function BonusSmallBanner(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  const bannerClass = classNames({
    [styles.footer]: props.style === 'footer',
    [styles.wallet]: props.style === 'wallet',
    [styles.reg]: props.style === 'registration',
    [styles.profileBurger]: props.style === 'profileBurger'
  })

  const [isTimerVisible, setIsTimerVisible] = useState(false)

  const user = appContext.auth

  useEffect(() => {
    if(user){
      setIsTimerVisible(true)
    }
    else{
      setIsTimerVisible(false)
    }
  }, [user])

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
        src='/img/BonusSmallBanner/hero.svg' alt=''/>
      </div>
      <HiddenXs>
      <>
      <div className={styles.money}>
        <img src='/img/BonusSmallBanner/money.svg' alt=''/>
      </div>
      <div
        className={styles.money2}>
        <img src='/img/BonusSmallBanner/money2.svg' alt=''/>
      </div>
      </>
      </HiddenXs>
      <VisibleXs>
        <>
        <div className={styles.money}>
          <img src='/img/BonusSmallBanner/money-mobile-reg.svg' alt=''/>
        </div>
        <div className={styles.money2}>
          <img src='/img/BonusSmallBanner/money-mobile-reg-r.svg' alt=''/>
        </div>
        <div className={styles.moneyWallet}>
          <img src='/img/BonusSmallBanner/money-mobile-wallet-r.svg' alt=''/>
        </div>
        <div className={styles.moneyWallet2}>
          <img src='/img/BonusSmallBanner/money-mobile-wallet-l.svg' alt=''/>
        </div>
        <div className={styles.moneyBlurWallet}>
          <img src='/img/BonusSmallBanner/money-blur-mobile-wallet.svg' alt=''/>
        </div>
        <div className={styles.moneyFooter}>
          <img src='/img/BonusSmallBanner/money-mobile-footer-r.svg' alt=''/>
        </div>
        <div className={styles.moneyFooter2}>
          <img src='/img/BonusSmallBanner/money-mobile-footer-l.svg' alt=''/>
        </div>
        <div className={styles.moneyBurger}>
          <img src='/img/BonusSmallBanner/money-burger-r.svg' alt=''/>
        </div>
        </>
      </VisibleXs>
      <div className={styles.content}>
        <div className={classNames(styles.left, {[styles.noMargin]: !user})}>
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
        {isTimerVisible && <div className={styles.timer}><Timer style={props.style === 'wallet'? 'wallet' : 'footerSmall'} expiredAt={expiredAt}/></div>}
      </div>
    </div>
  )
}

