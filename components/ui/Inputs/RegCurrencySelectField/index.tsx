import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
  initial?: string
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
}
interface PropsOption{
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
}

const Symbol = (props: PropsOption) => {
  return <div className={styles.symbol}>{props.option.symbol}</div>
}

const Option = (props: PropsOption) => {
    return <div className={styles.option} onClick={props.onClick}><Symbol option={props.option}/>{props.option.label}</div>
}

const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
    <div className={styles.group}>
      <Symbol option={props.currentItem}/>
      {props.currentItem.label}
    </div>
    <img className={classNames({[styles.reverse]: props.isActive})} 
        src='/img/Select/arrow.svg' alt=''/>
  </div>
  )
}

export const RegCurrencySelectField = (props: Props) => {

  return (
  <SelectField options={props.options} name={props.name} initialStyle={styles.initial}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    activeComponent={(isActive) => <Placeholder currentItem={props.currentItem} isActive={isActive}/>}
    />
  )
}
