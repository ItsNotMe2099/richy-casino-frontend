import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import HiddenXs from 'components/ui/HiddenXS'

interface Option {
  label: string
}

interface Props {
  options: Option[],
  onChange?: (item: Option) => void
  className?: string
}

export default function ProfileMenu(props: Props){
  const dropdownRef = useRef(null)
  const {options, onChange} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <a href="#" onClick={handleClick} className={styles.dropDownTrigger}>
        <div className={styles.avatar}><Avatar avatar='/img/Avatar/avatar.png'/></div>
        <HiddenXs>
        <div className={styles.arrow}>
          <img src='/img/DropdownMenu/arrow3.svg' alt=''/>
        </div>
        </HiddenXs>
      </a>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <div className={styles.triangle}></div>
       {options.map((item, index) => <div key={index} className={styles.option} onClick={() => onChange(item)}>
         <a  onClick={() => setIsActive(false)}>
          {item.label}
        </a>
        </div>)}
       </nav>
    </div>
  )
}
