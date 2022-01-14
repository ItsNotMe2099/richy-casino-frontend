import styles from './index.module.scss'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import classNames from 'classnames'
import { Select } from 'components/ui/Inputs/Select'
import PromoCode from 'components/for_pages/Common/Promocode'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import { Currency } from 'types/interfaces'

interface Props {
  currencies: Currency[]
}

export default function PhoneForm(props: Props) {

  const context = useAppContext()
  const handleSubmit = async (data) => {
    
  }

  const initialValues = {
      phone: null,
      password: null,
      currency: 121,
      checkBox: false
    }



  const { t } = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={styles.form}>

      <div className={styles.inputs}>
        <Select name='currency' options={props.currencies}/>
        <InputField format={'phone'} name={'phone'} placeholder={'Номер телефона'} validate={Validator.required} />
        <InputField name={'password'} type={'password'} obscure={true} placeholder={'Придумайте пароль'} validate={Validator.required}/>
        <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
          <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
           <span>У меня есть промокод</span>
         </div>
         {promoCode &&
          <PromoCode/>
         }
         <CheckBox name='checkBox' label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет'/>
      </div>
      <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>Регистрация</Button>
      <div className={styles.login}>
        Уже есть аккаунт? <span onClick={() => context.showModal(ModalType.login)}>Войдите</span>
      </div>
    </Form>
  </Formik>
  )
}
