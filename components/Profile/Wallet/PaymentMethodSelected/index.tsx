import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {PaymentMethodSelectedMobile} from 'components/Profile/Wallet/PaymentMethodSelectedMobile'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { PaymentMethodCard } from '../PaymentMethodCard'

interface Props {
  method: IPaymentMethod
  onClick?: () => void
}

export const PaymentMethodSelected = (props: Props) => {
  const context = useAppContext()
  const isMobile = context.isMobile
  const {t} = useTranslation()
  return isMobile ? <PaymentMethodSelectedMobile label={props.method.title} onClick={props.onClick}/> : <PaymentMethodCard icon={props.method.imageUrl} label={props.method.title}  selected onClick={props.onClick}/>
}

