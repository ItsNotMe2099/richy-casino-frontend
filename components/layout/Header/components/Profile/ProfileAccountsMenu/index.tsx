import styles from './index.module.scss'
import { IOption } from 'types/interfaces'
import Select from 'components/ui/Select'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import UserUtils from 'utils/user'
import {useAppContext} from 'context/state'
import Converter from 'utils/converter'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
  crypto?: boolean
}

interface SelectProps{
  currentItem?: ICustomSelectViewOption
  option?: ICustomSelectViewOption
  onClick?: () => void
  isActive?: boolean
}

const Symbol = (props: SelectProps) => {
  return (
    <div className={styles.symbol}>
      {props.currentItem ? <img src={props.currentItem.symbol} alt=''/> : <img src={props.option.symbol} alt=''/>}
    </div>
  )
}

const Balance = (props: SelectProps) => {
  return (
    <div className={styles.balance}>
      <div className={styles.value}>
        {props.option.value}&nbsp;<span>{props.option.label}</span>
      </div>
    </div>
  )
}

const Option = (props: SelectProps) => {
  return (
    <div className={styles.option} onClick={props.onClick}><div className={styles.group}><Symbol option={props.option}/> {props.option.label}</div>
      <div className={styles.balanceOption}>
        <Balance option={props.option}/>
      </div>
    </div>
  )
}

const Placeholder = (props: SelectProps) => {
  return (
    <div className={styles.placeholder}>
      <Symbol currentItem={props.currentItem}/>
      <div className={styles.value}>{props.currentItem.value}&nbsp;</div>
      <div className={styles.label}>{props.currentItem.label}</div>
      <HiddenXs>
        <div className={classNames(styles.arrow, {[styles.notActive]: !props.isActive})}><img src='/img/Select/arrow-select-balance.svg' alt=''/></div>
      </HiddenXs>
    </div>
  )
}
interface Props{

}

export default function ProfileAccountsMenu(props: Props){
  const context = useAppContext()

  const mainAccount = UserUtils.getMainBalance(context.user)
  const otherAccounts = (UserUtils.getOtherBalances(context.user))
  const handleChange = () => {

  }
  return (
    <div className={styles.root}>
      <Select
      style='balance'
      placeholder={(isActive) => <Placeholder currentItem={Converter.convertUserBalanceCurrencyToOption(mainAccount)} isActive={isActive}/>}
      options={Converter.convertUserBalanceCurrencyToOptions([mainAccount, ...otherAccounts])}
      onChange={handleChange}
      itemComponent={(option, onClick) => <Option key={option.value} option={option} onClick={onClick}/>}
      />
    </div>
  )
}
