import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
  crypto?: boolean
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
  return (
  <div className={styles.symbol}>
    <img src={props.option.symbol} alt=''/>
  </div>
  )
}

const Balance = (props: PropsOption) => {
  return (
    <div className={styles.balance}>
      <div className={styles.value}>
        {props.option.value}&nbsp;<span>{props.option.label}</span>
      </div>
      {props.option.crypto &&
      <div className={styles.dg}>
        0.0000004 DG
      </div>}
    </div>
  )
}

const Option = (props: PropsOption) => {
    return <div className={styles.option} onClick={props.onClick}><div className={styles.group}><Symbol option={props.option}/> {props.option.label}</div>
      <div className={styles.balanceOption}>
        <Balance option={props.option}/>
      </div>
    </div>
}

export const UserBalanceSelect = (props: Props) => {

  return (
  <div className={styles.root}>
    <SelectField view='balance' options={props.options}  name={props.name} placeholder={props.placeholder} initial={props.initial} initialStyle={styles.initial}  
    className={styles.select}
      itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
      additional={(option) => <Symbol option={option}/>}
      balance={(option) => <Balance option={option}/>}
      />
  </div>
  )
}
