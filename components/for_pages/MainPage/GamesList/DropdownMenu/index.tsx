import { useRef } from 'react'
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
  options?: Option[],
  provs?: Prov[]
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
  items?: IGame[]
}

export default function DropdownMenu(props: Props){
  const dropdownRef = useRef(null)
  const {options, provs, label, onChange, activeTab, type, allOption, onAll, dots, textRight, textLeft, onTriggerClick} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    if(options?.length === 0){
      onTriggerClick()
    }
    e.preventDefault()
    setIsActive(!isActive)
  }

  const CategoryFilter = (prop: {icon: string, label: string,  items: IGame[]}) => {

    return (
    <div className={styles.categoryFilter}>
      <div className={styles.left}>
        <div className={styles.icon}><img src={prop.icon} alt=''/></div>
        <div className={styles.label}>{prop.label}</div>
      </div>
      <div className={styles.quantity}>
        {prop.items.length}
      </div>
    </div>
    )
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
        <div className={styles.categories}>
        {options && options.map((item, index) =>
          <CategoryFilter key={index} icon={item.icon} label={item.label} items={props.items}/>
         )}
         </div>
         <div className={styles.providers}>
         {provs && provs.map((item, index) =>
            <div className={styles.provider} key={index}>
              <div className={styles.iconProvider}>
                {item.icon}
              </div>
              <div className={styles.quantity}>
                {props.items.length}
              </div>
            </div>
         )}
         </div>
       </nav>
    </div>
  )
}
