import styles from './index.module.scss'
import {IMultipliers} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import cx from 'classnames'
interface Props{
  selected: number[]
  multipliers: IMultipliers
  hits: number
  hasResult: boolean
}
interface PropsStatItem{
  index: number,
  multiplier: number
  isActive: boolean
}
export const StatItem = ({index, multiplier, isActive}: PropsStatItem) => {
  return <div className={cx(styles.item, {[styles.active]: isActive})}>
    <div className={styles.number}>{index}</div>
    <div className={styles.multiplier}>{multiplier}x</div>
  </div>
}
export default function Stat({selected, multipliers, hasResult, hits}: Props) {
  let multipliersSorted = multipliers[selected.length].sort((a, b) =>  a - b)
  console.log('multipliersSorted', multipliersSorted)
  return (
    <div className={styles.root}>
      {multipliersSorted.map((multiplier, index) => <StatItem isActive={hasResult && hits === index} key={index} index={index} multiplier={multiplier}/>)}
    </div>
  )
}


