import { RegCurrencySelectField } from 'components/ui/Inputs/RegCurrencySelectField'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'
import { currentItem } from 'utils/converter'

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
    {({
        values,
        setFieldValue
      }) => (
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Registration
        </div>
        <RegCurrencySelectField name='currency' options={currencies} currentItem={currentItem(values, currencies)}/>
      </div>
    </Form>)}
  </Formik>
  )
}
