import {FieldConfig, FieldHookConfig, useField, useFormikContext} from 'formik'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'
import parsePhoneNumber from 'libphonenumber-js'
import {Metadata} from 'libphonenumber-js/core'
// @ts-ignore
import minMetadata from 'libphonenumber-js/metadata.min'
import BaseInput from 'components/ui/Inputs/BaseInput'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import classNames from 'classnames'

// @ts-ignore
const metadata = new Metadata(minMetadata)

interface Props {
  variant?: 'normal' | 'shadow'
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

const codeDoubles = {
  '1': ['CA', 'US'],
  '590': 'FR',
  '47': 'NO',
  '290': 'SH',
  '262': 'RE',
  '44': 'GB',
  '61': 'AU',
}
const findCountryCode = (value) => {
  if(!value){
    return
  }
  const cleanValue = value?.replace(/[^\d]/g, '')
  const codes = (metadata as any).metadata.country_calling_codes
  const key = Object.keys(codes).reverse().find(key => cleanValue.indexOf(key) === 0)
  if (key) {
    const val = codeDoubles[key] ? (Array.isArray(codeDoubles[key]) ? codeDoubles[key][0] : codeDoubles[key]) : codes[key][0]
    return {value: val, label: `+${key}`, code: val, sort: 0}
  }
}

export default function InputPhone(props: Props & FieldConfig) {
  const {label, placeholder, disabled, variant} = props
  const [field, meta] = useField(props as FieldHookConfig<any>)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const [changed, setChanged] = useState(false)

  const [code, setCode] = useState(findCountryCode(value) || findCountryCode('7'))

  useEffect(() => {
    if(value) {
      calcCode(value)
    }
  }, [value])
  const calcCode = (value) => {
    const phoneNumber = parsePhoneNumber(`+${value}`)

    if (phoneNumber) {

      const country = phoneNumber.country ? phoneNumber.country : null
      const codeValue = country ? {
        code: country,
        value: country,
        label: `+ ${phoneNumber.countryCallingCode}`,
        sort: 0
      } : findCountryCode(value)
      if (codeValue) {
        setTimeout(() => setCode(codeValue), 200)
      }
    } else {
      const codeValue = findCountryCode(value)
      if (codeValue) {
        setTimeout(() => setCode(codeValue), 200)
      }
    }
    setChanged(true)
  }
  const handleInputChange = (e) => {
    setFieldValue(props.name, e.target.value?.replace(/[^\d]/g, ''))

  }

  const maskBuilder = v => {
    function maxValue(arr) {
      let max = arr[0]

      for (let val of arr) {
        if (val > max) {
          max = val
        }
      }
      return max
    }
    const phoneNumber = parsePhoneNumber(v?.includes('+') ? v : `+${v}`)
    if (phoneNumber) {
      (metadata as any).country(phoneNumber.country)
      let totalLength = metadata.numberingPlan ? maxValue(metadata.numberingPlan.possibleLengths()) : 13
      if(phoneNumber.country === 'RU'){
        totalLength = 10
      }
      if (!totalLength) {
        totalLength = 13
      }
      const addChars = totalLength > 0 ? Array.apply(null, {length: (totalLength - 6)}).map(i => '9').join('') : '9999999'
      if (totalLength < 6) {
        return `+ ${Array.apply(null, {length: phoneNumber?.countryCallingCode.length}).map(i => '9').join('')} ${Array.apply(null, {length: totalLength}).map(i => '9').join('')}`
      }
      if (phoneNumber?.countryCallingCode.length === 1) {
        return `+ 9 999-999${addChars ? `-${addChars}` : ''}`
      }
      if (phoneNumber?.countryCallingCode.length === 2) {
        return `+ 99 999-999${addChars ? `-${addChars}` : ''}`
      }
      if (phoneNumber?.countryCallingCode.length === 3) {
        return `+ 999 999-999${addChars ? `-${addChars}` : ''}`
      }
    } else if (code) {
      return `+ ${Array.apply(null, {length: code.value.length - 1}).map(i => '9').join('')} ${Array.apply(null, {length: 13}).map(i => '9').join('')}`

    }
    return '+ 9 999-999'
  }

  return (
      <div className={classNames(styles.root, props.className)}>
  <BaseInput {...field}
             variant={variant}
    disabled={disabled}
             onChange={handleInputChange}
             value={!value && !changed && code ? code.label.replace(/[^\d]/g, '') : value}
             maskChar={''}
             mask={maskBuilder(value)}
             placeholder={placeholder
             } hasError={hasError}/>
  <ErrorInput {...meta}/>
  </div>

  )
}
