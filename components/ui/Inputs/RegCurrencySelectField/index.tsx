import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import Converter from 'utils/converter'
import {useMemo} from 'react'
import UserUtils from 'utils/user'

export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{

  onClick?: () => void

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
  const context = useAppContext()
  const data = useMemo( () => Converter.convertCurrencyToOptions(context.currencies).map(i => ({...i, symbol: <img src={UserUtils.getCurrencyIcon(i.value)}/> })), [context.currencies])
  return (
  <SelectField<string> disabled={props.disabled} options={data} name={props.name} currentItemStyle={styles.current} className={styles.select}
    itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
    activeComponent={(option, isActive) => <Placeholder currentItem={option} isActive={isActive}/>}
    />
  )
}
