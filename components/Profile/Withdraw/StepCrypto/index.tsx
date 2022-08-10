import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {IDepositCryptoResponse} from 'data/interfaces/IPaymentDeposit'
import QRCode from 'react-qr-code'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import UserUtils from 'utils/user'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {ICurrency} from 'data/interfaces/ICurrency'
import {useAppContext} from 'context/state'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
interface Props {
  response:  IDepositCryptoResponse
  method: IPaymentMethod
  paymentSystem: IPaymentSystem
  currency: ICurrency
}


export default function StepCrypto(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
 return (
      <div className={styles.root}>
        <PaymentOptions>
          {/*<PaymentMethodSelected method={props.method}/>*/}
          <PaymentMethodCard icon={UserUtils.getCurrencyIcon(props.currency.iso)} label={props.currency.name} selected/>
        </PaymentOptions>
        <div className={styles.separator}>
        <PaymentSeparator/>
        </div>
        <div className={styles.choose}>{t('wallet_qr_sum')}</div>
        <div className={styles.input}>
          {props.response.amount} <span>{props.response.currencyIso?.toUpperCase()}</span>
        </div>
        <div className={styles.choose2}><span>{props.response.currencyIso?.toUpperCase()}</span> {t('wallet_qr_wallet')}</div>
        <div className={styles.input2}>
          <div className={styles.forFill}>{props.response.wallet}</div>
          <div className={styles.copy} onClick={() => {navigator.clipboard.writeText(props.response.wallet)}}>
            <img src='/img/icons/copy.svg' alt=''/>
          </div>
        </div>
        {props.response.wallet && <div className={styles.qrCodeArea}>
          <div className={styles.qrCode}>
          <QRCode size={164} value={props.response.wallet} />
          </div>
        </div>}
        <div className={styles.important}>
          <span>{t('wallet_qr_attention')}</span> {t('wallet_qr_attention_text')}
        </div>
      </div>
    )
}
