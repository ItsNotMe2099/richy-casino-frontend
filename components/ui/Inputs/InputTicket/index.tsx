import styles from './index.module.scss'
import classNames from 'classnames'
import { useField } from 'formik'
import {IField} from 'types/interfaces'

interface Props extends IField{
  className?: string
}

export default function InputTicket(props: Props) {

  const [field, meta] = useField(props)
  const {value} = field
  const {placeholder} = props

  return (
    <div className={classNames(styles.root, props.className, {[styles.error]: meta.touched && meta.error, [styles.disabled]: props.disabled})}>
      <input
        name="ticket"
        type="text"
        autoComplete={'off'}
        placeholder={placeholder}
        {...field}
        disabled={props.disabled}
      />
    </div>
  )
}
