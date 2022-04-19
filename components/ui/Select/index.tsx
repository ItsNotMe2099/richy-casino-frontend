import { ReactElement, useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption } from 'types/interfaces'
import DropDownTriangle from 'components/ui/DropDownTriangle'


interface Props<T> {
  options: IOption<T>[],
  onChange?: (item: IOption<T>) => void
  onTriggerClick?: () => void
  itemComponent?: (option: IOption<T>, onClick: () => void) => ReactElement
  placeholder?: (isActive?) => ReactElement
  style?: 'balance' | 'newAccount',
  className?: string
}

export default function Select<T>(props: Props<T>){
  const dropdownRef = useRef(null)
  const {options, onTriggerClick, onChange, style} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

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
    <div className={classNames(styles.root, rootClass)} onClick={handleClick}>
       <div onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
          {props.placeholder(isActive)}
       <nav ref={dropdownRef} className={classNames(styles.dropDown,props.className, { [styles.dropDownActive]: isActive })}>
        <DropDownTriangle />
        {options.map((item, index) => props.itemComponent(item, () => handleChange(item)))}
       </nav>
       </div>
    </div>
  )
}
