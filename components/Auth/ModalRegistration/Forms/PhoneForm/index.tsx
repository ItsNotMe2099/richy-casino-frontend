import styles from './index.module.scss'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import classNames from 'classnames'
import PromoCode from 'components/for_pages/Common/Promocode'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import {convertCurrencyToOptions} from 'utils/converter'
import {RegistrationPhoneModalArguments} from 'types/interfaces'
import { RegCurrencySelectView } from 'components/ui/Inputs/RegCurrencySelectView'

interface Props {
}

export default function PhoneForm(props: Props) {
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      await AuthRepository.registerPhoneSendOtp({
        phone: data.phone,
        currency: data.currency
      })
      context.showModal(ModalType.registrationPhone, {phone: data.phone} as RegistrationPhoneModalArguments)
    } catch (e) {
      setError(e.message)
    }
  }
  const initialValues = {
      phone: null,
      currency: convertCurrencyToOptions(context.currencies)[0].value,
      checkBox: false
    }

  const { t } = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({
        values,
        setFieldValue
      }) => (
    <Form className={styles.form}>
      <div className={styles.inputs}>
        <RegCurrencySelectView name='currency' options={convertCurrencyToOptions(context.currencies)} initial={convertCurrencyToOptions(context.currencies)[0].label}/>
        <InputField format={'phone'} name={'phone'} placeholder={'Номер телефона'} validate={Validator.required} />
        <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
          <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
           <span>У меня есть промокод</span>
         </div>
         {promoCode &&
          <PromoCode/>
         }
         <CheckBox size={'small'} name='checkBox' label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет' validate={Validator.required}/>
      </div>
      <FormError error={error}/>
      <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>Регистрация</Button>
      <div className={styles.login}>
        Уже есть аккаунт? <span onClick={() => context.showModal(ModalType.login)}>Войдите</span>
      </div>
    </Form>)}
  </Formik>
  )
}
