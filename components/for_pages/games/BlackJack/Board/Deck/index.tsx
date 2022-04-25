import styles from './index.module.scss'
import GameCard from 'components/for_pages/games/components/GameCard'
import classNames from 'classnames'
interface Props{
  cards?: number[]
  number?: number
  withHidden?: boolean
  cursor?: boolean
}
export default function Deck({cards, number, withHidden, cursor}: Props) {

  return (
    <div className={classNames(styles.root, {[styles.withHidden]: withHidden, [styles.increased]: cards.length >= 3, [styles.increased1]: cards.length >= 3, [styles.increased2]: cards.length >= 4, [styles.increased3]: cards.length >= 5, [styles.increased4]: cards.length >= 6})}>
      {cursor && <div className={styles.cursor}><img src={'/img/Games/blackjack/triangle.svg'}/></div>}
      <div className={styles.cards}>
        {cards.map((i, index) => <GameCard key={`${index}:${i}`} className={classNames(styles.card, {[styles.withHidden]: withHidden && i === 0})} backStyle={'blue'} card={i}/>)}
      </div>
      <div className={styles.number}>{number}</div>
    </div>
  )
}


