
import {IField, IOption} from 'types/interfaces'
import {Select} from 'components/ui/Inputs/Select'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'
export interface IMyCustomSelectViewOption extends IOption<string>{
  currency?: number
  amount?: number
}
interface Props extends IField{
  options: IMyCustomSelectViewOption[]

}
interface PropsOption{
  option: IMyCustomSelectViewOption
  isActive: boolean
  onClick: () => void
}
const Option = (props: PropsOption) => {
    return <div className={styles.custom} onClick={props.onClick}>{props.option.label}</div>
}

export const MyCustomSelectView = (props: Props) => {
  const context = useAppContext();

  const items = [
    {id: 1, name: 'ewe'},
    {id: 2, name: 'ewewqewqewqewe'}
  ]
  const items = items.map((i) => {
    return {...i, label: i.name, value: i.id}
  })
  /*
    [
    {value: 1, label: 'ewe', id: 1, name: ''},
    {value: 2, label: 'ewewqewqewqewe'}
  ]
  */
   */
  item[0 ] = //result of map iteration
  return <Select options={context.currencies.map(i => )}  name={props.name}
                 itemComponent={(option, active, onClick) => <Option key={option.value} option={option} onClick={onClick}/>}/>
}
