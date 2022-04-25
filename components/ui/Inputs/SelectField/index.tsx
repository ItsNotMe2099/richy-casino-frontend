import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import {FieldConfig, useField, useFormikContext} from 'formik'
import {ReactElement, useRef} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption} from 'types/interfaces'

interface Props<T> {
  options: IOption<T>[]
  disabled?: boolean
  className?: string
  currentItemStyle?: string
  itemComponent?: (option: IOption<T> , isActive: boolean, onClick: () => void) => ReactElement
  activeComponent?: (option?: IOption<T>, isActive?: boolean) => ReactElement
}

export  function SelectField<T>(props: Props<T> & FieldConfig){
  const {options, disabled, className, currentItemStyle} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    if(props.disabled){
      return
    }
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
    console.log('HandleClick', !isActive)
  }
  const handleChange = (value) => {
    if(disabled){
      return
    }
    setFieldValue(props.name, value)
    setIsActive(false)
  }

  const currentItem = options.find(i => i.value === value)
  const hasError = !!meta.error && meta.touched

  return (
    <div className={classNames(styles.root, {[styles.hasError]: !!meta.error && meta.touched}, className)} data-field={props.name}>
      <div onClick={handleClick} className={classNames(styles.dropDownTrigger, currentItemStyle)}>
        {props.activeComponent ? props.activeComponent(currentItem, isActive) : null}
      <div ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {options.map((item, index) => props.itemComponent ? props.itemComponent(item, currentItem?.value === item.value, () => handleChange(item.value)) :
       <div key={index}
         className={classNames(styles.option, {[styles.optionActive]: currentItem?.value === item.value })} onClick={() => handleChange(item.value)}>
          <div className={styles.name}>{item.label}</div>
       </div>)}
       </div>
      </div>

    </div>
  )
}
