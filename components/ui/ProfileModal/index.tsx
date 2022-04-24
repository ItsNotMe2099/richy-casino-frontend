import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Close from 'components/svg/Close'
import HiddenXs from '../HiddenXS'
import VisibleXs from '../VisibleXS'
import Logo from 'components/svg/Logo'
import Button from '../Button'
import {ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import ProfileMenu from 'components/layout/Header/components/Profile/ProfileMenu'
import FAFooter from './FAFooter'
import {useTranslation} from 'next-i18next'

interface IUser {
  id: string
  balance: string
}

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  size?: 'normal' | 'large' | 'small'
  title?: string
  image?: string
  children?: any
  loading?: boolean
  className?: string
  closeClassName?: string
  singlePage?: boolean
  payment?: boolean
  wallet?: boolean
  profile?: boolean
  noBorder?: boolean
  isBack?: boolean
  step?: number
  setStep?: () => void
  style?: 'wallet' | 'favorite' | 'buyCrypto' | '2fa' | 'withdraw'
  faFooter?: boolean
  withdraw?: boolean
  fixed?: boolean
}

export default function ProfileModal(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '30',
    },
    content: {
      width: '100%',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
      overflow: 'hidden',
      background: 'none',
    },
  }

  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return styles.rootLarge
      case 'small':
        return styles.rootSmall
      default:
        return styles.rootNormal
    }
  }

  const styleClass = {
    [styles.wallet]: props.style === 'wallet',
    [styles.withdraw]: props.style === 'withdraw',
    [styles.favorite]: props.style === 'favorite',
    [styles.fa]: props.style === '2fa'
  }

  const styleClassMobile = {
    [styles.buyCrypto]: props.style === 'buyCrypto'
  }
  const showModalMobileHeader = !props.wallet

  return (
    <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className={styles.frame}>
        <div
          className={classNames(styles.root, getSizeClass(props.size),props.className, {[styles.showHeader]: showModalMobileHeader})}
        >
          <HiddenXs><>{(props.faFooter && props.step === 1) && <FAFooter className={styles.footer}/>}</>
          </HiddenXs>
          <HiddenXs>
            <div className={classNames(styleClass, {[styles.noBorder]: props.noBorder})}>
              <div className={classNames(styles.mainTop, {[styles.noBorder]: props.noBorder})}>
                <div className={styles.left}>
                  {(!props.profile && props.isBack) &&
                  <div className={styles.back}
                       onClick={() => props.wallet ? props?.setStep() : context.showModal(ProfileModalType.profile)}>
                    <img src='/img/icons/back.svg' alt=''/>
                  </div>}
                  <div className={styles.title}>
                    {props.title}
                  </div>
                </div>
                <div className={styles.right}>
                  {(props.payment || props.wallet) && context.user && <div className={styles.id}>
                    ID {context.user?.id}
                  </div>}
                  {props.onRequestClose && (
                    <div className={styles.close} onClick={props.onRequestClose}>
                      <Close/>
                    </div>
                  )}
                </div>
              </div>
              {props.style === '2fa' &&
              <div className={styles.faText}>
                {t('profile_2fa_instruction_gauth')} <span>{t('profile_2fa_instruction_text_1')}</span>{t('profile_2fa_instruction_text_2')}
              </div>
              }
            </div>
          </HiddenXs>
          <VisibleXs>
            <div className={classNames(styles.mobile, styleClassMobile)}>
              {showModalMobileHeader && <div className={styles.top}>
                <Logo className={styles.logo}/>
                {context.user && <div className={styles.balance}>
                  <div className={styles.text}>
                    BALANCE
                  </div>
                  <div className={styles.money}>
                    {context.user.balance.totalCalculatedAmount} {context.user.currencyIso}
                  </div>
                </div>}
                <Button background='payGradient500' className={styles.btnFill} onClick={() => context.showModal(ProfileModalType.wallet)}><img src='/img/icons/wallet.svg' alt=''/>{t('profile_deposit')}</Button>
                {props.onRequestClose && (
                  <div className={styles.close} onClick={props.onRequestClose}>
                    <Close/>
                  </div>
                )}
                <ProfileMenu className={styles.profileMenu}/>
              </div>}
              {!props.profile &&
              <div className={styles.mobileBack}>
                <div className={styles.wrap}
                     onClick={(props.wallet && props.step === 1) ? props.onRequestClose :
                       (props.wallet && props.step > 1) ? () => props.setStep() :
                         props.style !== 'buyCrypto' ? () => context.showModal(ProfileModalType.profile) : props.onRequestClose}>
                  <div className={styles.arrow}>
                    <img src='/img/icons/back-arrow.svg' alt=''/>
                  </div>
                  <div className={styles.toProfile}>
                    {(props.wallet || props.style === 'buyCrypto' || props.style === '2fa') ? <>{t('profile_back')}</> : <>{t('profile_title')}</>}
                  </div>
                </div>
              </div>}
              <div className={classNames(styles.title, {[styles.walletBackTitle]: props.wallet})}>
                <div>{props.title}</div>
                {props.wallet && context.user && <div className={styles.id}>ID {context.user.id}</div>}
              </div>
            </div>
          </VisibleXs>
          <div className={classNames(styles.center, {[styles.walletBackCenter]: props.wallet})}>
            <VisibleXs><>{(props.faFooter && props.step === 1) && <FAFooter className={styles.footer}/>}</>
            </VisibleXs>
            {props.image && !props.loading && (
              <div className={styles.image}>
                <img src={props.image} alt=''/>
              </div>
            )}
            {props.isOpen && props.children}
          </div>
        </div>
      </div>
    </ReactModal>
  )
}
ProfileModal.defaultProps = {
  size: 'normal',
}
