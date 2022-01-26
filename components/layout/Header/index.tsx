import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Logo from 'components/svg/Logo'
import { useRouter } from 'next/router'
import Overflow from './components/Overflow'
import Link from 'next/link'
import LangSelect from 'components/for_pages/Common/LangSelect'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ModalType, ProfileModalType } from 'types/enums'
import { useAppContext } from 'context/state'
//import cookie from 'js-cookie'
import ProfileAccountsMenu from './components/Profile/ProfileAccountsMenu'
import ProfileMenu from './components/Profile/ProfileMenu'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

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

export default function Header(props: Props) {

  const { route: currentRoute, asPath: currentPath } = useRouter()
  const context = useAppContext()

  const user = context.auth

  const UserBonus = ({icon, amount, color}: UserBonusProps) => {
    return (
      <div className={styles.userBonus}>
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.amount} style={{color: color}}>{amount}</div>
      </div>
    )
  }

  const userAccounts = [
    {icon: '/img/currencies/BTC.svg', usdt: '3136.00000', dg: '0.0000004', amount: '3136.00000', iso: 'USDT', type: 2},
    {icon: '/img/currencies/BTC.svg', usdt: '3136.00000', dg: '0.0000004', amount: '3136.00000', iso: 'DG', type: 2},
    {icon: '/img/currencies/BTC.svg', usdt: '3136.00000', dg: '0.0000004', amount: '3136.00000', iso: 'USD', type: 1},
    {icon: '/img/currencies/BTC.svg', usdt: '3136.00000', dg: '0.0000004', amount: '3136.00000', iso: 'RUB', type: 1},
  ]

  const options = [
    { label: 'Главная', link: '/' },
    { label: 'Казино', link: '/catalog' },
    { label: 'Richy Game', link: '#' },
    { label: 'Free Bitcoin', link: '/freebitcoin' },
    { label: 'Wheel of Fortuna', link: '#' },
    { label: 'Лотерея', link: '/lottery' },
    { label: 'Live Casino', link: '#' },
    { label: 'Aviator', link: '#' },
    { label: 'Poker', link: '#' },
    { label: 'Some Option', link: '#' },
  ]

  const profileOptions = [
    {label: 'Профиль'},
    {label: 'Пополнить счет'},
    {label: 'Вывод средств'},
    {label: 'История ставок'},
    {label: 'Реферальная программа'},
    {label: 'Настройки'},
    {label: 'Кошелек'},
    {label: 'Выйти'},
  ]

  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 90) {
      setIsScrolled(true)
    }
    else{
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  const [activeIcon, setActiveIcon] = useState(userAccounts[0].icon)
  const [activeIso, setActiveIso] = useState(userAccounts[0].iso)
  const [activeAmount, setActiveAmount] = useState(userAccounts[0].amount)
  const [activeType, setActiveType] = useState(userAccounts[0].type)

  const handleChange = (item: Option) => {
    setActiveAmount(item.amount)
    setActiveIcon(item.icon)
    setActiveIso(item.iso)
    setActiveType(item.type)
  }

  return (
    <>
    <div className={styles.root} id='top'>
      <div onClick={() => context.showModal(ProfileModalType.profile)}>PROFILE</div>
      <div onClick={() => context.showModal(ProfileModalType.wallet)}>WALLET</div>
      <div onClick={() => context.showModal(ModalType.bonus)}>BONUS</div>
      <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.apps}>
          {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
          <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/android.svg' alt=''/></Button></div>
          <Button size='extraSmall' background='dark700'><img src='/img/layout/top/apple.svg' alt=''/></Button>
        </div>
        <div className={styles.bonuses}>
          <div className={styles.bonus}>
            <div className={styles.gift}>
              <img src='/img/layout/top/gift.svg' alt=''/>
            </div>
            <div className={styles.textGift}>Бонусы</div>
          </div>
          <div className={styles.bonus}>
            <div className={styles.free}>FREE</div>
            <div className={styles.bitcoin}>
              <img src='/img/layout/top/bitcoin.svg' alt=''/>
            </div>
            <div className={styles.textBitcoin}>Free Bitcoin</div>
          </div>
          <div className={styles.bonus} onClick={() => context.showModal(ModalType.fortune)}>
            <div className={styles.wheel}>
              <img src='/img/layout/top/wheel.svg' alt=''/>
            </div>
            <div className={styles.textWheel}>Wheel of Fortune</div>
          </div>
        </div>
      </div>
      {currentRoute === '/' || currentPath === '/' ?
      <div className={styles.logoMobile}><Logo/></div>
      :
      <Link href='/'>
        <a className={styles.logoMobile}><Logo/></a>
      </Link>
      }
      <div className={styles.right}>
        {!user ?
        <>
        <div className={styles.login}><Button  onClick={() => context.showModal(ModalType.login)}  size='small' background='dark700'>Войти</Button></div>
        <div className={styles.reg}>
          <Button onClick={() => context.showModal(ModalType.registration)} size='normal' background='payGradient500'><img src='/img/layout/top/person.svg' alt=''/>Регистрация</Button>
        </div></>
        :
        <div className={styles.userBtns}>
          <HiddenXs>
          <div className={styles.userBonuses}>
            <UserBonus icon='/img/icons/ticket.svg' amount='256' color='#427BF8'/>
            <UserBonus icon='/img/icons/bitcoin.svg' amount='256' color='#FFD12F'/>
            <UserBonus icon='/img/icons/spin.svg' amount='256' color='#F81AAC'/>
            <UserBonus icon='/img/icons/dollar.svg' amount='256' color='#7BD245'/>
          </div>
          </HiddenXs>
          <ProfileAccountsMenu
          options={userAccounts}
          activeIcon={activeIcon}
          activeAmount={activeAmount}
          activeIso={activeIso}
          activeType={activeType}
          onChange={(item) => handleChange(item)}
          className={styles.accMenu}
          />
          <HiddenXs>
            <ProfileMenu options={profileOptions} className={styles.accMenu}/>
          </HiddenXs>
          <Button size='normal' background='payGradient500' className={styles.wallet}>
            <HiddenXs><img src='/img/icons/wallet.svg' alt=''/></HiddenXs>Пополнить</Button>
          <VisibleXs>
            <ProfileMenu options={profileOptions} className={styles.proMenu}/>
          </VisibleXs>
        </div>
        }
        <div className={styles.lang}><LangSelect/></div>
        {/*<Button className={styles.chat} size='normal' background='dark700'><img src='/img/layout/top/chat.svg' alt=''/></Button>*/}
      </div>
    </div>
    </div>
    <div className={classNames(styles.menu, {[styles.scrolled]: isScrolled})}>
    {currentRoute === '/' || currentPath === '/' ?
      <div className={styles.logo}><Logo/></div>
        :
      <Link href='/'>
        <a className={styles.logo}><Logo/></a>
      </Link>
    }
      <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options}/>
    </div>
    </>
  )
}

