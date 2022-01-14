import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Close from 'components/svg/Close'
import HiddenXs from '../HiddenXS'
import VisibleXs from '../VisibleXS'
import Logo from 'components/svg/Logo'
import Button from '../Button'
import { ProfileModalType } from 'types/enums'
import { useAppContext } from 'context/state'

interface IUser{
  id: string
  balance: string
}

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  size?: 'normal' | 'large'
  title?: string
  image?: string
  children?: any
  loading?: boolean
  className?: string
  closeClassName?: string
  singlePage?: boolean
  user: IUser
  payment?: boolean
  profile?: boolean
}

export default function ProfileModal(props: Props) {
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '11',
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
      default:
        return styles.rootNormal
    }
  }

    return (
      <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <div className={styles.frame}>
          <div
            className={`${styles.root} ${getSizeClass(props.size)} ${props.className}`}
          >
            <HiddenXs>
              <div className={styles.top}>
                <div className={styles.left}>
                  {!props.profile &&
                  <div className={styles.back} onClick={() => context.showModal(ProfileModalType.profile)}>
                    <img src='/img/icons/back.svg' alt=''/>
                  </div>}
                  <div className={styles.title}>
                    {props.title}
                  </div>
                </div>
                <div className={styles.right}>
                {props.payment &&
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
            </HiddenXs>
            <VisibleXs>
              <>
              <div className={styles.top}>
                <Logo className={styles.logo}/>
                <div className={styles.balance}>
                  <div className={styles.text}>
                    BALANCE
                  </div>
                  <div className={styles.money}>
                    {props.user.balance}
                  </div>
                </div>
                <Button size='normal' background='payGradient500' className={styles.wallet}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
                {props.onRequestClose && (
                  <div className={styles.close} onClick={props.onRequestClose}>
                    <Close/>
                  </div>
                )}
              </div>
              {!props.profile &&
              <div className={styles.mobileBack}>
                  <div className={styles.wrap} onClick={() => context.showModal(ProfileModalType.profile)}>
                  <div className={styles.arrow}>
                    <img src='/img/icons/back-arrow.svg' alt=''/>
                  </div>
                  <div className={styles.toProfile}>
                    Профиль
                  </div>
                  </div>
              </div>}
              <div className={styles.title}>
                {props.title}
              </div>
              </>
            </VisibleXs>
            <div className={styles.center}>
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
