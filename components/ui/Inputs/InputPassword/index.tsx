import styles from './index.module.scss'
import {FieldConfig, useField} from 'formik'
import cx from 'classnames'
import BaseInput from 'components/ui/Inputs/BaseInput'
import {ReactElement, useState} from 'react'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import Eye from 'components/svg/Eye'
import classNames from 'classnames'

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

export default function InputPassword(props: Props & FieldConfig) {
  const {label, placeholder, className, inputClassName, hasAutoComplete, icon, variant} = props
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  const [showRaw, setShowRaw] = useState(false)
  const handleShowClick = (e) => {
    e.preventDefault()
    setShowRaw(i => !i)
  }

  return (
    <div className={cx(styles.root, className, {[styles.hasError]: !!meta.error && meta.touched})}>
      <BaseInput {...field} variant={variant} {...props} hasError={hasError}
                 suffixIcon={<Eye className={classNames(styles.show, {[styles.hide]: !showRaw})}
                                  {...props}

                                  onClick={handleShowClick}/>}
                 type={showRaw ? 'text' : 'password'}
      />
      <ErrorInput {...meta}/>
    </div>
  )
}
