import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import { CryptoCurrencyIcons} from 'components/Profile/Wallet/CryptoCurrencyIcons'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
//import {PaymentMethodCardBadge} from 'components/Profile/Wallet/PaymentMethodCardBadge'
import usePressAndHover from 'hooks/usePressAndHover'

interface Props {
  isOpen?: boolean
}

interface Props {
  selected?: boolean
  onClick?: () => void
}

export const PaymentMethodCryptoCard = (props: Props) => {
  const [ref, press, hover] = usePressAndHover()
  const {t} = useTranslation()
  return (
    <PaymentMethodCard ref={ref} className={styles.root} onClick={props.onClick} selected={props.selected}>
      {/*<PaymentMethodCardBadge title={t('wallet_payment_method_bonus')}/>*/}
      <div className={styles.icons}>
      <CryptoCurrencyIcons selected={hover || props.selected}/>
      </div>
      <div className={styles.label}>{t('wallet_payment_type_crypto')}</div>
    </PaymentMethodCard>
  )
}
