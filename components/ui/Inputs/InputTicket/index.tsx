import styles from './index.module.scss'
import classNames from 'classnames'
import { FieldConfig, useField } from 'formik'

interface Props {
  placeholder?: string
  onChange?: (value) => void
  onClick?: () => void
  className?: string
}

export default function InputTicket(props: Props & FieldConfig) {

  const [field, meta] = useField(props)
  const {value} = field
  const {placeholder} = props

  return (
    <div className={classNames(styles.root, props.className)}>
      <input
        {...field}
        name="ticket"
        type="text"
        value={value}
        autoComplete={'off'}
        placeholder={placeholder}
      />
    </div>
  )
}
