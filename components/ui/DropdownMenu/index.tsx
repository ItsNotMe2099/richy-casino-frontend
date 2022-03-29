import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Option {
  label: string,
}

interface Props {
  options: Option[],
  label?: string
  type?: 'category' | 'provider' 
  onChange?: (item: Option) => void
  onAll?: () => void
  onTriggerClick?: () => void
  activeTab?: string
  allOption?: boolean
  dots?: boolean
  className?: string
  textRight?: boolean
  textLeft?: boolean
}

export default function DropdownMenu(props: Props){
  const dropdownRef = useRef(null)
  const {options, label, onChange, activeTab, type, allOption, onAll, dots, textRight, textLeft, onTriggerClick} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    if(options.length === 0){
      onTriggerClick()
    }
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, {[styles.dots]: dots}, props.className)}>
      <a href="#" onClick={handleClick} className={classNames(styles.dropDownTrigger, {[styles.dots]: dots})}>
        <div className={styles.label}>
        {type && <img src={type === 'category' ? '/img/DropdownMenu/arrows.svg' : '/img/DropdownMenu/pacman.svg'} alt=''/>}
        {activeTab ? <span>{activeTab}</span> : <span>{label}</span>}
        </div>
        <div className={classNames(styles.arrow, {[styles.active]: isActive})}><img 
        src={dots ? '/img/DropdownMenu/dots.svg' : '/img/DropdownMenu/arrow.svg'} alt=''/></div>
      </a>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {allOption && <div className={styles.option} onClick={() => onAll()}><a onClick={() => setIsActive(false)}>Все</a></div>}
       {options.map((item, index) => <div key={index} className={classNames(styles.option, {[styles.textRight]: textRight}, {[styles.textLeft]: textLeft})} onClick={() => onChange(item)}>
         <a  onClick={() => setIsActive(false)}>{item.label}</a></div>)}
       </nav>
    </div>
  )
}
