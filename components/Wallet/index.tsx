import ShortBanner from 'components/for_pages/Common/ShortBanner'
import { useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import WalletForm from './Form'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  
}

interface MethodProps {
  icon: string
  label: string
  bonus?: boolean
  iso?: string
  onClick?: () => void
  blue?: boolean
  currency?: boolean
  mobile?: boolean
}

interface OptionsProps {
  method?: string
  array: MethodProps[]
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
    {icon: '/img/Wallet/crypto/bitcoin.svg', label: 'Bitcoin', iso: 'btc'},
    {icon: '/img/Wallet/crypto/tether.svg', label: 'Tether', iso: 'th'},
    {icon: '/img/Wallet/crypto/eth.svg', label: 'Ethereum', iso: 'eth'},
    {icon: '/img/Wallet/crypto/tron.svg', label: 'Tron', iso: 'tr'},
    {icon: '/img/Wallet/crypto/usdc.svg', label: 'USD Coin', iso: 'USD'},
    {icon: '/img/Wallet/crypto/monero.svg', label: 'Monero', iso: 'mo'},
    {icon: '/img/Wallet/crypto/doge.svg', label: 'Doge', iso: 'dg'},
    {icon: '/img/Wallet/crypto/bitcoin-cash.svg', label: 'Bitcoin Cash', iso: 'btcc'},
    {icon: '/img/Wallet/crypto/litecoin.svg', label: 'Litecoin', iso: 'ltc'},
  ]

  const bank = [
    {icon: '/img/Wallet/bank/visa.svg', label: 'Visa'},
    {icon: '/img/Wallet/bank/master-card.svg', label: 'Master Card'},
    {icon: '/img/Wallet/bank/mir.svg', label: 'МИР'},
  ]

  const [method, setMethod] = useState('')
  const [currency, setCurrency] = useState('')

  const Method = ({icon, label, iso, bonus, onClick, blue, currency, mobile}: MethodProps) => {
    return (
      <div className={classNames(styles.method, {[styles.blue]: blue}, {[styles.iso]: (iso || mobile)})} onClick={onClick}>
        {bonus && 
          <div className={styles.bonus}>
            Bonus
          </div>
        }
        <div className={classNames(styles.icon, {[styles.isoIcon]: iso})}>
          <img src={icon} alt=''/>
        </div>
        <div className={classNames(styles.label, {[styles.isoLabel]: iso})}>
          <VisibleXs><>{iso ? iso : !mobile && label}</></VisibleXs>
          <HiddenXs>
            <>{label}</>
          </HiddenXs>
        </div>
      </div>
    )
  }

  const Options = ({method, array}: OptionsProps) => {
    return (
    <div className={styles.options}>
      {method === 'Криптовалюта' &&
          <>
          <div className={styles.actions}>
              <div className={styles.top}>
                <Button className={styles.btn} background='dark600'><img src='/img/Wallet/wallet+.svg' alt=''/> Завести кошелек</Button>
                <Button className={styles.btn} background='dark600'><img src='/img/Wallet/exchange.svg' alt=''/>Обменять</Button>
              </div>
              <div className={styles.btnWrap}>
                <Button 
                  className={styles.btn} background='dark600'><img src='/img/Wallet/buy.svg' alt=''/>Купить криптовалюту
                </Button>
              </div>
            </div></>}
            {(array.length && !currency) &&
              <div className={styles.methods}>
                {array.map((item, index) => 
                  <Method icon={item.icon} label={item.label} key={index} onClick={() => setCurrency(item.label)}/>
                )}
              </div>
          }
    </div>
    )
  }

  const MobileMethod = ({icon, label}: MethodProps) => {
    return (
      <div className={classNames(styles.mobileMethod, {[styles.withCurrency]: currency})}>
        <div className={styles.iconMobile}>
          <img src={icon} alt=''/>
        </div>
        <div className={styles.middle}>
          <div className={styles.fill}>Способ пополнения</div>
          <div className={classNames(styles.label, styles.labelMobile)}>{label}</div>
        </div>
        {!currency && <div className={styles.change} onClick={() => setMethod('')}>Изменить</div>}
      </div>
    )
  }

  const Choice = ({array}: OptionsProps) => {
    return(
    <div className={styles.choice}>
        {methods.map((item, index) =>
          method === item.label &&
          <>
          <HiddenXs>
            <Method blue icon={item.icon} label={item.label} key={index} bonus={item.bonus}/>
          </HiddenXs>
          <VisibleXs>
            <MobileMethod icon={item.icon} label={item.label} key={index}/>
          </VisibleXs>
          </>
        )}
        {array.map((item, index) =>
          currency === item.label && <Method blue icon={item.icon} label={item.label} key={index} iso={item.iso} mobile/>
        )}
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
      {method && 
        <Choice array={method === 'Криптовалюта' ? crypto : bank}/>
      }
      {!method &&
      <div className={styles.methods}>
        {methods.map((item, index) =>
          <Method icon={item.icon} label={item.label} key={index} bonus={item.bonus} onClick={() => setMethod(item.label)}/>
        )}
      </div>}
      {method &&
        <>
        <Options array={method === 'Криптовалюта' ? crypto : bank} method={method}/>
        {currency &&
              <WalletForm/>
            }
        </>
      }
    </div>
  )
}
