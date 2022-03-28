import styles from './index.module.scss'
import cx from 'classnames'
import DiamondGreyscaleSvg from 'components/for_pages/games/Diamonds/components/svg/DiamondGreyscaleSvg'
interface Props{
  resultMultiplier: number
  hasResult: boolean
}
interface PropsStatItem{
  filledCount: number,
  outlinedCount: number
  multiplier: number
  isActive: boolean
}
export const StatItem = ({filledCount, outlinedCount, multiplier, isActive}: PropsStatItem) => {
  return <div className={cx(styles.item, {[styles.active]: isActive})} >
    <div className={styles.diamonds}>
      {Array.from({length: 5}, (_, i) => i + 1).map(i => <DiamondGreyscaleSvg key={i} active={isActive} filled={i <= filledCount} outlined={i <= outlinedCount} />)}
    </div>
    <div className={styles.multiplier}>{multiplier}x</div>
  </div>
}
export default function Stat({ resultMultiplier, hasResult}: Props) {

  const multipliers = [
    {multiplier: 50, filledCount: 5, outlinedCount: 0},
    {multiplier: 5, filledCount: 4, outlinedCount: 0},
    {multiplier:3, filledCount: 2, outlinedCount: 0},
    {multiplier: 4, filledCount: 3, outlinedCount: 2},
    {multiplier: 2, filledCount: 2, outlinedCount: 2},
    {multiplier: 0.1, filledCount: 2, outlinedCount: 3},
  ]

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        {multipliers.map((i, index) => <StatItem key={index}  isActive={hasResult && i.multiplier === resultMultiplier} multiplier={i.multiplier} filledCount={i.filledCount} outlinedCount={i.outlinedCount}/>)}
      </div>
      <div className={styles.bottom}>
        <StatItem isActive={hasResult && resultMultiplier === 0} multiplier={0} filledCount={0} outlinedCount={0}/>
      </div>
      </div>
  )
}


