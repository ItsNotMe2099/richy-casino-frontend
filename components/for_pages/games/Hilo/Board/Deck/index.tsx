import styles from './index.module.scss'
import GameCard from 'components/for_pages/games/components/GameCard'
interface Props{
  card?: number
}
export default function Deck({card}: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
      <div className={styles.background}>
        <img src={'/img/Games/cards/card_pack.svg'}/>
      </div>
      <GameCard className={styles.card} backStyle={'blue'} card={card}/>
      </div>
    </div>
  )
}


