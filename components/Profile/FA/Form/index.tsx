import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import InputOtpCode from 'components/ui/Inputs/InputOtpCode'

interface Props {
  onSubmit?: () => void
}

export default function FAForm(props: Props) {

  const initialValues = {
    code: null,
    password: ''
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const {values, setFieldValue, handleChange} = formik

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.confirm}>
          Код подтверждения из Google Authenticator
        </div>
        <InputOtpCode name={'code'} length={6} validate={Validator.required}/>
        <InputField name={'password'} placeholder={'Ваш пароль'} type={'password'} obscure
                        validate={Validator.required} className={styles.password}/>
        <Button type='submit' size='play' fluid background='blueGradient500' className={styles.btn}>Активировать 2FA</Button>
      </Form>
    </FormikProvider>
  )
}
