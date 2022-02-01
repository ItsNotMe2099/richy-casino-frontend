import styles from './index.module.scss'
import {Col} from 'react-grid-system'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from '../BonusSmallBanner/Timer'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

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

  return (
      <Col className={props.className} onClick={() => appContext.showModal(ModalType.bonus)}>
      <div className={classNames(styles.root, slideClass)}>
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
        <div className={styles.btn}>
          <Button size='normal' background='payGradient500'>Получить</Button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.satoshi}>
            50 Satoshi
          </div>
          <div className={styles.satoshi}>
            10 Лотерейных билетов
          </div>
        </div>
        {props.style === 'footer' && <Timer expiredAt={expiredAt} size='normal'/>}
        </div>
      </div>
      </Col>
  )
}

