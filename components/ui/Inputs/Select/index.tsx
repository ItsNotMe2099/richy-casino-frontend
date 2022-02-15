import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import {FieldConfig, useField, useFormikContext} from 'formik'
import { useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { Country, Currency } from 'types/interfaces'

interface Props {
  options: (Currency | Country)[]
  currency?: Currency
  label?: string
  placeholder?: string
  disabled?: boolean
  altStyle?: boolean
  country?: boolean
  exchange?: boolean
  className?: string
  rootClass?: string
  withdraw?: boolean
}

export const Select = (props: Props & FieldConfig) => {
  const {label, placeholder, options, disabled, altStyle, country, exchange, className, rootClass, withdraw, currency} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const handleClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }
  const handleChange = (value) => {
    if(disabled){
      return
    }
    setFieldValue(props.name, value)
    setIsActive(false)
  }

  const currentItem = options.find(i => i.id === value)
  const hasError = !!meta.error && meta.touched
  return (
    <div className={classNames(styles.root, {[styles.hasError]: !!meta.error && meta.touched}, rootClass)}>
      <div className={classNames(styles.input, {[styles.withLabel]: props.label})}>
      {props.label &&
        <div className={styles.label}>
          {props.label}
        </div>
      }
      <div  onClick={handleClick} className={classNames(styles.dropDownTrigger, {[styles.altStyle]: altStyle}, className)}>
        {exchange ?
        <div className={styles.symbolAndName}>
        {!withdraw && <div className={styles.separator}></div>}
        <img src={currentItem.symbol} alt=''/>
        {currentItem?.name}
        </div>
        :
        <div className={styles.placeholder}><div className={styles.icon}>{!country && currentItem?.symbol}</div>
        {(currentItem && !country && !altStyle) ? <div className={styles.name}>{currentItem?.name} ({currentItem?.iso})</div> 
        : (currentItem && !country && altStyle) ? <div className={styles.name}>{currentItem?.symbol} ({currentItem?.name})</div> 
        : currentItem ? <div className={styles.name}>{currentItem?.name}</div> 
        : (placeholder || '')}</div>}
        <div className={styles.leftSide}>
        {withdraw &&
          <div className={styles.rate}>
            <div className={styles.usdt}>
              3136.00000 <span>USDT</span>
            </div>
            <div className={styles.dg}>
              0.0000004 DG
            </div>
          </div>
        }
        <img className={classNames({[styles.reverse]: (isActive && !exchange)})} src={exchange ? '/img/Exchange/arrow.svg' : '/img/DropdownMenu/arrow.svg'} alt=''/>
        </div>
      </div>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive }, {[styles.withdraw]: withdraw})}>
       {options.map((item, index) =>
        exchange ?
        <div className={styles.symbolAndName} key={index} onClick={() => handleChange(item.id)}>
        <img src={item.symbol} alt=''/>
        {item.name}
        {withdraw &&
          <div className={styles.rate}>
            <div className={styles.usdt}>
              3136.00000 <span>USDT</span>
            </div>
            <div className={styles.dg}>
              0.0000004 DG
            </div>
          </div>
        }
        </div>
        :
       <div key={index} 
       className={classNames(styles.option, {[styles.optionActive]: currentItem?.id === item.id })} onClick={() => handleChange(item.id)}>
         <div className={styles.icon}>{item.symbol}</div>{!country ? 
         <div className={styles.name}>{item.name} ({item.iso})</div>
          :
        <div className={styles.name}>{item.name}</div>
        }
         </div>)}
       </nav>
      </div>
    </div>
  )
}
Select.defaultProps = {
  placeholder: 'Выберите'
}
