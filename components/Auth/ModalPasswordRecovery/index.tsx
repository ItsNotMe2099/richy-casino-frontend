import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import {PasswordResetModalArguments} from 'types/interfaces'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'

interface Props {
  isBottomSheet?: boolean
}

export default function ModalPasswordRecovery(props: Props) {
  const { t } = useTranslation()
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)
  const handleSubmit = async (data) => {
    setSending(true)
    try {
      setError(null)
      const res = await AuthRepository.forgotPassword(data.login)
      context.showModal(ModalType.passwordReset, {login: data.login} as PasswordResetModalArguments)
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const initialValues = {
    login: ''
  }

  const result = (<Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={styles.form}>
      <div className={styles.description}>
        {t('password_forgot_text')}
      </div>
      <div className={styles.inputs}>
        <InputField
          format={'phoneAndEmail'}
          disabled={sending}
          name={'login'}
          placeholder={t('password_forgot_field_identity')} validate={Validator.required}/>
      </div>
      <FormError error={error}/>
      <div className={styles.buttons}>
        <Button type='button' className={styles.cancel} size='submit' background='dark600' onClick={() => context.showModal(ModalType.login)}>{t('password_forgot_cancel')}</Button>
        <Button type='submit' className={styles.button}  spinner={sending} size='submit' background='blueGradient500' >{t('password_forgot_next')}</Button>
      </div>

    </Form>
  </Formik>)
  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('password_forgot_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('password_forgot_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}