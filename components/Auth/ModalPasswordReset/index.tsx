import styles from './index.module.scss'
import {useTranslation} from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import Formatter from 'utils/formatter'


interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalPasswordReset(props: Props) {
  const context = useAppContext()
  const modalArguments = context.modalArguments
  const login = modalArguments.login
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.resetPassword({identity: login, token: data.code, password: data.password})
      context.showModal(ModalType.login)
    } catch (e) {
      setError(e)
    }
  }
  const initialValues = {
    code: '',
    password: '',
    newPassword: ''
  }


  const isEmail =  login?.includes('@')
  const { t } = useTranslation('common')


  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values}) => (
        <Form className={styles.form}>
          <div className={styles.description}>
            {t('password_restore_text')}<br/>
            {t('password_restore_text_you')} {isEmail ? t('password_restore_text_email') : t('password_restore_text_phone')} <span className={styles.login}>{isEmail ? login : Formatter.formatPhone(login)}</span>
          </div>
          <div className={styles.inputs}>
            <InputField
              name={'code'}
              placeholder={isEmail ? t('password_restore_field_code_email') : t('password_restore_field_code_sms')} validate={Validator.required}/>
            <InputField
              name={'password'}
              type={'password'}
              obscure={true}
              placeholder={t('password_restore_field_password')} validate={Validator.required}/>
            <InputField
              name={'passwordConfirm'}
              type={'password'}
              obscure={true}
              placeholder={t('password_restore_field_password_confirm')}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
            />
          </div>
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => context.showModal(ModalType.passwordRecovery, {login: context.modalArguments.login})}>{t('password_restore_cancel')}</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >{t('password_restore_next')}</Button>
          </div>

        </Form>)}
      </Formik>
  )
}
