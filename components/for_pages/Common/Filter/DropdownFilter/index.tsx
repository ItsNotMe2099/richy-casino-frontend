import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import useIsActiveLink from 'hooks/useIsActiveLink'
interface Option {
  label: string,
  link?: string
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
const Option = (props: {label: string, link: string, onClick: () => void}) => {
  const active = useIsActiveLink(props.link)
  return ( <Link href={props.link}><a onClick={props.onClick} className={classNames(styles.option, {[styles.active]: active})}>{props.label}</a></Link>)
}
export default function DropdownFilter(props: Props){
  const dropdownRef = useRef(null)
  const {options, label, onChange, activeTab, type, allOption, onAll, dots, textRight, textLeft, onTriggerClick} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = () => {

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
         {allOption && <Link href={'/catalog'}><a onClick={handleClick} className={styles.option}>Все</a></Link>}
       {options.map((item, index) => <Option key={item.label} onClick={handleClick} label={item.label} link={item.link}/>)}
       </nav>
    </div>
  )
}