import styles from './index.module.scss'

import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
import {PaymentMethodCryptoCard} from 'components/Profile/Wallet/PaymentMethodCryptoCard'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {runtimeConfig} from 'config/runtimeConfig'

enum Step{
  Method = 'method',
  Currency = 'currency',
  Form = 'form'
}

interface Props {
  account?: IUserBalanceCurrency
  paymentMethods: IPaymentMethod[]
  onChange: (method: IPaymentMethod, paymentSystem?: IPaymentSystem | null) => void
  onChangeUserAccount: (currency: IUserBalanceCurrency) => void
}
export default function StepMethod(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const userBalances = context.user.balance.currencies.real
  return (
    <div className={styles.root}>
      {/* <div className={classNames(styles.label, styles.labelAccount)}>
        {t('withdraw_form_account_main')}
      </div>
      <UserBalanceSelectField className={styles.account} onChange={(i) => props.onChangeUserAccount(userBalances.find(a => a.currency === i.value))}  options={Converter.convertUserBalanceCurrencyToOptions(context.user.balance.currencies.real)}
                              currentItem={Converter.convertUserBalanceCurrencyToOption(props.account)}
      />*/}
      <div className={styles.label}>
        {t('withdraw_payment_method_choose')}
      </div>
      <PaymentMethodList>
        {props.paymentMethods.sort((a, b) => a.isCrypto ? -1 : 1 ).map((i, index) =>{
            if(i.isCrypto){
              return  <PaymentMethodCryptoCard method={i} onClick={() => props.onChange(i)} />
            }

            return i.paymentSystems.map(paymentSystem => <PaymentMethodCard key={paymentSystem.id}  label={paymentSystem.name} icon={`${runtimeConfig.HOST}${paymentSystem.imageUrl}`}
                                                                            onClick={() => props.onChange(i, paymentSystem)} />)
          }
        )}
      </PaymentMethodList>
    </div>
  )
}
