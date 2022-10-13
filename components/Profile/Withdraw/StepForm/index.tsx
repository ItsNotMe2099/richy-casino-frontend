import Button from 'components/ui/Button'
import {Form, Formik} from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import {useEffect, useState} from 'react'
import {PaymentHistoryModalArguments, PaymentStep} from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import FormError from 'components/ui/Form/FormError'
import {IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {useAppContext} from 'context/state'
import AmountCurrencyField from 'components/ui/Inputs/AmountCurrencyField'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import InputField from 'components/ui/Inputs/InputField'
import {useTranslation} from 'next-i18next'
import {PaymentSwitchFilterKey, ProfileModalType} from 'types/enums'
import {IPaymentMethod} from 'data/interfaces/IPaymentMethod'
import {IPaymentSystem} from 'data/interfaces/IPaymentSystem'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {PaymentCurrencySelected} from 'components/Profile/Wallet/PaymentCurrencySelected'
import PaymentMethodRepository from 'data/repositories/PaymentMethodRepository'
import {IPaymentMethodField} from 'data/interfaces/IPaymentFields'
import {PaymentFormExtraFields} from 'components/Profile/Wallet/PaymentFormExtraFields'


interface Props {
  account: IUserBalanceCurrency
  method: IPaymentMethod
  paymentSystem: IPaymentSystem
  currency: ICurrency
  onSubmit?: (data: IDepositResponse) => void
  onSetStep: (step: PaymentStep) => void
}

export default function StepForm(props: Props) {
  const context = useAppContext()
  const {t} = useTranslation()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [fields, setFields] = useState<IPaymentMethodField[]>([])
  const currencyIso = props.currency?.iso
  const currentSettings = props.paymentSystem.settings.find(i => i.currencyIso === currencyIso)
  const min = currentSettings?.withdraw?.minAmount ?? 0
  const max = currentSettings?.withdraw?.maxAmount ?? 0
  const initialValues = {
    amount: '',
    address: '',
    cardOwnerName: '',
    cardExpiry: ''
  }
  useEffect(() => {
    if(!props.paymentSystem.systemCode){
      return
    }
    PaymentMethodRepository.fetchWithdrawalFields(props.paymentSystem.systemCode).then((fields) => {
      setFields(fields)
    })
  }, [])
  const validateMinMax = (value: number) => {
    const num = parseFloat(`${value}`)
    if(min && num < min){
      return t('form_field_validation_amount_less', {number: min})
    }
    if(max && num > max){
      return t('form_field_validation_amount_greater', {number: max})
    }
    return undefined
  }
  const handleSubmit = async (data) => {
    setError(null)
    setSending(true)
    try {
      if(props.method.isCrypto){
        const res = await PaymentsRepository.withdrawCrypto(props.currency.iso, props.paymentSystem.id, props.paymentSystem.systemCode, data.amount, data.address)
        context.showModalProfile(ProfileModalType.paymentHistory, {filter: PaymentSwitchFilterKey.Applications} as PaymentHistoryModalArguments)
      }else{
        const res = await PaymentsRepository.withdrawFiat(props.currency.iso, props.paymentSystem.id, props.paymentSystem.systemCode,`${window.location.origin}?withdrawal=1`, data.amount, data.address, data.cardHolderName, data.cardExpiry, data)
        if(res.url){
          window.location.href = res.url
        }

      }

    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  return (
    <div className={styles.root}>
      <PaymentOptions>
        <PaymentMethodSelected method={props.method} paymentSystem={props.paymentSystem} onClick={() => props.onSetStep(PaymentStep.Method)}/>
        {props.currency && <PaymentCurrencySelected currency={props.currency} onClick={() => props.onSetStep(PaymentStep.Currency)}/>}
      </PaymentOptions>
      <PaymentSeparator/>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({setFieldValue, values}) => (
          <Form className={styles.form}>
            <PaymentFormExtraFields fields={fields} sending={sending} defaultCountry={context.countryByIp?.iso}/>
            <div className={styles.label}>
                {t('withdraw_form_sum')}
              <div className={styles.limit}>
                {t('withdraw_form_limit')} {min}-{max}
              </div>
            </div>
            <AmountCurrencyField name={'amount'} currency={props.currency.iso} className={styles.input} disabled={sending} validate={Validator.combine([Validator.required, validateMinMax])}/>
            {(props.method.isCrypto || props.paymentSystem?.isWalletRequired) && <><div className={styles.label}>
              {t('withdraw_form_address')}
            </div>
              <InputField name={'address'} disabled={sending} className={styles.input} validate={Validator.required}/>
            </>}
            {!props.method.isCrypto && props.paymentSystem?.isCardDataRequired && <>
               <div className={styles.label}>
                {t('withdraw_form_card_owner')}
              </div>
              <InputField name={'cardOwnerName'} disabled={sending} className={styles.input} validate={Validator.required}/>
              <div className={styles.label}>
                {t('withdraw_form_card_expiry')}
              </div>
              <InputField name={'cardExpiry'} placeholder={'01/25'} disabled={sending} className={styles.input} format={'cardExpiry'} validate={Validator.cardExpiryValidation}/>
            </>}
            <FormError error={error}/>
            <Button type='submit' size='normal' spinner={sending} background='blueGradient500' className={styles.button}>{t('withdraw_form_button_continue')}</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
