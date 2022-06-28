import styles from './index.module.scss'
import {PaymentMethodList} from 'components/Profile/Wallet/PaymentMethodList'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {useAppContext} from 'context/state'
import {ICurrency} from 'data/interfaces/ICurrency'
import {PaymentMethod, PaymentStep} from 'types/interfaces'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

interface Props {
  method: PaymentMethod
  onChange: (currency: ICurrency) => void
  onSetStep: (step: PaymentStep) => void
}
export default function StepCurrency(props: Props) {
  const context = useAppContext()
  const currencies = context.currencies.filter(i => i.flags?.isCrypto && i.flags?.isWithdrawalAllowed)

  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} onClick={() => props.onSetStep(PaymentStep.Method)}/>
      </PaymentOptions>

      <PaymentSeparator/>
      <div className={styles.methods}>
      <PaymentMethodList>
        {currencies.map(i => <PaymentMethodCard key={i.iso} icon={<CurrencySvg currencyIso={i.iso} color/>} label={i.name} onClick={() => props.onChange(i)}/>)}
      </PaymentMethodList>
      </div>
    </div>
  )
}
