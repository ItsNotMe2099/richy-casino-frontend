import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import {useAppContext} from 'context/state'
import UserFooter from 'components/for_pages/Common/UserFooter'
import Avatar from '../Avatar'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import classNames from 'classnames'

interface IUser{
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
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '11',
    },
    content: {
      width: '34%',
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

  const bonuses = [
    {icon: '/img/ProfileBurger/gift.svg', label: 'Бонусы и призы', key: 'gift'},
    {icon: '/img/ProfileBurger/bitcoin.svg', label: 'Free Bitcoin', key: 'bitcoin'},
    {icon: '/img/ProfileBurger/wheel.svg', label: 'Wheel of fortune', key: 'wheel'},
  ]

  const options = [
    {icon: '/img/ProfileBurger/joystick.svg', label: 'Richy Games'},
    {icon: '/img/ProfileBurger/ticket.svg', label: 'Richy Lottery'},
    {icon: '/img/ProfileBurger/youtube.svg', label: 'Live Casino'},
    {icon: '/img/ProfileBurger/rocket.svg', label: 'Crash'},
    {icon: '/img/ProfileBurger/poker.svg', label: 'Poker'},
    {icon: '/img/ProfileBurger/chess.svg', label: 'Шахматы'},
    {icon: '/img/ProfileBurger/cup.svg', label: 'Лидерборд'},
    {icon: '/img/ProfileBurger/referral.svg', label: 'Реферальная программа'},
    {icon: '/img/ProfileBurger/like.svg', label: 'Любимые игры'},
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

  if(appContext.isMobile) {
    /* eslint-disable */
    // @ts-ignore
    return (
    <Sheet isOpen={isOpen} onClose={onRequestClose}>
      <div className={styles.sheet}>
      <Sheet.Container onViewportBoxUpdate>
        <Sheet.Header onViewportBoxUpdate />
        <Sheet.Content onViewportBoxUpdate>{isOpen && 
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.user}>
            <Avatar avatar='/img/Avatar/avatar.png' style='circle'/>
            <div className={styles.name}>
              <span>{props.user.userName}</span>
              <div className={styles.id}>
                ID: {props.user.id}
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
          <UserFooter/>
        </div>}
        </Sheet.Content>
      </Sheet.Container>
      </div>

      <Sheet.Backdrop onViewportBoxUpdate/>
    </Sheet>
    )
  }
  else{
    return null
  }
}
