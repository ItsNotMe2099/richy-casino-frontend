import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'

export interface ICustomSelectViewOption extends IOption<string>{
  
}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
  initial?: string
  inputLabel?: string
  currentItem?: ICustomSelectViewOption
}
interface PropsOption{
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
}


const Option = (props: PropsOption) => {
    return <div className={styles.option} onClick={props.onClick}>{props.option.label}</div>
}

const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
      <div className={styles.label}>{props.currentItem.label}</div>
      <img className={classNames({[styles.reverse]: props.isActive})} 
        src='/img/Select/arrow-big.svg' alt=''/>
  </div>
  )
}

export const ProfileSettingsSelect = (props: Props) => {

  return (
  <div className={styles.root}>
    <div className={styles.label}>{props.inputLabel}</div>
    <SelectField options={props.options}  name={props.name} initialStyle={styles.initial} className={styles.select}
      itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
      activeComponent={(isActive) => <Placeholder currentItem={props.currentItem} isActive={isActive}/>}
    />
  </div>
  )
}
