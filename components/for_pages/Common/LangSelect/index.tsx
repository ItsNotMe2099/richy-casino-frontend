import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'

interface Option {
  icon: string
  lang: string
}


interface Props {
  children?: React.ReactNode
  activeIcon?: string
  lang?: string
  className?: string
  options: Option[],
  onChange?: (item: Option) => void
}

export default function LangSelect(props: Props) {

  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const {options, activeIcon, lang, onChange} = props
  

const handleClick = (e) => {
  e.preventDefault()
  setIsActive(!isActive)
}

  return (
    <div className={classNames(styles.root, props.className)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <img src={activeIcon} alt=''/> {lang}
      </div>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        <div className={styles.triangle}></div>
        {options && options.map((item, index) => 
          <div className={styles.option} onClick={() => onChange(item)}>
            <div className={styles.image}><img key={index} src={item.icon} alt=''/></div> {item.lang}
          </div>
        )}
      </nav>
    </div>
  )
}

