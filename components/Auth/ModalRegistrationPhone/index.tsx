import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {useAppContext} from 'context/state'
import Formatter from 'utils/formatter'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import {ModalType} from 'types/enums'
import FormError from 'components/ui/Form/FormError'
import {RegistrationPhoneModalArguments, RegistrationSuccessModalArguments} from 'types/interfaces'

interface Props {

}

export default function ModalRegistrationPhone(props: Props) {
  const context = useAppContext()
  const args = context.modalArguments as RegistrationPhoneModalArguments

  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.registerPhone({
        code: data.code,
        phone: args.phone,
        password: data.password
      })
      const accessToken = res.token

      if (!accessToken) {
        setError(t('registration_error'))
      }

      context.setToken(accessToken)
      context.updateUserFromCookies()
      context.showModal(ModalType.registrationSuccess, {login: args.phone, password: data.password} as RegistrationSuccessModalArguments)
    } catch (e) {
      setError(e)
    }
  }
  const initialValues = {
    code: '',
    password: '',
    newPassword: ''
  }


  const { t } = useTranslation('common')


  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values}) => (
        <Form className={styles.form}>
          <div className={styles.description}>
            {t('registration_phone_text_1')} <span className={styles.code}>{t('registration_phone_text_2')}</span>{t('registration_phone_text_3')}
            {t('registration_phone_text_4')} <span className={styles.phone}>{Formatter.formatPhone(args.phone)}</span>
          </div>
          <div className={styles.inputs}>
            <InputField
              name={'code'}
              placeholder={t('registration_phone_field_code')} validate={Validator.required}/>
            <InputField
              name={'password'}
              type={'password'}
              obscure={true}
              placeholder={t('registration_phone_field_password')} validate={Validator.required}/>
            <InputField
              name={'passwordConfirm'}
              type={'password'}
              obscure={true}
              placeholder={t('registration_phone_field_password_confirm')}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
            />
          </div>
          <FormError error={error}/>
            <Button type='submit' fluid className={styles.button} size='submit' background='blueGradient500' >Продолжить</Button>

        </Form>)}
      </Formik>
  )
}
