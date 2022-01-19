import ShortBanner from 'components/for_pages/Common/ShortBanner'
import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  
}

interface MethodProps {
  icon: string
  label: string
  bonus?: boolean
  onClick: () => void
  blue?: boolean
}

export default function Wallet(props: Props) {

  const methods = [
    {icon: '/img/Wallet/crypto.svg', label: 'Криптовалюта', bonus: true},
    {icon: '/img/Wallet/visa.svg', label: 'Карты банка'},
    {icon: '/img/Wallet/paypal.svg', label: 'PayPal'},
    {icon: '/img/Wallet/yoo.svg', label: 'YooMoney'},
    {icon: '/img/Wallet/web.svg', label: 'WebMoney'},
    {icon: '/img/Wallet/skrill.svg', label: 'Skrill'},
    {icon: '/img/Wallet/pia.svg', label: 'Piastrix'},
    {icon: '/img/Wallet/neteller.svg', label: 'Neteller'},
    {icon: '/img/Wallet/qiwi.svg', label: 'Qiwi'},
  ]

  const [method, setMethod] = useState('')

  const Method = ({icon, label, bonus, onClick, blue}: MethodProps) => {
    return (
      <div className={classNames(styles.method, {[styles.blue]: blue})} onClick={onClick}>
        {bonus && 
          <div className={styles.bonus}>
            Bonus
          </div>
        }
        <div className={styles.icon}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.root}>
      {!method &&
      <div className={styles.choose}>
        Выберите платежный метод
      </div>}
      <div className={styles.banner}>
        <ShortBanner reverse timer/>
      </div>
      <div className={styles.choice}>
        {methods.map((item, index) =>
          method === item.label && <Method blue icon={item.icon} label={item.label} key={index} bonus={item.bonus} onClick={() => setMethod(item.label)}/>
        )}
      </div>
      <div className={styles.methods}>
        {methods.map((item, index) =>
          <Method icon={item.icon} label={item.label} key={index} bonus={item.bonus} onClick={() => setMethod(item.label)}/>
        )}
      </div>
    </div>
  )
}
