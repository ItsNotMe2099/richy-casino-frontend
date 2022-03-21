
import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { Select } from 'components/ui/Inputs//Select'

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
}

const Symbol = (props: PropsOption) => {
  return <div className={styles.symbol}>{props.option.symbol}</div>
}

const Option = (props: PropsOption) => {
    return <div className={styles.option} onClick={props.onClick}><Symbol option={props.option}/>{props.option.label}</div>
}

export const RegCurrencySelectView = (props: Props) => {

  return (
  <Select options={props.options}  name={props.name} placeholder={props.placeholder} initial={props.initial} initialStyle={styles.initial}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    additional={(option) => <Symbol option={option}/>}
    />
  )
}
