import styles from './index.module.scss'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {ModalType, ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import Formatter from 'utils/formatter'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'footer' | 'wallet' | 'registration' | 'profileBurger'
}

export default function BonusSmallBanner(props: Props) {
  const appContext = useAppContext()
  const details = appContext.bonusBannerDetails
  const expiredAt = new Date(details?.validTill)

  const bannerClass = classNames({
    [styles.footer]: props.style === 'footer',
    [styles.wallet]: props.style === 'wallet',
    [styles.reg]: props.style === 'registration',
    [styles.profileBurger]: props.style === 'profileBurger'
  })


  const user = appContext.auth
  const handleClick = () => {
    if(!appContext.auth){
      appContext.showModal(ModalType.registration)
    }else if(props.style !== 'wallet' && props.style !== 'registration'){
      appContext.showModal(ProfileModalType.wallet)
    }
  }
  return (
    <div className={classNames(styles.root, bannerClass)}
         onClick={handleClick}>
      {props.style === 'footer' &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
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
          <span className={styles.title}>Бонус</span>
          <div className={styles.fs}>
            {Formatter.formatNumber(details?.amount)} {details?.currency.toUpperCase()} + {Formatter.formatNumber(details?.freeSpins)} FS
          </div>
          <div className={styles.bottom}>
          <div className={styles.satoshi}>
            {Formatter.formatNumber(details?.lotteryTickets)} Лотерейных билетов
            </div>
            <div className={styles.satoshi}>
              {Formatter.formatNumber(details?.freeBitcoin)} Satoshi
            </div>
          </div>
        </div>
        {appContext.showBonus && <div className={styles.timer}><Timer minutes style={props.style === 'wallet'? 'wallet' : 'footerSmall'} expiredAt={expiredAt}/></div>}
      </div>
    </div>
  )
}

