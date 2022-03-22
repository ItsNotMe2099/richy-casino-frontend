import styles from './index.module.scss'
import { IOption } from 'types/interfaces'
import Select from 'components/ui/Select'
import classNames from 'classnames'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
}

interface Props{
  options?: IOption<string>[],
  option?: ICustomSelectViewOption
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
  isActive?: boolean
  onTriggerClick?: () => void
  onChange?: (item: ICustomSelectViewOption) => void
}

export default function AddNewAccount(props: Props){
  
  const Option = (props: Props) => {
      return (
      <div className={styles.option} onClick={props.onClick}>
        <span>{props.option.symbol}</span>{props.option.label}
      </div>
      )
  }

  const Placeholder = (props: Props) => {
    return (
    <div className={styles.placeholder}>
      {!props.isActive ?
        <div className={styles.newAccount}>
        <div className={styles.subtract}>
          <img src='/img/DropdownMenu/subtract.svg' alt=''/>
        </div>
        <div className={styles.label}>
          Новый счет
        </div>
        </div>
        :
        <div className={classNames(styles.newAccount, {[styles.active]: props.isActive})}>
        <div className={styles.label}>
          Новый счет
        </div>
        <div className={classNames(styles.arrow, {[styles.active]: props.isActive})}><img
        src='/img/DropdownMenu/arrow.svg' alt=''/></div>
        </div>
      }
    </div>
    )
  }

  return (
    <div className={styles.root}>
      <Select
      style='newAccount'
      placeholder={(isActive) => <Placeholder isActive={isActive}/>}
      options={props.options} 
      onTriggerClick={props.onTriggerClick}
      onChange={props.onChange}
      itemComponent={(option, onClick) => <Option key={option.value} option={option} onClick={onClick}/>}
      />
    </div>
  )
}
