import styles from './index.module.scss'
import {useTranslation} from 'react-i18next'
import {Form, Formik} from 'formik'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import SocialButtons from 'components/Auth/SocialButtons'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
}

export default function ModalLogin(props: Props) {
  const context = useAppContext()

  const handleSubmit = async (data) => {

  }

  const initialValues = {
    login: '',
    password: ''
  }


  const {t} = useTranslation('common')

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <div className={styles.label}>Через социальные сети</div>
          <div className={styles.socials}>
            <SocialButtons/>
          </div>
          <div className={styles.label}>или</div>
          <div className={styles.inputs}>
            <InputField
              format={'phoneAndEmail'}

              name={'login'}
              placeholder={'Email / Телефон'} validate={Validator.required}/>
            <InputField name={'password'} placeholder={'Пароль'} type={'password'} obscure
                        validate={Validator.required}/>
          </div>
          <div className={styles.forgot} onClick={() => { context.showModal(ModalType.passwordRecovery) }}>Забыли пароль?</div>
          <Button type='submit' size='play' fluid background='blueGradient500'>Авторизация</Button>
          <div className={styles.login}>
            Еще нет аккаунта? <span onClick={() => context.showModal(ModalType.registration)}>Зарегистрируйтесь</span>
          </div>
        </Form>
      </Formik>
  )
}
