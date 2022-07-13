import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Logo from 'components/svg/Logo'
import {useRouter} from 'next/router'
import Link from 'next/link'
import LangSelect from 'components/for_pages/Common/LangSelect'
import {ModalType, ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import ProfileAccountsMenu from './components/Profile/ProfileAccountsMenu'
import ProfileMenu from './components/Profile/ProfileMenu'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {useTranslation} from 'next-i18next'
import {Routes} from 'types/routes'
import {usePwaContext} from 'context/pwa_state'
import { ReactElement } from 'react'

interface Props {
  children?: React.ReactNode
  className?: string
  rightButton?: ReactElement
}

interface UserBonusProps {
  icon: string
  amount?: string | number
  color?: string
}

interface Lang {
  icon: string
  lang: string
}

export default function Header(props: Props) {
  const {t} = useTranslation()
  const {route: currentRoute, asPath: currentPath} = useRouter()
  
  const context = useAppContext()
  const pwaContext = usePwaContext()

  const user = context.user
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

  const handleAppClick = () => {
      context.showModal(ModalType.mobileApp)
  }




  return (
    <div>
      <div className={styles.root} id='top'>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.apps}>
              {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
              <div className={styles.btn}><Button size='extraSmall' background='dark700' onClick={handleAppClick}><img
                src='/img/layout/top/android.svg' alt=''/></Button></div>
              <Button size='extraSmall' background='dark700' onClick={handleAppClick}><img src='/img/layout/top/apple.svg' alt=''/></Button>
            </div>
            <div className={styles.bonuses}>
              <Link href={Routes.bonuses}>
                <a className={styles.bonus}>
                <div className={styles.gift}>
                  <img src='/img/layout/top/gift.svg' alt=''/>
                </div>
                <div className={styles.textGift}>{t('header_bonuses')}</div>
                </a>
              </Link>
              <Link href={Routes.freeBitcoin}>
              <a className={styles.bonus}>
                <div className={styles.free}>{t('header_freebitcoin_badge')}</div>
                <div className={styles.bitcoin}>
                  <img src='/img/layout/top/bitcoin.svg' alt=''/>
                </div>
                <div className={styles.textBitcoin}>{t('header_freebitcoin')}</div>
              </a>
             </Link>
              <div className={styles.bonus} onClick={() => context.showModal(ModalType.fortune)}>
                <div className={styles.wheel}>
                  <img src='/img/layout/top/wheel.svg' alt=''/>
                </div>
                <div className={styles.textWheel}>{t('header_wheel_of_fortune')}</div>
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
                                                      background='dark700'>{t('header_login')}</Button></div>
                <div className={styles.reg}>
                  <Button onClick={() => context.showModal(ModalType.registration)} size='normal'
                          background='payGradient500'><img src='/img/layout/top/person.svg' alt=''/>{t('header_registration')}</Button>
                </div>
              </>
              :
              <div className={styles.userBtns}>
                {/*context.user.extraBalances &&
                 <div className={styles.userBonuses} onClick={() => context.showModal(ProfileModalType.profile)}>
                    <UserBonus icon='/img/icons/ticket.svg' amount={context.user.extraBalances.lotteryTickets ?? 0} color='#427BF8'/>
                    <UserBonus icon='/img/icons/spin.svg' amount={context.user.extraBalances.freespinAmount ?? 0} color='#F81AAC'/>
                  </div>
            */}
                {!user.flags.isHideBalance && <ProfileAccountsMenu/>}
                <HiddenXs>
                  <ProfileMenu/>
                </HiddenXs>
                <Button onClick={() => context.showModal(ProfileModalType.wallet)} size='normal'
                        background='payGradient500' className={styles.wallet}>
                  <HiddenXs><img src='/img/icons/wallet.svg' alt=''/></HiddenXs>{t('header_deposit')}</Button>
                <VisibleXs>
                  {props.rightButton ? props.rightButton : <ProfileMenu className={styles.proMenu}/>}
                </VisibleXs>
              </div>
            }
            <div className={styles.lang}><LangSelect /></div>
            {/*<Button className={styles.chat} size='normal' background='dark700'><img src='/img/layout/top/chat.svg' alt=''/></Button>*/}
          </div>
        </div>
      </div>

    </div>
  )
}

