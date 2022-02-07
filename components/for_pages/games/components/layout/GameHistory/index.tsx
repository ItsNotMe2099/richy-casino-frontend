import styles from './index.module.scss'
import classNames from 'classnames'
import {IOption} from 'types/interfaces'
import Tabs from 'components/ui/Tabs'
import {useState} from 'react'
import cx from 'classnames'
interface Props{
  items: any[]
}
export enum IGameHistoryFilterType{
  All = 'all',
  My = 'my'
}
export default function GameHistory(props: Props) {
  const {items} = props
  const [filter, setFilter] = useState(IGameHistoryFilterType.All)
  const filters: IOption<IGameHistoryFilterType>[] = [
    {label: 'Все ставки', value: IGameHistoryFilterType.All},
    {label: 'Мои ставки', value: IGameHistoryFilterType.My},
  ]
  const handleChangeFilter = (item: IOption<IGameHistoryFilterType>) => {
    setFilter(item.value)
  }
  const HeaderCell = ({children, className = null}) => {
    return (  <div className={cx(styles.cell, className)}>
      {children}
    </div>)
  }
  const Cell = ({children, className = null}) => {
    return (  <div className={cx(styles.cell, className)}>
      {children}
    </div>)
  }
  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
      <Tabs options={filters} onChange={handleChangeFilter} value={filter}/>
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <HeaderCell>Игрок</HeaderCell>
          <HeaderCell>ID ставки</HeaderCell>
          <HeaderCell className={styles.cofHeader}>Коэффициент</HeaderCell>
          <HeaderCell>Выигрыш</HeaderCell>
        </div>

        {items.map((item, index) =>
          <div className={classNames(styles.rowInner)} key={index}>
            <Cell className={styles.user}>{item.user}</Cell>
            <Cell>{item.id}</Cell>
            <Cell className={cx(styles.cof, {[styles.red]: item.cof <= 0, [styles.green]: +item.cof > 0})}><div className={styles.cofBlock}>{item.cof}<span className={styles.x}>x</span></div></Cell>
            <Cell className={cx(styles.win, {[styles.red]: item.cof <= 0, [styles.green]: +item.cof > 0})}>{item.win ? item.win > 0 ? '+' : '-' : ''} {item.win}</Cell>
          </div>
        )}
      </div>
    </div>
  )
}


