import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarVariants/index.module.scss'

import ChessSideBarSlot from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarSlot'
import {ChessGameDices, ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'

interface Props {
  dices: number[]
  side: ChessGameSide
}

export default function ChessSideBarVariants(props: Props) {
  return ( <div className={styles.root}>
    {(props.dices.length > 0 ? props.dices : [0,0,0]).map( (i, index) => <ChessSideBarSlot key={index} piece={ChessGameDices[i - 1]} side={props.side}/>)}
  </div>)
}
