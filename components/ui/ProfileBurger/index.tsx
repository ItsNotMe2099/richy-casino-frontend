import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import Avatar from '../Avatar'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import classNames from 'classnames'
import UserUtils from 'utils/user'
import {useTranslation} from 'next-i18next'
import {ModalType, ProfileModalType} from 'types/enums'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import {Routes} from 'types/routes'
import Link from 'next/link'

enum LinkKey{
  FreeBitCoin,
  WheelOfFortune,
  Bonuses,
  LiveCasino,
  Lottery,
  RichyGames,
  Aviator,
  Poker,
  Chess,
  LeaderBoard,
  Favorite,
  Referral

}
interface Props {
  onRequestClose: () => void
  isBottomSheet?: boolean
}

interface BonusProps {
  icon: string
  label: string
  key?: LinkKey
  link?: string
  style?: 'bitcoin' | 'gift' | 'wheel'
  onClick: (e) => void
}
const Bonus = ({icon, label, style, link, onClick}: BonusProps) => {

  const bonusClass = {
    [styles.bitcoin]: style === 'bitcoin',
    [styles.gift]: style === 'gift',
    [styles.wheel]: style === 'wheel'
  }

  return (
    <Link href={link ?? '#'}>
    <a className={styles.bonus} onClick={onClick}>
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
    </a>
    </Link>
  )
}

const Option = ({icon, label, link, onClick}: BonusProps) => {

  return (
    <Link href={link ?? '#'}>
    <a className={styles.option} onClick={onClick}>
      <div className={styles.icon}>
        <img src={icon} alt=''/>
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </a>
    </Link>
  )
}
export default function ProfileBurger(props: Props) {
  const {t} = useTranslation()
  const { onRequestClose} = props
  const appContext = useAppContext()


  const bonuses = [
    {icon: '/img/ProfileBurger/gift.svg', label: t('profile_mobile_bonuses_bonus'), key: LinkKey.Bonuses, link: Routes.bonuses},
    {icon: '/img/ProfileBurger/bitcoin.svg', label: t('profile_mobile_bonuses_free_bitcoin'), key:  LinkKey.FreeBitCoin, link: Routes.freeBitcoin},
    {icon: '/img/ProfileBurger/wheel.svg', label: t('profile_mobile_bonuses_wheel_of_frotune'), key:  LinkKey.WheelOfFortune, link: null},
  ]

  const options = [
    {icon: '/img/ProfileBurger/joystick.svg', label: t('profile_mobile_menu_richy_games'), key: LinkKey.RichyGames, link: Routes.richyGames},
    {icon: '/img/ProfileBurger/ticket.svg', label: t('profile_mobile_menu_richy_lottery'), key: LinkKey.Lottery, link: Routes.lottery},
    {icon: '/img/ProfileBurger/youtube.svg', label: t('profile_mobile_menu_live_casino'), key: LinkKey.LiveCasino, link: Routes.catalogLive},
    {icon: '/img/ProfileBurger/rocket.svg', label: t('profile_mobile_menu_aviator'), key: LinkKey.Aviator, link: Routes.aviator},
    {icon: '/img/ProfileBurger/poker.svg', label: t('profile_mobile_menu_poker'), key: LinkKey.Poker, link: Routes.poker},
    {icon: '/img/ProfileBurger/chess.svg', label: t('profile_mobile_menu_chess'), key: LinkKey.Chess, link: Routes.chess},
    {icon: '/img/ProfileBurger/cup.svg', label: t('profile_mobile_menu_leaderboard'), key: LinkKey.LeaderBoard, link: Routes.leaderBoard},
    {icon: '/img/ProfileBurger/referral.svg', label: t('profile_mobile_menu_referral'), key: LinkKey.Referral, link: Routes.referral},
    {icon: '/img/ProfileBurger/like.svg', label: t('profile_mobile_menu_favorite'), key: LinkKey.Favorite, link: Routes.catalogFavorite},
  ]

  const handleClick = (key: LinkKey) => {
    switch (key){
      case LinkKey.WheelOfFortune:
        appContext.showModal(ModalType.fortune)
        break
      default:
        appContext.hideModal()
    }

  }
  const result = (<div className={styles.container}>
    {appContext.auth && <div className={styles.info} onClick={() => appContext.showModalProfile(ProfileModalType.profile)}>
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
    </div>}
    {appContext.showBonus && <BonusSmallBanner style='profileBurger'/>}
    <div className={styles.bonuses}>
      {bonuses.map((item, index) =>
        <Bonus
          key={index}
          icon={item.icon}
          label={item.label}
          link={item.link}
          onClick={() => handleClick(item.key)}
          style={item.key === LinkKey.Bonuses ? 'gift' : item.key === LinkKey.FreeBitCoin ? 'bitcoin' : 'wheel'}
        />
      )}
    </div>
    <div className={styles.block}>
      {options.slice(0, 3).map((item, index) =>
        <Option icon={item.icon} label={item.label}   link={item.link}
                onClick={() => handleClick(item.key)} key={item.key}/>
      )}
    </div>
    <div className={styles.block}>
      {options.slice(3, 7).map((item, index) =>
        <Option icon={item.icon} label={item.label}   link={item.link}
                onClick={() => handleClick(item.key)} key={item.key}/>
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
        <Option icon={item.icon} label={item.label}   link={item.link}
                onClick={() => handleClick(item.key)} key={item.key}/>
      )}
    </div>
  </div>)

  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
