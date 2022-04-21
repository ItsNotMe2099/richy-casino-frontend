import styles from './index.module.scss'
import Logo from 'components/svg/Logo'
import {useRouter} from 'next/router'
import Overflow from './Overflow'
import Link from 'next/link'
import classNames from 'classnames'

import {Sticky} from 'react-sticky'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {LINKS} from 'types/constants'
import {ModalType} from 'types/enums'

interface Props {
  children?: React.ReactNode
  className?: string
}

interface UserBonusProps {
  icon: string
  amount?: string
  color?: string
}

interface Option {
  icon: string
  usdt: string
  dg: string
  amount: string
  iso: string
  type: number
}

export default function Menu(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const {route: currentRoute, asPath: currentPath} = useRouter()
  const options = [
    {label: t('menu_main'), link: '/'},
    {label: t('menu_casino'), link: '/catalog'},
    {label: t('menu_richy'), link: LINKS.RICHY_GAMES},
    {label: t('menu_free_bitcoin'), link: '/freebitcoin'},
    {label: t('menu_wheel_of_fortune'), link: '/wheel_of_fortune', onClick: () => appContext.showModal(ModalType.fortune)},
    {label: t('menu_lottery'), link: '/lottery'},
    {label: t('menu_live_casino'), link: '/catalog/category/live'},
    {label: t('menu_aviator'), link: '/aviator'},
    {label: t('menu_poker'), link: '/poker'},
    {label: t('menu_tournaments'), link: '/tournaments'},
    {label: t('menu_bonuses'), link: '/bonuses'},
    {label: t('menu_chess'), link: '/chess'},
  ]
  const renderMobile = () => {
    return  <div className={classNames(styles.menu, )} >
      <Link href='/'>
        <a className={styles.logo}><Logo/></a>
      </Link>
      <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options}/>
    </div>
  }
  const renderMenu = (className, style) => {
    return  <div className={className} style={style}>
      <Link href='/'>
        <a className={styles.logo}><Logo/></a>
      </Link>
      <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options}/>
    </div>
  }
  return ( appContext.isDesktop ?
     <Sticky>
      {({style, isSticky}) => renderMenu(classNames(styles.menu, {[styles.isSticky]: isSticky}), style)}
    </Sticky>
      :
      renderMenu(classNames(styles.menu, {[styles.isMobile]: true}), {})
  )
}

