import styles from './index.module.scss'

import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {PaymentMethod} from 'types/interfaces'
import {PaymentMethodCryptoCard} from 'components/Profile/Wallet/PaymentMethodCryptoCard'

enum Step{
  Method = 'method',
  Currency = 'currency',
  Form = 'form'
}

interface Props {
  onChange: (method: PaymentMethod) => void
}
export default function StepMethod(props: Props) {
  return (
    <div className={styles.root}>
      <PaymentMethodList>
        <PaymentMethodCryptoCard onClick={() => props.onChange(PaymentMethod.Crypto)}/>
        <PaymentMethodCard icon={'/img/Wallet/paypal.svg'} label={'Visa'} onClick={() => props.onChange(PaymentMethod.Card)}/>
        <PaymentMethodCard icon={'/img/Wallet/paypal.svg'} label={'Visa'}/>
        <PaymentMethodCard icon={'/img/Wallet/paypal.svg'} label={'Visa'}/>
      </PaymentMethodList>
    </div>
  )
}
