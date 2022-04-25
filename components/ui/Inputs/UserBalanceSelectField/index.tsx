import { IOptionUserAccount} from 'types/interfaces'
import styles from './index.module.scss'

import classNames from 'classnames'
import Select from 'components/ui/Select'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

interface Props {
  options: IOptionUserAccount[]
  onChange: (value: IOptionUserAccount) =>  void
  currentItem?: IOptionUserAccount
  className: string

}
interface PropsOption{
  option?: IOptionUserAccount
  isActive?: boolean
  onClick?: () => void
  currentItem?: IOptionUserAccount
}

const Symbol = (props: PropsOption) => {
  return (<CurrencySvg currencyIso={props.option.value} color className={styles.symbol}/>
  )
}

const Balance = (props: PropsOption) => {
  return (
    <div className={styles.balance}>
      <div className={styles.value}>
        {props.option.calculatedBalance}&nbsp;<span>{props.option.mainCurrency}</span>
      </div>
      <div className={styles.dg}>
        {props.option.balance}&nbsp;{props.option.label}
      </div>
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
    <Select options={props.options}
    className={styles.select}
            rootClassName={props.className}
            onChange={props.onChange}
      itemComponent={(option, onClick) => <Option key={option.value} isActive={false} option={option as IOptionUserAccount} onClick={onClick}/>}
            placeholder={(isActive) => <Placeholder currentItem={props.currentItem} isActive={isActive}/>}
      />
  )
}
