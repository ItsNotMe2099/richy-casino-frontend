import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import {FieldConfig, useField, useFormikContext} from 'formik'
import {ReactElement, useRef, useState} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { IOption} from 'types/interfaces'
import {usePopper} from 'react-popper'


interface Props<T> {
  options: IOption<T>[]
  disabled?: boolean
  className?: string
  triggerClassName?: string
  currentItemStyle?: string
  popperFlip?: boolean
  offset?: 'normal' | 'large' | null
  popperStrategy?: 'fixed' | 'absolute' | null
  itemComponent?: (option: IOption<T> , isActive: boolean, onClick: () => void) => ReactElement
  activeComponent?: (option?: IOption<T>, isActive?: boolean, search?: ReactElement) => ReactElement
  search?: boolean
  searchClassName?: string
  searchPlaceholder?: string
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

export  function SelectField<T>(props: Props<T> & FieldConfig){
  const {options, disabled, className, currentItemStyle} = props
  const [field, meta] = useField(props)
  const {value} = field
  const popperTimerRef = useRef(null)
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [search, setSearch] = useState<string | null>(null)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles: popperStyles, attributes, forceUpdate, update } = usePopper(referenceElement, popperElement, {
    strategy: props.popperStrategy ?? 'absolute',
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'flip',
        enabled: props.popperFlip ?? false,
      },
      {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          rootBoundary: 'viewport'
        }
      },
      sameWidth as any

    ]
  })
  const handleClick = (e) => {
    if(props.disabled){
      return
    }
    e.preventDefault()
    e.stopPropagation()
    setIsActive(!isActive)
  }
  const handleChange = (value) => {
    if(disabled){
      return
    }
    setFieldValue(props.name, value)
    setIsActive(false)
  }

  const currentItem = options.find(i => i.value === value)
  const hasError = !!meta.error && meta.touched
  const handleClickInput = (e) => {
    e.stopPropagation()
  }
  const onSearch = (e) => {
    console.log('SetSearch')
    setSearch(e.target.value.trim())
    if(popperTimerRef.current){
      clearTimeout(popperTimerRef.current)
    }
    popperTimerRef.current = setTimeout(() => {
      update()
    }, 300)

  }
  return (
    <div ref={(ref) => {
      dropdownRef.current = ref
      setReferenceElement(ref)
    }} className={classNames(styles.root, {[styles.hasError]: !!meta.error && meta.touched}, className)} data-field={props.name}>
      <div onClick={handleClick} className={classNames(styles.dropDownTrigger, currentItemStyle, props.triggerClassName)}>
        {props.activeComponent ? props.activeComponent(currentItem, isActive, isActive && props.search ? <input name={'search'} autoFocus placeholder={props.searchPlaceholder} onClick={handleClickInput} onChange={onSearch} className={classNames(styles.searchField, props.searchClassName)} /> : null) : null}
      <div ref={setPopperElement} style={popperStyles.popper}  {...attributes.popper} className={classNames(styles.dropDown, { [styles.opened]: isActive, [styles.offsetLarge]: props.offset === 'large', [styles.offsetNormal]: props.offset === 'normal' || !props.offset})}>
       {(search ? options.filter(i => i.label.toLowerCase().indexOf(search.toLowerCase()) >= 0) : options).map((item, index) => props.itemComponent ? props.itemComponent(item, currentItem?.value === item.value, () => handleChange(item.value)) :
       <div key={index}
         className={classNames(styles.option, {[styles.optionActive]: currentItem?.value === item.value })} onClick={() => handleChange(item.value)}>
          <div className={styles.name}>{item.label}</div>
       </div>)}
       </div>
      </div>

    </div>
  )
}
