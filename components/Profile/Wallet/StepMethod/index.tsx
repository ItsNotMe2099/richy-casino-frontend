import styles from './index.module.scss'
import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
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
      </PaymentMethodList>
    </div>
  )
}
