import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from './index.module.scss'
import cx from 'classnames'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'

import classNames from 'classnames'
import {IOption} from 'types/interfaces'

interface Props {
  options: IOption<any>[]
  label?: string
  disabled?: boolean
  className?: string
}

export const GFieldSelectTabs = (props: Props & FieldConfig) => {
  const {label, options, className} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const handleChange = (value) => {
    if(props.disabled){
      return
    }
    setFieldValue(props.name, value)
  }

  return (
    <div className={cx(styles.root, className, {[styles.hasError]: !!meta.error && meta.touched})}>
      <GFieldLabel label={label} hasError={hasError}/>
      <div className={styles.options}>
        {options.map((item, index) => <div className={classNames(styles.item, {
          [styles.active]: item.value === value
        })} key={item.value} onClick={() => handleChange(item.value)}>
          <div className={styles.label}>{item.label}</div>
        </div>)}
      </div>
      <ErrorInput {...meta}/>
    </div>
  )
}
GFieldSelectTabs.defaultProps = {
}
