import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarStatus/index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ChessSideBarTimer} from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarTimer'

interface Props {

}

export default function ChessSideBarStatus(props: Props) {
  const gameContext = useChessGameContext()
  const noActions = gameContext.isMyTurn && gameContext.game.currentBoard.dices.length > 0 && gameContext.game.currentBoard.currentDices.length === 0
  const isOfferDraw = !!gameContext.game.currentBoard.offerDrawUserId
  const myDrawOffer = gameContext.game.currentBoard.offerDrawUserId === gameContext.user.id
  return ( <div className={styles.root}>
    {!isOfferDraw && !noActions && <div className={styles.label}>{gameContext.isMyTurn ? 'Ваш ход' : 'Идет ход соперника'}</div>}
    {isOfferDraw && <div className={styles.label}>{!myDrawOffer ? 'Соперник предложил сдаться' : 'Вы предложили сдаться'} </div>}
    {(gameContext.game.currentBoard.actionDrawExpiredAt || isOfferDraw) && <ChessSideBarTimer expiredAt={new Date(gameContext.game.currentBoard.actionDrawExpiredAt)}/>}
  </div>)
}
