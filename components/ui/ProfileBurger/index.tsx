import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import Avatar from '../Avatar'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import classNames from 'classnames'
import UserUtils from 'utils/user'
import {useTranslation} from 'next-i18next'
import {ProfileModalType} from 'types/enums'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'

interface IUser {
  id: string
  userName: string
}

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  size?: 'normal' | 'large' | 'fortune'
  className?: string
  singlePage?: boolean
  user: IUser
}

interface BonusProps {
  icon: string
  label: string
  key?: number
  style?: 'bitcoin' | 'gift' | 'wheel'
}

export default function ProfileBurger(props: Props) {
  const {t} = useTranslation()
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()


  const bonuses = [
    {icon: '/img/ProfileBurger/gift.svg', label: t('profile_mobile_bonuses_bonus'), key: 'gift'},
    {icon: '/img/ProfileBurger/bitcoin.svg', label: t('profile_mobile_bonuses_free_bitcoin'), key: 'bitcoin'},
    {icon: '/img/ProfileBurger/wheel.svg', label: t('profile_mobile_bonuses_wheel_of_frotune'), key: 'wheel'},
  ]

  const options = [
    {icon: '/img/ProfileBurger/joystick.svg', label: t('profile_mobile_menu_richy_games')},
    {icon: '/img/ProfileBurger/ticket.svg', label: t('profile_mobile_menu_richy_lottery')},
    {icon: '/img/ProfileBurger/youtube.svg', label: t('profile_mobile_menu_live_casino')},
    {icon: '/img/ProfileBurger/rocket.svg', label: t('profile_mobile_menu_aviator')},
    {icon: '/img/ProfileBurger/poker.svg', label: t('profile_mobile_menu_poker')},
    {icon: '/img/ProfileBurger/chess.svg', label: t('profile_mobile_menu_chess')},
    {icon: '/img/ProfileBurger/cup.svg', label: t('profile_mobile_menu_leaderboard')},
    {icon: '/img/ProfileBurger/referral.svg', label: t('profile_mobile_menu_referral')},
    {icon: '/img/ProfileBurger/like.svg', label: t('profile_mobile_menu_favorite')},
  ]

  const Bonus = ({icon, label, style}: BonusProps) => {

    const bonusClass = {
      [styles.bitcoin]: style === 'bitcoin',
      [styles.gift]: style === 'gift',
      [styles.wheel]: style === 'wheel'
    }

    return (
      <div className={styles.bonus}>
        <div className={classNames(styles.icon, bonusClass)}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          <>{label.split(' ').map((word, index) =>
            index === 0 && <span>{word}</span>
          )}</>
          <span className={styles.space}>&nbsp;</span>
          <br className={styles.break}/>
          {label.split(' ').slice(1).map((word, index) =>
            <>{word}&nbsp;</>
          )}
        </div>
      </div>
    )
  }

  const Option = ({icon, label}: BonusProps) => {
    return (
      <div className={styles.option}>
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }

  return (
    <ProfileModalLayout>
      <ProfileModalHeader/>
      <ProfileModalBody>
    <div className={styles.container}>
      <div className={styles.info} onClick={() => appContext.showModalProfile(ProfileModalType.profile)}>
        <div className={styles.user}>
          <Avatar avatar='/img/Avatar/avatar.png' style='circle'/>
          <div className={styles.name}>
            <span>{UserUtils.formatUserName(appContext.user)}</span>
            <div className={styles.id}>
              ID: {appContext.user.id}
            </div>
          </div>
        </div>
        <div className={styles.back} onClick={onRequestClose}>
          <img src='/img/icons/back-arrow-white.svg'/>
        </div>
      </div>
      <BonusSmallBanner style='profileBurger'/>
      <div className={styles.bonuses}>
        {bonuses.map((item, index) =>
          <Bonus
            key={index}
            icon={item.icon}
            label={item.label}
            style={item.key === 'gift' ? 'gift' : item.key === 'bitcoin' ? 'bitcoin' : 'wheel'}
          />
        )}
      </div>
      <div className={styles.block}>
        {options.slice(0, 3).map((item, index) =>
          <Option icon={item.icon} label={item.label} key={index}/>
        )}
      </div>
      <div className={styles.block}>
        {options.slice(3, 7).map((item, index) =>
          <Option icon={item.icon} label={item.label} key={index}/>
        )}
      </div>
      <div className={styles.chat}>
        <div className={styles.name}>
          <div className={styles.icon}>
            <img src='/img/ProfileBurger/chat.svg' alt=''/>
          </div>
          <div className={styles.label}>Чат</div>
        </div>
        <div className={styles.back}>
          <img src='/img/icons/back-arrow-white.svg'/>
        </div>
      </div>
      <div className={styles.last}>
        {options.slice(7).map((item, index) =>
          <Option icon={item.icon} label={item.label} key={index}/>
        )}
      </div>
    </div>
      </ProfileModalBody>
    </ProfileModalLayout>
  )
}
