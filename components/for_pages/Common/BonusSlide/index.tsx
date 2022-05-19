import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {useAppContext} from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import VisibleXs from 'components/ui/VisibleXS'
import Formatter from 'utils/formatter'
import {Routes} from 'types/routes'
import {useMeasure} from 'react-use'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'sheet' | 'modal' | 'footer' | 'slide'
}

export default function BonusSlide(props: Props) {
  const appContext = useAppContext()
  const details = appContext.bonusBannerDetails
  const expiredAt = new Date(details?.validTill)
  const [ref, { width }] = useMeasure()
  const slideClass = classNames({
    [styles.sheet]: props.style === 'sheet',
    [styles.modal]: props.style === 'modal',
    [styles.footer]: props.style === 'footer',
    [styles.slide]: props.style === 'slide',
  })
  const handleClick = () => {
    if (!appContext.auth) {
      appContext.showModal(ModalType.registration)
    } else {
      appContext.showModalProfile(ProfileModalType.wallet)
    }
  }

  return (
    <div ref={ref} className={classNames(styles.root, props.className, slideClass)} >
      {(props.style === 'modal' || props.style === 'sheet' || props.style === 'footer') &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        props.onRequestClose()
      }}>
        <img src='/img/icons/close-bonus.svg' alt=''/>
      </div>}
      <div className={styles.hero}><img src='/img/BonusSlide/Hero.png' alt=''/></div>
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
      {appContext.showBonus &&
      <>
      <div className={styles.downBanner} style={{marginTop: `${width /30}px`}}>
        <div className={styles.title} style={{fontSize: `${width /24}px` }}>
          Бонус на депозит
        </div>
        <div className={styles.bonus} style={{fontSize: `${width /13}px`, marginTop: `${width /50}px` }}>
          {Formatter.formatNumber(details?.amount)} {details?.currency?.toUpperCase()}
        </div>
        <div className={styles.fs} style={{fontSize: `${width /29}px` }}>
          {Formatter.formatNumber(details?.freeSpins)} FS
        </div>

        <div className={styles.footerGroup}>
          <div className={styles.btnWrapper} style={{fontSize: `${width / 24}px`, marginTop: `${width /60}px`}}>
            <Button size='normal' background='payGradient500' className={styles.btn} onClick={handleClick}>Получить</Button>
            {appContext.showBonus &&
            <div className={styles.timer}>
              <Timer minutes style={props.style === 'footer' ? 'footer' : props.style === 'sheet' ? 'sheet' : 'bonus'}
                     expiredAt={expiredAt} fontSize={`${width /25}px`}  rootPadding={`${width /45}px`}
                     inputHeight={`${width /15}px`}
                     inputWidth={`${width /15}px`}/>
            </div>
            }
          </div>
        </div>
      </div>
      <div className={styles.bottom} style={{bottom: `${width /60}px`}}>
      <div className={styles.satoshi} style={{fontSize: `${width / 42}px`}}>
        {Formatter.formatNumber(details?.freeBitcoin)} Satoshi
      </div>
      <div className={styles.satoshi} style={{fontSize: `${width / 42}px`}}>
        {Formatter.formatNumber(details?.lotteryTickets)} Лотерейных билетов
      </div>
    </div>
    </>
      }
      {!appContext.showBonus && <div className={styles.stub}>
        <div className={styles.stubWrapper}>
        <div className={styles.stubTitle} style={{fontSize: `${width / 24}px`}}>The Best Provably Fair Casino
        </div>
        <div className={styles.btnWrapper} style={{fontSize: `${width / 24}px`}}>
        <Button href={Routes.catalog} className={styles.btn} size='normal' background='payGradient500'>Играть</Button>
        </div>
        </div>
      </div>}
    </div>
  )
}

