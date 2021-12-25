import styles from './index.module.scss'
import InputMask from 'react-input-mask'
import cx from 'classnames'
import {ReactElement} from 'react'
interface Props {
  placeholder?: string,
  hasError?: boolean
  variant?: 'normal' | 'shadow' | 'large'
  value?: any
  onChange: (value) => void
  onBlur?: (e) => void
  onFocus?: (e) => void
  type?: string
  mask?: string
  disabled?: boolean
  alwaysShowMask?: boolean
  maskChar?: string
  onKeyPress?: (e) => void
  className?: string
  hasAutoComplete?: boolean,
  icon?: ReactElement
  suffixIcon?: ReactElement
}

export default function BaseInput(props: Props) {
  const { placeholder, value, onChange, hasError, className, icon, hasAutoComplete, variant, suffixIcon} = props
  const renderInput = (inputProps = {}) => {

    const autoCompleteProps: any = !hasAutoComplete ? {autoComplete: 'new-password', autoCorrect: 'off'} : {}
    return (<div className={styles.root}>
      <input  {...inputProps}  className={cx(styles.input, className, {
        [styles.error]: hasError,
        [styles.withIcon]: !!icon,
        [styles.withSuffix]: !!icon,
        [styles.withShadow]: variant === 'shadow',
      })} {...autoCompleteProps} type={props.type} placeholder={placeholder} disabled={props.disabled}/>
      {icon && <div className={styles.icon}>{icon}</div>}
      {suffixIcon && <div className={styles.suffix}>{suffixIcon}</div>}

    </div>)
  }
  return props.mask ? (
    <InputMask mask={props.mask}  disabled={props.disabled} value={props.value} onChange={props.onChange}    maskPlaceholder={null}  alwaysShowMask={props.alwaysShowMask}   maskChar={props.maskChar}>
      {(inputProps) => renderInput(inputProps)}
    </InputMask>
  ) : renderInput(props)


}
