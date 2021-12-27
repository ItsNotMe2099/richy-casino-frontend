import styles from './index.module.scss'
import Modal from '../../ui/Modal'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useModal} from 'store/modal-store'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  singlePage?: boolean
}

export default function ModalRegistrationCompleted(props: Props) {
  const {open, modalProps} = useModal()

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
            Вами Email ({modalProps.login})
          </div>
          <div className={styles.inputs}>
            <InputField
              name={'code'}
              placeholder={'Код из Email'} validate={Validator.required}/>
            <InputField
              name={'password'}
              type={'password'}
              obscure={true}
              placeholder={'Пароль'} validate={Validator.required}/>
            <InputField
              name={'passwordConfirm'}
              type={'password'}
              obscure={true}
              placeholder={'Пароль'}
              validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
            />
          </div>
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => open(ModalType.passwordRecovery, {login: modalProps.login})}>Отменить</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >Сменить</Button>
          </div>

        </Form>)}
      </Formik>
    </Modal>
  )
}
