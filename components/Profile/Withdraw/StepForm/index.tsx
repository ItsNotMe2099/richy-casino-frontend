import Button from 'components/ui/Button'
import {Form, Formik} from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import {useState} from 'react'
import {PaymentMethod, PaymentStep} from 'types/interfaces'
import {ICurrency} from 'data/interfaces/ICurrency'
import {PaymentOptions} from 'components/Profile/Wallet/PaymentOptions'
import {PaymentMethodCard} from 'components/Profile/Wallet/PaymentMethodCard'
import UserUtils from 'utils/user'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import FormError from 'components/ui/Form/FormError'
import {IDepositResponse} from 'data/interfaces/IPaymentDeposit'
import {PaymentMethodSelected} from 'components/Profile/Wallet/PaymentMethodSelected'
import {PaymentSeparator} from 'components/Profile/Wallet/PaymentSeparator'
import {useAppContext} from 'context/state'
import AmountCurrencyField from 'components/ui/Inputs/AmountCurrencyField'
import {IUserBalanceCurrency} from 'data/interfaces/IUser'
import InputField from 'components/ui/Inputs/InputField'
import {useTranslation} from 'next-i18next'
import {ProfileModalType} from 'types/enums'


interface Props {
  method: PaymentMethod
  account: IUserBalanceCurrency
  currency: ICurrency
  onSubmit?: (data: IDepositResponse) => void
  onSetStep: (step: PaymentStep) => void
}

export default function StepForm(props: Props) {
  const context = useAppContext()
  const {t} = useTranslation()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const initialValues = {
    amount: '',
    address: ''
  }

  const handleSubmit = async (data) => {
    setError(null)
    setSending(true)
    try {
      const res = await PaymentsRepository.withdrawRequest(props.currency.iso, typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount, data.address)
      context.showModalProfile(ProfileModalType.paymentHistory, {filter: 'applications'})
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
      <PaymentSeparator/>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({setFieldValue, values}) => (
          <Form className={styles.form}>
            <div className={styles.label}>
                {t('withdraw_form_sum')}
              <div className={styles.limit}>
                {t('withdraw_form_limit')} 7-1000$
              </div>
            </div>
            <AmountCurrencyField name={'amount'} currency={props.currency.iso} className={styles.input} validate={Validator.required}/>
            <div className={styles.label}>
              {t('withdraw_form_address')}
            </div>
            <InputField name={'address'} className={styles.input} validate={Validator.required}/>
            <FormError error={error}/>
            <Button type='submit' size='normal' spinner={sending} background='blueGradient500' className={styles.button}>Продолжить</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
