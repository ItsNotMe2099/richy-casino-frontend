import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {IDepositCryptoResponse} from 'data/interfaces/IPaymentDeposit'
import QRCode from 'react-qr-code'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {PaymentStep} from 'types/interfaces'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {ICurrency} from 'data/interfaces/ICurrency'
import Formatter from 'utils/formatter'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {useRef, useState} from 'react'
import classNames from 'classnames'
import CopySvg from 'components/svg/CopySvg'

interface Props {
  response: IDepositCryptoResponse
  method: IPaymentMethod
  currency: ICurrency
  onSetStep: (step: PaymentStep) => void
}


export default function StepCrypto(props: Props) {
  const {t} = useTranslation()
  const timerWalletRef = useRef(null)
  const timerAmountRef = useRef(null)
  const [showCopyAmount, setShowCopyAmount] = useState(false)
  const [showCopyWallet, setShowCopyWallet] = useState(false)
  const handleCopyWallet = () => {
    navigator.clipboard.writeText(props.response.wallet)
    if (timerWalletRef.current) {
      clearTimeout(timerWalletRef.current)
    }
    setShowCopyWallet(true)
    timerWalletRef.current = setTimeout(() => {
      setShowCopyWallet(false)
    }, 3000)
  }
  const handleCopyAmount = () => {
    navigator.clipboard.writeText(Formatter.formatAmount(props.response.amount, props.currency?.iso))
    if (timerAmountRef.current) {
      clearTimeout(timerAmountRef.current)
    }
    setShowCopyAmount(true)
    timerAmountRef.current = setTimeout(() => {
      setShowCopyAmount(false)
    }, 3000)
  }
  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} paymentSystem={null}
                               onClick={() => props.onSetStep(PaymentStep.Method)}/>
        <PaymentMethodCard icon={<CurrencySvg currencyIso={props.currency.iso} color/>} label={props.currency.name}
                           selected onClick={() => props.onSetStep(PaymentStep.Currency)}/>
      </PaymentOptions>
      <div className={styles.separator}>
        <PaymentSeparator/>
      </div>
      <div className={styles.choose}>{t('wallet_qr_sum')}</div>
      <div className={styles.input}>
        <div className={styles.forFill}>
        {Formatter.formatAmount(props.response.amount, props.currency?.iso)}
        <span>{props.response.currencyIso?.toUpperCase()}</span>
        </div>
        <div className={styles.copy} onClick={handleCopyAmount}>
          <CopySvg className={styles.copyIcon}/>
        </div>
        <div className={classNames(styles.copied, {[styles.hidden]: !showCopyAmount})}>{t('text_copied')}</div>
      </div>
      <div className={styles.choose2}><span>{props.response.currencyIso?.toUpperCase()}</span> {t('wallet_qr_wallet')}
      </div>
      <div className={styles.input2}>
        <div className={styles.forFill}>{props.response.wallet}</div>
        <div className={styles.copy} onClick={handleCopyWallet}>
          <CopySvg className={styles.copyIcon}/>
        </div>
        <div className={classNames(styles.copied, {[styles.hidden]: !showCopyWallet})}>{t('text_copied')}</div>
      </div>
      {props.response.wallet && <div className={styles.qrCodeArea}>
        <div className={styles.qrCode}>
          <QRCode size={164} value={props.response.wallet}/>
        </div>
      </div>}
      <div className={styles.important}>
        <span>{t('wallet_qr_attention')}</span> {t('wallet_qr_attention_text')}
      </div>
    </div>
  )
}
