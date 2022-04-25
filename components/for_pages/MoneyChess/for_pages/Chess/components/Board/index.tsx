import styles from 'components/for_pages/MoneyChess/for_pages/Chess/components/Board/index.module.scss'
import {ReactElement, useEffect} from 'react'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {IChessGameBoardPiece} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoardPiece'
import BoardSquare from 'components/for_pages/MoneyChess/for_pages/Chess/components/Board/BoardSquare'
import {chessGameColumns, ChessGameDices, ChessGameRow, ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'


import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'

interface Props {

}

interface SquareProps {
  index?: number
  figure?: ReactElement
}
interface IBoardSquare{
  color: 'white' | 'black',
  row: ChessGameRow,
  column: string
}
const BOARD_SQUARES: IBoardSquare[] = Array.from({length: 64}, (a, b) => b + 1).map(i => ({
  color: ((Math.floor((i - 1) / 8) + 1) + ((i - (Math.floor((i - 1)/ 8)) * 8))) % 2 === 0 ? 'black' : 'white',
  row: Math.floor((i - 1) / 8) + 1 as ChessGameRow,
  column: chessGameColumns[(i - (Math.floor((i - 1)/ 8)) * 8)- 1],
}))
interface IBoardPieceMap{
  [key: string]: IChessGameBoardPiece
}
const formatPiecesToMap = (data: IChessGameBoardPiece[]): IBoardPieceMap => {
  const res = {}
  for(const item of data ){
    res[`${item.square.row}${item.square.column}`] = item
  }
  return res
}
export default function Board(props: Props) {
  const gameContext = useChessGameContext()
  console.log('gameContext.game', gameContext.game)
  const piecesMap = formatPiecesToMap(gameContext.game?.currentBoard?.pieces ?? [])
  const currentPlayer = gameContext.game.currentBoard.players.find(i => i.userId === gameContext.user?.id)
  const opponentPlayer = gameContext.game.currentBoard.players.find(i => i.userId !== gameContext.user?.id)
  const hasDices =  gameContext.game.currentBoard.currentDices.length > 0
  const isOfferDraw = !!gameContext.game.currentBoard.offerDrawUserId
  const getPiece = (piecesMap: IBoardPieceMap, row: number, column: string) => {

    return piecesMap[`${row}${column}`]
  }
  useEffect(() => {
    const subscriptionGame = gameContext.gameState$.subscribe((data: IChessGame) => {
     // console.log('SetPiciesMap', formatPiecesToMap(data?.currentBoard?.pieces ?? []))
   //     setPiecesMap(formatPiecesToMap(data?.currentBoard?.pieces ?? []))
    })
    return () => {
      subscriptionGame.unsubscribe()
    }
  }, [])
  return (
    <div className={styles.root}>
      {BOARD_SQUARES.map(({row, column, color}) => {
        const revertedRow = currentPlayer?.side === ChessGameSide.WHITE ? -1* ((row-1)-8) as ChessGameRow : row
        const boardItem = getPiece(piecesMap, revertedRow, column)
        const currentSide = gameContext.game.currentBoard.currentTurn % 2 === 0 ? ChessGameSide.WHITE : ChessGameSide.BLACK
        const canSelect =  !isOfferDraw && boardItem && hasDices && boardItem?.side === currentSide  && (gameContext.game.currentBoard.currentDices.map(i => ChessGameDices[i - 1]).includes(boardItem?.piece))
        const selected = gameContext.selectedSquare?.row === revertedRow && gameContext.selectedSquare?.column === column
        const possibleMove = !!gameContext.possibleMoves?.find(i => i.row === revertedRow && i.column === column)
        return (<BoardSquare
        key={`${row}${column}`}
        indexRow={column === 'A' ? revertedRow : null}
        indexColumn={row === 8 ? column : null}
        piece={getPiece(piecesMap, revertedRow, column)?.piece}
        side={getPiece(piecesMap, revertedRow, column)?.side} color={color}
        active={selected || possibleMove}
        canClick={gameContext.isMyTurn && (canSelect || possibleMove)}
        onClick={() => canSelect ? gameContext.setSelectedSquare({row: revertedRow, column}) : possibleMove ? gameContext.move({row: revertedRow, column}) : null}
        disabled={hasDices ? !canSelect : false}
      />)
      }
      )}
    </div>
  )
}
