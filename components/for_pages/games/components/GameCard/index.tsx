import styles from './index.module.scss'
import CardsDeck from 'components/for_pages/games/utils/deck'
import classNames from 'classnames'
interface Props{
  card?: number
  backStyle: 'dark' | 'grey' | 'blue'
  className?: string
}
export default function GameCard({className, card, backStyle}: Props) {
  const image = CardsDeck.getImagePath(card)

  return (
   <div className={classNames(styles.root, className)}>
     {image && <img src={image}/>}
     {!image && (['dark', 'grey'].includes(backStyle)) && <img  src={'/img/Games/cards/back.svg'} className={classNames({[styles.darkGrey]: backStyle === 'dark'})}/>}
     {!image && (['blue'].includes(backStyle)) && <img src={'/img/Games/cards/back_blue.svg'} className={styles.blue}/>}
   </div>
  )
}


