import styles from './index.module.scss'
import {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {Form, Formik} from 'formik'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import { ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import Converter from 'utils/converter'
import {RegCurrencySelectField} from 'components/ui/Inputs/RegCurrencySelectField'
import FormFooter from 'components/Auth/ModalRegistration/Forms/FormFooter'
import FormPromocode from 'components/Auth/ModalRegistration/Forms/FormPromocode'


interface Props {
}

export default function EmailForm(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)
  const handleSubmit = async (data) => {
    setSending(true)
    try {
      setError(null)
      const res = await AuthRepository.registerEmail({
        email: data.email,
        password: data.password,
        currency: data.currency
      })
      const accessToken = res.token

      if (!accessToken) {
        setError(t('registration_error'))
        setSending(false)
        return
      }

      context.setToken(accessToken)
      await  context.updateUserFromCookies()
      context.showModal(ProfileModalType.wallet)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const initialValues = {
    email: null,
    password: null,
    currency: Converter.convertCurrencyToOptions(context.currencies)[0]?.value,
    checkBox: true
  }


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
            <InputField name={'email'} disabled={sending} placeholder={t('registration_field_email')}
                        validate={Validator.combine([Validator.required, Validator.email])}/>
            <InputField name={'password'} type={'password'} obscure={true} disabled={sending}
                        placeholder={t('registration_field_password')}
                        validate={Validator.required}/>

            <FormPromocode/>
            <CheckBox size={'small'} disabled={sending} name='checkBox'
                      label={t('registration_terms')} validate={Validator.required}/>
          </div>
          <FormError error={error}/>
          <FormFooter sending={sending}/>
        </Form>)}
    </Formik>
  )
}
