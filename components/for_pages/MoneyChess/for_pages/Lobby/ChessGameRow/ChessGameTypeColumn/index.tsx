import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/ChessGameRow/ChessGameUser/index.module.scss'
import {ChessGameTypeIconFactory, ChessGameTypeNameFactory} from 'components/for_pages/MoneyChess/types/factories'
import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'


interface Props {
  type: ChessGameType
}

export default function ChessGameTypeColumn(props: Props) {
 return ( <div className={styles.root}>
   <ChessGameTypeIconFactory type={props.type}/>
   <ChessGameTypeNameFactory type={props.type}/>
 </div>)
}
