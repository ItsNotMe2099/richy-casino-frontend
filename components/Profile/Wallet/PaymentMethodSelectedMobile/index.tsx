import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {ReactElement} from 'react'

interface Props {
  onClick?: () => void
  icon?: ReactElement | string
  label?: string
}

export const PaymentMethodSelectedMobile = ({ onClick, icon, label}: Props) => {
  const {t} = useTranslation()
  return (
    <PaymentMethodCard className={styles.root} selected onClick={onClick}>
      <div className={styles.left}>
        {icon && typeof icon === 'string' && <img  className={styles.icon} src={icon} alt=''/>}
        {icon &&  typeof icon !== 'string' && icon}
        <div className={styles.text}>
          <div className={styles.label}>{t('wallet_payment_method_title')}</div>
          <div className={styles.method}>{label}</div>
        </div>
      </div>

      {/*<div className={styles.change}>Изменить</div>*/}
    </PaymentMethodCard>
  )
}

