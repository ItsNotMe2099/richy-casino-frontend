import Button from 'components/ui/Button'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import { Select } from 'components/ui/Inputs/Select'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import request from 'utils/request'
import Validator from 'utils/validator'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IUser {
  id: string
  userName: string
  name: string
  dateOfBirth: string
  country: number
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
      const res = await request({
        method: 'get',
        url: 'https://admin.grtestdemo.com/api/countries',
      })
      setCountries(res.data.data)
    }
    const getCurrencies = async () => {
      const res = await request({
      method: 'get',
      url: 'https://admin.grtestdemo.com/api/currencies',
    })
    setCurrencies(res.data.data)
  }
    getCurrencies()
    getCountries()
  }, [])

  const allValues = {
    password: props.user.password
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
      {({values}) => (
      <Form className={styles.form}>
        <InputField name={'id'} disabled={true} className={styles.input} label='ID'/>
        <InputField name={'userName'} disabled={true} className={styles.input} label='Username'/>
        <InputField name={'name'} disabled={true} className={styles.input} label='ФИО'/>
        <InputField name={'dateOfBirth'} disabled={true} className={styles.input} label='Дата рождения'/>
        <Select name='country' options={countries} altStyle country label='Страна'/>
        <Select name='currency' options={currencies} altStyle label='Основная валюта'/>
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
              Сменить пароль
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
        <div className={styles.boxes}>
          <div className={styles.row}>
          <CheckBox biggerFont name='checkBox1' label='Скрыть юзернейм'/>
          <CheckBox biggerFont name='checkBox3' label='Скрыть из общей статистики'/>
          </div>
          <div className={styles.row}>
          <CheckBox biggerFont name='checkBox2' label='Скрыть из лидерборда'/>
          <CheckBox biggerFont name='checkBox4' label='Скрыть баланс из шапки сайта'/>
          </div>
        </div>
        <Button className={styles.save} size='large' background='blueGradient500' type='submit' onClick={handleSubmit}>
          Сохранить
        </Button>
      </Form>)}
    </Formik>
  )
}
