import styles from './index.module.scss'
import {useState} from 'react'
import { useTranslation } from 'next-i18next'
import {Form, Formik} from 'formik'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Validator from 'utils/validator'
import { ProfileModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import Converter from 'utils/converter'
import { RegCurrencySelectField } from 'components/ui/Inputs/RegCurrencySelectField'
import FormFooter from 'components/Auth/ModalRegistration/Forms/FormFooter'
import FormPromocode from 'components/Auth/ModalRegistration/Forms/FormPromocode'
import Formatter from 'utils/formatter'
import PhoneField from 'components/ui/Inputs/PhoneField'

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
     const res = await AuthRepository.registerPhoneSendOtp({
        phone: Formatter.cleanPhone(data.phone),
        currency: data.currency
      })
      const accessToken = res.token

      if (!accessToken) {
        setError(t('registration_error'))
      }

      context.setToken(accessToken)
      await context.updateUserFromCookies()
      setSending(false)
      context.showModal(ProfileModalType.wallet)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const converted = Converter.convertCurrencyToOptions(context.currencies)
  const initialValues = {
      phone: null,
      currency: converted.length > 0 ? converted[0].value:  null,
      checkBox: true
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
        <RegCurrencySelectField name='currency' disabled={sending}/>
        </div>
        <PhoneField defaultCountry={context.countryByIp?.iso} disabled={sending} name={'phone'} placeholder={t('registration_field_phone')} styleType={'vertical'} validate={Validator.required} />
        <FormPromocode/>
        <CheckBox size={'small'} name='checkBox' disabled={sending}
                  label={t('registration_terms')} validate={Validator.required}/>
      </div>
      <FormError error={error}/>
      <FormFooter sending={sending}/>
    </Form>)}
  </Formik>
  )
}
