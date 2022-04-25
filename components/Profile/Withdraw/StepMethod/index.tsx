import styles from './index.module.scss'

import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
import {PaymentMethod} from 'types/interfaces'
import {PaymentMethodCryptoCard} from 'components/Profile/Wallet/PaymentMethodCryptoCard'
import {useTranslation} from 'next-i18next'
import {UserBalanceSelectField} from 'components/ui/Inputs/UserBalanceSelectField'
import Converter from 'utils/converter'
import {useAppContext} from 'context/state'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import classNames from 'classnames'

enum Step{
  Method = 'method',
  Currency = 'currency',
  Form = 'form'
}

interface Props {
  account?: IUserBalanceCurrency
  onChange: (method: PaymentMethod) => void
  onChangeUserAccount: (currency: IUserBalanceCurrency) => void
}
export default function StepMethod(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const userBalances = context.user.balance.currencies.real
  return (
    <div className={styles.root}>
      <div className={classNames(styles.label, styles.labelAccount)}>
        {t('withdraw_form_account_main')}
      </div>
      <UserBalanceSelectField className={styles.account} onChange={(i) => props.onChangeUserAccount(userBalances.find(a => a.currency === i.value))}  options={Converter.convertUserBalanceCurrencyToOptions(context.user.balance.currencies.real)}
                              currentItem={Converter.convertUserBalanceCurrencyToOption(props.account)}
      />
      <div className={styles.label}>
        {t('wallet_payment_method_choose')}
      </div>
      <PaymentMethodList>
        <PaymentMethodCryptoCard onClick={() => props.onChange(PaymentMethod.Crypto)}/>
      </PaymentMethodList>
    </div>
  )
}
