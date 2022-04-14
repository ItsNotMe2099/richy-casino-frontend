import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameUser/index.module.scss'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'


interface Props {
  user: IGameUser
}

export default function ChessGameUser(props: Props) {
 return ( <div className={styles.root}>
   {props.user?.login ?? `${props.user?.id ? `#${props.user?.id}` : ''}`}
 </div>)
}
