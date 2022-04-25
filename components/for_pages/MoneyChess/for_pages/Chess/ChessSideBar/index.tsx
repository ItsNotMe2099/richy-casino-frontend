import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/index.module.scss'
import ChessSideBarPlayer from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarPlayer'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import ChessSideBarVariants from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarVariants'
import ChessSideBarLoader from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarLoader'
import ChessSideBarStatus from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarStatus'
import ChessSideBarActions from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarActions'
import {ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import ChessSideBarResult from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarResult'
import {ChessGameBoardStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessGameStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'


interface Props {

}

export default function ChessSideBar(props: Props) {
    const gameContext = useChessGameContext()
  const currentPlayer = gameContext.game.currentBoard.players.find(i => i.userId === gameContext.user?.id)
  const opponentPlayer = gameContext.game.currentBoard.players.find(i => i.userId !== gameContext.user?.id)
  const currentSide = gameContext.game.currentBoard.currentTurn % 2 === 0 ? ChessGameSide.WHITE : ChessGameSide.BLACK
  const isFinished = [ChessGameBoardStatus.FinishedByDraw, ChessGameBoardStatus.FinishedByGiveUp, ChessGameBoardStatus.FinishedByKingCapture, ChessGameBoardStatus.FinishedByTimeout].includes(gameContext.game.currentBoard.status)
  const isInProgress = [ChessGameBoardStatus.InProgress].includes(gameContext.game.currentBoard.status)
  const isWinner = gameContext.game.currentBoard.winnerUserId === gameContext.user.id
  const isTableInProgress = gameContext.game.status === ChessGameStatus.InProgress
  const isReplay = isTableInProgress && gameContext.game.currentBoard.status === ChessGameBoardStatus.WaitingAccept

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.opponentPlayer}>
      <ChessSideBarPlayer  user={opponentPlayer?.user}
                          hasTimer={!gameContext.isMyTurn && isInProgress}
                          startedAt={gameContext.game.currentBoard.actionWaitStartedAt}
                          expiredAt={gameContext.game.currentBoard.actionWaitExpiredAt}/>
        </div>
        <div className={styles.currentPlayerMobile}>
        <ChessSideBarPlayer user={opponentPlayer?.user}
                            hasTimer={gameContext.isMyTurn && isInProgress}
                            startedAt={gameContext.game.currentBoard.actionWaitStartedAt}
                            expiredAt={gameContext.game.currentBoard.actionWaitExpiredAt}
        />
        </div>
      {(isFinished || isReplay) && <ChessSideBarResult result={gameContext.game.currentBoard.status === ChessGameBoardStatus.FinishedByDraw ? 'draw' : (isWinner ? 'win' :  'lose')}/>}
      {!isFinished  && !isReplay && <>

        <div className={styles.status}>
          <ChessSideBarLoader/>
          <ChessSideBarStatus/>
        </div>

        <ChessSideBarVariants dices={gameContext.game.currentBoard.dices} side={currentSide}/>
        <div className={styles.statusMobile}>
          <ChessSideBarLoader/>
          <ChessSideBarStatus/>
        </div>
        <ChessSideBarActions/>
      </>}
      <div  className={styles.currentPlayer} >
      <ChessSideBarPlayer user={opponentPlayer?.user}
                          hasTimer={gameContext.isMyTurn && isInProgress}
                          startedAt={gameContext.game.currentBoard.actionWaitStartedAt}
                          expiredAt={gameContext.game.currentBoard.actionWaitExpiredAt}
      />
      </div>
      </div>
    </div>
  )
}
