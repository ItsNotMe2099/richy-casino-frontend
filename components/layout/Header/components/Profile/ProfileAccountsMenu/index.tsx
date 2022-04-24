import styles from './index.module.scss'
import {IOptionUserAccount} from 'types/interfaces'
import Select from 'components/ui/Select'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import UserUtils from 'utils/user'
import {useAppContext} from 'context/state'
import Converter from 'utils/converter'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'
import {ProfileModalType} from 'types/enums'


interface SelectProps{
  currentItem?: IOptionUserAccount
  option?: IOptionUserAccount
  onClick?: () => void
  isActive?: boolean
}

const Symbol = (props: SelectProps) => {
  return (
   <CurrencySvg currencyIso={props.option?.value} color className={styles.symbol}/>
  )
}

const Balance = (props: SelectProps) => {
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
      <Symbol option={props.currentItem}/>
      <div className={styles.value}>{props.currentItem.balance}&nbsp;</div>
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

  const mainAccount = UserUtils.getMainBalanceTotals(context.user)
  const otherAccounts = (UserUtils.getOtherBalancesTotals(context.user))
  const bonusAccounts = (UserUtils.getBonusBalances(context.user))
  const accountOptions = Converter.convertUserBalanceCurrencyToOptions([mainAccount, ...otherAccounts])
  const bonusOptions = Converter.convertUserBalanceCurrencyToOptions(bonusAccounts)
  const handleChange = () => {

  }
  const handleClick= () => {
    context.showModal(ProfileModalType.profile)
  }
  return (
    <div className={styles.root}>
      <Select<string>
      className={styles.select}
      style='balance'
      placeholder={(isActive) => <Placeholder currentItem={Converter.convertUserBalanceCurrencyToOption(mainAccount)} isActive={isActive}/>}
      options={Converter.convertUserBalanceCurrencyToOptions([mainAccount, ...otherAccounts])}
      onChange={handleChange}
      >
        <div className={styles.wrapper}>
        {accountOptions.map(option => <Option key={option.value} option={option as IOptionUserAccount} onClick={handleClick}/>)}
        {bonusOptions.length > 0 && <>
        <div className={styles.separator}/>
          <div className={styles.bonusTitle}>Bonuses</div>
          {bonusOptions.map(option => <Option key={option.value} option={option as IOptionUserAccount} onClick={handleClick}/>)}
        </>}
        </div>
      </Select>
    </div>
  )
}
