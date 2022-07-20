import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import Converter from 'utils/converter'
import InputField from 'components/ui/Inputs/InputField'
import Validator from 'utils/validator'
import {ExchangeCurrencySelectField} from 'components/ui/Inputs/ExchangeCurrencySelectField'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import Button from 'components/ui/Button'
import BottomSheetLayout from 'components/layout/BottomSheetLayout'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheetBody'
import {useEffect, useRef, useState} from 'react'
import UserUtils from 'utils/user'
import InfoRepository from 'data/repositories/InfoRepository'
import FormError from 'components/ui/Form/FormError'


interface FormData{
  currencySent: string
  amountSent: number
  currencyGet: string
  amountGet: number
}
function customParseFloat(number){
  if(isNaN(parseFloat(number)) === false){
    let toFixedLength = 0
    let str = String(number);

    // You may add/remove seperator according to your needs
    ['.', ','].forEach(seperator=>{
      let arr = str.split(seperator)
      if( arr.length === 2 ){
        toFixedLength = arr[1].length
      }
    })

    return parseFloat(str).toFixed(toFixedLength)
  }

  return number // Not a number, so you may throw exception or return number itself
}
interface Props {
  isBottomSheet?: boolean
}

export default function Exchange(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const currencies = Converter.convertCurrencyToOptionsExchange(context.currencies.filter(i => i.flags.isCrypto))
  const initialCurrencySent = currencies.find(i => i.value.toUpperCase() === 'BTC')?.value ?? currencies[0]?.value
    const initialCurrencyGet = currencies.find(i => i.value.toUpperCase() === 'ETH')?.value ?? currencies[1]?.value

  const lastCurrencyIsoSentRef = useRef<string | null>(initialCurrencySent)
  const lastCurrencyIsoGetRef = useRef<string | null>(initialCurrencyGet)
  const amountSentRef = useRef<number | null>(30)
  const amountGetRef = useRef<number | null>(0)
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState<any | null>(null)
  const initialValues: FormData = {
    currencySent: initialCurrencySent,
    amountSent: 30,
    currencyGet: initialCurrencyGet,
    amountGet: 0
  }

  const handleSubmit = async (data: FormData) => {
    setError(null)
    setSending(true)
    try{
      await InfoRepository.convertCurrency(data.currencySent, data.currencyGet, data.amountSent)
      context.goBackModalProfile()
    }catch (e) {
      setError(e)
    }
    setSending(false)
  }

  const formik = useFormik<FormData>({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })
  const mainAccount = UserUtils.getMainBalanceTotals(context.user)
  const otherAccounts = (UserUtils.getOtherBalancesTotals(context.user))

  const currentBalance = [mainAccount, ...otherAccounts].find(i => i.currency === formik.values.currencySent)?.value
  const validationBalance = (value) => {
    const num = parseFloat(value)
    console.log('CheckNum', num, parseFloat(`${`${currentBalance}`.replace(',', '.')}`))
    if(num > parseFloat(`${`${currentBalance}`.replace(',', '.')}`)){
      return 'Больше чем на вашем балансе'
    }
    return  undefined
  }
  const currencyRotating = useRef<boolean>(false)
  const currencySent = context.currencies.find(i => i.iso === formik.values.currencySent)
  const currencyGet = context.currencies.find(i => i.iso === formik.values.currencyGet)
  const getRate = (currencyIsoSent: string, currencyIsoGet: string) => {
    const currencySent = context.currencies.find(i => i.iso === currencyIsoSent)
    return currencySent?.rateCurrencies[currencyIsoSent][`to${currencyIsoGet}`]

  }
  const rate = getRate(formik.values.currencySent, formik.values.currencyGet)
  const {values, setFieldValue, handleChange,} = formik
  const handleChangeAmountSent = (value: string) => {
    const num = customParseFloat(value)
    amountSentRef.current = num
    console.log('Rate11', rate, num,  rate * num)
    formik.setFieldValue('amountGet', (rate * num).toFixed(8).replace(/\.?0+$/,'')  )
  }
  const handleChangeAmountGet = (value: string) => {
    const num = +value
    amountGetRef.current = num
    formik.setFieldValue('amountSent', (num / rate).toFixed(8).replace(/\.?0+$/,''))
  }
  useEffect(() => {
    amountGetRef.current = formik.values.amountGet
  }, [formik.values.amountGet])

  useEffect(() => {
    amountSentRef.current = formik.values.amountSent
  }, [formik.values.amountSent])

  useEffect(() => {


    if(formik.values.currencyGet === formik.values.currencySent){
      currencyRotating.current = true
      const num = amountSentRef.current ?? 0
      const rate = getRate(lastCurrencyIsoGetRef.current, formik.values.currencyGet)
      console.log('GetRate', num, rate, formik.values.currencyGet, lastCurrencyIsoGetRef.current)
      formik.setFieldValue('amountGet',  (num * rate).toFixed(8).replace(/\.?0+$/,''))
      formik.setFieldValue('currencySent', lastCurrencyIsoGetRef.current)
    }else{
      const num = amountSentRef.current ?? 0
      const rate = getRate(formik.values.currencySent, formik.values.currencyGet)

      if(rate && !currencyRotating.current) {
        formik.setFieldValue('amountGet', (rate * num).toFixed(8).replace(/\.?0+$/,''))
      }
      currencyRotating.current = false
    }
    lastCurrencyIsoGetRef.current = formik.values.currencyGet
  }, [formik.values.currencyGet])
  useEffect(() => {

    if(formik.values.currencySent === formik.values.currencyGet){
      currencyRotating.current = true

      const num = amountSentRef.current ?? 0
      const rate = getRate(formik.values.currencySent, lastCurrencyIsoSentRef.current)
      console.log('GetRate', num, rate, lastCurrencyIsoSentRef.current, formik.values.currencyGet)
      formik.setFieldValue('amountGet',  (num * rate).toFixed(8).replace(/\.?0+$/,''))
      formik.setFieldValue('currencyGet', lastCurrencyIsoSentRef.current)
    }else{
      const num = amountSentRef.current
      if(rate && !currencyRotating.current) {
        formik.setFieldValue('amountGet', (rate * num).toFixed(8).replace(/\.?0+$/,''))
      }
      currencyRotating.current = false
    }
    lastCurrencyIsoSentRef.current = formik.values.currencySent
  }, [formik.values.currencySent])




  const result = (<>
    <div className={styles.send}>
              <div className={styles.texts}>
                <div className={styles.youSend}>
                  {t('exchange_you_send')}
                </div>
                <div className={styles.balance}>
                  {t('exchange_balance')} {currentBalance ?? 0}
                </div>
              </div>
              <div className={styles.inputs}>
                <InputField name={'amountSent'}  onChange={handleChangeAmountSent} className={styles.input} validate={Validator.combine([Validator.required, validationBalance])}/>
                <div className={styles.exchange}><ExchangeCurrencySelectField className={styles.select} name='currencySent' options={currencies}
                                                                             /></div>
              </div>
            </div>
            <div className={styles.equality}>
              1 {currencySent.name} ≈ {1 * rate} {currencyGet.name}
            </div>
            <div className={styles.separator}><img src='/img/Exchange/separator.svg' alt=''/></div>
            <div className={styles.send}>
              <div className={styles.texts}>
                <div className={styles.youSend}>
                  {t('exchange_you_get')}
                </div>
              </div>
              <div className={styles.inputs}>
                <InputField name={'amountGet'} onChange={handleChangeAmountGet} className={styles.input} validate={Validator.required}/>
                <div className={styles.exchange}><ExchangeCurrencySelectField
                  name='currencyGet' options={currencies} />
                </div>
              </div>
            </div>
  </>)

if(props.isBottomSheet){
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
      <BottomSheetLayout>
      <BottomSheetHeader title={t('exchange_title')}/>
      <BottomSheetBody>
            {result}
      </BottomSheetBody>
      <ProfileModalFooter>
        <FormError error={error}/>
            <Button type='submit' size='play' fluid spinner={sending} background='blueGradient500' className={styles.btn}>{t('exchange_button')}</Button>
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
          <ProfileModalHeader title={t('exchange_title')}/>
          <ProfileModalBody fixed className={styles.modalBody}>
            {result}
          </ProfileModalBody>
          <ProfileModalFooter>
            <FormError error={error}/>
            <Button type='submit' size='play' fluid spinner={sending} background='blueGradient500' className={styles.btn}>{t('exchange_button')}</Button>
          </ProfileModalFooter>
        </ProfileModalLayout>
      </Form>
    </FormikProvider>
  )
}
}
