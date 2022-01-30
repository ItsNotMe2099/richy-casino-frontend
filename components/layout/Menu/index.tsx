import styles from './index.module.scss'
import Logo from 'components/svg/Logo'
import {useRouter} from 'next/router'
import Overflow from './Overflow'
import Link from 'next/link'
import classNames from 'classnames'

import {Sticky, StickyContainer} from 'react-sticky'
import {useAppContext} from 'context/state'

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
  const appContext = useAppContext()
  const {route: currentRoute, asPath: currentPath} = useRouter()
  const options = [
    {label: 'Главная', link: '/'},
    {label: 'Казино', link: '/catalog'},
    {label: 'Richy Game', link: '#'},
    {label: 'Free Bitcoin', link: '/freebitcoin'},
    {label: 'Wheel of Fortuna', link: '#'},
    {label: 'Лотерея', link: '/lottery'},
    {label: 'Live Casino', link: '#'},
    {label: 'Aviator', link: '#'},
    {label: 'Poker', link: '#'},
    {label: 'Some Option', link: '#'},
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
   <StickyContainer><Sticky>
      {({style, isSticky}) => renderMenu(classNames(styles.menu, {[styles.isSticky]: isSticky}), style)}
    </Sticky></StickyContainer>  : renderMenu(classNames(styles.menu, {[styles.isMobile]: true}), {})
  )
}

