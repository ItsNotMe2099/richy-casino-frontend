import styles from './index.module.scss'
import Modal from '../../ui/Modal'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalRegistrationCompleted(props: Props) {
  const context = useAppContext()
  const handleSubmit = async (data) => {

  }

  const initialValues = {
    code: '',
    password: '',
    newPassword: ''
  }



  const { t } = useTranslation('common')


  return (
    <Modal {...props} title='Восстановление пароля'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values}) => (
        <Form className={styles.form}>
          <div className={styles.description}>
            Введите ниже код, отправленный на указанный
            Вами Email ({context.modalArguments.login})
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
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => context.showModal(ModalType.passwordRecovery, {login: context.modalArguments.login})}>Отменить</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >Сменить</Button>
          </div>

        </Form>)}
      </Formik>
    </Modal>
  )
}
