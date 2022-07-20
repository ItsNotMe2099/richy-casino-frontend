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
import {useMemo} from 'react'
import {ICurrency} from 'data/interfaces/ICurrency'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

interface Props {
  method: IPaymentMethod
  paymentSystem: IPaymentSystem | null
  onChange: (currency: ICurrency, paymentSystem?: IPaymentSystem | null) => void
  onSetStep: (step: PaymentStep) => void
}
export default function StepCurrency(props: Props) {
  const context = useAppContext()
  const currencies  = useMemo<ICurrency[]>(() => {
    let currencies: string[] = []
    if(props.method.isCrypto){
      currencies = props.method.paymentSystems.map(i => i.settings.map(i => i.currencyIso)).flat()
    }else if(props.paymentSystem){
      currencies = props.paymentSystem.settings.map(i => i.currencyIso)
    }
    return context.currencies.filter(i => currencies.includes(i.iso))
  }, [props.method, props.paymentSystem])
  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} onClick={() => props.onSetStep(PaymentStep.Method)}/>
        </PaymentOptions>
      {!context.isMobile &&  <PaymentSeparator/>}
      {props.method.isCrypto && <div className={styles.cryptoActions}>
      <CryptoWalletActions/>
      </div>}
      {context.isMobile &&  <PaymentSeparator/>}
      <div className={styles.methods}>
      <PaymentMethodList>
        {currencies.map(i => <PaymentMethodCard key={i.iso} icon={<CurrencySvg currencyIso={i.iso} color/>} label={i.name} onClick={() => props.onChange(i, props.method.paymentSystems.find(a => a.settings.find(a => a.currencyIso === i.iso)))}/>)}
      </PaymentMethodList>
      </div>
    </div>
  )
}
