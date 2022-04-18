import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form,  FormikProvider, useFormik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import Converter from 'utils/converter'
import { useEffect, useState } from 'react'
import { UserBalanceSelectField } from 'components/ui/Inputs/UserBalanceSelectField'
import { IUserBalanceCurrency } from 'data/interfaces/IUser'


interface Props {
  onSubmit?: () => void
  step?: number
}

export default function WithdrawForm(props: Props) {

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const currencies = {
    totals: {
      USD: 90.47,
      BTC: 0.00025867
    }
  }

  const currenciesToArray = (object) => {
    const array = []
    Object.entries(object.totals).forEach(([key, value]) => {
      array.push({currency: key, value: value})
    })
    return array
  }

  const [balance, setBalance] = useState(currenciesToArray(currencies))
  const [currentItem, setCurrentItem] = useState(balance)

  console.log(balance)

  const initialValues = {
    amount: '',
    address: '',
    accountCurrency: Converter.convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[])[0]?.value
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })

  const {values, setFieldValue, handleChange,} = formik

  useEffect(() => {
    const array = Converter.convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[]).filter(item => item.value === values.accountCurrency)
    setCurrentItem(array)
  }, [values.accountCurrency])

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        {props.step === 1 &&
        <div className={styles.send}>
          <div className={styles.textTop}>
            <div className={styles.amount}>
              Основной счёт
            </div>
          </div>
          <UserBalanceSelectField name='accountCurrency' options={Converter.convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[])}
            currentItem={currentItem[0]}
          />
        </div>}
        {props.step === 3 &&
        <>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.amount}>
              Сумма
            </div>
            <div className={styles.limit}>
              Лимит одного вывода 7-1000$
            </div>
          </div>
          <InputField name={'amount'} className={styles.input} validate={Validator.required}/>
        </div>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.amount}>
              Адрес получателя
            </div>
          </div>
          <InputField name={'address'} className={styles.input} validate={Validator.required}/>
        </div>
        <Button type='submit' size='normal' background='blueGradient500' className={styles.btn}>Продолжить</Button>
        </>
        }
      </Form>
    </FormikProvider>
  )
}
