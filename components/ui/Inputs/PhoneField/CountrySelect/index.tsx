import { FieldConfig } from 'formik'
import classNames from 'classnames'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useTranslation } from 'next-i18next'
import { listenForOutsideClicks } from 'components/hooks/useDetectOutsideClick'
import flags from 'country-flag-icons/react/3x2'
import { usePopper } from 'react-popper'
import styles from './index.module.scss'
interface IOption {
  value: string
  label: string
  divider: boolean
}

interface Props {
  offsetLeft: number
  offsetTop: number
  value: string
  className: string
  options: IOption[]
  onChange: (value: string) => void
}
const FlagComponent = ({
  country,
  countryName,

}) => {
  if (flags && flags[country]) {
    return flags[country]({ title: '' })
  }
  return null

}

const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth
      }px`
  }
}
const sameWidthWithOffset = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width - 20}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth - 20
      }px`
  }
}


export default function CountrySelect(props: Props & FieldConfig) {
  const { t, i18n } = useTranslation()
  const dropdownRef = useRef(null)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [props.offsetLeft ?? 0, props.offsetTop ?? 0],
        },
      },
      props.offsetLeft > 0 ? sameWidthWithOffset : sameWidth as any
    ]
  })
  console.log('OffestLeft', props.offsetLeft)
  useEffect(() => {
    setTimeout(() => {
      setReferenceElement(document.querySelector('#phone-field'))
    }, 100)

  }, [])
  const currentOption = useMemo<IOption>(() => props.options.find(i => i.value === props.value), [props.value])
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
  const handleChange = (item: IOption) => {
    props.onChange(item.value)
  }

  return (
    <div ref={(ref) => {
      dropdownRef.current = ref
    }} className={classNames(styles.root)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <div className={styles.icon}>
          <FlagComponent countryName={currentOption?.label} country={props.value}></FlagComponent>
        </div>

        <img className={classNames({ [styles.reverse]: isActive })}
          src='/img/Select/arrow.svg' alt='' />
      </div>
      {isActive && <div ref={setPopperElement} style={popperStyles.popper} className={classNames(styles.dropDown, props.className)} {...attributes.popper}

        >
        {/*style !== 'footer' && <div className={styles.triangle}></div>*/}
        <div className={styles.options}>
          <Scrollbars style={{ height: 200 }}
            renderTrackVertical={props => <div {...props} className={styles.track} />}
            renderView={props => <div {...props} className={styles.view} />}>
            {props.options.map((item, index) =>
              <div className={styles.option} onClick={() => handleChange(item)} key={index}>
                <div className={styles.icon}>
                  <FlagComponent countryName={item.label} country={item.value}></FlagComponent>
                </div> <div className={styles.label}>{item.label}</div>
              </div>
            )}
          </Scrollbars>
        </div>
      </div>}
    </div>)
}
