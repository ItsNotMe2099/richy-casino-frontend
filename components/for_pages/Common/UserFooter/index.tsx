import styles from './index.module.scss'
import VisibleXs from 'components/ui/VisibleXS'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import {Routes} from 'types/routes'
import {useRouter} from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import useIsActiveLink from 'hooks/useIsActiveLink'
import UserSvg from 'components/svg/UserSvg'
import PokerSvg from 'components/svg/PokerSvg'
import CasinoSvg from 'components/svg/CasinoSvg'
import MenuSvg from 'components/svg/MenuSvg'
import MenuCloseSvg from 'components/svg/MenuCloseSvg'
import JoyStickSvg from 'components/svg/JoyStickSvg'
import {ReactElement} from 'react'

interface Props {

}

interface ItemProps {
  icon: ReactElement
  label: string
  onClick: () => void
  link?: string
}

enum ActionType{
  Main = 'main',
  Poker = 'poker',
  Casino = 'casino',
  Menu = 'menu'
}
const Item = ({icon, label, onClick, link}: ItemProps) => {
  const isActive = useIsActiveLink(link ?? '')
  return (
    <div className={classNames(styles.item, {[styles.active]: isActive})} onClick={onClick}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default function UserFooter(props: Props) {
  const router = useRouter()
  const items = [
    {label: 'Main', icon: <UserSvg/>, key: ActionType.Main, link: '/'},
    {label: 'Poker', icon: <PokerSvg className={styles.poker}/>, key: ActionType.Poker, link: Routes.poker},
    {label: 'Casino', icon: <CasinoSvg/>, key: ActionType.Casino, link: Routes.catalog},
    {label: 'Menu', icon: <MenuSvg/>, key: ActionType.Menu},
  ]



  const {showModal} = useAppContext()
  const context = useAppContext()
  const isMenuOpen = context.modal === ModalType.profileBurger || context.bottomSheet === ModalType.profileBurger
  const handleClickItem = (item) => {
    switch (item.key) {
      case ActionType.Poker:
        router.push(Routes.poker)
        break
      case ActionType.Casino:
        router.push(Routes.catalog)
        break
      case ActionType.Main:
        router.push('/')
        break
      case ActionType.Menu:
       if(isMenuOpen){
          context.hideModal()
        } else{
          showModal(ModalType.profileBurger)
        }
        break
    }
  }


  return (
    <VisibleXs>
      <div className={classNames(styles.root, {[styles.isOverAll]: isMenuOpen})}>
        {items.slice(0, 2).map((item, index) =>
          <Item onClick={() => handleClickItem(item)} icon={item.icon} label={item.label} key={item.key}  link={item.link}/>
        )}
        <Link href={Routes.richyGames}>
        <a className={styles.joystick}>
          <JoyStickSvg/>
        </a>
        </Link>
        {items.slice(2, items.length).map((item, index) =>
          <Item
          onClick={() => handleClickItem(item)}
          link={item.link}
          icon={item.label === 'Menu' && isMenuOpen ? <MenuCloseSvg/> : item.icon} label={item.label} key={item.key}/>
        )}
      </div>
    </VisibleXs>
  )
}

