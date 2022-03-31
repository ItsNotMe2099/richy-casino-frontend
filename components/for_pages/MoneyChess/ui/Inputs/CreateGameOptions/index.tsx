import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'

export interface ICustomSelectViewOption extends IOption<string>{
  icon?: string
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
  <>
  <div className={styles.symbol}>
    <img src={props.option.icon} alt=''/>
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

export const CreateGameOptions = (props: Props) => {

  return (
  <SelectField  options={props.options}  name={props.name} currentItemStyle={styles.initial}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
  />
  )
  
}
