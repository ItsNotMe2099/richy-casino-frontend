import styles from './index.module.scss'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import {Form, FormikProvider, useFormik} from 'formik'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import Converter from 'utils/converter'
import Button from 'components/ui/Button'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import {useTranslation} from 'next-i18next'
import {useEffect, useState} from 'react'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import { useAppContext } from 'context/state'
import { ExchangeCurrencySelectField } from 'components/ui/Inputs/ExchangeCurrencySelectField'


interface Props {
  isBottomSheet?: boolean
}

export default function BuyCrypto(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const initialValues = {
    currencySent: Converter.convertCurrencyToOptionsExchange(context.currencies)[0].value,
    amountSent: 0,
    currencyGet: Converter.convertCurrencyToOptionsExchange(context.currencies)[1].value,
    amountGet: 0
  }

  const handleSubmit = /*async*/ () => {

  }



  const array = [
    {iso: 'btc', name: 'BTC', rate: 0, /*symbol: '/img/Exchange/bitcoin.png'*/},
    {iso: 'eht', name: 'EHT', rate: 0, /*symbol: '/img/Exchange/eth.png'*/}
  ]

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const {values, setFieldValue, handleChange} = formik

  const currencies = Converter.convertCurrencyToOptionsExchange(context.currencies)

  const [currentSent, setCurrentSent] = useState(currencies.filter(item => item.value === values.currencySent))
  const [currentGet, setCurrentGet] = useState(currencies.filter(item => item.value === values.currencyGet))

  useEffect(() => {
    setFieldValue('amountGet', (values.amountSent * 2))
  }, [values.amountSent])

  const result = (<>
    <div className={styles.send}>
              <div className={styles.texts}>
                <div className={styles.youSend}>
                  {t('buy_crypto_buy')}
                </div>
              </div>
              <div className={styles.inputs}>
                <InputField name={'amountSent'} className={styles.input} validate={Validator.required}/>
                <ExchangeCurrencySelectField className={styles.select} name='currencySent' options={currencies}
                                                                              currentItem={currentSent[0]}/>
              </div>
            </div>
            <div className={styles.send}>
              <div className={styles.texts}>
                <div className={styles.youSend}>
                  {t('buy_crypto_pay_in')}
                </div>
              </div>
              <div className={styles.inputs}>
                <InputField name={'amountGet'} className={styles.input} validate={Validator.required} disabled/>
                <ExchangeCurrencySelectField className={styles.select}
                  name='currencyGet' options={Converter.convertCurrencyToOptionsExchange(context.currencies)} currentItem={currentGet[0]}/>
              </div>
            </div>
            <div className={styles.disclaimer}>
              {t('buy_crypto_disclaimer')} {t('buy_crypto_disclaimer_text')}
            </div>
  </>)

  if(props.isBottomSheet){
    return(
    <FormikProvider value={formik}>

      <Form className={styles.form}>
        <BottomSheetLayout>
          <BottomSheetHeader title={t('buy_crypto_title')}/>
          <BottomSheetBody>
            {result}
          </BottomSheetBody>
          <ProfileModalFooter>
            <Button type='submit' size='play' fluid background='blueGradient500'
                    className={styles.btn}>{t('buy_crypto_but_button')}</Button>
          </ProfileModalFooter>
        </BottomSheetLayout>



      </Form>
    </FormikProvider>
    )
  }
  else{
  return (
    <FormikProvider value={formik}>

      <Form className={styles.form}>
        <ProfileModalLayout fixed>
          <ProfileModalHeader title={t('buy_crypto_title')}/>
          <ProfileModalBody fixed>
            {result}
          </ProfileModalBody>
          <ProfileModalFooter>
            <Button type='submit' size='play' fluid background='blueGradient500'
                    className={styles.btn}>{t('buy_crypto_but_button')}</Button>
          </ProfileModalFooter>
        </ProfileModalLayout>



      </Form>
    </FormikProvider>


  )
  }
}
