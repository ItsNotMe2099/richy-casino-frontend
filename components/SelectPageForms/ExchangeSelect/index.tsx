import { ExchangeCurrencySelectField } from 'components/ui/Inputs/ExchangeCurrencySelectField'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'
import Converter  from 'utils/converter'

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
    {({
        values,
        setFieldValue
      }) => (
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Exchange
        </div>
        <ExchangeCurrencySelectField name='currency' options={currencies} currentItem={Converter.currentItem(values, currencies)}/>
      </div>
    </Form>)}
  </Formik>
  )
}
