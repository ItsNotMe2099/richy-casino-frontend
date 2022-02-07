import styles from './index.module.scss'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Form, Formik} from 'formik'
import classNames from 'classnames'
import {Select} from 'components/ui/Inputs/Select'
import PromoCode from 'components/for_pages/Common/Promocode'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'
import {Currency} from 'types/interfaces'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'

interface Props {
  currencies: Currency[]
}

export default function EmailForm(props: Props) {
  const context = useAppContext()
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async (data) => {
    try {
      setError(null)
      const res = await AuthRepository.registerEmail({
        email: data.email,
        password: data.password,
        currency: data.currency
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
    email: null,
    password: null,
    currency: 121,
    checkBox: false
  }


  const {t} = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={styles.form}>
        <div className={styles.inputs}>
          <Select name='currency' options={props.currencies}/>
          <InputField name={'email'} placeholder={'Электронный адрес'}
                      validate={Validator.combine([Validator.required, Validator.email])}/>
          <InputField name={'password'} type={'password'} obscure={true} placeholder={'Придумайте пароль'}
                      validate={Validator.required}/>

          <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
            <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
            <span>У меня есть промокод</span>
          </div>
          {promoCode &&
          <PromoCode/>
          }
          <CheckBox size={'small'} name='checkBox'
                    label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет' validate={Validator.required}/>
        </div>
        <FormError error={error}/>
        <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>Регистрация</Button>
        <div className={styles.login}>
          Уже есть аккаунт? <span onClick={() => context.showModal(ModalType.login)}>Войдите</span>
        </div>
      </Form>
    </Formik>
  )
}
