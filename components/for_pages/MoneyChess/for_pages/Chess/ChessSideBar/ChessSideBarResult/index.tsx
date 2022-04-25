import styles from './index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import {ChessGameStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {ChessGameBoardStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessSideBarTimer} from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarTimer'
import FormError from 'components/ui/Form/FormError'


interface Props {
  result?: 'win' | 'lose' | 'draw',

}

export default function ChessSideBarResult(props: Props) {
  const gameContext = useChessGameContext()
  const isTableInProgress = gameContext.game.status === ChessGameStatus.InProgress
  const isTableFinished = gameContext.game.status === ChessGameStatus.Finished
  const isReplay = !isTableFinished && isTableInProgress && gameContext.game.currentBoard.status === ChessGameBoardStatus.WaitingAccept
  const curPlayerOfferedReplay = gameContext.game.currentBoard.ownerUserId === gameContext.user.id
  const getStatusText = () => {
    switch (props.result) {
      case 'win':
        return 'Победа!'
      case 'draw':
        return 'Ничья'
      case 'lose':
        return 'Поражение'

    }
  }
  const amount = (() => {
    switch (props.result) {
      case 'lose':
        return gameContext.game.currentBoard.loseAmount
      case 'win':
      case 'draw':
        return gameContext.game.currentBoard.winAmount

    }
  })()
  const getReplayText = () => {
    if(!isReplay){
      return
    }
    return !curPlayerOfferedReplay ? 'Соперник предлагает реванш' : 'Ожидайте подтвреждение реванша'
    }

  return (<div className={classNames(styles.root, {
    [styles.win]: props.result === 'win',
    [styles.lose]: props.result === 'lose',
    [styles.draw]: props.result === 'draw'
  })}>
    <div/>
    {props.result && <div className={styles.result}>
       <div className={styles.image}>
        <img src={`/img/Chess/status_${props.result}.svg`}/>
      </div>
      <div className={styles.title}>{getStatusText()}</div>
      <div className={styles.amount}>{amount} {gameContext.game.currency}</div>
    </div>}
    {isReplay && <div><div className={styles.description}>{getReplayText()}</div>
      {gameContext.game.currentBoard.actionWaitExpiredAt && <ChessSideBarTimer expiredAt={new Date(gameContext.game.currentBoard.actionWaitExpiredAt)}/>}
    </div>}
    {isTableFinished && <div className={styles.description}>Игра завершена</div>}
    {gameContext.actionError && <FormError error={gameContext.actionError}/>}
    {(isTableInProgress && !isReplay) && <div className={classNames(styles.btnWrapper)}>
      <Button size='play' background='dark500' className={styles.button} onClick={() => gameContext.exit()}>Выход</Button>
      <Button type='submit' size='play' background='blueGradient500' className={styles.button} onClick={() => gameContext.askReplay()}>Реванш</Button>
    </div>}
    {(isReplay && !curPlayerOfferedReplay) && <div className={classNames(styles.btnWrapper)}>
      <Button size='play' background='dark500' className={styles.button} onClick={() => gameContext.exit()}>Выход</Button>
      <Button type='submit' size='play' background='blueGradient500' className={styles.button} onClick={() => gameContext.acceptReplay()}>Принять</Button>
    </div>}

    <div/>
  </div>)
}
