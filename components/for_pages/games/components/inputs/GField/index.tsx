import styles from './index.module.scss'
import { useField, useFormikContext} from 'formik'
import cx from 'classnames'
import {ReactElement, useState} from 'react'
import { FieldValidator } from 'formik/dist/types'
import { useIMask } from 'react-imask'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import ArrowRightFieldSvg from 'components/svg/ArrowRightFieldSvg'
import CrossSvg from 'components/svg/CrossSvg'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'
import {IField} from 'types/interfaces'

type FormatType = 'phone' | 'phoneAndEmail'
export interface IGFieldProps extends IField{
  format?: FormatType
  blurValidate?: FieldValidator
  disabled?: boolean
  className?: string
  inputClassName?: string
  inputWrapperClassName?: string
  style?: 'normal' | 'currency',
  suffix?: 'clear' | 'arrow' | string | ReactElement
  labelSuffix?: string | ReactElement
  prefix?: string | ReactElement
  onChange?: (val: string | number) => void
}


export default function GField(props: IGFieldProps) {
  const {labelSuffix, label}  = props
  const defaultPhonePattern = '+*[********************]'
  const [focused, setFocus] = useState(false)
  const [obscureShow, setObscureShow] = useState(false)
  const [field, meta, helpers] = useField(props as any)
  const [phoneIsValid, setPhoneIsValid] = useState(false)
  const [pattern, setPattern] = useState<string | null>(props.format === 'phone' ? defaultPhonePattern : null)
  const showError = meta.touched && !!meta.error && !focused
  const { ref, maskRef } = useIMask({ mask: pattern as any || /.*/ })
  const { setFieldValue, setFieldTouched } = useFormikContext()


  const renderSuffix = () => {
    if(typeof props.suffix === 'string') {
      switch (props.suffix) {
        case 'clear':
          return field.value ? <div className={cx(styles.suffix, styles.clear)} onClick={() => setFieldValue(props.name,'')}><CrossSvg/></div> : null
        case 'arrow':
          return  <div className={cx(styles.suffix, styles.arrow)}><ArrowRightFieldSvg/></div>
      }
    }
    return props.suffix
  }
  const renderPrefix = () => {
    if(typeof props.prefix === 'string') {
      return  <div className={cx(styles.prefix, styles.currency)}>{props.prefix}</div>
    }
    return props.prefix
  }
  const handleChange = (e) => {
    field.onChange(e)
    if(props.onChange){
      props.onChange(e.target.value)
    }
  }
  return (
    <div className={cx(styles.root, props.className)}>
      <GFieldLabel label={label} labelSuffix={labelSuffix} hasError={showError}/>
      <div className={cx(styles.inputWrapper, props.inputWrapperClassName)}>
        <input
          {...field}
          onChange={handleChange}
          disabled={props.disabled}
          ref={props.format && ref as any}
          type={props.type || 'text'}
          className={cx(props.inputClassName,{
            [styles.input]: true,
            [styles.inputError]: showError,
            [styles.inputFocused]: focused,
            [styles.withSuffix]: !!props.suffix,
            [styles.withPrefix]: !!props.prefix,
          })}
          placeholder={props.placeholder}
          onFocus={(e) => {
            setFocus(true)
          }}
          onBlur={(e) => {
            setFocus(false)
            field.onBlur(e)
          }}
        />
        {props.prefix && (
          renderPrefix()
        )}
        {props.suffix && (
          renderSuffix()
        )}
      </div>
         <ErrorInput {...meta}/>
    </div>
  )
}

