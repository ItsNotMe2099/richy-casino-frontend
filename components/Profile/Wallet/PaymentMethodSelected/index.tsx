import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {PaymentMethodSelectedMobile} from 'components/Profile/Wallet/PaymentMethodSelectedMobile'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { PaymentMethodCard } from '../PaymentMethodCard'
import {CryptoCurrencyIcons} from 'components/Profile/Wallet/CryptoCurrencyIcons'
import {useMemo} from 'react'
import {ICurrency} from 'data/interfaces/ICurrency'

interface Props {
  method: IPaymentMethod
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
  return isMobile ? <PaymentMethodSelectedMobile icon={props.method.isCrypto ? <CryptoCurrencyIcons currencies={currencies} selected={true}/> : props.method.imageUrl} label={props.method.title} onClick={props.onClick}/> : <PaymentMethodCard icon={props.method.imageUrl} label={props.method.title}  selected onClick={props.onClick}/>
}

