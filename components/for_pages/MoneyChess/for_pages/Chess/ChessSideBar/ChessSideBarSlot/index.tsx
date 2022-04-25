import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarSlot/index.module.scss'
import {ChessGamePieceType, ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import {ChessGamePieceFactory} from 'components/for_pages/MoneyChess/types/factories'

interface Props {
  side: ChessGameSide,
  piece: ChessGamePieceType
}

export default function ChessSideBarSlot(props: Props) {
  return ( <div className={styles.root}>
    <div className={styles.wrapper}>
    <div className={styles.bg}/>
    <ChessGamePieceFactory piece={props.piece} side={props.side}/>
  </div>
  </div>)
}
