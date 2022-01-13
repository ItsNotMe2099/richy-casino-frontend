import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { ProfileModalType } from 'types/enums'
import DropdownMenu from 'components/ui/DropdownMenu'

interface Props {
  
}

interface AccountProps {
  icon: string
  currency: string
  amount: string
  main?: boolean
  usdt?: string
}

interface BonusProps {
  color: string
  icon: string
  label: string
  amount: string
}

interface MenuProps {
  icon: string
  label: string
  onClick?: () => void
}

export default function Profile(props: Props) {

  const user = {avatar: '/img/Avatar/avatar.png', 
  nickname: 'Alex', 
  id: '6171361', 
  accounts: [{main: true, currency: 'BTC', icon: '/img/currencies/BTC.svg', amount: '0.00000000', usdt: '0.00000001'}],
  tickets: '256', freebtc: '0.00000001', bonus: '1500 RUB', spins: '23'
}

const tabs = [
  {label: 'Cделать основным'},
  {label: 'Пополнить'},
  {label: 'Вывести'},
  {label: 'Закрыть счет'},
]

const context = useAppContext()

  const Account = ({icon, currency, amount, usdt, main}: AccountProps) => {
    return (
      <div className={classNames(styles.account, {[styles.mainAccount]: main})}>
        <div className={styles.left}>
          <div className={styles.icon}>
            <img src={icon} alt=''/>
          </div>
          <div className={styles.currency}>
            {currency}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.numbers}>
          <div className={styles.usdt}>
            <div className={styles.amount}>
              {currency === 'BTC' ? usdt : amount}
            </div>
            <div className={styles.currency}>
              {currency === 'BTC' && <>USDT</>}
            </div>
          </div>
          {currency === 'BTC' && <div className={styles.btc}>{amount}</div>}
          </div>
          <div className={styles.drop}>
            <DropdownMenu tabs={main ? tabs.slice(1) : tabs} dots/>
          </div>
        </div>
      </div>
    )
  }

  const Bonus = ({color, icon, label, amount}: BonusProps) => {
    return (
      <div className={styles.bonusItem}>
        <div className={styles.bonusLeft}>
          <div className={styles.bonusIcon}>
            <img src={icon} alt=''/>
          </div>
          <div className={styles.bonusLabel} style={{color: color}}>
            {label}
          </div>
        </div>
        <div className={styles.number} style={{color: color}}>
          {amount}
        </div>
      </div>
    )
  }

  const MenuItem = ({icon, label, onClick}: MenuProps) => {
    return (
      <div className={classNames(styles.menuItem, {[styles.active]: label === 'Управлять кошельком'})} onClick={onClick}>
        <div className={styles.menuIcon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.menuLabel}>
          {label}
        </div>
      </div>
    )
  }

  return (
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <Avatar avatar={user.avatar}/>
            <div className={styles.info}>
              <div className={styles.nickname}>
                {user.nickname}
              </div>
              <div className={styles.id}>
                ID {user.id}
              </div>
            </div>
          </div>
          <div className={styles.logout}>
            <Button>
              <img src='/img/icons/logout.svg' alt=''/>
              Выйти
            </Button>
          </div>
        </div>
        <div className={styles.accounts}>
          <div className={styles.main}>
            <div className={styles.title}>
              Основной счет
            </div>
            {user.accounts.filter(item => item.main).map((item, index) =>
              <Account icon={item.icon} currency={item.currency} amount={item.amount} usdt={item.usdt} main={item.main} key={index}/>
            )}
            <div className={styles.actions}>
              <Button className={styles.btn}>
                Вывод
              </Button>
              <Button className={styles.btn}>
                Обмен
              </Button>
              <Button size='normal' background='payGradient500' className={styles.wallet}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
            </div>
          </div>
          <div className={styles.bonus}>
            <div className={styles.title}>
              Бонусные 
            </div>
            <Bonus color='#587DFF' label='Lottery tickets' amount={user.tickets} icon='/img/Profile/icons/ticket.svg'/>
            <Bonus color='#FFD12F' label='FreeBitcoin' amount={user.freebtc} icon='/img/Profile/icons/btc.svg'/>
            <Bonus color='#7BD245' label='Bonus' amount={user.bonus} icon='/img/Profile/icons/gift.svg'/>
            <Bonus color='#F81AAC' label='Free spin' amount={user.spins} icon='/img/Profile/icons/spin.svg'/>
          </div>
        </div>
        <div className={styles.menu}>
            <MenuItem icon='/img/Profile/icons/wallet.svg' label='Управлять кошельком'/>
            <MenuItem icon='/img/Profile/icons/clock.svg' label='История ставок'/>
            <MenuItem icon='/img/Profile/icons/favorite.svg' label='Избранное'/>
            <MenuItem icon='/img/Profile/icons/support.svg' label='Поддержка'/>
            <MenuItem icon='/img/Profile/icons/wallet2.svg' label='История платежей' onClick={() => context.showModal(ProfileModalType.paymentHistory)}/>
            <MenuItem icon='/img/Profile/icons/settings.svg' label='Настройки'/>
        </div>
      </div>
  )
}
