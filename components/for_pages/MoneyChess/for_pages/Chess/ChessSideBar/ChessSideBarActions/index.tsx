import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarActions/index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import Button from 'components/ui/Button'
import {useState} from 'react'
import classNames from 'classnames'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import DotsSvg from 'components/for_pages/MoneyChess/for_pages/Chess/components/svg/DotsSvg'
import {ChessGameModalType} from 'components/for_pages/MoneyChess/types/enums'
import FormError from 'components/ui/Form/FormError'

interface Props {

}

export default function ChessSideBarActions(props: Props) {
  const gameContext = useChessGameContext()
  const [sending, setSending] = useState(false)
  const handleClick = async () => {
    setSending(true)
    await ChessGameRepository.newDices(gameContext.game.id)
    setSending(false)
  }
  const isOfferDraw = !!gameContext.game.currentBoard.offerDrawUserId
  const myDrawOffer = gameContext.game.currentBoard.offerDrawUserId === gameContext.user.id
  const noActions = gameContext.game.currentBoard.dices.length > 0 && gameContext.game.currentBoard.currentDices.length === 0
  const disabled = isOfferDraw || !gameContext.isMyTurn || (gameContext.game.currentBoard.dices.length > 0) || noActions
  return (
    <div>
      {gameContext.actionError && <FormError error={gameContext.actionError}/>}
      {!isOfferDraw && <div className={classNames(styles.root, {[styles.disabled]: disabled})}>
    <Button type='button' size='play' disabled={disabled} className={styles.button} background='blueGradient500'  onClick={handleClick}>Крутить</Button>
    <div className={styles.buttonCircle} onClick={() => gameContext.showModal(ChessGameModalType.Menu)}><DotsSvg/></div>
    </div>}
      {(isOfferDraw && !myDrawOffer) && <div className={classNames(styles.btnWrapper)}>
        <Button size='play' background='dark500' className={styles.buttonDraw} onClick={() => gameContext.acceptDraw()}>Сдаться</Button>
        <Button type='submit' size='play' background='blueGradient500' className={styles.buttonDraw} onClick={() => gameContext.rejectDraw()}>Играть</Button>
      </div>}
    </div>)
}
