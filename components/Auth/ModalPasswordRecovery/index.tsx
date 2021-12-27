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

export default function ModalPasswordRecovery(props: Props) {
  const {open, modalProps} = useModal()

  const handleSubmit = async (data) => {
    open(ModalType.passwordReset, {login: data.login})
  }

  const initialValues = {
    login: modalProps.login || ''
  }



  const { t } = useTranslation('common')


  return (
    <Modal {...props} title='Восстановление пароля'>
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
          <div className={styles.buttons}>
            <Button type='button' className={styles.button} size='submit' background='dark600' onClick={() => open(ModalType.login)}>Отменить</Button>
            <div className={styles.spacer}/>
            <Button type='submit' className={styles.button} size='submit' background='blueGradient500' >Продолжить</Button>
          </div>

        </Form>
      </Formik>
    </Modal>
  )
}
