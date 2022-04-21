import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { ProfileModalType } from 'types/enums'
import DropdownMenu from 'components/ui/DropdownMenu'
import { useState } from 'react'
import InfoRepository from 'data/repositories/InfoRepository'
import AddNewAccount from './components/AddNewAccount'
import Converter from 'utils/converter'
import UserUtils from 'utils/user'
import {useTranslation} from 'next-i18next'

interface Props {

}

interface AccountProps {
  icon: string
  currency: string
  amount: number
  main?: boolean
  usdt?: string
}

interface BonusProps {
  color: string
  icon: string
  label: string
  amount: string | number
}

interface MenuProps {
  icon: string
  label: string
  onClick?: () => void
}

export default function Profile(props: Props) {
  const {t} = useTranslation()

const options = [
  {label: t('profile_account_action_set_main')},
  {label: t('profile_account_action_deposit')},
  {label: t('profile_account_action_withdrawal')},
  {label: t('profile_account_action_close')},
]

const [accounts, setAccount] = useState([])
const [currencies, setCurrencies] = useState([])

const getCurrencies = async () => {
  const res = await InfoRepository.getCurrencies()
  setCurrencies(res)
}

const handleAddNewAccount = (itemNew) => {
    setAccount(accounts => [...accounts, itemNew])
}

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
              {currency === 'BTC' ? <>USDT</> : currency}
            </div>
          </div>
          {currency === 'BTC' && <div className={styles.btc}>{amount}</div>}
          </div>
          <div className={styles.drop}>
            <DropdownMenu options={main ? options.slice(1) : options} dots textLeft/>
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
      <div className={classNames(styles.menuItem, {[styles.active]: label === t('profile_menu_wallet')})} onClick={onClick}>
        <div className={styles.menuIcon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.menuLabel}>
          {label}
        </div>
      </div>
    )
  }
  const handleLogout = () => {
    context.hideModal()
    context.logout()
  }
  const mainAccount = UserUtils.getMainBalance(context.user)
  const otherAccounts = UserUtils.getOtherBalances(context.user)
  return (
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <Avatar avatar={'/img/Avatar/avatar.png'}/>
            <div className={styles.info}>
              <div className={styles.nickname}>
                {UserUtils.formatUserName(context.user)}
              </div>
              <div className={styles.id}>
                ID {context.user.id}
              </div>
            </div>
          </div>
          <div className={styles.logout}>
            <Button onClick={handleLogout}>
              <img src='/img/icons/logout.svg' alt=''/>
              <span>{t('profile_logout')}</span>
            </Button>
          </div>
        </div>
        <div className={styles.accounts}>
          <div className={styles.main}>
            <div className={styles.title}>
              {t('profile_accounts_main_title')}
            </div>
            {mainAccount && <Account icon={UserUtils.getCurrencyIcon(mainAccount.currency)} currency={mainAccount.currency} amount={mainAccount.value} main />}

            {context.isDesktop &&
            <>
            {accounts.length > 0 &&
            <div className={styles.newAcc}>
              <div className={styles.title}>
                {t('profile_accounts_bonus_title')}
              </div>

            </div>}
            <AddNewAccount
            options={Converter.convertCurrencyToOptions(currencies)}
            onChange={(item) => handleAddNewAccount(item)}
            onTriggerClick={getCurrencies}
            />
            </>
            }
            <div className={styles.actions}>
              <div className={styles.notGreen}>
              <Button className={styles.btn} onClick={() => context.showModal(ProfileModalType.withdraw)}>
                {t('profile_withdrawal')}
              </Button>
              <Button className={styles.btn} onClick={() => context.showModal(ProfileModalType.exchange)}>
                {t('profile_exchange')}
              </Button>
              </div>
              <Button  onClick={() => context.showModal(ProfileModalType.wallet)} size='normal' background='payGradient500' className={styles.wallet}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
            </div>
            {context.isMobile &&
            <>
            {accounts.length > 0 &&
            <div className={styles.newAcc}>
              <div className={styles.title}>
                {t('profile_accounts_additional_title')}
              </div>
                {otherAccounts.map((acc, index) => <Account icon={UserUtils.getCurrencyIcon(acc.currency)} currency={acc.currency} amount={acc.value} key={acc.value}/>

              )}
            </div>}
            <AddNewAccount
            options={Converter.convertCurrencyToOptions(currencies)}
            onChange={(item) => handleAddNewAccount(item)}
            onTriggerClick={getCurrencies}
            />
            </>
            }
          </div>
          <div className={styles.bonus}>
            <div className={styles.title}>
              {t('profile_accounts_bonus_title')}
            </div>
            <Bonus color='#587DFF' label={t('profile_accounts_bonus_lottery')} amount={context.user.extraBalances.lotteryTickets ?? 0} icon='/img/Profile/icons/ticket.svg'/>
            <Bonus color='#FFD12F' label={t('profile_accounts_bonus_free_bitcoin')} amount={context.user.extraBalances.freeBitcoin ?? 0} icon='/img/Profile/icons/btc.svg'/>
            {Converter.convertUserBalanceCurrencyToOptions(context.user.balance.currencies.bonus).map( i => <Bonus key={i.value} color='#7BD245' label={t('profile_accounts_bonus_bonus')} amount={`${i.value} ${i.label}`} icon='/img/Profile/icons/gift.svg'/>)}

            <Bonus color='#F81AAC' label={t('profile_accounts_bonus_free_spin')} amount={context.user.extraBalances.freespinAmount ?? 0} icon='/img/Profile/icons/spin.svg'/>
          </div>
        </div>
        <div className={styles.menu}>
            <MenuItem icon='/img/Profile/icons/wallet.svg' label={t('profile_menu_wallet')}/>
            <MenuItem icon='/img/Profile/icons/clock.svg' label={t('profile_menu_bets_history')} onClick={() => context.showModal(ProfileModalType.betsHistory)}/>
            <MenuItem icon='/img/Profile/icons/favorite.svg' label={t('profile_menu_favorite')} onClick={() => context.showModal(ProfileModalType.favorite)}/>
            <MenuItem icon='/img/Profile/icons/support.svg' label={t('profile_menu_support')}/>
            <MenuItem icon='/img/Profile/icons/wallet2.svg' label={t('profile_menu_payments_history')} onClick={() => context.showModal(ProfileModalType.paymentHistory)}/>
            <MenuItem icon='/img/Profile/icons/settings.svg' label={t('profile_menu_settings')} onClick={() => context.showModal(ProfileModalType.settings)}/>
        </div>
      </div>
  )
}
