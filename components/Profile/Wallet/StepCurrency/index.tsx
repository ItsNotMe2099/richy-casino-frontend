import styles from './index.module.scss'
import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {useAppContext} from 'context/state'
import { PaymentStep} from 'types/interfaces'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {CryptoWalletActions} from 'components/Profile/Wallet/CryptoWalletActions'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { IPaymentSystem } from 'data/interfaces/IPaymentSystem'

interface Props {
  method: IPaymentMethod
  onChange: (system: IPaymentSystem) => void
  onSetStep: (step: PaymentStep) => void
}
export default function StepCurrency(props: Props) {
  const context = useAppContext()

  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} onClick={() => props.onSetStep(PaymentStep.Method)}/>
      </PaymentOptions>
      {!context.isMobile &&  <PaymentSeparator/>}
      <div className={styles.cryptoActions}>
      <CryptoWalletActions/>
      </div>
      {context.isMobile &&  <PaymentSeparator/>}
      <div className={styles.methods}>
      <PaymentMethodList>
        {props.method.paymentSystems.map(i => <PaymentMethodCard key={i.id} icon={i.imageUrl} label={i.name} onClick={() => props.onChange(i)}/>)}
      </PaymentMethodList>
      </div>
    </div>
  )
}
