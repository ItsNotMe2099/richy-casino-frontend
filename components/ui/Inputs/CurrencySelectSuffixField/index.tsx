import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'
import DropdownArrow from 'components/ui/Inputs/components/DropdownArrow'

export interface ICustomSelectViewOption extends IOption<string>{

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
    <img src={props.option?.symbol as string} alt=''/>
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
      <div className={styles.separator}/>
      <div className={styles.label}>
        <Symbol option={props.option}/>
        {props.option?.label}
      </div>
    <DropdownArrow active={props.isActive}/>
  </div>
  )
}


export const CurrencySelectSuffixField = (props: Props) => {

  return (
  <SelectField className={classNames(props.className, styles.root)} options={props.options}  name={props.name}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    activeComponent={(option, isActive) => <Placeholder option={option} isActive={isActive}/>}
  />
  )

}
