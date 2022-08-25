import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {PaymentMethodSelectedMobile} from 'components/Profile/Wallet/PaymentMethodSelectedMobile'
import { PaymentMethodCard } from '../PaymentMethodCard'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import {runtimeConfig} from 'config/runtimeConfig'

interface Props {
  paymentSystem: IPaymentSystem
  onClick?: () => void
}

export const PaymentSystemSelected = (props: Props) => {
  const context = useAppContext()
  const isMobile = context.isMobile
  const {t} = useTranslation()
  return isMobile ? <PaymentMethodSelectedMobile label={props.paymentSystem.name} icon={`${runtimeConfig.HOST}${props.paymentSystem.imageUrl}`} onClick={props.onClick}/> : <PaymentMethodCard icon={`${runtimeConfig.HOST}${props.paymentSystem.imageUrl}`} label={props.paymentSystem.name}  selected onClick={props.onClick}/>
}

