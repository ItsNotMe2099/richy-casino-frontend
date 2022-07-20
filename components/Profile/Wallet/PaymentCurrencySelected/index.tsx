import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { PaymentMethodCard } from '../PaymentMethodCard'
import {ICurrency} from 'data/interfaces/ICurrency'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

interface Props {
  currency: ICurrency
  onClick?: () => void
}

export const PaymentCurrencySelected = (props: Props) => {
  const context = useAppContext()
  const isMobile = context.isMobile
  const {t} = useTranslation()
  return <PaymentMethodCard icon={<CurrencySvg currencyIso={props.currency.iso} color/>} label={props.currency.name} selected
                            onClick={props.onClick}/>
}

