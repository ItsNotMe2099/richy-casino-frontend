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

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalPasswordRecovery(props: Props) {
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.forgotPassword(data.login)
      context.showModal(ModalType.passwordReset, {login: data.login})
    } catch (e) {
      setError(e.message)
    }
  }

  const initialValues = {
    login: ''
  }



  const { t } = useTranslation('common')


  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <div className={styles.description}>
            Пожалуйста, укажите email или номер телефона от Вашего аккаунта Richy и мы отправим Вам инструкцию по восстановлению пароля
          </div>
          <div className={styles.inputs}>
            <InputField
              format={'phoneAndEmail'}
              name={'login'}
              placeholder={'Email / Телефон'} validate={Validator.required}/>
                </div>
          <FormError error={error}/>
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => context.showModal(ModalType.login)}>Отменить</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >Продолжить</Button>
          </div>

        </Form>
      </Formik>
  )
}
