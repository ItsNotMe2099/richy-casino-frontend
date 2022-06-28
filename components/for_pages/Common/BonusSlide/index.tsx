import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import {useAppContext} from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import Formatter from 'utils/formatter'
import {Routes} from 'types/routes'
import {useMeasure} from 'react-use'
import {useTranslation} from 'next-i18next'
import {pluralize} from 'numeralize-ru'

interface Props {
  children?: React.ReactNode
  className?: string
  onRequestClose?: () => void
  style?: 'sheet' | 'modal' | 'footer' | 'slide'
}

export default function BonusSlide(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const details = appContext.bonusBannerDetails
  const expiredAt = new Date(details?.validTill)
  const isMobile = appContext.isMobile
  const [ref, { width }] = useMeasure()
  const slideClass = classNames({
    [styles.sheet]: props.style === 'sheet',
    [styles.modal]: props.style === 'modal',
    [styles.footer]: props.style === 'footer',
    [styles.slide]: props.style === 'slide',
  })
  const handleClick = () => {
    if(props.onRequestClose){
      props.onRequestClose()
    }
    if (!appContext.auth) {
      appContext.showModal(ModalType.registration)
    } else {
      appContext.showModalProfile(ProfileModalType.wallet)
    }
  }

  return (
    <div className={styles.wrapper}>
    <div ref={ref} className={classNames(styles.root, props.className, slideClass)} >
      {(props.style === 'modal' || props.style === 'sheet' || props.style === 'footer') &&
      <div className={styles.close} onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        props.onRequestClose()
      }}>
        <img src='/img/icons/close-bonus.svg' alt=''/>
      </div>}
      <div className={styles.hero}><img src={isMobile ? '/img/BonusSlide/hero-mobile.png' : '/img/BonusSlide/Hero.png'} alt=''/></div>
      {appContext.showBonus &&
      <>
      <div className={styles.downBanner} style={{marginTop: isMobile ? `${width /15}px` : `${width /30}px`}}>
        <div className={styles.title} style={{fontSize: isMobile ? `${width /16}px` : `${width /24}px` }}>
          {t('bonus_title')}
        </div>
        <div className={styles.bonus} style={{fontSize: isMobile ? `${width /10.5}px` : `${width /13}px`, marginTop: isMobile ? `${width /39}px` : `${width /50}px` }}>
          {Formatter.formatNumber(details?.amount)} {details?.currency?.toUpperCase()}
        </div>
        {details?.freeSpins >0 && <div className={styles.fs} style={{fontSize: isMobile ? `${width /22}px` : `${width /29}px` }}>
          {Formatter.formatNumber(details?.freeSpins)} {t('bonus_fs')}
        </div>}

        <div className={styles.footerGroup}>
          <div className={styles.btnWrapper} style={{fontSize: isMobile ? `${width / 22}px` : `${width / 38 > 18 ? 18 : width / 38}px`, marginTop: isMobile ? `${width /35}px` : `${width /60}px`}}>
            <Button size='normal' background='payGradient500' className={styles.btn} onClick={handleClick}>{t('bonus_button_get')}</Button>
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
      <div className={styles.bottom} style={{bottom: `${width /55}px`}}>
      <div className={styles.satoshi} style={{fontSize: isMobile ? `${width / 24}px` : `${width / 42}px`}}>
        {Formatter.formatNumber(details?.freeBitcoin)} {t('bonus_satoshi')}
      </div>
      <div className={styles.satoshi} style={{fontSize: isMobile ? `${width / 24}px` : `${width / 42}px`}}>
        {Formatter.formatNumber(details?.lotteryTickets)} {pluralize(details?.lotteryTickets, t('bonus_lottery_1'), t('bonus_lottery_2'), t('bonus_lottery_5'))}
      </div>
    </div>
    </>
      }
      {!appContext.showBonus && <div className={styles.stub}>
        <div className={styles.stubWrapper}>
        <div className={styles.stubTitle} style={{fontSize: `${width / 24}px`}}>{t('bonus_stub_title')}
        </div>
        <div className={styles.btnWrapper} style={{fontSize: isMobile ? `${width / 22}px` : `${width / 38 > 18 ? 18 : width / 38}px`}}>
        <Button href={Routes.catalog} className={styles.btn} size='normal' background='payGradient500'>{t('bonus_stub_button_play')}</Button>
        </div>
        </div>
      </div>}
    </div>
    </div>
  )
}

