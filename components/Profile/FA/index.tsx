import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {TwoFaModalArguments} from 'types/interfaces'
import {useAppContext} from 'context/state'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import {useEffect, useRef, useState} from 'react'
import {Form, FormikProvider, useFormik} from 'formik'
import InputOtpCode from 'components/ui/Inputs/InputOtpCode'
import Validator from 'utils/validator'
import InputField from 'components/ui/Inputs/InputField'
import Button from 'components/ui/Button'
import UserRepository from 'data/repositories/UserRepository'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import FormError from 'components/ui/Form/FormError'

interface Props {

}

export default function FA(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const imgRef = useRef<any>(null)
  const args = context.modalArguments as TwoFaModalArguments
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!args.qrUrl) {
      return
    }
    fetch(args.qrUrl, {
      headers: {
        'Authorization': context.token ? `Bearer ${context.token}` : '',
      }
    })
      .then( async (response) => {
        const buffer = await response.text()
        const matches = /<img[^>]+src="([^">]+)"/.exec(buffer)
        if (imgRef.current && matches.length > 1 && matches[1]) {
          imgRef.current.src = matches[1]
        }
      })
  }, [args.qrUrl])
  const initialValues = {
    code: '',
    password: ''
  }

  const handleSubmit =async  (data) => {
    //temp
    setError(null)
    setSending(true)
    try {
      await UserRepository.twoFaConfirm(data)
      await context.updateUserFromCookies()
      context.goBackModalProfile()
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
    <ProfileModalLayout fixed>
      <ProfileModalHeader title={t('2fa_title')}/>
      <ProfileModalBody fixed>
        <div className={styles.root}>
          <div className={styles.scan}>
            {t('2fa_text')}
          </div>
          <div className={styles.qr}>
            <div className={styles.qrWrapper}>
            <img ref={imgRef} alt=''/>
            </div>
          </div>

          </div>


              <div className={styles.confirm}>
                Код подтверждения из Google Authenticator
              </div>
              <InputOtpCode name={'code'} length={6} validate={Validator.required}/>
              <InputField name={'password'} placeholder={'Ваш пароль'} type={'password'} obscure
                          validate={Validator.required} className={styles.password}/>
      </ProfileModalBody>
      <ProfileModalFooter fixed>
        <FormError error={error}/>
        <Button type='submit' size='play' spinner={sending} fluid background='blueGradient500' className={styles.btn}>Активировать 2FA</Button>
      </ProfileModalFooter>
    </ProfileModalLayout>
      </Form>
    </FormikProvider>
  )
}
