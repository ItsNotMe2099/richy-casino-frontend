
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

export const ExchangeCurrencySelectView = (props: Props) => {

  return (
  <SelectField view='exchange' options={props.options}  name={props.name} placeholder={props.placeholder} initial={props.initial} initialStyle={styles.initial}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    additional={(option) => <Symbol separator option={option}/>}
  />
  )
  
}
