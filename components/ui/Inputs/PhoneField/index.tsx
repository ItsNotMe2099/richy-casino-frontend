import { FieldConfig, FieldHookConfig, useField } from 'formik'
import styles from './index.module.scss'
import { CountryCode, Metadata } from 'libphonenumber-js/core'

// @ts-ignore
import minMetadata from 'libphonenumber-js/metadata.min'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import classNames from 'classnames'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { IField } from 'types/interfaces'
import CountrySelect from './CountrySelect'
import {AsYouType} from 'libphonenumber-js'

// @ts-ignore
const metadata = new Metadata(minMetadata)


interface Props extends IField {
  blurValidate?: FieldValidator
  className?: string
  fieldWrapperClassName?: string
  label?: string
  errorClassName?: string
  defaultCountry?: string
  countrySelectClassName?: string
  styleType: 'horizontal' | 'vertical'
}

export default function PhoneField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)
  const { value } = field
  const [focused, setFocus] = useState(false)
  const [country, setCountry] = useState<string | null>(null)
  const showError = meta.touched && !!meta.error && !focused
const handleChange = (value: string) => {

  helpers.setValue(value)
  try{
    const parsed = new AsYouType()
    parsed.input(value)
    const mapCodes = {
      '1': 'US',//AG,AI,AS,BB,BM,BS,CA,DM,DO,GD,GU,JM...25total
      '7': 'RU',//KZ
      '39': 'IT', //VA
      '44': 'GB',//GG,IM,JE
      '47': 'NO',//SJ
      '61': 'AU',//CC, CX
      '212': 'MA',//EH
      '262': 'RE', //YT
      '290': 'SH',//TA
      '358': 'FI',//AX
      '599': 'CW',//BQ
      '590': 'GP'//BL,MF
    }
      if(mapCodes[`${parsed.getCallingCode()}`]){
        setCountry(mapCodes[`${parsed.getCallingCode()}`])
      }else{
        setCountry(null)
      }

  }catch (e) {
    console.error(e)
  }
}
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.inputWrapper, { [styles.withLabel]: props.label })}>
          {props.label &&
            <div className={styles.label}>
              {props.label}
            </div>
          }
          <div id={'phone-field'} className={classNames(styles.fieldWrapper, props.fieldWrapperClassName)}>
            <PhoneInputWithCountrySelect

              disabled={props.disabled}
              countrySelectComponent={CountrySelect}
              defaultCountry={props.defaultCountry as CountryCode}
              className={classNames({
                [styles.input]: true,
                [styles.inputError]: showError,
                [styles.inputFocused]: focused,
              })}
              placeholder={props.placeholder}
              onFocus={(e) => {
                setFocus(true)
              }}
              value={field.value}
              onBlur={(e) => {
                setFocus(false)
                field.onBlur(e)

              }}
              international

              withCountryCallingCode
              useNationalFormatForDefaultCountryValue
              countrySelectProps={{
                offsetLeft: props.styleType === 'horizontal' ? 20 : 0,
                offsetTop: props.styleType === 'horizontal' ? 12 : 8,
                className: props.countrySelectClassName,
                country
              }}

              onChange={handleChange} />
          </div>
        </div>
        <ErrorInput {...meta} />
      </div>
    </div>
  )
}
