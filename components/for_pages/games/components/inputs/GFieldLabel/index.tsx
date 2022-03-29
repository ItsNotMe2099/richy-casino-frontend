import styles from './index.module.scss'
import cx from 'classnames'
import {ReactElement} from 'react'
interface Props {
  label?: string
  labelSuffix?: string | ReactElement
  hasError?: boolean
  style?: 'normal' | 'large'
}

export default function GFieldLabel(props: Props) {
  const { label, labelSuffix, hasError, style } = props
  if(!label){
    return null
  }
  return (<div className={cx(styles.root, {
    [styles.error]: hasError,
    [styles.large]: style === 'large'
  })}>
    <div className={styles.label}>{label}</div>
    <div className={styles.labelSuffix}>{labelSuffix}</div>
  </div>)
}
GFieldLabel.defaultProps = {
  style: 'normal',
}
