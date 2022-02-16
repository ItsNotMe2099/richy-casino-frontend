import {useRef} from 'react'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import HiddenXs from 'components/ui/HiddenXS'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'

interface Option {
  label: string
}

interface Props {
  className?: string
}
enum ActionType{
  Profile,
  AddMoney,
  Payout,
  Transactions,
  Referral,
  Settings,
  Wallet,
  Logout
}

export default function ProfileMenu(props: Props){
  const dropdownRef = useRef(null)
  const {showModal, logout} = useAppContext()
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const options = [
    {label: 'Профиль', key: ActionType.Profile},
    {label: 'Пополнить счет',  key: ActionType.AddMoney},
    {label: 'Вывод средств', key: ActionType.Payout},
    {label: 'История ставок', key: ActionType.Transactions},
    {label: 'Реферальная программа', key: ActionType.Referral},
    {label: 'Настройки', key: ActionType.Settings},
    {label: 'Кошелек', key: ActionType.Wallet},
    {label: 'Выйти', key: ActionType.Logout},
  ]
  const handleClickItem = (e, item) => {
    e.preventDefault()
    switch (item.key) {
      case ActionType.Profile:
        showModal(ProfileModalType.profile)
        break
      case ActionType.AddMoney:
        showModal(ProfileModalType.wallet)
        break
      case ActionType.Payout:
        showModal(ProfileModalType.wallet)
        break
      case ActionType.Transactions:
        showModal(ProfileModalType.betsHistory)
        break
      case ActionType.Referral:
        // TODO add link
        break
      case ActionType.Settings:
        showModal(ProfileModalType.settings)
        break
      case ActionType.Wallet:
        showModal(ProfileModalType.wallet)
        break
      case ActionType.Logout:
        logout()
        break
    }
    setIsActive(false)
  }
    const handleClick = (e) => {
      e.preventDefault()
    console.log('handleClikc')
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div onClick={handleClick} className={styles.dropDownTrigger}>
        <div className={styles.avatar}><Avatar avatar='/img/Avatar/avatar.png'/></div>
        <HiddenXs>
        <div className={classNames(styles.arrow, {[styles.rotate]: isActive})}>
          <img src='/img/DropdownMenu/arrow3.svg' alt=''/>
        </div>
        </HiddenXs>
      </div>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <div className={styles.triangle}></div>
       {options.map((item, index) =>   <a key={item.key} className={styles.option} onClick={ e => handleClickItem(e, item)}>
          {item.label}
        </a>)}
       </nav>
    </div>
  )
}
