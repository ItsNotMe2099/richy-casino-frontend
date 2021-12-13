import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'

interface TabOption {
  label: string
}

interface Props {
  tabs: TabOption[],
  label: string
  type?: 'category' | 'provider'
  onChange?: (item: TabOption) => void
  onAll?: () => void
  activeTab?: string
  allOption?: boolean
}

export const TabSelect = ({tabs, label, onChange, activeTab, type, allOption, onAll }: Props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  return (
    <div className={styles.root}>
      <a href="#" onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
        <div className={styles.label}>
        {type && <img src={type === 'category' ? '/img/TabSelect/arrows.svg' : '/img/TabSelect/pacman.svg'} alt=''/>}
        {activeTab ? <span>{activeTab}</span> : <span>{label}</span>}
        </div>
        <div className={classNames(styles.arrow, {[styles.active]: isActive})}><img src='/img/TabSelect/arrow.svg' alt=''/></div>
      </a>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
       {allOption && <div className={styles.option} onClick={() => onAll()}><a onClick={() => setIsActive(false)}>Все</a></div>}
       {tabs.map((item, index) => <div key={index} className={styles.option} onClick={() => onChange(item)}>
         <a  onClick={() => setIsActive(false)}>{item.label}</a></div>)}
       </nav>
    </div>
  )
}
