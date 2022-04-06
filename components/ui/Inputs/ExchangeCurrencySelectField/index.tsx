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
  className?: string
  currentItem?: ICustomSelectViewOption
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
  {props.separator && <div className={styles.separator}/>}
  <div className={styles.symbol}>
    <img src={props.option?.symbol} alt=''/>
  </div>
  </>
  )
}

const Option = (props: PropsOption) => {
    return (
    <div className={styles.option} onClick={props.onClick}>
      <Symbol option={props.option}/>{props.option?.label}
    </div>
    )
}

const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
    <div className={styles.group}>
      <div className={styles.separator}></div>
      <Symbol option={props.option}/>
      {props.option?.label}
    </div>
    <img className={classNames(styles.arrow, {[styles.reverse]: props.isActive})}
        src='/img/Select/arrow-exchange.svg' alt=''/>
  </div>
  )
}


export const ExchangeCurrencySelectField = (props: Props) => {

  return (
  <SelectField className={props.className} options={props.options}  name={props.name} currentItemStyle={styles.current}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    activeComponent={(option ,isActive) => <Placeholder option={option} isActive={isActive}/>}
  />
  )

}
