import styles from './index.module.scss'
import cx from 'classnames'
import {DeckRankType} from 'components/for_pages/games/BlackJack/data/enums'
interface Props{
  resultMultiplier: number
}
interface PropsStatItem{
  name: string
  multiplier: number
  isActive: boolean
}
export const StatItem = ({name, multiplier, isActive}: PropsStatItem) => {
  return <div className={cx(styles.item, {[styles.active]: isActive})} >
    <div className={styles.name}>
      {name}
     </div>
    <div className={styles.multiplier}>{multiplier}x</div>
  </div>
}
export default function Stat({resultMultiplier}: Props) {

  const multipliers = [
    {rankType: DeckRankType.RoyalFlush, name: 'Royal flush', multiplier: 600},
    {rankType: DeckRankType.StraightFlush, name: 'Straight flush', multiplier: 60},
    {rankType: DeckRankType.FourOfAKind, name: '4 of Kind', multiplier: 22},
    {rankType: DeckRankType.FullHouse, name: 'Full house', multiplier: 9},
    {rankType: DeckRankType.Flush, name: 'Flush', multiplier: 6},
    {rankType: DeckRankType.Straight, name: 'Straight', multiplier: 4},
    {rankType: DeckRankType.ThreeOfAKind, name: '3 of a Kind', multiplier: 3},
    {rankType: DeckRankType.TwoPairs, name: '2 Pairs', multiplier: 2},
    {rankType: DeckRankType.OnePair, name: 'Jacks or Better', multiplier: 1},
  ]

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {[...multipliers].splice(0, 5).map((i, index) => <StatItem key={index} name={i.name} isActive={i.multiplier === resultMultiplier} multiplier={i.multiplier} />)}
      </div>
      <div className={styles.right}>
        {[...multipliers].splice(5, multipliers.length - 5).map((i, index) => <StatItem key={index} name={i.name} isActive={i.multiplier === resultMultiplier} multiplier={i.multiplier} />)}
      </div>

      </div>
  )
}


