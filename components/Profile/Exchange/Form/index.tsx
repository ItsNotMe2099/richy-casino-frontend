import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import { useEffect } from 'react'
import {convertCurrencyToOptionsExchange} from 'utils/converter'
import { useAppContext } from 'context/state'
import { ExchangeCurrencySelectView } from 'components/ui/Inputs/ExchangeCurrencySelectView'

interface IUser{
  id: string
  balance: string
}


interface Props {
  onSubmit?: () => void
  user: IUser
}

export default function ExchangeForm(props: Props) {

  const context = useAppContext()

  const initialValues = {
    currencySent: convertCurrencyToOptionsExchange(context.currencies)[0].label,
    amountSent: 0,
    currencyGet: convertCurrencyToOptionsExchange(context.currencies)[1].label,
    amountGet: 0
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const array = [
    { iso: 'btc', name: 'BTC', rate: 0, symbol: ''},
    { iso: 'eht', name: 'EHT', rate: 0, symbol: ''}
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
              Вы отправите
            </div>
            <div className={styles.balance}>
              Баланс: {props.user.balance}
            </div>
          </div>
          <div className={styles.inputs}>
            <InputField name={'amountSent'} className={styles.input} validate={Validator.required}/>
            <ExchangeCurrencySelectView name='currencySent' options={convertCurrencyToOptionsExchange(context.currencies)} initial={initialValues.currencySent}/>
          </div>
        </div>
        <div className={styles.equality}>
          1 BTC ≈1 EHT
        </div>
        <div className={styles.separator}><img src='/img/Exchange/separator.svg' alt=''/></div>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.youSend}>
              Вы получите
            </div>
          </div>
          <div className={styles.inputs}>
            <InputField name={'amountGet'} className={styles.input} validate={Validator.required} disabled/>
            <ExchangeCurrencySelectView name='currencyGet' options={convertCurrencyToOptionsExchange(context.currencies)} initial={initialValues.currencyGet}/>
          </div>
        </div>
        <Button type='submit' size='play' fluid background='blueGradient500' className={styles.btn}>Обменять</Button>
      </Form>
    </FormikProvider>
  )
}
