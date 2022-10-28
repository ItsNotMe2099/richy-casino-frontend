import styles from './index.module.scss'
import classNames from 'classnames'
import DropdownMenu from 'components/ui/DropdownMenu'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {ProfileModalType, SnackbarType} from 'types/enums'
import UserRepository from 'data/repositories/UserRepository'
import {useState} from 'react'
import Spinner from 'components/ui/Spinner'
import {WithdrawModalArguments} from 'types/interfaces'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

enum Action{
  SetMain = 'setMain',
  Deposit = 'deposit',
  Withdrawal = 'withdrawal'
}
interface Props {
  account: IUserBalanceCurrency
  isMain?: boolean
  hasActions?: boolean
}

export  const Account = (props: Props) => {
  const {t} = useTranslation()
  const context = useAppContext()
  const [loading, setLoading] = useState(false)
  const options = [
  ...(!props.isMain ? [{label: t('profile_account_action_set_main'), key: Action.SetMain}]: []),
    {label: t('profile_account_action_deposit'), key: Action.Deposit},
    {label: t('profile_account_action_withdrawal'), key: Action.Withdrawal},
//    {label: t('profile_account_action_close')},
  ]
  const handleClick = async (item) => {
    switch (item.key){
      case Action.SetMain:
        setLoading(true)
        try {
          await UserRepository.changeDefaultCurrency(props.account.currency)
          await context.updateUserFromCookies()
          await context.onChangeMainCurrency(props.account.currency)
        }catch (e) {
          context.showSnackbar(e, SnackbarType.error)
        }
        setLoading(false)
        break
      case Action.Deposit:
        context.showModalProfile(ProfileModalType.wallet)
        break
      case Action.Withdrawal:

        context.showModalProfile(ProfileModalType.withdraw, {account: props.account} as WithdrawModalArguments)
        break
    }
  }
    return (
      <div className={classNames(styles.root, {[styles.isMain]: props.isMain})}>
        <div className={styles.left}>
            <CurrencySvg currencyIso={props.account.currency} color className={styles.icon}/>

          <div className={styles.currency}>
            {props.account.currency}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.numbers}>
          <div className={styles.calculated}>
            <div className={styles.amount}>
              {props.account.value}
            </div>
            <div className={styles.currency}>
              {props.account.currency}
            </div>
          </div>
          <div className={styles.main}>{props.account.calculated}  {props.account.mainCurrency}</div>
          </div>
          {props.hasActions && <div className={styles.drop}>
            {loading ?  <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/> : <DropdownMenu options={options} dots textLeft onChange={handleClick}/>}
          </div>}
        </div>
      </div>
    )
  }
