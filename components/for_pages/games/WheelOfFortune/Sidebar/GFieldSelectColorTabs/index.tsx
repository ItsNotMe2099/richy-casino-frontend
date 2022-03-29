import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from 'components/for_pages/games/WheelOfFortune/Sidebar/GFieldSelectColorTabs/index.module.scss'
import cx from 'classnames'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'

import classNames from 'classnames'
import {IOption} from 'types/interfaces'
export interface IOptionWithColor<T> extends IOption<T>{
  color: string
}
interface Props {
  options: IOptionWithColor<any>[]
  label?: string
  disabled?: boolean
  className?: string
  fluid?: boolean
  style?: 'normal' | 'small' | 'exSmall'
  onChange?: (value) => void
}

export const GFieldSelectColorTabs = (props: Props & FieldConfig) => {
  const {label, options, className, style, fluid} = props
  const [field, meta] = useField(props as any)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const handleChange = (value) => {
    if(props.disabled){
      return
    }
    setFieldValue(props.name, value)
    if(props.onChange){
      props.onChange(value)
    }
  }

  return (
    <div className={cx(styles.root, className, {
      [styles.normal]: style === 'normal',
      [styles.small]: style === 'small',
      [styles.exSmall]: style === 'exSmall',
      [styles.fluid]: fluid,
      [styles.hasError]: !!meta.error && meta.touched})}>
      <GFieldLabel label={label} hasError={hasError}/>
      <div className={styles.options}>
        {options.map((item, index) => <div className={classNames(styles.item, {
          [styles.active]: item.value === value
        }, styles[item.color])} key={item.value} onClick={() => handleChange(item.value)}>
          <div className={styles.label}>{item.label}</div>
        </div>)}
      </div>
      <ErrorInput {...meta}/>
    </div>
  )
}
GFieldSelectColorTabs.defaultProps = {
}
