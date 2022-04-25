import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {useAppContext} from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import Formatter from 'utils/formatter'
import {Routes} from 'types/routes'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'sheet' | 'modal' | 'footer'
}

export default function BonusSlide(props: Props) {
  const appContext = useAppContext()
  const details = appContext.bonusBannerDetails
  const expiredAt = new Date(details?.validTill)

  const slideClass = classNames({
    [styles.sheet]: props.style === 'sheet',
    [styles.modal]: props.style === 'modal',
    [styles.footer]: props.style === 'footer',
  })
  const handleClick = () => {
    if (!appContext.auth) {
      appContext.showModal(ModalType.registration)
    } else {
      appContext.showModalProfile(ProfileModalType.wallet)
    }
  }

  return (
    <div className={classNames(styles.root, props.className, slideClass)} onClick={handleClick}>
      {(props.style === 'modal' || props.style === 'sheet' || props.style === 'footer') &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
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
      {appContext.showBonus && <div className={styles.downBanner}>
        <div className={styles.title}>
          Бонус на депозит
        </div>
        <div className={styles.bonus}>
          {Formatter.formatNumber(details?.amount)} {details?.currency?.toUpperCase()}
        </div>
        <div className={styles.fs}>
          {Formatter.formatNumber(details?.freeSpins)} FS
        </div>
        <div className={styles.footerGroup}>
          <div className={styles.btnWrapper}>
            <Button size='normal' background='payGradient500' className={styles.btn}>Получить</Button>
            {appContext.showBonus &&
            <div className={styles.timer}>
              <Timer minutes style={props.style === 'footer' ? 'footer' : props.style === 'sheet' ? 'sheet' : 'bonus'}
                     expiredAt={expiredAt}/>
            </div>
            }
          </div>
          <div>
            <div className={styles.bottom}>
              <div className={styles.satoshi}>
                {Formatter.formatNumber(details?.freeBitcoin)} Satoshi
              </div>
              <div className={styles.satoshi}>
                {Formatter.formatNumber(details?.lotteryTickets)} Лотерейных билетов
              </div>
            </div>
          </div>
        </div>
      </div>}
      {!appContext.showBonus && <div className={styles.stub}>
        <div className={styles.stubWrapper}>
        <div className={styles.stubTitle}>The Best Provably Fair Casino
        </div>
        <div className={styles.btnWrapper}>
        <Button href={Routes.catalog} className={styles.btn} size='normal' background='payGradient500'>Играть</Button>
        </div>
        </div>
      </div>}
    </div>
  )
}

