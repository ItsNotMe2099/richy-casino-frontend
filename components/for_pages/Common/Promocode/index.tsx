import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useState} from 'react'
import {Form,FormikProvider, useFormik} from 'formik'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import InputField from 'components/ui/Inputs/InputField'

interface Props{

}


export default function PromoCode(props: Props) {
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: {
      couponCode: null
    },
    onSubmit: async values => {

    },
  })

  const handleDelete = async () => {


  }

  const {values} = formik

  return (
    <div className={styles.root}>
      <FormikProvider value={formik}>
            <Form>
              <div className={styles.form}>
                <div className={styles.input}><InputField name='couponCode' placeholder='Введите промокод' /></div>
                <ErrorInput error={error} touched={true}/>
                <Button className={styles.button} size='play' background='blueGradient500'>Использовать</Button>
              </div>
            </Form>
      </FormikProvider>
    </div>
  )
}
