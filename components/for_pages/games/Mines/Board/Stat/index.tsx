import styles from './index.module.scss'
import {IMultipliers} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import cx from 'classnames'
import {abbreviate} from 'components/for_pages/games/utils/game'
import { Scrollbars } from 'react-custom-scrollbars-2'
import {useEffect} from 'react'
import {useGameContext} from 'components/for_pages/games/context/state'
interface Props{
  count: number
  multipliers: IMultipliers
  turn: number
}
interface PropsStatItem{
  index: number,
  multiplier: number
  isActive: boolean
}
export const StatItem = ({index, multiplier, isActive}: PropsStatItem) => {
  return <div className={cx(styles.item, {[styles.active]: isActive})} data-stat-item={index}>
    <div className={styles.number}>{index}</div>
    <div className={styles.separator}/>
    <div className={styles.multiplier}>{multiplier}x</div>
  </div>
}
export default function Stat({count, multipliers, turn}: Props) {
  const gameContext = useGameContext()
  let multipliersSorted = multipliers[count]
  useEffect(() => {
    if(turn && gameContext.started) {
      const $el =   document.querySelector(`[data-stat-item="${turn}"]`)
      if($el) {
        $el.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'})
      }
    }
  }, [turn, gameContext.started])
  return (
    <Scrollbars className={styles.scroll} style={{ width: '100%', height: 45 }}>
    <div className={styles.root}>
      {(multipliersSorted || []).map((multiplier, index) => <StatItem isActive={turn !=0 && turn >= index + 1} key={index} index={index + 1} multiplier={abbreviate(multiplier)}/>)}
    </div>
    </Scrollbars>
  )
}


