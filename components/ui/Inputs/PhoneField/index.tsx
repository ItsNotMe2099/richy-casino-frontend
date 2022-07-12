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

// @ts-ignore
const metadata = new Metadata(minMetadata)


interface Props extends IField {
  blurValidate?: FieldValidator
  className?: string
  label?: string
  errorClassName?: string
  defaultCountry?: string
}

export default function PhoneField(props: Props & FieldConfig) {
  const [field, meta, helpers] = useField(props as FieldHookConfig<any>)
  const { value } = field
  const [focused, setFocus] = useState(false)

  const showError = meta.touched && !!meta.error && !focused

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.inputWrapper, { [styles.withLabel]: props.label })}>
          {props.label &&
            <div className={styles.label}>
              {props.label}
            </div>
          }
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
              arrowComponent: () => <img className={styles.arrow} src='/img/Select/arrow.svg' alt='' />
            }}

            onChange={helpers.setValue} />

        </div>
        <ErrorInput {...meta} />
      </div>
    </div>
  )
}
