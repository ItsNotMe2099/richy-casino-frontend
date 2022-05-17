import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {TwoFaLoginModalArguments} from 'types/interfaces'
import {useAppContext} from 'context/state'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import {Form, FormikProvider, useFormik} from 'formik'
import InputOtpCode from 'components/ui/Inputs/InputOtpCode'
import Validator from 'utils/validator'
import Button from 'components/ui/Button'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import AuthRepository from 'data/repositories/AuthRepository'
import {useState} from 'react'
import FormError from 'components/ui/Form/FormError'

interface Props {
  isBottomSheet?: boolean
}

export default function FALogin(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const args = context.modalArguments as TwoFaLoginModalArguments
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const initialValues = {
    code: null
  }

  const handleSubmit = async (data) => {
    try{
    const res = await AuthRepository.faLogin(args.identity, args.identity, data.code)
    if (!res) {
      return
    }
    const accessToken = res.token
    if (!accessToken) {
      setError(t('api_error_unknown'))
      setLoading(false)
      return
    }

      context.setToken(accessToken)
      context.updateUserFromCookies()
      context.hideModal()
    }catch (e){
      console.error(e)
      setError(e)
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const result = (<div className={styles.root}>
    <div className={styles.scan}>
      {t('2fa_login_text')}
    </div>
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.confirm}>
          Код подтверждения из Google Authenticator
        </div>
        <InputOtpCode name={'code'} length={6} validate={Validator.required}/>
        <FormError error={error}/>
        <Button type='submit' size='play' fluid background='blueGradient500' spinner={loading} className={styles.btn}>Авторизация</Button>
      </Form>
    </FormikProvider>
  </div>)

  if (props.isBottomSheet) {
    return (<BottomSheetLayout>
      <BottomSheetHeader className={styles.mobileHeader} title={t('2fa_login_title')}/>
      <BottomSheetBody className={styles.sheetBody}>
        {result}
      </BottomSheetBody>

    </BottomSheetLayout>)
  } else {
    return (
      <ProfileModalLayout>
        <ProfileModalHeader title={t('2fa_login_title')}/>
        <ProfileModalBody>
          {result}
        </ProfileModalBody>
      </ProfileModalLayout>
    )
  }
}
