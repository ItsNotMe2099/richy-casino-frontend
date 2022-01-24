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

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Header(props: Props) {

  const { route: currentRoute, asPath: currentPath } = useRouter()
  const context = useAppContext()

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

  return (
    <>
    <div className={styles.root} id='top'>
      <div onClick={() => context.showModal(ProfileModalType.profile)}>PROFILE</div>
      <div onClick={() => context.showModal(ProfileModalType.wallet)}>WALLET</div>
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
        <div className={styles.login}><Button  onClick={() => context.showModal(ModalType.login)}  size='small' background='dark700'>Войти</Button></div>
        <div className={styles.reg}>
          <Button onClick={() => context.showModal(ModalType.registration)} size='normal' background='payGradient500'><img src='/img/layout/top/person.svg' alt=''/>Регистрация</Button>
        </div>
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

