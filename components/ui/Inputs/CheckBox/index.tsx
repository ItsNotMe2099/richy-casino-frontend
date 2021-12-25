import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from './index.module.scss'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import {CustomCheckbox} from 'components/ui/CustomCheckbox'
interface Props {
  label?: string
  disabled?: boolean
}

export const CheckBox = (props: Props & FieldConfig) => {
  const [field, meta] = useField(props)
  const { setFieldValue } = useFormikContext()
  const hasError = !!meta.error && meta.touched

  return (
    <div className={styles.root}>
      <CustomCheckbox
        checked={field.value}
        disabled={props.disabled}
        label={props.label}
        onChange={(val) => setFieldValue(props.name, val)}
        color='#272832'
        />
      <ErrorInput {...meta}/>
    </div>
  )
}
