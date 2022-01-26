import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {useAppContext} from 'context/state'
import {formatPhone} from 'utils/formatters'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import {ModalType} from 'types/enums'
import FormError from 'components/ui/Form/FormError'

interface Props {

}

export default function ModalRegistrationPhone(props: Props) {
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.registerPhone({
        code: data.code,
        password: data.password,
        authToken: null,
      })
      const accessToken = res.token

      if (!accessToken) {
        setError('Ошибка Регистрации')
      }

      context.setToken(accessToken)
      context.updateUserFromCookies()
      context.showModal(ModalType.registrationSuccess, {login: data.email, password: data.password})
    } catch (e) {
      setError(e.message)
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
            Введите ниже <span className={styles.code}>код</span>, отправленный на указанный
            Вами номер тел. <span className={styles.phone}>{formatPhone(context.modalProps.login)}</span>
          </div>
          <div className={styles.inputs}>
            <InputField
              name={'code'}
              placeholder={'Код из Email'} validate={Validator.required}/>
            <InputField
              name={'password'}
              type={'password'}
              obscure={true}
              placeholder={'Создайте пароль'} validate={Validator.required}/>
            <InputField
              name={'passwordConfirm'}
              type={'password'}
              obscure={true}
              placeholder={'Повторите пароль'}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
            />
          </div>
          <FormError error={error}/>
            <Button type='submit' fluid className={styles.button} size='submit' background='blueGradient500' >Продолжить</Button>

        </Form>)}
      </Formik>
  )
}
