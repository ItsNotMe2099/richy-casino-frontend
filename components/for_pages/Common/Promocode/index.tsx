import styles from './index.module.scss'
import Button from 'components/ui/Button'
import {useState} from 'react'
import {FormikProvider, useFormik} from 'formik'
import InputField from 'components/ui/Inputs/InputField'
import {useTranslation} from 'next-i18next'
import PromoCodeRepository from 'data/repositories/PromoCodeRepository'
import FormError from 'components/ui/Form/FormError'

interface Props {

}


export default function PromoCode(props: Props) {
  const {t} = useTranslation()

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState<string>()
  const [sending, setSending] = useState(false)
  const handleSubmit = async (values, {resetForm}) => {
    if(!values.keyword){
      return
    }
    setError(null)
    setSending(true)
    setSuccess(null)
    try {
      const res = await PromoCodeRepository.activate(values.keyword)
      setSuccess(t('promocode_success_message', {promocode: values.keyword}))
      resetForm()
    } catch (e) {
      setError(e)
    }
    setSending(false)
  }
  const formik = useFormik({
    initialValues: {
      keyword: null
    },
    onSubmit: handleSubmit
  })

  return (
    <div className={styles.root}>
      <FormikProvider value={formik}>

        <div className={styles.form}>
          <div className={styles.input}><InputField name='keyword' placeholder={t('promocode_form_field')}
                                                    disabled={sending}/></div>
          <Button type={'button'} className={styles.button} onClick={(e) => formik.handleSubmit(e as any)}
                  spinner={sending} size='play' background='blueGradient500'>{t('promocode_form_use')}</Button>
        </div>
        {success && <div className={styles.success}>{success}</div>}
        <FormError error={error}/>
      </FormikProvider>
    </div>
  )
}
