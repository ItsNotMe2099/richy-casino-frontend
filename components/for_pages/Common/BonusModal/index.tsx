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
import {useMeasure} from 'react-use'
import {useTranslation} from 'next-i18next'
import {pluralize} from 'numeralize-ru'
import {BONUS_SATOSHI} from 'types/constants'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'sheet' | 'modal' | 'footer' | 'slide'
}

export default function BonusModal(props: Props) {
  const {t} = useTranslation()
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
          {t('bonus_title')}
        </div>
        <div className={styles.bonus}>
          {Formatter.formatNumber(details?.amount)}%
        </div>
        {details?.freeSpins > 0 && <div className={styles.fs}>
          {Formatter.formatNumber(details?.freeSpins)} {t('bonus_fs')}
        </div>}
        <div className={styles.footerGroup}>
          <div className={styles.btnWrapper}>
            <Button size='normal' background='payGradient500' className={styles.btn} onClick={handleClick}>{t('bonus_button_get')}</Button>
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
                {BONUS_SATOSHI} {t('bonus_satoshi')}
              </div>
              <div className={styles.satoshi}>
                {Formatter.formatNumber(details?.lotteryTickets)} {pluralize(details?.lotteryTickets, t('bonus_lottery_1'), t('bonus_lottery_2'), t('bonus_lottery_5'))}
              </div>
            </div>
          </div>
        </div>
      </div>}
      {!appContext.showBonus && <div className={styles.stub}>
        <div className={styles.stubWrapper}>
        <div className={styles.stubTitle}>{t('bonus_stub_title')}
        </div>
        <div className={styles.btnWrapper}>
        <Button href={Routes.catalog} className={styles.btn} size='normal' background='payGradient500'>{t('bonus_stub_button_play')}</Button>
        </div>
        </div>
      </div>}
    </div>
  )
}

