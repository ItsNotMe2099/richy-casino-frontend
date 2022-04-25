import styles from './index.module.scss'
import VisibleXs from 'components/ui/VisibleXS'
import {useAppContext} from 'context/state'
import {ModalType, ProfileModalType} from 'types/enums'
import {Routes} from 'types/routes'
import {useRouter} from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

interface Props {

}

interface ItemProps {
  icon: string
  label: string
  onClick: () => void
}

enum ActionType{
  Main = 'main',
  Poker = 'poker',
  Casino = 'casino',
  Menu = 'menu'
}

export default function UserFooter(props: Props) {
  const router = useRouter()
  const items = [
    {label: 'Main', icon: '/img/UserFooter/user.svg', key: ActionType.Main},
    {label: 'Poker', icon: '/img/UserFooter/poker.svg', key: ActionType.Poker},
    {label: 'Casino', icon: '/img/UserFooter/casino.svg', key: ActionType.Casino},
    {label: 'Menu', icon: '/img/UserFooter/menu.svg', key: ActionType.Menu},
  ]

  const Item = ({icon, label, onClick}: ItemProps) => {
    return (
      <div className={styles.item} onClick={onClick}>
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }

  const {showModal} = useAppContext()
  const context = useAppContext()

  const handleClickItem = (item) => {
    switch (item.key) {
      case ActionType.Poker:
        router.push(Routes.poker)
        break
      case ActionType.Casino:
        router.push(Routes.catalog)
        break
      case ActionType.Main:
        if(!context.user){
          context.showModal(ModalType.login)
        } else{
          context.showModalProfile(ProfileModalType.profile)
        }
        break
      case ActionType.Menu:
        if(!context.user){
          context.showModal(ModalType.login)
        } else if(context.modal === ModalType.profileBurger){
          context.hideModal()
        } else{
          showModal(ModalType.profileBurger)
        }
        break
    }
  }

  return (
    <VisibleXs>
      <div className={classNames(styles.root, {[styles.isOverAll]: context.modal === ModalType.profileBurger})}>
        {items.slice(0, 2).map((item, index) =>
          <Item onClick={() => handleClickItem(item)} icon={item.icon} label={item.label} key={item.key}/>
        )}
        <Link href={Routes.catalog}>
        <a className={styles.joystick}>
          <img src='/img/UserFooter/joystick.svg' alt=''/>
        </a>
        </Link>
        {items.slice(2, items.length).map((item, index) =>
          <Item
          onClick={() => handleClickItem(item)}
          icon={item.label === 'Menu' && context.modal === ModalType.profileBurger ? '/img/UserFooter/close.svg' : item.icon} label={item.label} key={item.key}/>
        )}
      </div>
    </VisibleXs>
  )
}

