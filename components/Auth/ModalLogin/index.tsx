import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import SocialButtons from 'components/Auth/SocialButtons'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {LoginFormData, TwoFaLoginModalArguments} from 'types/interfaces'
import FormError from 'components/ui/Form/FormError'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'

interface Props {
  isBottomSheet?: boolean
}

export default function ModalLogin(props: Props) {
  const {t} = useTranslation()

  const appContext = useAppContext()
  const [loginFormData, setLoginFormData] = useState<LoginFormData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (values: LoginFormData) => {
    setLoginFormData(values)
    setLoading(true)
    const scrollY = window.scrollY
    try {
      setError(null)
      const res = await AuthRepository.login(values?.authInput, values.password)
      if (!res) {
        return
      }
      if(res.is2FaRequired){
        appContext.showModal(ModalType.faLogin, {identity: values.authInput, password: values.password} as TwoFaLoginModalArguments)
        return
      }
      const accessToken = res.token
      if (!accessToken) {
        setError(t('api_error_unknown'))
        setLoading(false)
        return
      }

      appContext.setToken(accessToken)
      appContext.updateUserFromCookies()
      appContext.hideModal()
      window.scrollTo(0, scrollY)
    }catch (e){
      console.error(e)
      setError(e)
    }
    setLoading(false)
  }

  const initialValues: LoginFormData = {
    authInput: '',
    password: ''
  }
  const result = (<Formik initialValues={initialValues} onSubmit={login}>
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
          disabled={loading}
          placeholder={t('login_field_identity')} validate={Validator.required}/>
        <InputField name={'password'} placeholder={t('login_field_password')} type={'password'} obscure disabled={loading}
                    validate={Validator.required}/>
      </div>
      <div className={styles.forgot} onClick={() => { appContext.showModal(ModalType.passwordRecovery) }}>{t('login_forgot')}</div>
      <FormError error={error}/>
      <Button type='submit' size='play' fluid background='blueGradient500' spinner={loading}>{t('login_button')}</Button>
      <div className={styles.login}>
        {t('login_no_account')} <span onClick={() => appContext.showModal(ModalType.registration)}>{t('login_register')}</span>
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
