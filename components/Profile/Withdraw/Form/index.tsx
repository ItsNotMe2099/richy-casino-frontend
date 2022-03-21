import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, Formik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import {convertUserBalanceCurrencyToOptions} from 'utils/converter'
import { useEffect, useState } from 'react'
import { UserBalanceSelect } from 'components/ui/Inputs/UserBalanceSelect'
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

  const [balance, setBalance] = useState([])

  const array = []

  useEffect(() => {
    Object.entries(currencies.totals).forEach(([key, value]) => {
      array.push({currency: key, value: value})
    })
    setBalance(array)
   }, []
  )

  const initialValues = {
    amount: '',
    address: '',
    accountCurrency: convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[])[0]?.value
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        {props.step === 1 &&
        <div className={styles.send}>
          <div className={styles.textTop}>
            <div className={styles.amount}>
              Основной счёт
            </div>
          </div>
          <UserBalanceSelect name='accountCurrency' options={convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[])}
            initial={convertUserBalanceCurrencyToOptions(balance as IUserBalanceCurrency[])[0]?.label}
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
      )}
    </Formik>
  )
}
