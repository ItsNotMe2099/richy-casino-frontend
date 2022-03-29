import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
  initial?: string
  className?: string
}
interface PropsOption{
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  separator?: boolean
}

const Symbol = (props: PropsOption) => {
  return (
  <>
  {props.separator && <div className={styles.separator}></div>}
  <div className={styles.symbol}>
    <img src={props.option.symbol} alt=''/>
  </div>
  </>
  )
}

const Option = (props: PropsOption) => {
    return (
    <div className={styles.option} onClick={props.onClick}>
      <Symbol option={props.option}/>{props.option.label}
    </div>
    )
}

{/*const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
      <div className={styles.label}>{props.currentItem.label}</div>
      <img className={classNames({[styles.reverse]: props.isActive})} 
        src='/img/Select/arrow-big.svg' alt=''/>
  </div>
  )
}*/}


export const ExchangeCurrencySelectView = (props: Props) => {

  return (
  <SelectField className={props.className} options={props.options}  name={props.name} initialStyle={styles.initial}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
  />
  )
  
}
