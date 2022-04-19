import styles from './index.module.scss'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import Converter from 'utils/converter'
import {RegistrationPhoneModalArguments} from 'types/interfaces'
import { RegCurrencySelectField } from 'components/ui/Inputs/RegCurrencySelectField'
import FormFooter from 'components/Auth/ModalRegistration/Forms/FormFooter'
import FormPromocode from 'components/Auth/ModalRegistration/Forms/FormPromocode'

interface Props {
}

export default function PhoneForm(props: Props) {
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)
  const handleSubmit = async (data) => {
    setSending(true)
    try {
      setError(null)
      await AuthRepository.registerPhoneSendOtp({
        phone: data.phone,
        currency: data.currency
      })
      context.showModal(ModalType.registrationPhone, {phone: data.phone} as RegistrationPhoneModalArguments)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const initialValues = {
      phone: null,
      currency: Converter.convertCurrencyToOptions(context.currencies)[0].value,
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
        <div className={styles.select}>
        <RegCurrencySelectField name='currency' options={Converter.convertCurrencyToOptions(context.currencies)} currentItem={Converter.currentItem(values, Converter.convertCurrencyToOptions(context.currencies))}/>
        </div>
        <InputField format={'phone'} name={'phone'} placeholder={t('registration_phone')} validate={Validator.required} />
        <FormPromocode/>
        <CheckBox size={'small'} name='checkBox'
                  label={t('registration_terms')} validate={Validator.required}/>
      </div>
      <FormError error={error}/>
      <FormFooter/>
    </Form>)}
  </Formik>
  )
}
