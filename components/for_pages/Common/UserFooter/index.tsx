import styles from './index.module.scss'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { Routes } from 'types/routes'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import useIsActiveLink from 'hooks/useIsActiveLink'
import UserSvg from 'components/svg/UserSvg'
import PokerSvg from 'components/svg/PokerSvg'
import CasinoSvg from 'components/svg/CasinoSvg'
import MenuSvg from 'components/svg/MenuSvg'
import MenuCloseSvg from 'components/svg/MenuCloseSvg'
import JoyStickSvg from 'components/svg/JoyStickSvg'
import { useTranslation } from 'next-i18next'
import { colors } from 'scss/variables'

interface Props {

}

interface ItemProps {
  icon: 'main' | 'poker' | 'casino' | 'menu' | 'close'
  label: string
  onClick: () => void
  link?: string
  itemKey: ActionType
}

enum ActionType {
  Main = 'main',
  Poker = 'poker',
  Casino = 'casino',
  Menu = 'menu'
}
const Item = ({ icon, label, onClick, link, itemKey}: ItemProps) => {
  const linkActive = useIsActiveLink(link ?? '')
  const router = useRouter()
  const appContext = useAppContext()
  const isMenuOpen = appContext.modal === ModalType.profileBurger || appContext.bottomSheet === ModalType.profileBurger
  const isActive = linkActive || (itemKey === ActionType.Menu && isMenuOpen)
  const isActiveDisabled = function () {
    if(isMenuOpen &&  itemKey !== ActionType.Menu){
      return true
    }
    return link === Routes.catalog && router.asPath !== Routes.catalog
  }()
  const color = isActive && !isActiveDisabled ? colors.white : colors.dark200
  const getIcon = () => {
    switch (icon) {
      case 'main':
        return <UserSvg  color={color}/>
        break
      case 'poker':
        return <PokerSvg color={color} />
        break
      case 'casino':
        return <CasinoSvg color={color}/>
        break
      case 'menu':
        return <MenuSvg color={color}/>
        break
      case 'close':
        return <MenuCloseSvg />
        break
    }
  }
  return (
    <div className={classNames(styles.item, { [styles.active]: isActive && !isActiveDisabled })} onClick={onClick}>
      <div className={classNames(styles.icon, { [styles.active]: isActive && !isActiveDisabled })}>
        {getIcon()}
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default function UserFooter(props: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const context = useAppContext()
  const isMenuOpen = context.modal === ModalType.profileBurger || context.bottomSheet === ModalType.profileBurger

  const items = [
    { label: t('tabbar_main'), icon:  'main', key: ActionType.Main, link: '/' },
    { label: t('tabbar_poker'), icon: 'poker', key: ActionType.Poker, link: Routes.poker },
    { label: t('tabbar_casino'), icon: 'casino', key: ActionType.Casino, link: Routes.catalog },
    { label: t('tabbar_menu'), icon: isMenuOpen ? 'close' : 'menu', key: ActionType.Menu },
  ]

  const handleClickItem = (item) => {

    if (isMenuOpen) {
      context.hideModal()
    }
    switch (item.key) {
      case ActionType.Poker:
        if (context.auth) {
          router.push(Routes.poker)
        } else {
          context.showModal(ModalType.registration)
        }
        break
      case ActionType.Casino:
        router.push(Routes.catalog)
        break
      case ActionType.Main:
        router.push('/')
        break
      case ActionType.Menu:
        if (isMenuOpen) {
          context.hideModal()
        } else {
          context.showModal(ModalType.profileBurger)
        }
        break
    }
  }


  return (
    <VisibleXs>
      <div className={classNames(styles.root, { [styles.isOverAll]: isMenuOpen })}>
        {items.slice(0, 2).map((item, index) =>
          <Item onClick={() => handleClickItem(item)} icon={item.icon as any} label={item.label} key={item.key} itemKey={item.key} link={item.link} />
        )}
        <Link href={Routes.richyGames}>
          <a className={styles.joystick}>
            <JoyStickSvg />
          </a>
        </Link>
        {items.slice(2, items.length).map((item, index) =>
          <Item
            onClick={() => handleClickItem(item)}
            link={item.link}
            itemKey={item.key}
            icon={item.icon as any} label={item.label} key={item.key} />
        )}
      </div>
    </VisibleXs>
  )
}

