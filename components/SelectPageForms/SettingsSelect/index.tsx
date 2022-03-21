import { ProfileSettingsSelect } from 'components/ui/Inputs/ProfileSettingsSelect'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'

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
    <Form className={styles.form}>
      <div className={styles.select}>
        <div className={styles.text}>
          Settings
        </div>
        <ProfileSettingsSelect name='currency' options={currencies} initial={currencies[0].label} inputLabel='Основная валюта'/>
      </div>
    </Form>
  </Formik>
  )
}
