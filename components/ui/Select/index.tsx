import {ReactElement, useEffect, useRef, useState} from 'react'
import {listenForOutsideClicks} from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption } from 'types/interfaces'
import DropDownTriangle from 'components/ui/DropDownTriangle'


interface Props<T> {
  options?: IOption<T>[],
  onChange?: (item: IOption<T>) => void
  onTriggerClick?: () => void
  itemComponent?: (option: IOption<T>, onClick: () => void) => ReactElement
  placeholder?: (isActive?) => ReactElement
  style?: 'balance' | 'newAccount',
  className?: string
  rootClassName?: string
  children?: ReactElement | ReactElement[]
}

export default function Select<T>(props: Props<T>){
  const dropdownRef = useRef(null)
  const {options, onTriggerClick, onChange, style} = props
  const [isActive, setIsActive] = useState(false)
  const [listening, setListening] = useState(false)
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))
  const handleClick = (e) => {
    if(options.length === 0 && onTriggerClick){
      onTriggerClick()
    }
    e.preventDefault()
    setIsActive(!isActive)
  }

  const handleChange = (item: IOption<T>) => {
    onChange(item)
    setIsActive(false)
  }

  const rootClass = {
    [styles.balance]: style === 'balance',
    [styles.newAccount]: style === 'newAccount',
  }

  return (
    <div ref={dropdownRef} className={classNames(styles.root, rootClass, props.rootClassName)} onClick={handleClick}>
       <div onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
          {props.placeholder(isActive)}
       <nav  className={classNames(styles.dropDown,props.className, { [styles.dropDownActive]: isActive })}>
        <div className={styles.options}>
          {props.children ? props.children : options.map((item, index) => props.itemComponent(item, () => handleChange(item)))}

        </div>
         <DropDownTriangle />
       </nav>
       </div>
    </div>
  )
}
