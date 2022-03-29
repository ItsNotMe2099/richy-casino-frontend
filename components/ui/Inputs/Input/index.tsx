import styles from './index.module.scss'
import {FieldConfig, useField} from 'formik'
import cx from 'classnames'
import BaseInput from 'components/ui/Inputs/BaseInput'
import {ReactElement} from 'react'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
interface Props {
  label?: string,
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  hasAutoComplete?: boolean
  icon?: ReactElement
  name?: string
  variant?: 'normal' | 'shadow' | 'large'
}

export default function Input(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName,hasAutoComplete, icon, variant} = props
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  return (
    <div className={cx(styles.root, className, {[styles.hasError]: !!meta.error && meta.touched})}>
      <BaseInput {...field} variant={variant} {...props} hasError={hasError}/>
      <ErrorInput {...meta}/>
    </div>
  )
}
