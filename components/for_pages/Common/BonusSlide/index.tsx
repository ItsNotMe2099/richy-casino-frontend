import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useEffect, useState } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'sheet' | 'modal' | 'footer'
}

export default function BonusSlide(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  const slideClass = classNames({
    [styles.sheet]: props.style === 'sheet',
    [styles.modal]: props.style === 'modal',
    [styles.footer]: props.style === 'footer',
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
      <div className={classNames(styles.root, props.className, slideClass)} onClick={() => appContext.showModal(ModalType.bonus)}>
        {(props.style === 'modal' || props.style === 'sheet' || props.style === 'footer') &&
        <div className={styles.close} onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('ClockBtn')
          props.onRequestClose()
        }}>
          <img src='/img/icons/close-bonus.svg' alt=''/>
        </div>}
        <div className={styles.hero}><img src='/img/TopSlider/hero2.svg' alt=''/></div>
        <HiddenXs>
          <div className={styles.money}><img src='/img/TopSlider/money.svg' alt=''/></div>
        </HiddenXs>
        <VisibleXs>
          <div className={styles.money}><img src='/img/TopSlider/money-mobile.svg' alt=''/></div>
        </VisibleXs>
        {props.style === 'footer' &&
          <>
          <div className={styles.moneyBlur}>
            <img src='/img/TopSlider/footer-banner.svg' alt=''/>
          </div>
          <div className={styles.moneyLeft}>
            <img src='/img/UserFooter/money-left-down-banner.svg' alt=''/>
          </div>
          <div className={styles.moneyRight}>
            <img src='/img/UserFooter/money-right-down-banner.svg' alt=''/>
          </div>
          <div className={styles.coinUp}>
            <img src='/img/UserFooter/coin-up.svg' alt=''/>
          </div>
          <div className={styles.coinDown}>
            <img src='/img/UserFooter/coin-down.svg' alt=''/>
          </div>

          </>
        }
        <div className={styles.downBanner}>
        <div className={styles.title}>
          Бонус на депозит
        </div>
        <div className={styles.bonus}>
          30 000 ₽
        </div>
        <div className={styles.fs}>
          300 FS
        </div>
        <div className={styles.footerGroup}>
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500'>Получить</Button>
          {isTimerVisible &&
            <div className={styles.timer}>
              <Timer style={props.style ==='footer' ? 'footer' : props.style ==='sheet' ? 'sheet' : 'bonus'} expiredAt={expiredAt}/>
            </div>
          }
        </div>
        <div>
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
        </div>
      </div>
  )
}

