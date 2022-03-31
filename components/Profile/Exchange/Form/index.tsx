import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import { useEffect, useState } from 'react'
import {convertCurrencyToOptionsExchange} from 'utils/converter'
import { useAppContext } from 'context/state'
import { ExchangeCurrencySelectField } from 'components/ui/Inputs/ExchangeCurrencySelectField'

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
    currencySent: convertCurrencyToOptionsExchange(context.currencies)[0].value,
    amountSent: 0,
    currencyGet: convertCurrencyToOptionsExchange(context.currencies)[1].value,
    amountGet: 0
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })

  const {values, setFieldValue, handleChange,} = formik

  const currencies = convertCurrencyToOptionsExchange(context.currencies)

  const [currentSent, setCurrentSent] = useState(currencies.filter(item => item.value === values.currencySent))
  const [currentGet, setCurrentGet] = useState(currencies.filter(item => item.value === values.currencyGet))

  useEffect(() => {
    setFieldValue('amountGet', (values.amountSent*2))
    const array1 = currencies.filter(item => item.value === values.currencySent)
    const array2 = currencies.filter(item => item.value === values.currencyGet)
    setCurrentSent(array1)
    setCurrentGet(array2)
  }, [values.amountSent, values.currencySent, values.currencyGet])
  

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
            <div className={styles.exchange}><ExchangeCurrencySelectField name='currencySent' options={currencies}
            currentItem={currentSent[0]}/></div>
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
            <div className={styles.exchange}><ExchangeCurrencySelectField 
            name='currencyGet' options={convertCurrencyToOptionsExchange(context.currencies)} currentItem={currentGet[0]}/>
            </div>
          </div>
        </div>
        <Button type='submit' size='play' fluid background='blueGradient500' className={styles.btn}>Обменять</Button>
      </Form>
    </FormikProvider>
  )
}
