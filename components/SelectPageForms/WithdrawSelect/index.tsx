import { UserBalanceSelect } from 'components/ui/Inputs/UserBalanceSelect'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'

export default function WithdrawSelect() {

  const handleSubmit = async (data) => {

  }

  const currencies = [
    {label: 'USD', value: '99.99', symbol: '/img/Select/BTC.png'},
    {label: 'BTC', value: '0.00025867', symbol: '/img/Select/BTC.png', crypto: true},
  ]

  const initialValues = {
    currency: currencies[0].value,
  }

  return (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Withdraw
        </div>
        <UserBalanceSelect name='currency' options={currencies}
            initial={currencies[0].label}
        />
      </div>
    </Form>
  </Formik>
  )
}
