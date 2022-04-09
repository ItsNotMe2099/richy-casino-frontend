import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { Scrollbars } from 'react-custom-scrollbars-2'

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
  style?: 'footer'
}

export default function LangSelect(props: Props) {

  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const {options, activeIcon, lang, onChange, style} = props
  

const handleClick = (e) => {
  e.preventDefault()
  setIsActive(!isActive)
}

const dropClass = classNames({
  [styles.footer]: style === 'footer',
})

  return (
    <div className={classNames(styles.root, props.className)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <img src={activeIcon} alt=''/> {lang}
      </div>
       <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive }, dropClass)}>
        {/*style !== 'footer' && <div className={styles.triangle}></div>*/}
        <Scrollbars style={{ width: 73, height: 170}} 
        renderTrackVertical={props => <div {...props} className={styles.track}/>}
        renderView={props => <div {...props} className={styles.view}/>}>
        {options && options.map((item, index) => 
          <div className={styles.option} onClick={() => onChange(item)} key={index}>
            <div className={styles.image}><img key={index} src={item.icon} alt=''/></div> {item.lang}
          </div>
        )}
        </Scrollbars>
        {style === 'footer' && <div className={styles.triangle}></div>}
      </nav>
    </div>
  )
}

