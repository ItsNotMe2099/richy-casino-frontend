import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {PaymentMethodSelectedMobile} from 'components/Profile/Wallet/PaymentMethodSelectedMobile'
import {CryptoCurrencyIcons} from 'components/Profile/Wallet/CryptoCurrencyIcons'
import {PaymentMethod} from 'types/interfaces'
import {PaymentMethodCryptoCard} from 'components/Profile/Wallet/PaymentMethodCryptoCard'

interface Props {
  method: PaymentMethod
  onClick?: () => void
}

export const PaymentMethodSelected = (props: Props) => {
  const context = useAppContext()
  const isMobile = context.isMobile
  const {t} = useTranslation()
  return isMobile ? <PaymentMethodSelectedMobile icon={<CryptoCurrencyIcons selected/>} label={'Криптовалюта'} onClick={props.onClick}/> : <PaymentMethodCryptoCard selected onClick={props.onClick}/>
}

