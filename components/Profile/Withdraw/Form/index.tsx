import Button from 'components/ui/Button'
import InputField from 'components/ui/Inputs/InputField'
import { Form, Formik } from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import { useState } from 'react'
import PromoCode from 'components/for_pages/Common/Promocode'


interface Props {
  onSubmit?: () => void
}

export default function WithdrawForm(props: Props) {

  const initialValues = {
    amount: '', 
    address: ''
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.amount}>
              Сумма
            </div>
            <div className={styles.limit}>
              Лимит одного вывода 7-1000$
            </div>
          </div>
          <InputField name={'amount'} className={styles.input} validate={Validator.required}/>
        </div>
        <div className={styles.send}>
          <div className={styles.texts}>
            <div className={styles.amount}>
              Адрес получателя
            </div>
          </div>
          <InputField name={'address'} className={styles.input} validate={Validator.required}/>
        </div>
        <Button type='submit' size='normal' background='blueGradient500' className={styles.btn}>Продолжить</Button>
      </Form>
      )}
    </Formik>
  )
}
