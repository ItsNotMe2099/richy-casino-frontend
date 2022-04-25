import styles from './index.module.scss'
import GameCard from 'components/for_pages/games/components/GameCard'
import classNames from 'classnames'
interface Props{
  card: number
  active: boolean
  isHold: boolean
  disabled?: boolean
  onClick?: () => void
}
export default function VideoPokerCard({card, active, isHold, onClick, disabled}: Props) {

  return (
    <div className={classNames(styles.root, {[styles.active]: active, [styles.disabled]: disabled})} onClick={!disabled ? onClick : null}>
      <GameCard className={styles.card} backStyle={'blue'} card={card}/>
      <div className={classNames(styles.hold, {[styles.visible]: isHold})} >Hold</div>
    </div>
  )
}


