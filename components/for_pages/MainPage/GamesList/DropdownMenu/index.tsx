import {ReactElement, useEffect, useRef} from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Option {
  label: string,
  icon: string
}

interface Prov {
  label: string
  icon: React.ReactNode
}

interface IGame{
  label: string
  image: string
  top: boolean
  createdAt: string
  lastWin: string
  category: string
  provider: string
}

interface Props {
  onChange?: (item: Option) => void
  className?: string
  icon?: string
  placeholder?: string
  children?: ReactElement | ReactElement[]
  activeToggle?: boolean
}

export default function DropdownMenu(props: Props){
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  useEffect(() => {
    setIsActive(false)
  }, [props.activeToggle])
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <a href="#" onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
        <div  className={styles.icon}>
        <img src={props.icon}/>
        </div>
        <div className={styles.label}>
          { props.placeholder}
        </div>
        <div className={classNames(styles.arrow, {[styles.active]: isActive})}>
          <img src={'/img/DropdownMenu/arrow.svg'} alt=''/>
        </div>
      </a>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
         {props.children}
       </nav>
    </div>
  )
}
