import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, Formik } from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import { Select } from 'components/ui/Inputs/Select'


interface Props {
  onSubmit?: () => void
  step?: number
}

export default function WithdrawForm(props: Props) {

  const initialValues = {
    amount: '', 
    address: '',
    accountCurrency: 1
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const array = [
    {id: 1, iso: 'btc', name: 'BTC', symbol: '/img/Exchange/bitcoin.png', type: 0},
    {id: 2, iso: 'eht', name: 'EHT', symbol: '/img/Exchange/eth.png', type: 0}
  ]

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        {props.step === 1 &&
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.amount}>
              Основной счёт
            </div>
          </div>
          <Select name='accountCurrency' options={array} exchange className={styles.select} rootClass={styles.selectRoot} withdraw/>
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
