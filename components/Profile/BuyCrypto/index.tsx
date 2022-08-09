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
import {useEffect} from 'react'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import { useAppContext } from 'context/state'
import { ExchangeCurrencySelectField } from 'components/ui/Inputs/ExchangeCurrencySelectField'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import {debounce} from 'debounce'


interface Props {
  isBottomSheet?: boolean
}

export default function BuyCrypto(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const initialValues = {
    currencySent: 'USD',
    amountSent: 0,
    currencyGet: 'BTC',
    amountGet: 0
  }

  const handleSubmit = /*async*/ () => {

  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const calc = async (currencyFrom: string, currencyTo: string, amount: number) => {
    try {
      const res = await PaymentsRepository.purchaseCalculate(currencyFrom, currencyTo, amount)
      await formik.setFieldValue('amountGet', res.resultCoinAmount)
    }catch (e) {

    }
  }
  const {values, setFieldValue, handleChange} = formik
  const debouncedCalc = debounce(async (currencyFrom: string, currencyTo: string, amount: number) => {
   calc(currencyFrom, currencyTo, amount)
  }, 500)
  const currencies = Converter.convertCurrencyToOptionsExchange(context.currencies)
    useEffect(() => {
      debouncedCalc(values.currencySent, values.currencyGet, values.amountSent)
  }, [values.amountSent, values.currencySent, values.currencyGet])

  const result = (<>
    <div className={styles.send}>
              <div className={styles.texts}>
                <div className={styles.youSend}>
                  {t('buy_crypto_buy')}
                </div>
              </div>
              <div className={styles.inputs}>
                <InputField name={'amountSent'} className={styles.input} validate={Validator.required}/>
                <div className={styles.exchange}>
                  <ExchangeCurrencySelectField  name='currencySent' options={Converter.convertCurrencyToOptionsExchange(context.currencies.filter(i => !i.flags?.isCrypto))}/>
                </div>
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
                <div className={styles.exchange}> <ExchangeCurrencySelectField
                                                                               name='currencyGet' options={Converter.convertCurrencyToOptionsExchange(context.currencies.filter(i => i.flags?.isCrypto && i.flags?.isDepositAllowed))}/></div>
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
