import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {PaymentMethodSelectedMobile} from 'components/Profile/Wallet/PaymentMethodSelectedMobile'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { PaymentMethodCard } from '../PaymentMethodCard'
import {CryptoCurrencyIcons} from 'components/Profile/Wallet/CryptoCurrencyIcons'
import {useMemo} from 'react'
import {ICurrency} from 'data/interfaces/ICurrency'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'

interface Props {
  method: IPaymentMethod
  paymentSystem: IPaymentSystem | null
  onClick?: () => void
}

export const PaymentMethodSelected = (props: Props) => {
  const context = useAppContext()
  const currencies  = useMemo<ICurrency[]>(() => {
    let currencies: string[] = []
    if(props.method.isCrypto) {
      currencies = props.method.paymentSystems.map(i => i.settings.map(i => i.currencyIso)).flat()
    }
    return context.currencies.filter(i => currencies.includes(i.iso))
  }, [props.method])
  const isMobile = context.isMobile
  const {t} = useTranslation()
  const label = props.method.isCrypto ? props.method.title : props.paymentSystem?.name ?? props.method.title
  const image =  props.paymentSystem?.imageUrl ??  props.method.imageUrl
  return isMobile ? <PaymentMethodSelectedMobile icon={props.method.isCrypto ? <CryptoCurrencyIcons currencies={currencies} selected={true}/> : image} label={label} onClick={props.onClick}/> : <PaymentMethodCard  icon={props.method.isCrypto ? <CryptoCurrencyIcons currencies={currencies} selected={true}/> : image}  label={label}  selected onClick={props.onClick}/>
}

