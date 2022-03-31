import styles from './index.module.scss'
import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import {Form, Formik} from 'formik'
import classNames from 'classnames'
import PromoCode from 'components/for_pages/Common/Promocode'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import Button from 'components/ui/Button'
import {ModalType} from 'types/enums'
import { useAppContext } from 'context/state'
import SocialButtons from 'components/Auth/SocialButtons'
import {convertCurrencyToOptions, currentItem} from 'utils/converter'
import { RegCurrencySelectField } from 'components/ui/Inputs/RegCurrencySelectField'

interface Props {
}

export default function SocialsForm(props: Props) {

  const context = useAppContext()
  const handleSubmit = async (data) => {

  }

  const initialValues = {
      currency: convertCurrencyToOptions(context.currencies)[0].value,
      checkBox: false
    }



  const { t } = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        values,
        setFieldValue
      }) => (
        <Form className={styles.form}>
          <SocialButtons/>

          <div className={styles.inputs}>
          <div className={styles.select}>
        <RegCurrencySelectField name='currency' options={convertCurrencyToOptions(context.currencies)} currentItem={currentItem(values, convertCurrencyToOptions(context.currencies))}/>
        </div>
            <div className={styles.promo} onClick={() => promoCode ? setPromoCode(false) : setPromoCode(true)}>
              <div className={classNames(styles.plus, {[styles.expanded]: promoCode})}>{promoCode ? '-' : '+'}</div>
               <span>У меня есть промокод</span>
             </div>
             {promoCode &&
              <PromoCode/>
             }
             <CheckBox size={'small'} name='checkBox' label='Я согласен с пользовательским соглашением и подтверждаю, что мне исполнилось 18 лет'/>
          </div>
          <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>Регистрация</Button>
          <div className={styles.login}>
            Уже есть аккаунт? <span onClick={() => context.showModal(ModalType.login)}>Войдите</span>
          </div>
        </Form>)}
      </Formik>
  )
}
