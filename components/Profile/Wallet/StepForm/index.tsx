import Button from 'components/ui/Button'
import {Form, Formik} from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import {useState} from 'react'
import PromoCode from 'components/for_pages/Common/Promocode'
import {PaymentMethod, PaymentStep} from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import UserUtils from 'utils/user'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import FormError from 'components/ui/Form/FormError'
import {IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import {CryptoWalletActions} from 'components/Profile/Wallet/CryptoWalletActions'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {useAppContext} from 'context/state'
import {PaymentDepositAmountField} from 'components/Profile/Wallet/PaymentDepositAmountField'
import {useTranslation} from 'next-i18next'


interface Props {
  method: PaymentMethod
  currency: ICurrency
  onSubmit?: (data: IDepositResponse) => void
  onSetStep: (step: PaymentStep) => void
}

export default function StepForm(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const initialValues = {
    amount: '20',
  }

  const handleSubmit = async (data) => {
    setError(null)
    setSending(true)
    try {
      const res = await PaymentsRepository.depositCrypto(props.currency.iso, data.amount)
      props.onSubmit(res)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const [promoCode, setPromoCode] = useState(false)


  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} onClick={() => props.onSetStep(PaymentStep.Method)}/>
        <PaymentMethodCard icon={UserUtils.getCurrencyIcon(props.currency.iso)} label={props.currency.name} selected
                           onClick={() => props.onSetStep(PaymentStep.Currency)}/>
      </PaymentOptions>
      {!context.isMobile && <PaymentSeparator/>}
      <div className={styles.cryptoActions}>
        <CryptoWalletActions/>
      </div>
      {context.isMobile && <PaymentSeparator/>}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({setFieldValue, values}) => (
          <Form className={styles.form}>
            <PaymentDepositAmountField name={'amount'} disabled={sending} validate={Validator.required}
                                       placeholder='$0'/>

            <div className={classNames(styles.bottom, {[styles.code]: promoCode})}>
              {!promoCode &&
              <div className={styles.promo} onClick={() => setPromoCode(true)}>
                <div className={styles.plus}>+</div>
                <span>{t('wallet_form_promocode')}</span>
              </div>}
              <div className={styles.rate}>
                <div>20 USDT ≈ 0,000020 DG</div>
                <div>1 USDT ≈ 0,000020 DG</div>
              </div>
            </div>
            {promoCode &&
            <PromoCode/>
            }
            <FormError error={error}/>
            <Button type='submit' size='normal' spinner={sending} background='payGradient500' className={styles.wallet}><img
              src='/img/icons/wallet.svg' alt=''/>{t('wallet_form_button_deposit')}</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
