import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {useState} from 'react'
import AuthRepository from 'data/repositories/AuthRepository'
import {formatPhone} from 'utils/formatters'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalPasswordReset(props: Props) {
  const context = useAppContext()
  const modalProps = context.modalProps
  const login = modalProps.login
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.resetPassword({login: data.login, code: data.code, password: data.password})
      console.log('PassRes', res)
      const accessToken = res.token

      if (!accessToken) {
        return
      }

      context.setToken(accessToken)
      context.updateUserFromCookies()
      context.hideModal()

    } catch (e) {
      setError(e.message)
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
            Введите ниже код, отправленный на указанный<br/>
            Вами {isEmail ? 'Email' : 'Тел.'} <span className={styles.login}>{isEmail ? login : formatPhone(login)}</span>
          </div>
          <div className={styles.inputs}>
            <InputField
              name={'code'}
              placeholder={`Код из ${isEmail ? 'Email' : 'СМС'}`} validate={Validator.required}/>
            <InputField
              name={'password'}
              type={'password'}
              obscure={true}
              placeholder={'Пароль'} validate={Validator.required}/>
            <InputField
              name={'passwordConfirm'}
              type={'password'}
              obscure={true}
              placeholder={'Повторите пароль'}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
            />
          </div>
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => context.showModal(ModalType.passwordRecovery, {login: context.modalProps.login})}>Отменить</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >Сменить</Button>
          </div>

        </Form>)}
      </Formik>
  )
}
