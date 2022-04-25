import styles from './index.module.scss'
import cx from 'classnames'
import {useEffect} from 'react'
import GameCard from 'components/for_pages/games/components/GameCard'
import {HiloBetType} from 'components/for_pages/games/Hilo/data/enums'
interface Props{
  grid: number[]
  multipliers: number[]
  history: HiloBetType[]
  hasResult: boolean
  isLose?: boolean
}
interface PropsStatItem{
  index: number
  card?: number
  multiplier: string
  lose?: boolean
  action?: HiloBetType
}
export const StatItem = ({card, action, multiplier, index, lose}: PropsStatItem) => {
  const getIcon = () => {
    switch (action){
      case HiloBetType.Higher:
        return '/img/Games/hilo/bet_higher.svg'
      case HiloBetType.Lower:
        return '/img/Games/hilo/bet_lower.svg'
      case HiloBetType.Same:
        return '/img/Games/hilo/bet_same.svg'
      case HiloBetType.Skip:
        return '/img/Games/hilo/bet_skip.svg'
    }
  }
  return <div className={cx(styles.item, {[styles.active]: !lose && typeof card !== 'undefined', [styles.lose]: lose })} data-stat-item={index}>
    <div className={styles.card}><GameCard backStyle={'dark'} card={card}/>
      {action && <img className={styles.action} src={getIcon()}/>}
    </div>
    <div className={styles.multiplier}>{multiplier}</div>
  </div>
}
export default function Stat({ grid, history, multipliers, isLose}: Props) {

  let multipliersSorted = Array.from({length: grid.length < 8 ? 8 : grid.length}, (_, i) => i)
  useEffect(() => {
    if(grid.length > 1) {
      const $el =   document.querySelector(`[data-stat-item="${grid.length}"]`)
      if($el) {
        $el.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
      }
    }
  }, [grid])
  return (
    <div className={styles.root}>
      {multipliersSorted.map((multiplier, index) => <StatItem  key={index + 1} action={index > 0 ? history[index - 1] : null} index={index + 1} card={grid[multiplier]} lose={isLose && index === grid.length - 1} multiplier={index === 0 ? 'Start' : (multipliers[index - 1] ? `${multipliers[index - 1].toFixed(2)}x` : '0x')}/>)}
    </div>
  )
}


