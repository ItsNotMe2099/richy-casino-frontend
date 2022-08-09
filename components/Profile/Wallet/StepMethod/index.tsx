import styles from './index.module.scss'
import { PaymentMethodList } from 'components/Profile/Wallet/PaymentMethodList'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { PaymentMethodCard } from '../PaymentMethodCard'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import {PaymentMethodCryptoCard} from 'components/Profile/Wallet/PaymentMethodCryptoCard'

enum Step {
  Method = 'method',
  Currency = 'currency',
  Form = 'form'
}

interface Props {
  paymentMethods: IPaymentMethod[]
  onChange: (method: IPaymentMethod, paymentSystem?: IPaymentSystem | null) => void
}
export default function StepMethod(props: Props) {
  console.log('Method11', props.paymentMethods)
  return (
    <div className={styles.root}>
      <PaymentMethodList>
        {props.paymentMethods.sort((a, b) => a.isCrypto ? -1 : 1 ).map((i, index) =>{
            if(i.isCrypto){
              return  <PaymentMethodCryptoCard method={i} onClick={() => props.onChange(i)} />
            }

          return i.paymentSystems.map(paymentSystem => <PaymentMethodCard key={paymentSystem.id}  label={paymentSystem.name} icon={paymentSystem.imageUrl}
                                                                          onClick={() => props.onChange(i, paymentSystem)} />)
        }
        )}
      </PaymentMethodList>
    </div>
  )
}
