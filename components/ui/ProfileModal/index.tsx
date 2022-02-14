import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Close from 'components/svg/Close'
import HiddenXs from '../HiddenXS'
import VisibleXs from '../VisibleXS'
import Logo from 'components/svg/Logo'
import Button from '../Button'
import { ProfileModalType } from 'types/enums'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import ProfileMenu from 'components/layout/Header/components/Profile/ProfileMenu'
import FAFooter from './FAFooter'

interface IUser{
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
  user: IUser
  payment?: boolean
  wallet?: boolean
  profile?: boolean
  noBorder?: boolean
  isBack?: boolean
  step?: number
  setStep?: () => void
  style?: 'wallet' | 'favorite' | 'buyCrypto' | '2fa'
  faFooter?: boolean
}

export default function ProfileModal(props: Props) {
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
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

  const context = useAppContext()

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
    [styles.favorite]: props.style === 'favorite',
    [styles.fa]: props.style === '2fa'
  }

  const styleClassMobile = {
    [styles.buyCrypto]: props.style === 'buyCrypto'
  }

    return (
      <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <div className={styles.frame}>
          <div
            className={`${styles.root} ${getSizeClass(props.size)} ${props.className}`}
          >
            {props.faFooter && <FAFooter className={styles.footer}/>}
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
                {(props.payment || props.wallet) &&
                <div className={styles.id}>
                  ID {props.user.id}
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
                  Загрузите и установите <span>Google Authenticator.</span> Включите двухфакторную аутентификацию, чтобы защитить свою учетную запись от несанкционированного доступа.
                </div>
                }
              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={classNames(styles.mobile,  styleClassMobile)}>
              {!props.wallet && <div className={styles.top}>
                <Logo className={styles.logo}/>
                <div className={styles.balance}>
                  <div className={styles.text}>
                    BALANCE
                  </div>
                  <div className={styles.money}>
                    {props.user.balance}
                  </div>
                </div>
                <Button background='payGradient500' className={styles.btnFill}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
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
                    {(props.wallet || props.style === 'buyCrypto' || props.style === '2fa') ? <>Назад</> : <>Профиль</>}
                  </div>
                  </div>
              </div>}
              <div className={classNames(styles.title, {[styles.walletBackTitle]: props.wallet})}>
                <div>{props.title}</div>
                {props.wallet && <div className={styles.id}>ID {props.user.id}</div>}
              </div>
              </div>
            </VisibleXs>
            <div className={classNames(styles.center, {[styles.walletBackCenter]: props.wallet})}>
              {props.image && !props.loading && (
                <div className={styles.image}>
                  <img src={props.image} alt=''/>
                </div>
              )}
              {props.children}
            </div>
          </div>
        </div>
      </ReactModal>
    )
}
ProfileModal.defaultProps = {
  size: 'normal',
}
