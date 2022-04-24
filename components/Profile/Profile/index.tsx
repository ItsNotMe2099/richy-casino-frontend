import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'
import AddNewAccount from './components/AddNewAccount'
import Converter from 'utils/converter'
import UserUtils from 'utils/user'
import {useTranslation} from 'next-i18next'
import {Account} from 'components/Profile/Profile/components/Account'
import {Bonus} from 'components/Profile/Profile/components/Bonus'
import {MenuItem} from 'components/Profile/Profile/components/MenuItem'
import classNames from 'classnames'

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
  const context = useAppContext()


  const handleLogout = () => {
    context.hideModal()
    context.logout()
  }
  const mainAccount = UserUtils.getMainBalanceReal(context.user)
  const otherAccounts = UserUtils.getOtherBalancesReal(context.user)
  console.log('otherAccounts1', otherAccounts)
  const bonusAccounts = UserUtils.getBonusBalances(context.user)
  const currenciesToAdd = context.currencies.filter(i => !context.user.balance.currencies.totals.find(a => a.currency === i.iso))
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
            <span className={styles.btnLogoutName}>{t('profile_logout')}</span>
          </Button>
        </div>
      </div>
      <div className={styles.accounts}>
        <div className={styles.left}>
          <div className={classNames(styles.field, styles.main)}>
          <div className={styles.title}>
            {t('profile_accounts_main_title')}
          </div>
          {mainAccount && <Account account={mainAccount} isMain hasActions/>}
          </div>
          {otherAccounts.length === 0 &&
          <>
            <AddNewAccount
              options={Converter.convertCurrencyToOptions(currenciesToAdd)}
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
            <Button onClick={() => context.showModal(ProfileModalType.wallet)} size='normal' background='payGradient500'
                    className={styles.wallet}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
          </div>
          {otherAccounts.length > 0 && <div className={classNames(styles.field, styles.additional)}>
              <div className={styles.title}>
                {t('profile_accounts_additional_title')}
              </div>
              {otherAccounts.map((account, index) => <Account key={account.currency} hasActions account={account}/>)}
            </div>}
          {otherAccounts.length > 0  && currenciesToAdd.length > 0 && <AddNewAccount
              options={Converter.convertCurrencyToOptions(currenciesToAdd)}
            />}

          {bonusAccounts.length > 0 && <div className={classNames(styles.field, styles.additional)}>
            <div className={styles.title}>
              {t('profile_accounts_bonus_title')}
            </div>
            {bonusAccounts.map((account, index) => <Account key={account.currency} account={account}/>)}
          </div>}

        </div>
        <div className={styles.bonus}>
          <div className={styles.title}>
            {t('profile_accounts_bonus')}
          </div>
          <Bonus color='#587DFF' label={t('profile_accounts_bonus_lottery')}
                 amount={context.user.extraBalances.lotteryTickets ?? 0} icon='/img/Profile/icons/ticket.svg'/>
          <Bonus color='#F81AAC' label={t('profile_accounts_bonus_free_spin')}
                 amount={context.user.extraBalances.freespinAmount ?? 0} icon='/img/Profile/icons/spin.svg'/>
        </div>
      </div>
      <div className={styles.menu}>
        <MenuItem icon='/img/Profile/icons/wallet.svg' label={t('profile_menu_wallet')} isActive/>
        <MenuItem icon='/img/Profile/icons/clock.svg' label={t('profile_menu_bets_history')}
                  onClick={() => context.showModal(ProfileModalType.betsHistory)}/>
        <MenuItem icon='/img/Profile/icons/favorite.svg' label={t('profile_menu_favorite')}
                  onClick={() => context.showModal(ProfileModalType.favorite)}/>
        <MenuItem icon='/img/Profile/icons/support.svg' label={t('profile_menu_support')}/>
        <MenuItem icon='/img/Profile/icons/wallet2.svg' label={t('profile_menu_payments_history')}
                  onClick={() => context.showModal(ProfileModalType.paymentHistory)}/>
        <MenuItem icon='/img/Profile/icons/settings.svg' label={t('profile_menu_settings')}
                  onClick={() => context.showModal(ProfileModalType.settings)}/>
      </div>
    </div>
  )
}
