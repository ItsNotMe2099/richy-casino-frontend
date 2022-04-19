import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useState} from 'react'
import {Form,FormikProvider, useFormik} from 'formik'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import InputField from 'components/ui/Inputs/InputField'
import {useTranslation} from 'react-i18next'

interface Props{

}


export default function PromoCode(props: Props) {
  const [error, setError] = useState(null)
  const {t} = useTranslation()
  const formik = useFormik({
    initialValues: {
      couponCode: null
    },
    onSubmit: async values => {

    },
  })

  return (
    <div className={styles.root}>
      <FormikProvider value={formik}>
            <Form>
              <div className={styles.form}>
                <div className={styles.input}><InputField name='couponCode' placeholder={t('promocode_form_field')} /></div>
                <ErrorInput error={error} touched={true}/>
                <Button className={styles.button} size='play' background='blueGradient500'>{t('promocode_form_use')}</Button>
              </div>
            </Form>
      </FormikProvider>
    </div>
  )
}
