import ShortBanner from 'components/for_pages/Common/ShortBanner'
import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import WalletForm from './Form'

interface Props {
  
}

interface MethodProps {
  icon: string
  label: string
  bonus?: boolean
  onClick?: () => void
  blue?: boolean
}

interface IMethod {
  icon: string
  label: string
  bonus?: boolean
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

  const crypto = [
    {icon: '/img/Wallet/crypto/bitcoin.svg', label: 'Bitcoin'},
    {icon: '/img/Wallet/crypto/tether.svg', label: 'Tether'},
    {icon: '/img/Wallet/crypto/eth.svg', label: 'Ethereum'},
    {icon: '/img/Wallet/crypto/tron.svg', label: 'Tron'},
    {icon: '/img/Wallet/crypto/usdc.svg', label: 'USD Coin'},
    {icon: '/img/Wallet/crypto/monero.svg', label: 'Monero'},
    {icon: '/img/Wallet/crypto/doge.svg', label: 'Doge'},
    {icon: '/img/Wallet/crypto/bitcoin-cash.svg', label: 'Bitcoin Cash'},
    {icon: '/img/Wallet/crypto/litecoin.svg', label: 'Litecoin'},
  ]

  const [method, setMethod] = useState('')
  const [currency, setCurrency] = useState('')

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
      {method && <div className={styles.choice}>
        {methods.map((item, index) =>
          method === item.label && <Method blue icon={item.icon} label={item.label} key={index} bonus={item.bonus}/>
        )}
        {crypto.map((item, index) =>
          currency === item.label && <Method blue icon={item.icon} label={item.label} key={index}/>
        )}
      </div>}
      {!method &&
      <div className={styles.methods}>
        {methods.map((item, index) =>
          <Method icon={item.icon} label={item.label} key={index} bonus={item.bonus} onClick={() => setMethod(item.label)}/>
        )}
      </div>}
      {method &&
        <div className={styles.options}>
          {method === 'Криптовалюта' &&
            <>
            <div className={styles.actions}>
              <div className={styles.top}>
                <Button className={styles.btn} background='dark600'><img src='/img/Wallet/wallet+.svg' alt=''/> Завести кошелек</Button>
                <Button className={styles.btn} background='dark600'><img src='/img/Wallet/exchange.svg' alt=''/>Обменять</Button>
              </div>
              <Button className={styles.btn} background='dark600'><img src='/img/Wallet/buy.svg' alt=''/>Купить криптовалюту</Button>
            </div>
            {(crypto.length && !currency) &&
              <div className={styles.methods}>
                {crypto.map((item, index) => 
                  <Method icon={item.icon} label={item.label} key={index} onClick={() => setCurrency(item.label)}/>
                )}
              </div>
            }
            {currency &&
              <WalletForm/>
            }
            </>
          }
        </div>
        }
    </div>
  )
}
