import styles from './index.module.scss'
import Logo from 'components/svg/Logo'
import {useRouter} from 'next/router'
import Overflow from './Overflow'
import Link from 'next/link'
import classNames from 'classnames'

import {Sticky} from 'react-sticky'

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
  return (
    <Sticky>
      {({style, isSticky}) => <div className={classNames(styles.menu, {[styles.isSticky]: isSticky})} style={style}>
        <Link href='/'>
          <a className={styles.logo}><Logo/></a>
        </Link>
        <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options}/>
      </div>}
    </Sticky>
  )
}

