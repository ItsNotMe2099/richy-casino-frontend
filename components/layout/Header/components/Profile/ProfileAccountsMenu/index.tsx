import styles from './index.module.scss'
import { IOption } from 'types/interfaces'
import Select from 'components/ui/Select'
import classNames from 'classnames'
import { useState } from 'react'
import HiddenXs from 'components/ui/HiddenXS'

export interface ICustomSelectViewOption extends IOption<string>{
  symbol?: string
  crypto?: boolean
}

interface ICurrentitem {
  symbol: string
  label: string
  value: string
}

interface Props{
  options?: IOption<string>[],
  option?: ICustomSelectViewOption
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
  isActive?: boolean
  onChange?: (item: ICustomSelectViewOption) => void
}

export default function ProfileAccountsMenu(props: Props){

  const Symbol = (props: Props) => {
    return (
    <div className={styles.symbol}>
      <div className={styles.image}>{props.currentItem ? <img src={props.currentItem.symbol} alt=''/> : <img src={props.option.symbol} alt=''/>}</div>
    </div>
    )
  }
  
  const Balance = (props: Props) => {
    return (
      <div className={styles.balance}>
        <div className={styles.value}>
          {props.option.value}&nbsp;<span>{props.option.label}</span>
        </div>
        {props.option.crypto &&
        <div className={styles.dg}>
          0.0000004 DG
        </div>}
      </div>
    )
  }
  
  const Option = (props: Props) => {
      return (
      <div className={styles.option} onClick={props.onClick}><div className={styles.group}><Symbol option={props.option}/> {props.option.label}</div>
        <div className={styles.balanceOption}>
          <Balance option={props.option}/>
        </div>
      </div>
      )
  }

  const Placeholder = (props: Props) => {
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

  return (
    <div className={styles.root}>
      <Select
      style='balance'
      placeholder={(isActive) => <Placeholder currentItem={props.currentItem} isActive={isActive}/>}
      options={props.options} 
      onChange={props.onChange}
      itemComponent={(option, onClick) => <Option key={option.value} option={option} onClick={onClick}/>}
      />
    </div>
  )
}
