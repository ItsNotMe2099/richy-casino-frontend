import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect, useMemo, useRef, useState} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {useTranslation} from 'next-i18next'
import {listenForOutsideClicks} from 'components/hooks/useDetectOutsideClick'
import {CookiesType} from 'types/enums'
import Cookies from 'js-cookie'
interface ILanguage {
  icon: string
  code: string
  name: string
}


interface Props {
  children?: React.ReactNode

  className?: string
  style?: 'footer'
}

export default function LangSelect(props: Props) {
  const {t, i18n} = useTranslation()
  const dropdownRef = useRef(null)
  const items: ILanguage[] = [
    {icon: '/img/langs/ru.svg', name: 'Ru', code: 'ru'},
    {icon: '/img/langs/en.svg', name: 'En', code: 'en'},
  ]
  const currentLanguage = useMemo<ILanguage>(() => items.find(i => i.code === i18n.language) ?? items.find(i => i.code === 'en'), [i18n.language])
  const [listening, setListening] = useState(false)
  const [isActive, setIsActive] = useState( false)
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))
  const { style} = props


const handleClick = (e) => {
  setIsActive(!isActive)
}
const handleChange = (item: ILanguage) => {
    i18n.changeLanguage(item.code)
  Cookies.set(CookiesType.Language, item.code, {expires: 3 * 365})
}
console.log('dsadasdasd', i18n.languages)

  return (
    <div  ref={dropdownRef} className={classNames(styles.root, props.className)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <img src={currentLanguage.icon} alt=''/> {currentLanguage.name}
      </div>
       <nav  className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive,   [styles.footer]: style === 'footer', })}>
        {/*style !== 'footer' && <div className={styles.triangle}></div>*/}
        <Scrollbars autoHeightMax={170}  style={{ width: 73}}
        renderTrackVertical={props => <div {...props} className={styles.track}/>}
        renderView={props => <div {...props} className={styles.view}/>}>
        {items.map((item, index) =>
          <div className={styles.option} onClick={() => handleChange(item)} key={index}>
            <div className={styles.image}><img key={index} src={item.icon} alt=''/></div> {item.name}
          </div>
        )}
        </Scrollbars>
        {style === 'footer' && <div className={styles.triangle}></div>}
      </nav>
    </div>
  )
}

