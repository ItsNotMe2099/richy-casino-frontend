import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
  crypto?: boolean
}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
  currentItem?: ICustomSelectViewOption

}
interface PropsOption{
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
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

const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
    <div className={styles.group}>
      <Symbol option={props.currentItem}/>
      {props.currentItem.label}
    </div>
    <div className={styles.balanceOption}>
      <Balance option={props.currentItem}/>
      <img className={classNames(styles.arrow, {[styles.reverse]: props.isActive})} 
        src='/img/Select/arrow-exchange.svg' alt=''/>
    </div>
  </div>
  )
}

export const UserBalanceSelectField = (props: Props) => {

  return (
    <SelectField options={props.options}  name={props.name} currentItemStyle={styles.current}  
    className={styles.select}
      itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
      activeComponent={(isActive) => <Placeholder currentItem={props.currentItem} isActive={isActive}/>}
      />
  )
}
