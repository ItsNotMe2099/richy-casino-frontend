import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import Formatter from 'utils/formatter'
import FormError from 'components/ui/Form/FormError'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'


interface Props {
  isBottomSheet?: boolean
}

export default function ModalPasswordReset(props: Props) {
  const context = useAppContext()
  const modalArguments = context.modalArguments
  const login = modalArguments?.login
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)
  const handleSubmit = async (data) => {
    setSending(true)
    try {
      setError(null)
      const res = await AuthRepository.resetPassword({identity: login, token: data.code, password: data.password})
      context.showModal(ModalType.login)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const initialValues = {
    code: '',
    password: '',
    newPassword: ''
  }


  const isEmail =  login?.includes('@')
  const { t } = useTranslation('common')

  const result = (<Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({values}) => (
      <Form className={styles.form}>
        <div className={styles.description}>
          {t('password_restore_text')}<br/>
          {t('password_restore_text_you')} {isEmail ? t('password_restore_text_email') : t('password_restore_text_phone')} <span className={styles.login}>{isEmail ? login : Formatter.formatPhone(login)}</span>
        </div>
        <div className={styles.inputs}>
          <InputField
            name={'code'}
            disabled={sending}
            placeholder={isEmail ? t('password_restore_field_code_email') : t('password_restore_field_code_sms')} validate={Validator.required}/>
          <InputField
            name={'password'}
            type={'password'}
            obscure={true}
            disabled={sending}
            placeholder={t('password_restore_field_password')} validate={Validator.required}/>
          <InputField
            name={'passwordConfirm'}
            type={'password'}
            obscure={true}
            disabled={sending}
            placeholder={t('password_restore_field_password_confirm')}
            validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
          />
        </div>
        <FormError error={error}/>
        <div className={styles.buttons}>
          <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => context.showModal(ModalType.passwordRecovery, {login: context.modalArguments.login})}>{t('password_restore_cancel')}</Button>
          <div className={styles.spacer}/>
          <Button type='submit' className={styles.button} spinner={sending} size='submit' background='blueGradient500' >{t('password_restore_next')}</Button>
        </div>

      </Form>)}
  </Formik>)
  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('password_restore_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('password_restore_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
