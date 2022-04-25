import styles from 'components/for_pages/MoneyChess/for_pages/Chess/components/Board/BoardSquare/index.module.scss'
import classNames from 'classnames'
import {ChessGamePieceType, ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import {ChessGamePieceFactory} from 'components/for_pages/MoneyChess/types/factories'

interface Props {
  indexRow?: number
  indexColumn?: string
  side?: ChessGameSide
  piece?: ChessGamePieceType
  color: 'white' | 'black'
  content?: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  canClick?: boolean
}

export default function BoardSquare(props: Props) {

    return (
      <div className={classNames(styles.root, {
        [styles.white]: props.color === 'white',
        [styles.black]: props.color === 'black',
        [styles.active]: props.active,
        [styles.disabled]: props.disabled,
        [styles.canClick]: props.canClick,
         [styles.hiddenFigure]: !props.piece

      })}
      onClick={props.canClick ? props.onClick : null}
      >

        {props.content}
        {props.piece && <ChessGamePieceFactory  piece={props.piece} side={props.side}/>}
        {!props.piece && <ChessGamePieceFactory piece={ChessGamePieceType.Pawn} side={ChessGameSide.WHITE}/>}
        {props.indexRow && <div className={styles.indexRow}>{props.indexRow}</div>}
        {props.indexColumn && <div className={styles.indexColumn}>{props.indexColumn}</div>}
      </div>
    )

}
