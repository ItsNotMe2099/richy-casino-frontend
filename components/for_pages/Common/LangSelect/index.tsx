import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect, useMemo, useRef, useState} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {useTranslation} from 'next-i18next'
import {listenForOutsideClicks} from 'components/hooks/useDetectOutsideClick'
import {CookiesType} from 'types/enums'
import Cookies from 'js-cookie'
import {CookiesLifeTime} from 'types/constants'
import DropDownTriangle from 'components/ui/DropDownTriangle'
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
    {icon: '/img/langs/uz.svg', name: 'Uz', code: 'uz'},
    {icon: '/img/langs/az.svg', name: 'Az', code: 'az'},
    {icon: '/img/langs/tr.svg', name: 'Tr', code: 'tr'},
    {icon: '/img/langs/hi.svg', name: 'Hi', code: 'hi'},
    {icon: '/img/langs/fa.svg', name: 'Fa', code: 'fa'},
    {icon: '/img/langs/uk.svg', name: 'Uk', code: 'uk'},
    {icon: '/img/langs/kk.svg', name: 'Kk', code: 'kk'},
    {icon: '/img/langs/es.svg', name: 'Es', code: 'es'},
    {icon: '/img/langs/fr.svg', name: 'Fr', code: 'fr'},
    {icon: '/img/langs/hy.svg', name: 'Hy', code: 'hy'},
    {icon: '/img/langs/br.svg', name: 'Br', code: 'br'},
    {icon: '/img/langs/th.svg', name: 'Th', code: 'th'},
    {icon: '/img/langs/vn.svg', name: 'Vn', code: 'vn'},
    {icon: '/img/langs/es-MX.svg', name: 'Mx', code: 'es-MX'},
    {icon: '/img/langs/es-CL.svg', name: 'Cl', code: 'es-CL'},
    {icon: '/img/langs/es-PE.svg', name: 'Pe', code: 'es-PE'},
    {icon: '/img/langs/pt.svg', name: 'Pt', code: 'pt'},
    {icon: '/img/langs/be.svg', name: 'Be', code: 'be'},
    {icon: '/img/langs/cz.svg', name: 'Cz', code: 'cz'},
    {icon: '/img/langs/pl.svg', name: 'Pl', code: 'pl'},
    {icon: '/img/langs/ro.svg', name: 'Ro', code: 'ro'},
    {icon: '/img/langs/bn.svg', name: 'Bn', code: 'bn'},
    {icon: '/img/langs/no.svg', name: 'No', code: 'no'},
    {icon: '/img/langs/hu.svg', name: 'Hu', code: 'hu'},
    {icon: '/img/langs/fi.svg', name: 'Fi', code: 'fi'},
    {icon: '/img/langs/ne.svg', name: 'Ne', code: 'ne'},
    {icon: '/img/langs/sw.svg', name: 'Sw', code: 'sw'},
    {icon: '/img/langs/de.svg', name: 'De', code: 'de'},
    {icon: '/img/langs/it.svg', name: 'It', code: 'it'},
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
  Cookies.set(CookiesType.language, item.code, {expires: CookiesLifeTime.language})
}

  return (
    <div  ref={dropdownRef} className={classNames(styles.root, {[styles.footer]: style === 'footer'}, props.className)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <div className={styles.imageLng}><img src={currentLanguage.icon} alt=''/></div> {currentLanguage.name}
      </div>
       <nav  className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive,   [styles.footer]: style === 'footer', })}>
        {/*style !== 'footer' && <div className={styles.triangle}></div>*/}
        <div className={styles.options}>
        <Scrollbars  style={{ width: 73, height: items.length < 3 ? 52 : items.length * 52, maxHeight: 160}}
        className={styles.scroll}
        renderTrackVertical={props => <div {...props} className={styles.track}/>}
        renderView={props => <div {...props} className={styles.view}/>}
        autoHide
        >
        {items.map((item, index) =>
          <div className={styles.option} onClick={() => handleChange(item)} key={index}>
            <div className={styles.image}><img key={index} src={item.icon} alt=''/></div> {item.name}
          </div>
        )}
        </Scrollbars>
        </div>
        <DropDownTriangle bottom={style === 'footer'}/>
      </nav>
    </div>
  )
}

