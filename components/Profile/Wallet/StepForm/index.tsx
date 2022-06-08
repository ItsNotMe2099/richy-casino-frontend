import Button from 'components/ui/Button'
import {Form, FormikProvider, useFormik} from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import {useEffect, useState} from 'react'
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
import Formatter from 'utils/formatter'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import {WalletHeader} from 'components/Profile/Wallet/WalletHeader'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'


interface Props {
  isBottomSheet?: boolean
  method: PaymentMethod
  currency: ICurrency
  onSubmit?: (data: IDepositResponse) => void
  onSetStep: (step: PaymentStep) => void
  onBackClick: () => void
}

export default function StepForm(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const initialValues = {
    amount: 20,
  }
  const currencyUsd = context.currencies.find(i => i.iso === 'USD')
  const rate = currencyUsd?.rateCurrencies['USD'][`to${props.currency?.iso}`]
  useEffect(() => {
    context.updateCurrencies()
  }, [])
  const handleSubmit = async (data) => {
    setError(null)
    setSending(true)
    try {
      const res = await PaymentsRepository.depositCrypto(props.currency.iso, data.amount * (rate ?? 1))
      props.onSubmit(res)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })
  const [promoCode, setPromoCode] = useState(false)

  const result = (
    <div className={styles.root}>
      {context.showBonus && <BonusSmallBanner style='wallet'/>}
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
      <FormikProvider value={formik}>
          <Form className={styles.form}>
            <PaymentDepositAmountField name={'amount'} disabled={sending} validate={Validator.required}
                                       placeholder='0'/>

            <div className={classNames(styles.bottom, {[styles.code]: promoCode})}>
              {!promoCode &&
              <div className={styles.promo} onClick={() => setPromoCode(true)}>
                <div className={styles.plus}>+</div>
                <span>{t('wallet_form_promocode')}</span>
              </div>}
              {rate && <div className={styles.rate}>
                <div>20 USDT ≈ {Formatter.formatAmount(rate * 20, props.currency?.iso)} {props.currency?.iso}</div>
                <div>1 USDT ≈ {Formatter.formatAmount(rate, props.currency?.iso)} {props.currency?.iso}</div>
              </div>}
            </div>
            {promoCode &&
            <PromoCode/>
            }
          </Form>

      </FormikProvider>
    </div>
  )

  const footer = (<ProfileModalFooter>
    <FormError error={error}/>
    <Button type='button' onClick={() => formik.handleSubmit()} size='normal' spinner={sending} background='payGradient500' className={styles.wallet}><img
      src='/img/icons/wallet.svg' alt=''/>{t('wallet_form_button_deposit')}</Button>
  </ProfileModalFooter>)
  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <WalletHeader isBottomSheet showBack onBackClick={props.onBackClick}/>
      <BottomSheetBody className={styles.sheetBody}>
        {result}
      </BottomSheetBody>
      {footer}
    </BottomSheetLayout>)
  } else {
    return (<ProfileModalLayout fixed>
        <WalletHeader showBack onBackClick={props.onBackClick}/>
        <ProfileModalBody fixed>
          {result}
        </ProfileModalBody>
        {footer}
      </ProfileModalLayout>
    )
  }
}
