import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Logo from 'components/svg/Logo'
import {useRouter} from 'next/router'
import Link from 'next/link'
import LangSelect from 'components/for_pages/Common/LangSelect'
import { useEffect, useState} from 'react'
import {ModalType, ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'
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

interface Lang {
  icon: string
  lang: string
}

export default function Header(props: Props) {

  const {route: currentRoute, asPath: currentPath} = useRouter()
  const context = useAppContext()

  const user = true//context.user

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

  const langs = [
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'En'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
  ]

  const [activeLangIcon, setActiveLangIcon] = useState(langs[0].icon)
  const [activeLang, setActiveLang] = useState(langs[0].lang)

  const currencies = [
    {label: 'USD', value: '99.99', symbol: '/img/Select/BTC.png'},
    {label: 'BTC', value: '0.00025867', symbol: '/img/Select/BTC.png', crypto: true},
  ]

  const [current, setCurrent] = useState(currencies[0])

  const handleChange = (item) => {
    setCurrent(item)
  }

  const handleChangeLang = (item: Lang) => {
    setActiveLangIcon(item.icon)
    setActiveLang(item.lang)
  }


  return (
    <div>
      <div className={styles.root} id='top'>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.apps}>
              {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
              <div className={styles.btn}><Button size='extraSmall' background='dark700'><img
                src='/img/layout/top/android.svg' alt=''/></Button></div>
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
                <div className={styles.login}><Button onClick={() => context.showModal(ModalType.login)} size='small'
                                                      background='dark700'>Войти</Button></div>
                <div className={styles.reg}>
                  <Button onClick={() => context.showModal(ModalType.registration)} size='normal'
                          background='payGradient500'><img src='/img/layout/top/person.svg' alt=''/>Регистрация</Button>
                </div>
              </>
              :
              <div className={styles.userBtns}>
                <HiddenXs>
                  <div className={styles.userBonuses} onClick={() => context.showModal(ProfileModalType.profile)}>
                    <UserBonus icon='/img/icons/ticket.svg' amount='256' color='#427BF8'/>
                    <UserBonus icon='/img/icons/bitcoin.svg' amount='256' color='#FFD12F'/>
                    <UserBonus icon='/img/icons/spin.svg' amount='256' color='#F81AAC'/>
                    <UserBonus icon='/img/icons/dollar.svg' amount='256' color='#7BD245'/>
                  </div>
                </HiddenXs>
                <ProfileAccountsMenu
                  currentItem={current}
                  options={currencies}
                  onChange={(item) => handleChange(item)}
                />
                <HiddenXs>
                  <ProfileMenu className={styles.accMenu}/>
                </HiddenXs>
                <Button onClick={() => context.showModal(ProfileModalType.wallet)} size='normal'
                        background='payGradient500' className={styles.wallet}>
                  <HiddenXs><img src='/img/icons/wallet.svg' alt=''/></HiddenXs>Пополнить</Button>
                <VisibleXs>
                  <ProfileMenu className={styles.proMenu}/>
                </VisibleXs>
              </div>
            }
            <div className={styles.lang}><LangSelect options={langs} activeIcon={activeLangIcon} lang={activeLang} onChange={(item) => handleChangeLang(item)}/></div>
            {/*<Button className={styles.chat} size='normal' background='dark700'><img src='/img/layout/top/chat.svg' alt=''/></Button>*/}
          </div>
        </div>
      </div>

    </div>
  )
}

