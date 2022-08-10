import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { useField, useFormikContext } from 'formik'
import { useRef } from 'react'
import styles from './index.module.scss'
import DatePicker from 'react-date-picker/dist/entry.nostyle'

import { formatISO } from 'date-fns'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import {IField} from 'types/interfaces'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'

interface IOption {
  value: any
  label: string
}
interface Props  extends IField{
  className?: string
  errorClassName?: string
}

export const DateField = (props: Props) => {
  const {t, i18n} = useTranslation()
  const { label, placeholder, name, disabled } = props
  const [field, meta] = useField(props)
  const { value } = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

  const handleChange = (value) => {
    setFieldValue(props.name, value)
    setIsActive(false)
  }
  const hasError = !!meta.error && meta.touched
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.wrapper}>
        <div className={classNames(styles.inputWrapper, {[styles.withLabel]: props.label})}>
      {props.label &&
      <div className={styles.label}>
        {props.label}
      </div>
      }
      <DatePicker
        locale={i18n.language}
        name={name}
        disabled={disabled}
        className={styles.datePicker}
        maxDate={new Date()}
        openCalendarOnFocus={false}
        calendarIcon={null}
        clearIcon={null}
        onChange={(value) => {
          if (!value) {
            handleChange(null)
            return
          }
          try {
            if (isNaN(value.getTime()) || value.getFullYear() < 1000) {
              return
            }
            handleChange(formatISO(value, {representation: 'date'}))
          } catch (e) {
            console.error(e)
          }
        }}
        value={value ? new Date(value) : value}
      />
        </div>
      {hasError && <ErrorInput {...meta} />}
      </div>
    </div>
  )
}

