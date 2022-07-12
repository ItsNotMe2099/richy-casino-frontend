import styles from './index.module.scss'
import { PaymentMethodList } from 'components/Profile/Wallet/PaymentMethodList'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { PaymentMethodCard } from '../PaymentMethodCard'

enum Step {
  Method = 'method',
  Currency = 'currency',
  Form = 'form'
}

interface Props {
  paymentMethods: IPaymentMethod[]
  onChange: (method: IPaymentMethod) => void
}
export default function StepMethod(props: Props) {
  console.log('Method11', props.paymentMethods)
  return (
    <div className={styles.root}>
      <PaymentMethodList>
        {props.paymentMethods.map((i) =>
          <PaymentMethodCard key={i.title}  label={i.title} icon={i.imageUrl}
            onClick={() => props.onChange(i)} />
        )}
        {/*<PaymentMethodCryptoCard onClick={() => props.onChange(PaymentMethod.Crypto)} />*/}
      </PaymentMethodList>
    </div>
  )
}
