import styles from 'components/for_pages/MoneyChess/Lobby/ChessGameRow/ChessGameUser/index.module.scss'
import {
  ChessGameTimeIconFactory, getChessGameTimeName
} from 'components/for_pages/MoneyChess/types/factories'
import {ChessGameTime} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'


interface Props {
  timeKey: string
  times: ChessGameTime[]
}

export default function ChessGameTimeColumn(props: Props) {
 return ( <div className={styles.root}>
   <ChessGameTimeIconFactory timeKey={props.timeKey} times={props.times}/>
   {getChessGameTimeName(props.timeKey)}
 </div>)
}
