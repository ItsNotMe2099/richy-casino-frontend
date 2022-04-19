import {useRef} from 'react'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import HiddenXs from 'components/ui/HiddenXS'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'
import {useTranslation} from 'next-i18next'
import DropDownTriangle from 'components/ui/DropDownTriangle'

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
  const {t} = useTranslation()
  const dropdownRef = useRef(null)
  const {showModal, logout} = useAppContext()
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const options = [
    {label: t('header_profile_menu_profile'), key: ActionType.Profile},
    {label: t('header_profile_menu_deposit'),  key: ActionType.AddMoney},
    {label: t('header_profile_menu_withdrawal'), key: ActionType.Payout},
    {label: t('header_profile_menu_bets_history'), key: ActionType.Transactions},
    {label: t('header_profile_menu_referral'), key: ActionType.Referral},
    {label: t('header_profile_menu_settings'), key: ActionType.Settings},
    {label: t('header_profile_menu_wallet'), key: ActionType.Wallet},
    {label: t('header_profile_menu_logout'), key: ActionType.Logout},
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
        showModal(ProfileModalType.withdraw)
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
       <DropDownTriangle className={styles.triangle}/>
        {options.map((item, index) =>   <a key={item.key} className={styles.option} onClick={ e => handleClickItem(e, item)}>
          {item.label}
        </a>)}
       </nav>
    </div>
  )
}
