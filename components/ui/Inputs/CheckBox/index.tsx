import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import {CustomCheckbox} from 'components/ui/CustomCheckbox'
import cx from 'classnames'
interface Props {
  label?: string
  disabled?: boolean
  biggerFont?: boolean
  size?: 'small' | 'normal' | 'large'
}

export const CheckBox = (props: Props & FieldConfig) => {
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  console.log('CheckBoxCheck', props.name, field.value)
  return (
    <div className={cx(styles.root, {
      [styles.large]: props.size === 'large'
    })}>
      <CustomCheckbox
        checked={field.value}
        disabled={props.disabled}
        label={props.label}
        onChange={(val) => setFieldValue(props.name, val)}
        color='#272832'
        biggerFont={props.biggerFont}
        />
      <ErrorInput {...meta}/>
    </div>
  )
}
