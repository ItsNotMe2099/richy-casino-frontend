import styles from './index.module.scss'
import {useRouter} from 'next/router'
import Overflow from './Overflow'
import Link from 'next/link'
import classNames from 'classnames'

import {Sticky} from 'react-sticky'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ModalType} from 'types/enums'
import {Routes} from 'types/routes'
import AviatorSvg from 'components/svg/AviatorSvg'
import Image from 'next/image'

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
    {label: t('menu_casino'), link: Routes.catalog},
    {label: t('menu_richy'), link: Routes.richyGames},
    {label: t('menu_free_bitcoin'), link: Routes.freeBitcoin},
    {label: t('menu_wheel_of_fortune'), link: '/wheel_of_fortune', onClick: () => appContext.showModal(ModalType.fortune)},
    {label: t('menu_lottery'), link: Routes.lottery},
    {label: t('menu_live_casino'), link: Routes.catalogLive},
    {label: <AviatorSvg className={styles.aviatorMenuItem}/>, link: Routes.aviator},
    {label: t('menu_poker'), link: Routes.poker},
    {label: t('menu_tournaments'), link: Routes.tournaments},
    {label: t('menu_bonuses'), link: Routes.bonuses},
    {label: t('menu_chess'), link: Routes.chess},
  ]

  const renderMenu = (className, style) => {
    return  <div className={className} style={style}>
      <Link href='/'>
        <a className={styles.logo}><Image src={'/img/layout/logo.png'} height={36} width={97.55}/></a>
      </Link>
      <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options} dropDownClassName={styles.dropDown}/>
    </div>
  }
  return (
     <Sticky>
      {({style, isSticky}) => renderMenu(classNames(styles.menu, {[styles.isSticky]: isSticky, [styles.isMobile]: appContext.isMobile}), style)}
    </Sticky>
  )
}

