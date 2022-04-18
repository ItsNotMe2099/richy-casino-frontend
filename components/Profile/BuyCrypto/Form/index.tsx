import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import { SelectField } from 'components/ui/Inputs/SelectField'
import { useEffect } from 'react'
import {ICurrency} from 'data/interfaces/ICurrency'
import Converter from 'utils/converter'

interface IUser{
  id: string
  balance: string
}


interface Props {
  onSubmit?: () => void
  user: IUser
}

export default function BuyCryptoForm(props: Props) {

  const initialValues = {
    currencySent: 1,
    amountSent: 0,
    currencyGet: 2,
    amountGet: 0
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const array = [
    { iso: 'btc', name: 'BTC', rate: 0, /*symbol: '/img/Exchange/bitcoin.png'*/},
    { iso: 'eht', name: 'EHT', rate: 0, /*symbol: '/img/Exchange/eth.png'*/ }
  ]

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const {values, setFieldValue, handleChange} = formik

  useEffect(() => {
    setFieldValue('amountGet', (values.amountSent*2))
  }, [values.amountSent])

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.youSend}>
              Купить
            </div>
          </div>
          <div className={styles.inputs}>
            <InputField name={'amountSent'} className={styles.input} validate={Validator.required}/>
            <SelectField name='currencySent' options={Converter.convertCurrencyToOptions(array as ICurrency[])} className={styles.select}/>
          </div>
        </div>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.youSend}>
              Оплатить в
            </div>
          </div>
          <div className={styles.inputs}>
            <InputField name={'amountGet'} className={styles.input} validate={Validator.required} disabled/>
            <SelectField name='currencyGet' options={Converter.convertCurrencyToOptions(array as ICurrency[])}className={styles.select}/>
          </div>
        </div>
        <div className={styles.disclaimer}>
          Дисклеймер: MoonPay - это сторонний партнер, оказывающий услуги по покупке криптовалюты за деньги. Регистрируясь на его платформе, вы соглашаетесь на его условия оказания услуг с предоставлением запрашиваемых ими личных данных, и этот процесс протекает независимо от нас.
        </div>
        <Button type='submit' size='play' fluid background='blueGradient500' className={styles.btn}>Купить криптовалюту</Button>
      </Form>
    </FormikProvider>
  )
}
