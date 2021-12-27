import styles from './index.module.scss'
import { useField } from 'formik'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { FieldValidator } from 'formik/dist/types'
import { useIMask } from 'react-imask'
import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { convertLibphonenumberToMask } from 'utils/converter'
import {IField} from 'types/interfaces'
import Eye from 'components/svg/Eye'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'

type FormatType = 'phone' | 'phoneAndEmail'

interface Props extends IField {
  obscure?: boolean
  format?: FormatType
  blurValidate?: FieldValidator
}

export default function InputField(props: Props) {
  const defaultPhonePattern = '+*[********************]'
  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props)
  const [phoneIsValid, setPhoneIsValid] = useState(false)
  const [pattern, setPattern] = useState<string | null>(props.format === 'phone' ? defaultPhonePattern : null)
  const showError = meta.touched && !!meta.error && !focused
  const { ref, maskRef } = useIMask({ mask: pattern as any || /.*/ })

  useEffect(() => {
    if (maskRef.current && (props.format === 'phone' || props.format === 'phoneAndEmail')) {
      if (isValidPhoneNumber(field.value || '')) {
        if (!phoneIsValid) {
          setPhoneIsValid(true)
          const asYouType = new AsYouType()
          asYouType.input(field.value || '')
          setPattern(convertLibphonenumberToMask(asYouType.getTemplate()))
          updateValueFromMask()
        }
      } else if (phoneIsValid) {
        setPhoneIsValid(false)
        setPattern(defaultPhonePattern)
        updateValueFromMask()
      }
      if (props.format === 'phoneAndEmail') {
        const looksLikePhone = /^\+?\d\s?\d\s?\d/.test(field.value || '') || /\d/.test(field.value || '')
        const looksLikeEmail = /[@.]/.test(field.value || '')
        if (!looksLikeEmail && looksLikePhone && !pattern && !setPhoneIsValid) {
          setPattern(defaultPhonePattern)
          updateValueFromMask()
        } else if (pattern && (field.value?.length < 4 || looksLikeEmail)) {
          setPattern(null)
          updateValueFromMask()
        }
      }
    }
  }, [ref.current, field.value])

  const updateValueFromMask = () => {
    setTimeout(() => {
      helpers.setValue(maskRef.current.value)
    }, 50)
  }

  const blurValidator = async () => {
    if (props.blurValidate) {
      const err = await props.blurValidate(field.value)
      if (err) {
        helpers.setError(err)
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <input
          {...field}
          ref={props.format && ref as any}
          type={props.obscure ? (obscureShow ? 'text' : 'password') : props.type}
          className={classNames({
            [styles.input]: true,
            [styles.inputError]: showError,
            [styles.inputFocused]: focused,
          })}
          placeholder={props.placeholder}
          onFocus={(e) => {
            setFocus(true)
          }}
          onBlur={(e) => {
            setFocus(false)
            field.onBlur(e)
            blurValidator()
          }}
        />
        {props.obscure && (
          <div className={classNames(styles.obscure, {[styles.show]: obscureShow})} onClick={() => { setObscureShow(!obscureShow) }}>
            <Eye/>
          </div>
        )}
         <ErrorInput {...meta}/>
      </div>
    </div>
  )
}

