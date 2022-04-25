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
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'

interface Props {
  isBottomSheet?: boolean
}

export default function ModalRegistrationPhone(props: Props) {
  const context = useAppContext()
  const args = context.modalArguments as RegistrationPhoneModalArguments

  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState<boolean>(false)

  const handleSubmit = async (data) => {
    try {
      setSending(true)
      setError(null)
      const res = await AuthRepository.registerPhone({
        code:  data.code,
        phone: Formatter.cleanPhone(args.phone),
        password: data.password
      })
      const accessToken = res.token

      if (!accessToken) {
        setError(t('registration_error'))
      }

      setSending(false)
      context.setToken(accessToken)
      context.updateUserFromCookies()
      context.showModal(ModalType.registrationSuccess, {login: args.phone, password: data.password} as RegistrationSuccessModalArguments)
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


  const { t } = useTranslation('common')

  const result = (<Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({values}) => (
      <Form className={styles.form}>
        <div className={styles.description}>
          {t('registration_phone_text_1')} <span className={styles.code}> {t('registration_phone_text_2')}</span> {t('registration_phone_text_3')}&nbsp;
          {t('registration_phone_text_4')} <span className={styles.phone}> {Formatter.formatPhone(args.phone)}</span>
        </div>
        <div className={styles.inputs}>
          <InputField
            name={'code'}
            disabled={sending}
            placeholder={t('registration_phone_field_code')} validate={Validator.required}/>
          <InputField
            name={'password'}
            type={'password'}
            obscure={true}
            disabled={sending}
            placeholder={t('registration_phone_field_password')} validate={Validator.required}/>
          <InputField
            name={'passwordConfirm'}
            type={'password'}
            obscure={true}
            disabled={sending}
            placeholder={t('registration_phone_field_password_confirm')}
            validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
          />
        </div>
        <FormError error={error}/>
        <Button type='submit' fluid spinner={sending} className={styles.button} size='submit' background='blueGradient500' >Продолжить</Button>

      </Form>)}
  </Formik>)
  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('registration_phone_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('registration_phone_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
