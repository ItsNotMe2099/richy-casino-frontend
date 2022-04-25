import styles from './index.module.scss'
import {useTranslation} from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import SocialButtons from 'components/Auth/SocialButtons'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import { LoginFormData } from 'types/interfaces'
import { useAuthContext } from 'context/auth_state'
import FormError from 'components/ui/Form/FormError'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'

interface Props {
  isBottomSheet?: boolean
}

export default function ModalLogin(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const authContext = useAuthContext()


  const initialValues: LoginFormData = {
    authInput: '',
    password: ''
  }
  const result = (<Formik initialValues={initialValues} onSubmit={authContext.login}>
    <Form className={styles.form}>
      <div className={styles.label}>{t('login_socials_title')}</div>
      <div className={styles.socials}>
        <SocialButtons/>
      </div>
      <div className={styles.label}>{t('login_or')}</div>
      <div className={styles.inputs}>
        <InputField
          format={'phoneAndEmail'}
          name={'authInput'}
          disabled={authContext.loading}
          placeholder={t('login_field_identity')} validate={Validator.required}/>
        <InputField name={'password'} placeholder={t('login_field_password')} type={'password'} obscure disabled={authContext.loading}
                    validate={Validator.required}/>
      </div>
      <div className={styles.forgot} onClick={() => { context.showModal(ModalType.passwordRecovery) }}>{t('login_forgot')}</div>
      <FormError error={authContext.error}/>
      <Button type='submit' size='play' fluid background='blueGradient500' spinner={authContext.loading}>{t('login_button')}</Button>
      <div className={styles.login}>
        {t('login_no_account')} <span onClick={() => context.showModal(ModalType.registration)}>{t('login_register')}</span>
      </div>
    </Form>
  </Formik>)

  if(props.isBottomSheet){
    return <BottomSheetLayout>
      <BottomSheetHeader title={t('login_title')}/>
      <BottomSheetBody>
        {result}
      </BottomSheetBody>
    </BottomSheetLayout>
  }else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('login_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
