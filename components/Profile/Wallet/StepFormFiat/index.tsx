import Button from 'components/ui/Button'
import {Form, FormikProvider, useFormik} from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import {useEffect, useState} from 'react'
import PromoCode from 'components/for_pages/Common/Promocode'
import {PaymentStep} from 'types/interfaces'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import FormError from 'components/ui/Form/FormError'
import {IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {useAppContext} from 'context/state'
import {PaymentDepositAmountField} from 'components/Profile/Wallet/PaymentDepositAmountField'
import {useTranslation} from 'next-i18next'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import {WalletHeader} from 'components/Profile/Wallet/WalletHeader'
import BonusSmallBanner from 'components/for_pages/Common/BonusSmallBanner'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {PaymentSystemSelected} from 'components/Profile/Wallet/PaymentSystemSelected'
import {ICurrency} from 'data/interfaces/ICurrency'


interface Props {
  isBottomSheet?: boolean
  method: IPaymentMethod
  paymentSystem: IPaymentSystem
  currency: ICurrency
  onSubmit?: (data: IDepositResponse) => void
  onSetStep: (step: PaymentStep) => void
  onBackClick: () => void
}

export default function StepFormFiat(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const initialValues = {
    amount: 20,
  }
  const currencyIso = props.currency?.iso
  const currentSettings = props.paymentSystem.settings.find(i => i.currencyIso === currencyIso)
  const validateMinMax = (value: number) => {
    const num = parseFloat(`${value}`)
    const min = currentSettings?.deposit?.minAmount ?? 0
    const max = currentSettings?.deposit?.maxAmount ?? 0
    if(min && num < min){
      return t('form_field_validation_amount_less', {number: min})
    }
    if(max && num > max){
      return t('form_field_validation_amount_greater', {number: max})
    }
    return undefined
  }
  useEffect(() => {
    context.updateCurrencies()
  }, [])
  const handleSubmit = async (data) => {
    setError(null)
    setSending(true)
    try {
      const amount = typeof  data.amount === 'string' ? parseFloat(data.amount) : data.amount
      const res = await PaymentsRepository.depositFiat(currencyIso, props.paymentSystem.id, props.paymentSystem.systemCode, `${window.location.origin}/payment/result`, amount)
      if(res.url){
        window.location.href = res.url
      }
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
        {props.paymentSystem && <PaymentSystemSelected paymentSystem={props.paymentSystem} onClick={() => props.onSetStep(PaymentStep.Method)}/>}
        {/*props.currency && <PaymentCurrencySelected currency={props.currency} onClick={() => props.onSetStep(PaymentStep.Currency)}/>*/}

      </PaymentOptions>
      {context.isMobile && <PaymentSeparator/>}
      <FormikProvider value={formik}>
          <Form className={styles.form}>
            <PaymentDepositAmountField name={'amount'}  hasOptions currency={props.currency.iso}  currencyObject={props.currency} disabled={sending} validate={Validator.combine([Validator.required, validateMinMax])}
                                       />

            <div className={classNames(styles.bottom)}>
              <div className={styles.promo} onClick={() =>  setPromoCode(!promoCode ? true : false)}>
                <div className={styles.plus}>{promoCode ? '-' : '+'}</div>
                <span>{t('wallet_form_promocode')}</span>
              </div>

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
        <ProfileModalBody fixed className={styles.modalBody}>
          {result}
        </ProfileModalBody>
        {footer}
      </ProfileModalLayout>
    )
  }
}
