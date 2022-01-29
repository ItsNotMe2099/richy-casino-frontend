import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'

interface Option {
  icon: string
  usdt: string
  dg: string
  amount: string
  iso: string
  type: number
}

interface Props {
  options: Option[],
  onChange?: (item: Option) => void
  activeIcon?: string
  activeAmount?: string
  activeIso?: string
  activeType?: number
  className?: string
}

export default function ProfileAccountsMenu(props: Props){
  const dropdownRef = useRef(null)
  const {options, onChange, activeIso, activeAmount, activeIcon, activeType} = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()

    console.log('SetActive')
    setIsActive(i => !i)
  }

  console.log('isActive', isActive)
  return (
    <div className={classNames(styles.root, props.className)}>
      <a href="#" onClick={handleClick} className={styles.dropDownTrigger}>
        <div className={styles.label}>
          <div className={styles.icon}><img src={activeIcon} alt=''/></div>
          <div className={styles.amount}>{activeAmount}</div>
          <div className={styles.iso}>{activeType === 1 ? activeIso : <>USDT</>}</div>
        </div>
        <HiddenXs>
        <div className={styles.arrow}>
          <img src='/img/DropdownMenu/arrow2.svg' alt=''/>
        </div>
        </HiddenXs>
      </a>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <div className={styles.triangle}></div>
       {options.map((item, index) => <div key={index} className={styles.option} onClick={() => onChange(item)}>
         <a  onClick={() => setIsActive(false)}>
           <div className={styles.leftSide}>
           <img src={item.icon} alt=''/>
           <div className={styles.iso2}>{item.iso}</div>
           </div>
           <div className={styles.rightSide}>
             {item.type === 1 ?
             <>
             <div className={styles.amount2}>{item.usdt} <span>USDT</span></div>
             <div className={styles.dg}>{item.dg} <span>DG</span></div>
             </>
             :
             <div className={styles.amount2}>
               {item.amount} <span>{item.iso}</span>
             </div>
            }
           </div>
          </a>
        </div>)}
       </nav>
    </div>
  )
}
