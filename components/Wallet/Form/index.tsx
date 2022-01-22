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

export default function WalletForm(props: Props) {

  const initialValues = {
    amount: '', 
  }

  const handleSubmit = /*async*/ () => {
    //temp
    props.onSubmit()
  }

  const [promoCode, setPromoCode] = useState(false)

  const options = [
    {value: '$10'}, 
    {value: '$20'},
    {value: '$50'},
    {value: '$75'},
    {value: '$150'},
    {value: '$500'},
    {value: '$1000'},
  ]

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        <InputField name={'amount'} className={styles.input} validate={Validator.required} alt/>
        <div className={styles.options}>
          {options.map((item, index) =>
            <div className={classNames(styles.option, {[styles.active]: item.value === values.amount})} 
            key={index} 
            onClick={() => setFieldValue('amount', item.value)}>
              {item.value}
            </div>
          )}
        </div>
        <div className={classNames(styles.bottom, {[styles.code]: promoCode})}>
        {!promoCode &&
        <div className={styles.promo} onClick={() => setPromoCode(true)}>
          <div className={styles.plus}>+</div>
           <span>Промокод</span>
         </div>}
         <div className={styles.rate}>
           <div>20 USDT ≈ 0,000020 DG</div>
           <div>1 USDT ≈ 0,000020 DG</div>
         </div>
         </div>
         {promoCode &&
          <PromoCode/>
         }
         <Button type='submit' size='normal' background='payGradient500' className={styles.wallet}><img src='/img/icons/wallet.svg' alt=''/>Пополнить</Button>
      </Form>
      )}
    </Formik>
  )
}
