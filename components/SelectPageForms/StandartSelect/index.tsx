import { SelectField } from 'components/ui/Inputs/SelectField'
import { useAppContext } from 'context/state'
import { Form, Formik } from 'formik'
import styles from 'pages/selectPage/index.module.scss'
import { convertCurrencyToOptions } from 'utils/converter'

export default function StandartSelect() {

  const context = useAppContext()

  const handleSubmit = async (data) => {

  }

  const initialValues = {
    currency: 'USD (USD)',
  }

  return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <div className={styles.select}>
            <div className={styles.text}>
              Default
            </div>
            <SelectField name='currency' options={convertCurrencyToOptions(context.currencies)} initial={initialValues.currency}/>
          </div>
        </Form>
      </Formik>
  )
}
