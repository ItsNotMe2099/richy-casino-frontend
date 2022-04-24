import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  title?: string
}
export const PaymentMethodCardBadge = (props: Props) => {
  return (
    <div className={classNames(styles.root)}>
      {props.title}
    </div>
  )
}
