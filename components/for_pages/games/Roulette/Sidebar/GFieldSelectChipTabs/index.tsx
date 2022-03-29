import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from './index.module.scss'
import cx from 'classnames'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'

import {IOption} from 'types/interfaces'
import {RouletteBetType} from 'components/for_pages/games/Roulette/data/enums'
import {RouletteBet} from 'components/for_pages/games/Roulette/components/RouletteBet'
export interface IOptionWithColor<T> extends IOption<T>{
  type: RouletteBetType
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

export const GFieldSelectChipTabs = (props: Props & FieldConfig) => {
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
      <GFieldLabel label={label} hasError={hasError} labelSuffix={value?.toFixed(8)}/>
      <div className={styles.options}>
        {options.map((item, index) => <RouletteBet key={item.value} isActive={item.value === value} type={item.type} label={item.label} onClick={() => handleChange(item.value)} />)}
      </div>
      <ErrorInput {...meta}/>
    </div>
  )
}
GFieldSelectChipTabs.defaultProps = {
}
