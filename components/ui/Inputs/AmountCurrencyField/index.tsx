import styles from './index.module.scss'
import { useField, useFormikContext} from 'formik'
import cx from 'classnames'
import { useState} from 'react'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import {IField} from 'types/interfaces'
import AutosizeInput from 'react-input-autosize'
export interface Props extends IField{
  className?: string
  inputClassName?: string
  inputWrapperClassName?: string
  currency?: string
}


export default function AmountCurrencyField(props: Props) {
  const [focused, setFocus] = useState(false)
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error && !focused
  const { setFieldValue } = useFormikContext()
  const handleClick = (e) => {
    const el = document.querySelector(`[data-auto-grow-field="${props.name}"]`);
    (el as any)?.focus()
  }

  const handleChange = (e) => {
    field.onChange(e)
    if(props.onChange){
      props.onChange(e.target.value)
    }
  }


  return (
    <div className={cx(styles.root, props.className, {  [styles.inputError]: showError,})} onClick={handleClick}>
      <div className={cx(styles.wrapper, props.inputWrapperClassName)}>
        <AutosizeInput
          {...field}
          onChange={handleChange}
          data-auto-grow-field={props.name}
          disabled={props.disabled}
          type={props.type || 'text'}
          className={cx(props.inputClassName,{
            [styles.input]: true,
            [styles.inputFocused]: focused,
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
      <div className={styles.currency}>&nbsp;{props.currency}</div>
      </div>
         <ErrorInput {...meta}/>
    </div>
  )
}

