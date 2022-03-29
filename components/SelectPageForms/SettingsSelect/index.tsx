import { ProfileSettingsSelect } from 'components/ui/Inputs/ProfileSettingsSelect'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'
import { currentItem } from 'utils/converter'

export default function SettingsSelect() {

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
          Settings
        </div>
        <ProfileSettingsSelect name='currency' options={currencies} currentItem={currentItem(values, currencies)} inputLabel='Основная валюта'/>
      </div>
    </Form>)}
  </Formik>
  )
}
