import Button from 'components/ui/Button'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import Validator from 'utils/validator'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { ProfileSettingsSelectField } from 'components/ui/Inputs/ProfileSettingsSelectField'
import { useAppContext } from 'context/state'
import { IOption } from 'types/interfaces'
import Converter from 'utils/converter'
import FormError from 'components/ui/Form/FormError'
import UserRepository from 'data/repositories/UserRepository'
import {UserFormData} from 'types/form-data'
import {ProfileSettingsCountrySelectField} from 'components/ui/Inputs/ProfileSettingsCountrySelectField'
import {useTranslation} from 'next-i18next'

interface IUser {
  id: string
  userName: string
  name: string
  dateOfBirth: string
  country: string
  currency: IOption<string>[]
  phone: string
  email: string
  password: string
}

interface Props {
  user: IUser
}

export default function Settings(props: Props) {
  const {t} = useTranslation()
  const [isChange, setIsChange] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const [error, setError] = useState(null)

  const context = useAppContext()

  const initialValues: UserFormData = {
    id: context.user.id,
    username: context.user.username,
    surname: context.user.surname,
    name: context.user.name,
    birthday_datе: context.user.birthdayDate,
    country_iso: context.user.countryIso,
    currency_iso: context.user.currencyIso,
    phone: context.user.phone,
    email: context.user.email,
    city_id: context.user.cityId,
    gender: context.user.gender,
    password: '',
    is_hide_username: context.user.flags.isHideUserName,
    is_hide_from_leaderboard: context.user.flags.iHideFromLeaderboard,
    is_hide_from_statistics: context.user.flags.isHideFromStatistics,
    is_hide_balance: context.user.flags.isHideBalance,
  }

  const handleSubmit = async (data: UserFormData) => {
  setSending(true)
    await UserRepository.updateUser(data)
  setSending(false)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })

  const {values, setFieldValue, handleChange,} = formik

  const currencies = Converter.convertCurrencyToOptions(context.currencies)


  const allValues = {
    password: props.user.password
  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <InputField name={'id'} disabled={true} className={styles.input} label={t('settings_field_id')}/>
        <InputField name={'username'} className={styles.input} label={t('settings_field_username')} validate={Validator.required}/>
        <InputField name={'surname'} className={styles.input} label={t('settings_field_surname')}/>
        <InputField name={'name'} className={styles.input} label={t('settings_field_name')}/>
        <InputField name={'birthday_datе'} className={styles.input} label={t('settings_field_birthday')}/>
        <ProfileSettingsCountrySelectField name={'country_iso'} label={t('settings_field_country')}/>
        <ProfileSettingsSelectField name='currency_iso' validate={Validator.required}
        options={currencies}  label={t('settings_field_currency')}/>
        <InputField name={'phone'} disabled={true} className={styles.input} label={t('settings_field_phone')}/>
        <InputField name={'email'} disabled={true} className={styles.input} label={t('settings_field_email')}/>
        <div className={classNames(styles.change, {[styles.justify]: isChange})}>
          {isChange ?
          <>
            <div className={styles.isChange}>
            <div className={styles.line}></div>
            <div className={styles.title}>{t('settings_password_change_title')}</div>
            </div>
            <Button className={styles.cancel} size='large' background='blueGradient500' type='submit' onClick={() => setIsChange(false)}>
              {t('settings_password_cancel_button')}
            </Button>
          </>
          :
          <>
            <InputField name={'password'} disabled={true} className={styles.input} label={t('settings_field_password')} type={'password'}/>
            <Button className={styles.btn} size='large' background='blueGradient500' type='submit' onClick={() => setIsChange(true)}>
              <span> {t('settings_password_change_button')}</span><img src='/img/icons/edit.svg' alt=''/>
            </Button>
          </>}
        </div>
        {isChange &&
          <>
          <InputField
          name={'currentPassword'}
          className={styles.input}
          placeholder={t('settings_field_password')} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(allValues)])}
          type={'password'}
          />
          <InputField
          name={'password'}
          type={'password'}
          className={styles.input}
          placeholder={t('settings_field_password')} validate={Validator.required}/>
          <InputField
          name={'passwordConfirm'}
          type={'password'}
          className={styles.input}
          placeholder={t('settings_field_password')}
          validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}
          />
        </>
        }
        <div className={styles.fa}>
          <div className={styles.faInput}>
            {true ? <>{t('settings_2fa')} <span className={styles.blue}>{t('settings_2fa_enabled')}</span></> :
            <>{t('settings_2fa')} <span className={styles.red}>{t('settings_2fa_disabled')}</span></>}
          </div>
          <Button className={classNames(styles.btn, {[styles.faBtn]: false})} background={true ? 'dark600' : 'payGradient500'} type='submit'
          onClick={() => true ? setFieldValue('fa', false) : setFieldValue('fa', true)}>
            {false ? <>{t('settings_2fa_enable')}</> : <>{t('settings_2fa_disable')}</>}
          </Button>
        </div>
        <HiddenXs>
        <div className={styles.boxes}>
          <div className={styles.row}>
          <CheckBox size='large' name='is_hide_username' label={t('settings_hide_username')}/>
          <CheckBox size='large' name='is_hide_from_statistics' label={t('settings_hide_from_statistics')}/>
          </div>
          <div className={styles.row}>
          <CheckBox size='large' name='is_hide_from_leaderboard' label={t('settings_hide_from_leaderboard')}/>
          <CheckBox size='large' name='is_hide_balance' label={t('settings_hide_balance')}/>
          </div>
        </div>
        </HiddenXs>
        <VisibleXs>
          <>
            <CheckBox size='large' name='is_hide_username' label={t('settings_hide_username')}/>
            <CheckBox size='large' name='is_hide_from_leaderboard' label={t('settings_hide_from_leaderboard')}/>
            <CheckBox size='large' name='is_hide_from_statistics' label={t('settings_hide_from_statistics')}/>
            <CheckBox size='large' name='is_hide_balance' label={t('settings_hide_balance')}/>
          </>
        </VisibleXs>
        <FormError error={error}/>
        <Button className={styles.save} size='large' background='blueGradient500' type='submit'>
          {t('settings_save')}
        </Button>
      </Form>
    </FormikProvider>
  )
}
