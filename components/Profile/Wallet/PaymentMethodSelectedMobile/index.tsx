import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {ReactElement} from 'react'

interface Props {
  onClick?: () => void
  icon?: ReactElement
  label?: string
}

export const PaymentMethodSelectedMobile = ({ onClick, icon, label}: Props) => {
  const {t} = useTranslation()
  return (
    <PaymentMethodCard className={styles.root} selected onClick={onClick}>
      <div className={styles.left}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.text}>
          <div className={styles.label}>Способ пополения</div>
          <div className={styles.method}>{label}</div>
        </div>
      </div>

      <div className={styles.change}>Изменить</div>
    </PaymentMethodCard>
  )
}
