import styles from './index.module.scss'
import GameCard from 'components/for_pages/games/components/GameCard'
interface Props{
  cards?: number[]
  number?: number
}
export default function Deck({cards, number}: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        {cards.map(i => <GameCard key={i} className={styles.card} backStyle={'blue'} card={i}/>)}
      </div>
      <div className={styles.number}>{number}</div>
    </div>
  )
}


