import Button from 'components/ui/Button'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import InputField from 'components/ui/Inputs/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import {useEffect, useState} from 'react'
import Validator from 'utils/validator'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {ProfileSettingsSelectField} from 'components/ui/Inputs/ProfileSettingsSelectField'
import {useAppContext} from 'context/state'
import {
  ConfirmNewPhoneModalArguments,
  ConfirmOldPhoneModalArguments,
  IOption,
  TwoFaModalArguments
} from 'types/interfaces'
import Converter from 'utils/converter'
import FormError from 'components/ui/Form/FormError'
import UserRepository from 'data/repositories/UserRepository'
import {UserFormData} from 'types/form-data'
import {ProfileSettingsCountrySelectField} from 'components/ui/Inputs/ProfileSettingsCountrySelectField'
import {useTranslation} from 'next-i18next'
import {ProfileSettingsCitySelectField} from 'components/ui/Inputs/ProfileSettingsCitySelectField'
import {ProfileModalType} from 'types/enums'
import Formatter from 'utils/formatter'
import ProfileModalLayout from 'components/Profile/layout/ProfileModalLayout'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import ProfileModalBody from 'components/Profile/layout/ProfileModalBody'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import Close from 'components/svg/Close'
import {DateField} from 'components/ui/Inputs/DateField'
import PhoneField from 'components/ui/Inputs/PhoneField'

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

}

export default function Settings(props: Props) {
  const {t} = useTranslation()

  const context = useAppContext()
  const [isChange, setIsChange] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const [sending2Fa, setSending2Fa] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const [error2Fa, setError2Fa] = useState(null)
  const enabled2Fa = context.user.flags.is2FaEnabled
  const initialValues: UserFormData = {
    id: context.user.id,
    username: context.user.username,
    surname: context.user.surname,
    name: context.user.name,
    birthday_date: context.user.birthdayDate,
    country_iso: context.user.countryIso,
    currency_iso: context.user.currencyIso,
    phone: `+${context.user.phone}`,
    email: context.user.email,
    city_id: context.user.cityId,
    gender: context.user.gender,
    fakePassword: '123456',
    currentPassword: '',
    password: '',
    passwordConfirm: '',
    is_hide_username: context.user.flags.isHideUsername,
    is_hide_from_leaderboard: context.user.flags.isHideFromLeaderboard,
    is_hide_from_statistics: context.user.flags.isHideFromStatistics,
    is_hide_balance: context.user.flags.isHideBalance,
  }

  const handleSubmit = async (data: UserFormData) => {
    setSending(true)
    setError(null)
    setError2Fa(null)
    if (data.password) {
      try {
        await UserRepository.changePassword(data.currentPassword, data.password)
        setSending(false)
      } catch (e) {
        setError(e)
        setSending(false)
        return
      }
    }
    try {
      const res = await UserRepository.updateUser({...data, ...(data.phone ? {phone: Formatter.cleanPhone(data.phone)} : {})})
      const oldPhone = context.user.phone
      await context.updateUserFromCookies()
      if(res.shouldConfirmOldPhone){
        context.goBackModalProfile()
        context.showModalProfile(ProfileModalType.oldPhoneConfirm, {phone: oldPhone, shouldConfirmNewPhone: res.shouldConfirmNewPhone} as ConfirmOldPhoneModalArguments)
      }else if(res.shouldConfirmNewPhone){
        context.goBackModalProfile()
        context.showModalProfile(ProfileModalType.newPhoneConfirm, {phone: data.phone} as ConfirmNewPhoneModalArguments)
      }else {
        context.showModalProfile(ProfileModalType.profile)
      }
    } catch (e) {
      setError(e)
    }
    setSending(false)

  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true
  })
  useEffect(() => {
    if (!formik.isSubmitting) return
    try {
      if (Object.keys(formik.errors).length > 0) {
        const name = Object.keys(formik.errors)[0]
        const byName = document.getElementsByName(name)
        if (byName.length > 0) {
          return byName[0].focus()
        }
        const byAttribute = document.querySelectorAll(`[data-field="${name}"]`)
        if (byAttribute.length > 0) {
          return byAttribute[0].scrollIntoView()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [formik])
  const {values} = formik

  const currencies = Converter.convertCurrencyToOptions(context.currencies)

  const toggleChangePassword = () => {
    setError(null)
    setError2Fa(null)
    if (isChange) {
      formik.setFieldValue('currentPassword', '')
      formik.setFieldValue('password', '')
      formik.setFieldValue('passwordConfirm', '')
    }
    setIsChange(!isChange)
  }
  const handle2fa = async (enable: boolean) => {
    setError2Fa(null)
    setSending2Fa(true)
    try {
      if (enable) {
        const qrUrl = await UserRepository.twoFaEnable()
         context.showModalProfile(ProfileModalType.FA, {qrUrl} as TwoFaModalArguments)
      } else {
        await UserRepository.twoFaDisable()
        context.updateUserFromCookies()

      }
    } catch (e) {
      setError2Fa(e)
    }
    setSending2Fa(false)

  }

  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <ProfileModalLayout fixed>
        <ProfileModalHeader title={t('settings_title')}/>
          <ProfileModalBody fixed>
            <div>
            <InputField name={'id'} disabled={true} className={styles.input} label={t('settings_field_id')}
                        errorClassName={styles.fieldError}/>
            <InputField name={'username'} className={styles.input} label={t('settings_field_username')}
                        disabled={sending} errorClassName={styles.fieldError}/>
            <InputField name={'surname'} className={styles.input} label={t('settings_field_surname')} disabled={sending}
                        errorClassName={styles.fieldError}/>
            <InputField name={'name'} className={styles.input} label={t('settings_field_name')}
                        disabled={sending} errorClassName={styles.fieldError}/>
            <DateField name={'birthday_date'} className={styles.input} label={t('settings_field_birthday')}
                        disabled={sending} errorClassName={styles.fieldError}/>
            <ProfileSettingsCountrySelectField name={'country_iso'} label={t('settings_field_country')}
                                               disabled={sending}
                                               validate={Validator.required}/>
            <ProfileSettingsCitySelectField name={'city_id'} label={t('settings_field_city')}
                                            countryIso={values.country_iso} disabled={sending}/>
            <ProfileSettingsSelectField name='currency_iso' validate={Validator.required} options={currencies}
                                        label={t('settings_field_currency')} disabled={sending}/>
          <PhoneField defaultCountry={context.countryByIp?.iso}   label={t('settings_field_phone')} disabled={sending} name={'phone'} styleType={'horizontal'}  countrySelectClassName={styles.inputPhoneCountrySelect} fieldWrapperClassName={classNames(styles.input, styles.inputPhone)} errorClassName={styles.fieldError} validate={Validator.required} />

            <InputField name={'email'} disabled={true} className={styles.input} label={t('settings_field_email')}
                        errorClassName={styles.fieldError}/>
            <div className={classNames(styles.change, {[styles.justify]: isChange})}>
              {isChange ?
                <>
                  <div className={styles.passwordChangeHeader}>
                    <div className={styles.line}></div>
                    <div className={styles.title}>{t('settings_password_change_title')}</div>
                  </div>
                  <Button className={classNames(styles.btn, styles.btnPasswordChange)} disabled={sending} size='large' background='blueGradient500'
                          type='button' onClick={toggleChangePassword}>
                    <span className={styles.btnText}>{t('settings_password_cancel_button')}</span> <Close/>
                  </Button>
                </>
                :
                <>
                  <InputField name={'fakePassword'} disabled={true} className={styles.input}
                              label={t('settings_field_password')} type={'password'}
                              errorClassName={styles.fieldError}/>
                  <Button className={classNames(styles.btn, styles.btnPasswordChange)} disabled={sending} size='large' background='blueGradient500'
                          type='button'
                          onClick={toggleChangePassword}>
                    <span className={styles.btnText}> {t('settings_password_change_button')}</span><img src='/img/icons/edit.svg' alt=''/>
                  </Button>
                </>}
            </div>
            {isChange &&
            <>
              <InputField
                name={'currentPassword'}
                className={styles.input}
                placeholder={t('settings_field_current_password')}
                validate={values.password || values.passwordConfirm ? Validator.required : undefined}
                disabled={sending}
                type={'password'}
                errorClassName={styles.fieldError}
              />
              <InputField
                name={'password'}
                type={'password'}
                className={styles.input}
                disabled={sending}
                placeholder={t('settings_field_new_password')}
                validate={values.fakePassword || values.password || values.passwordConfirm ? Validator.required : undefined}
                errorClassName={styles.fieldError}/>
              <InputField
                name={'passwordConfirm'}
                type={'password'}
                disabled={sending}
                className={styles.input}
                placeholder={t('settings_field_new_password_confirm')}
                validate={values.fakePassword || values.password || values.passwordConfirm ? Validator.combine([Validator.required, Validator.passwordsMustMatch(values)]) : undefined}
                errorClassName={styles.fieldError}
              />
            </>
            }
            <FormError error={error2Fa}/>
            <div className={styles.fa}>
              <div className={styles.faInput}>
                {enabled2Fa ? <>{t('settings_2fa')} <span
                    className={styles.blue}>{t('settings_2fa_enabled')}</span></> :
                  <>{t('settings_2fa')} <span className={styles.red}>{t('settings_2fa_disabled')}</span></>}
              </div>
              <Button className={classNames(styles.btn, {[styles.faBtn]: true})}
                      type={'button'}
                      spinner={sending2Fa}
                      background={!enabled2Fa ? 'payGradient500' : 'dark600'}
                      onClick={() => handle2fa(!enabled2Fa)}>
                {!enabled2Fa ? t('settings_2fa_enable') : t('settings_2fa_disable')}
              </Button>
            </div>
            <HiddenXs>
              <div className={styles.boxes}>
                  <CheckBox className={styles.checkbox} size='large' disabled={sending} name='is_hide_username'
                            label={t('settings_hide_username')}/>
                  <CheckBox className={styles.checkbox} size='large' disabled={sending} name='is_hide_from_statistics'
                            label={t('settings_hide_from_statistics')}/>
                  <CheckBox className={styles.checkbox} size='large' disabled={sending} name='is_hide_from_leaderboard'
                            label={t('settings_hide_from_leaderboard')}/>
                  <CheckBox className={styles.checkbox} size='large' disabled={sending} name='is_hide_balance' label={t('settings_hide_balance')}/>

              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={classNames(styles.boxes, styles.boxesMobile)}>
                <CheckBox className={styles.checkbox} size='large' name='is_hide_username' label={t('settings_hide_username')}/>
                <CheckBox className={styles.checkbox} size='large' name='is_hide_from_leaderboard' label={t('settings_hide_from_leaderboard')}/>
                <CheckBox  className={styles.checkbox} size='large' name='is_hide_from_statistics' label={t('settings_hide_from_statistics')}/>
                <CheckBox className={styles.checkbox} size='large' name='is_hide_balance' label={t('settings_hide_balance')}/>
              </div>
            </VisibleXs>
            </div>
          </ProfileModalBody>
          <ProfileModalFooter>
            <FormError error={error}/>
            <Button className={styles.save} spinner={sending} size='large' background='blueGradient500' type='submit'>
              {t('settings_save')}
            </Button>
          </ProfileModalFooter>
        </ProfileModalLayout>

      </Form>
    </FormikProvider>
  )
}
