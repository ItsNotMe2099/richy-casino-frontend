import Button from 'components/ui/Button'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import Validator from 'utils/validator'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import InfoRepository from 'data/repositories/InfoRepository'
import { ProfileSettingsSelect } from 'components/ui/Inputs/ProfileSettingsSelect'
import { convertCurrencyToOptions } from 'utils/converter'
import { useAppContext } from 'context/state'

interface IUser {
  id: string
  userName: string
  name: string
  dateOfBirth: string
  country: string
  currency: number
  phone: string
  email: string
  password: string
}

interface Props {
  user: IUser
}

export default function Settings(props: Props) {

  const [isChange, setIsChange] = useState(false)

  const context = useAppContext()

  const initialValues = {
    id: props.user.id,
    userName: props.user.userName,
    name: props.user.name,
    dateOfBirth: props.user.dateOfBirth,
    country: props.user.country,
    currency: props.user.currency,
    phone: props.user.phone,
    email: props.user.email,
    password: isChange ? '' : props.user.password,
    fa: false,
    checkBox1: true,
    checkBox2: true,
    checkBox3: false,
    checkBox4: false
  }

  const handleSubmit = async () => {

  }

  const [countries, setCountries] = useState([])
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const getCountries = async () => {
      const res = await InfoRepository.getCountries()
      setCountries(res)
    }
    const getCurrencies = async () => {
      const res = await InfoRepository.getCurrencies()
    setCurrencies(res)
  }
    getCurrencies()
    getCountries()
  }, [])

  const allValues = {
    password: props.user.password
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {({values, setFieldValue}) => (
      <Form className={styles.form}>
        <InputField name={'id'} disabled={true} className={styles.input} label='ID'/>
        <InputField name={'userName'} className={styles.input} label='Username'/>
        <InputField name={'name'} className={styles.input} label='ФИО'/>
        <InputField name={'dateOfBirth'} className={styles.input} label='Дата рождения'/>
        <ProfileSettingsSelect name='country' options={countries} initial={initialValues.country} inputLabel='Страна'/>
        <ProfileSettingsSelect name='currency' options={convertCurrencyToOptions(context.currencies)} initial={convertCurrencyToOptions(context.currencies)[0].label} inputLabel='Основная валюта'/>
        <InputField name={'phone'} disabled={true} className={styles.input} label='Номер телефона'/>
        <InputField name={'email'} disabled={true} className={styles.input} label='Почта'/>
        <div className={classNames(styles.change, {[styles.justify]: isChange})}>
          {isChange ?
          <>
            <div className={styles.isChange}>
            <div className={styles.line}></div>
            <div className={styles.title}>Изменение пароля</div>
            </div>
            <Button className={styles.cancel} size='large' background='blueGradient500' type='submit' onClick={() => setIsChange(false)}>
              Отменить
            </Button>
          </>
          :
          <>
            <InputField name={'password'} disabled={true} className={styles.input} label='Пароль' type={'password'}/>
            <Button className={styles.btn} size='large' background='blueGradient500' type='submit' onClick={() => setIsChange(true)}>
              <span>Сменить пароль</span><img src='/img/icons/edit.svg' alt=''/>
            </Button>
          </>}
        </div>
        {isChange &&
          <>
          <InputField
          name={'currentPassword'}
          className={styles.input}
          placeholder={'Текущий пароль'} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(allValues)])}
          type={'password'}
          />
          <InputField
          name={'password'}
          type={'password'}
          className={styles.input}
          placeholder={'Новый пароль'} validate={Validator.required}/>
          <InputField
          name={'passwordConfirm'}
          type={'password'}
          className={styles.input}
          placeholder={'Повторите пароль'}
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
          />
        </>
        }
        <div className={styles.fa}>
          <div className={styles.faInput}>
            {values.fa ? <>Двухфакторная аутентификация <span className={styles.blue}>включена</span></> : 
            <>Двухфакторная аутентификация <span className={styles.red}>отключена</span></>}
          </div>
          <Button className={classNames(styles.btn, {[styles.faBtn]: values.fa})} background={values.fa ? 'dark600' : 'payGradient500'} type='submit' 
          onClick={() => values.fa ? setFieldValue('fa', false) : setFieldValue('fa', true)}>
            {values.fa ? <>Отключить 2FA</> : <>Включить 2FA</>}
          </Button>
        </div>
        <HiddenXs>
        <div className={styles.boxes}>
          <div className={styles.row}>
          <CheckBox size='large' name='checkBox1' label='Скрыть юзернейм'/>
          <CheckBox size='large' name='checkBox3' label='Скрыть из общей статистики'/>
          </div>
          <div className={styles.row}>
          <CheckBox size='large' name='checkBox2' label='Скрыть из лидерборда'/>
          <CheckBox size='large' name='checkBox4' label='Скрыть баланс из шапки сайта'/>
          </div>
        </div>
        </HiddenXs>
        <VisibleXs>
          <>
            <CheckBox size='large' name='checkBox1' label='Скрыть юзернейм'/>
            <CheckBox size='large' name='checkBox2' label='Скрыть из лидерборда'/>
            <CheckBox size='large' name='checkBox3' label='Скрыть из общей статистики'/>
            <CheckBox size='large' name='checkBox4' label='Скрыть баланс из шапки сайта'/>
          </>
        </VisibleXs>
        <Button className={styles.save} size='large' background='blueGradient500' type='submit' onClick={handleSubmit}>
          Сохранить
        </Button>
      </Form>)}
    </Formik>
  )
}
