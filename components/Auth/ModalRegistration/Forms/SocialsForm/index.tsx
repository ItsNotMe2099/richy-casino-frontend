import styles from './index.module.scss'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Form, Formik} from 'formik'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import {useAppContext} from 'context/state'
import SocialButtons from 'components/Auth/SocialButtons'
import Converter from 'utils/converter'
import {RegCurrencySelectField} from 'components/ui/Inputs/RegCurrencySelectField'
import FormFooter from 'components/Auth/ModalRegistration/Forms/FormFooter'
import FormPromocode from 'components/Auth/ModalRegistration/Forms/FormPromocode'
import Validator from 'utils/validator'

interface Props {
}

export default function SocialsForm(props: Props) {

  const context = useAppContext()
  const handleSubmit = async (data) => {

  }

  const initialValues = {
    currency: Converter.convertCurrencyToOptions(context.currencies)[0].value,
    checkBox: false
  }


  const {t} = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
          values,
          setFieldValue
        }) => (
        <Form className={styles.form}>
          <SocialButtons/>
          <div className={styles.inputs}>
            <div className={styles.select}>
              <RegCurrencySelectField name='currency'/>
            </div>
            <FormPromocode/>
            <CheckBox size={'small'} name='checkBox'
                      label={t('registration_terms')} validate={Validator.required}/>
          </div>
          <FormFooter/>
        </Form>)}
    </Formik>
  )
}
