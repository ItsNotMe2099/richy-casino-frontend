import styles from './index.module.scss'
import classNames from 'classnames'
import cx from 'classnames'
import {IOption} from 'types/interfaces'
import Tabs from 'components/ui/Tabs'
import {useEffect, useState} from 'react'
import {ICasinoGameRound, ICasinoGameRoundStatus} from 'components/for_pages/games/data/interfaces/ICasinoGameRound'
import CasinoGameRoundRepository from 'components/for_pages/games/data/reposittories/CasinoGameRoundRepository'
import {useGameContext} from 'components/for_pages/games/context/state'

interface Props{
  items: any[]
}
export enum IGameHistoryFilterType{
  All = 'all',
  My = 'my'
}
export default function GameHistory(props: Props) {
  const {items} = props
  const gameContext = useGameContext()
  const [filter, setFilter] = useState(IGameHistoryFilterType.All)
  const filters: IOption<IGameHistoryFilterType>[] = [
    {label: 'Все ставки', value: IGameHistoryFilterType.All},
    {label: 'Мои ставки', value: IGameHistoryFilterType.My},
  ]
  const [data, setData] = useState<ICasinoGameRound[]>([])
  useEffect(() => {
    const subscription = gameContext.historyState$.subscribe((round) => {
      console.log('newRound', round)
      if(filter === IGameHistoryFilterType.All || (filter === IGameHistoryFilterType.My && round.user?.id && round.user?.id  ===  gameContext.user?.id)){

        const newVal = [...data]
        if(newVal){
          if( data.length > 0){
            newVal.splice(newVal.length - 1, 1)
          }
        }
        newVal.unshift(round)
        setData(newVal)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  useEffect(() => {
   CasinoGameRoundRepository.listAll().then(res => setData(res?.data ?? []))
  }, [])
  const handleChangeFilter = async (item: IOption<IGameHistoryFilterType>) => {
    setFilter(item.value)
    if(item.value === IGameHistoryFilterType.All){
      const res = await CasinoGameRoundRepository.listAll()
      setData(res?.data ?? [])
    }else{
      const res = await CasinoGameRoundRepository.listMy()
      setData(res?.data ?? [])
    }

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

        {data.map((item, index) =>
          <div className={classNames(styles.rowInner)} key={index}>
            <Cell className={styles.user}>{item.user?.login}</Cell>
            <Cell>{item.id}</Cell>
            <Cell className={cx(styles.cof, {[styles.red]: item.status === ICasinoGameRoundStatus.Lose, [styles.green]: item.status === ICasinoGameRoundStatus.Win})}><div className={styles.cofBlock}>{item.multiplier}<span className={styles.x}>x</span></div></Cell>
            <Cell className={cx(styles.win, {[styles.red]: item.status === ICasinoGameRoundStatus.Lose, [styles.green]: item.status === ICasinoGameRoundStatus.Win})}>{item.status === ICasinoGameRoundStatus.Win ? item.profit ? `+ ${item.profit} ${item.currency}` : '' : item.wager ? `- ${item.wager} ${item.currency}` : ''}</Cell>
          </div>
        )}
      </div>
    </div>
  )
}


