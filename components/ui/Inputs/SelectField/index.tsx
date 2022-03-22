import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import {FieldConfig, useField, useFormikContext} from 'formik'
import {ReactElement, useRef} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption} from 'types/interfaces'

interface Props<T> {
  options: IOption<T>[]
  placeholder?: string
  disabled?: boolean
  className?: string
  initialStyle?: string
  initial?: string
  itemComponent?: (option: IOption<T> , isActive: boolean, onClick: () => void) => ReactElement
  additional?: (option: IOption<T>) => ReactElement
  balance?: (option: IOption<T>) => ReactElement
  view?: 'settings' | 'exchange' | 'balance'
}

export  function SelectField<T>(props: Props<T> & FieldConfig){
  const {options, disabled, className, placeholder, initial, initialStyle} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }
  const handleChange = (value) => {
    if(disabled){
      return
    }
    setFieldValue(props.name, value)
    setIsActive(false)
  }

  const style = {
    [styles.settings]: props.view === 'settings',
    [styles.exchange]: props.view === 'exchange',
    [styles.balance]: props.view === 'balance'
  }

  const currentItem = options.find(i => i.value === value)
  const hasError = !!meta.error && meta.touched

  return (
    <div className={classNames(styles.root, {[styles.hasError]: !!meta.error && meta.touched}, className, style)}>
      <div onClick={handleClick} className={classNames(styles.dropDownTrigger, initialStyle)}>
        <div className={styles.placeholder}>{(props.additional && currentItem) && props.additional(currentItem)} {currentItem ? currentItem?.label : initial}</div>
        <div className={styles.arrow}>
        {props.balance && currentItem &&
        <div className={styles.value}>
          {props.balance(currentItem)}
          </div>}
          <img className={classNames({[styles.reverse]: isActive})} 
        src={(props.view === 'exchange' || props.view === 'balance') ? '/img/Select/arrow-exchange.svg' : '/img/Select/arrow.svg'} alt=''/></div>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {options.map((item, index) => props.itemComponent ? props.itemComponent(item, currentItem?.value === item.value, () => handleChange(item.value)) :
       <div key={index}
         className={classNames(styles.option, {[styles.optionActive]: currentItem?.value === item.value })} onClick={() => handleChange(item.value)}>
          <div className={styles.name}>{item.label}</div>
       </div>)}
       </nav>
      </div>
    </div>
  )
}
