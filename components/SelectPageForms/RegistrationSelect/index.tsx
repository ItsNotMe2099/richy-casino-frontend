import { RegCurrencySelectView } from 'components/ui/Inputs/RegCurrencySelectView'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'

export default function RegistrationSelect() {

  const handleSubmit = async (data) => {

  }

  const currencies = [
    {label: 'USD (USD)', value: 'USD', symbol: '$'},
    {label: 'BTC (BTC)', value: 'BTC', symbol: '₽'},
  ]

  const initialValues = {
    currency: currencies[0].value,
  }

  return (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Registration
        </div>
        <RegCurrencySelectView name='currency' options={currencies} initial={currencies[0].label}/>
      </div>
    </Form>
  </Formik>
  )
}
