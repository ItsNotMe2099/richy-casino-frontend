import { ExchangeCurrencySelectView } from 'components/ui/Inputs/ExchangeCurrencySelectView'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'

export default function ExchangeSelect() {

  const handleSubmit = async (data) => {

  }

  const currencies = [
    {label: 'USD', value: 'USD', symbol: '/img/Select/BTC.png'},
    {label: 'BTC', value: 'BTC', symbol: '/img/Select/BTC.png'},
  ]

  const initialValues = {
    currency: currencies[0].value,
  }

  return (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Exchange
        </div>
        <ExchangeCurrencySelectView name='currency' options={currencies} initial={currencies[0].label}/>
      </div>
    </Form>
  </Formik>
  )
}
