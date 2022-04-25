import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import DropdownArrow from 'components/ui/Inputs/components/DropdownArrow'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'

export interface ICustomSelectViewOption extends IOption<string>{
  icon?: string
}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
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
const Placeholder = (props: PropsOption) => {
  return (
    <div className={styles.placeholder}>
      <div className={styles.label}>
        <Symbol option={props.option}/>
        {props.option?.label}
      </div>
      <DropdownArrow active={props.isActive}/>
    </div>
  )
}

export const CreateGameOptions = (props: Props) => {

  return (<div>
    <GFieldLabel label={props.label}/>
  <SelectField  options={props.options}  name={props.name} disabled={props.disabled} validate={props.validate}
                itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
                activeComponent={(option, active) => <Placeholder key={option.value} isActive={active} option={option}/>}
  />
    </div>
  )

}
