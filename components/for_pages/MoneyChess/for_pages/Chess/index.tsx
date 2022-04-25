import Board from 'components/for_pages/MoneyChess/for_pages/Chess/components/Board'
import styles from 'components/for_pages/MoneyChess/for_pages/Chess/index.module.scss'
import ChessSideBar from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar'
import ChessSideBarPlayer from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarPlayer'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ChessGameBoardStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import ChessBoardModals from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModals'


interface Props {

}
const MobileChessPlayer = () => {
  const gameContext = useChessGameContext()
  const opponentPlayer = gameContext.game.currentBoard.players.find(i => i.userId !== gameContext.user?.id)
  const isInProgress = [ChessGameBoardStatus.InProgress].includes(gameContext.game.currentBoard.status)
 return ( <div className={styles.mobilePlayer}><ChessSideBarPlayer user={opponentPlayer?.user}
                               hasTimer={!gameContext.isMyTurn && isInProgress}
                               startedAt={gameContext.game.currentBoard.actionWaitStartedAt}
                                                                    expiredAt={gameContext.game.currentBoard.actionWaitExpiredAt}/></div>)
}
export default function ChessGame(props: Props) {

  return (
    <div className={styles.root}>
      <MobileChessPlayer/>
      <Board />
      <ChessSideBar/>
      <ChessBoardModals/>
    </div>
  )
}
