import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { listenForOutsideClicks } from 'components/hooks/useDetectOutsideClick'
import { CookiesType } from 'types/enums'
import Cookies from 'js-cookie'
import { CookiesLifeTime } from 'types/constants'
import { usePopper } from 'react-popper'
import DropDownTriangle from 'components/ui/DropDownTriangle'
import Converter from 'utils/converter'
import {useAppContext} from 'context/state'
interface ILanguage {
  icon: string
  code: string
  name: string
}


interface Props {
  children?: React.ReactNode

  className?: string
  styleType?: 'footer' | 'top' | 'menu'
  background?: 'dark500' | 'dark700'
}

export default function LangSelect(props: Props) {
  const { t, i18n } = useTranslation()
  const appContext = useAppContext()
  const dropdownRef = useRef(null)
  const [referenceElement, setReferenceElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: props.styleType === 'menu' ? 'fixed' : 'absolute',
    placement: ['footer', 'menu'].includes(props.styleType) ? props.styleType === 'menu' ? 'top-start' :  appContext.isMobile ? 'top-end' : 'top-start' :  'bottom-end',
    modifiers: [
      {
        name: 'flip',
        enabled: false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
    ]
  })
  const items: ILanguage[] = [
    { icon: '/img/langs/ru.svg', name: 'Ru', code: 'ru' },
    { icon: '/img/langs/en.svg', name: 'En', code: 'en' },
    { icon: '/img/langs/uz.svg', name: 'Uz', code: 'uz' },
    { icon: '/img/langs/az.svg', name: 'Az', code: 'az' },
    { icon: '/img/langs/tr.svg', name: 'Tr', code: 'tr' },
    { icon: '/img/langs/hi.svg', name: 'Hi', code: 'hi' },
    { icon: '/img/langs/fa.svg', name: 'Fa', code: 'fa' },
    { icon: '/img/langs/ua.svg', name: 'Ua', code: 'uk' },
    { icon: '/img/langs/kk.svg', name: 'Kk', code: 'kk' },
    { icon: '/img/langs/es.svg', name: 'Es', code: 'es' },
    { icon: '/img/langs/fr.svg', name: 'Fr', code: 'fr' },
    { icon: '/img/langs/hy.svg', name: 'Hy', code: 'hy' },
    { icon: '/img/langs/br.svg', name: 'Br', code: 'pt-BR' },
    { icon: '/img/langs/th.svg', name: 'Th', code: 'th' },
    { icon: '/img/langs/vn.svg', name: 'Vn', code: 'vi' },
    { icon: '/img/langs/es-MX.svg', name: 'Mx', code: 'es-MX' },
    { icon: '/img/langs/es-CL.svg', name: 'Cl', code: 'es-CL' },
    { icon: '/img/langs/es-PE.svg', name: 'Pe', code: 'es-PE' },
    { icon: '/img/langs/pt.svg', name: 'Pt', code: 'pt' },
    { icon: '/img/langs/be.svg', name: 'Be', code: 'be' },
    { icon: '/img/langs/cz.svg', name: 'Cz', code: 'cs-CZ' },
    { icon: '/img/langs/pl.svg', name: 'Pl', code: 'pl' },
    { icon: '/img/langs/ro.svg', name: 'Ro', code: 'ro' },
    { icon: '/img/langs/bn.svg', name: 'Bn', code: 'bn' },
    { icon: '/img/langs/hu.svg', name: 'Hu', code: 'hu-HU' },
    { icon: '/img/langs/fi.svg', name: 'Fi', code: 'fi-FI' },
    { icon: '/img/langs/ne.svg', name: 'Ne', code: 'ne' },
    { icon: '/img/langs/sw.svg', name: 'Sw', code: 'sw' },
    { icon: '/img/langs/de.svg', name: 'De', code: 'de' },
    { icon: '/img/langs/it.svg', name: 'It', code: 'it' },
  ]
  const currentLanguage = useMemo<ILanguage>(() => items.find(i => i.code === i18n.language) ?? items.find(i => i.code === 'en'), [i18n.language])
  const [listening, setListening] = useState(false)
  const [isActive, setIsActive] = useState(false)
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))



  const handleClick = (e) => {
    setIsActive(!isActive)
  }
  const handleChange = async (item: ILanguage) => {
   const res = await i18n.reloadResources(item.code, ['common'])
    Cookies.set(CookiesType.language, item.code, { expires: CookiesLifeTime.language })
    i18n.changeLanguage(item.code)

  }

  const rows = Converter.splitIntoGroups<ILanguage>(items, 5)
  return (
    <div ref={dropdownRef} className={classNames(styles.root, {
      [styles.footer]: props.styleType === 'footer',
      [styles.menu]: props.styleType === 'menu'
      }, props.className)} onClick={handleClick}>
      <div ref={setReferenceElement} className={styles.dropDownTrigger}>
        <div className={styles.imageLng}><img src={currentLanguage.icon} alt='' /></div> {currentLanguage.name}
      </div>
      <div ref={setPopperElement}

        style={popperStyles.popper}  {...attributes.popper}
        className={classNames(styles.dropDown, {[styles.opened]: isActive, [styles.footer]: props.styleType === 'footer', })}>

        <div className={styles.options}>
          {rows.map((row, index) => <div key={index} className={styles.row}>
            {row.map((item, index) =>
              <div className={styles.option} onClick={() => handleChange(item)} key={index}>
                <div className={styles.image}><img key={index} src={item.icon} alt='' /></div>
                <div className={styles.name}>
                {item.name}
                </div>

              </div>
            )}
          </div>)}

        </div>
        <DropDownTriangle className={styles.triangle} bottom={['footer', 'menu'].includes(props.styleType)} />
      </div>
    </div>
  )
}

