import styles from './index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ReactElement} from 'react'
import Button from 'components/ui/Button'
import {ChessGameBoardStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {useAppContext} from 'context/state'
import ChessBoardModalLayout from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalLayout'
import {ChessGameModalType} from 'components/for_pages/MoneyChess/types/enums'
import {ChessGameConfirmModalArguments, ChessGameErrorModalArguments} from 'components/for_pages/MoneyChess/types/types'

interface Props {
  open?: boolean
  children?: ReactElement
}
export default function ChessBoardModalActions(props: Props) {
  const appContext = useAppContext()
  const gameContext = useChessGameContext()
  const isInProgress =  gameContext.game.currentBoard.status === ChessGameBoardStatus.InProgress

  const handleDraw = async () => {

    try{
   await gameContext.askDraw()
     }catch (e) {
      gameContext.showModal(ChessGameModalType.Error, {error: e} as ChessGameErrorModalArguments)
    }

  }

  const handleCancel = async () => {
    gameContext.showModal(ChessGameModalType.Confirm, {
      title: 'Вы уверены что хотите\n выйти из игры?',
      onConfirm: () => {
        gameContext.exit()
        gameContext.hideModal()
      },
      onCancel: () => {
        gameContext.showModal(ChessGameModalType.Menu)
      }
    } as ChessGameConfirmModalArguments)
  }
  return (
    <ChessBoardModalLayout fade open={props.open} onClose={() => gameContext.hideModal()} fixed={appContext.isMobile}>
    <div className={styles.root}>
      <Button type='button' size='play'  className={styles.button} background='pink' onClick={handleCancel}>Выйти из игры</Button>
      {isInProgress && <Button type='button' size='play'  className={styles.button} background='dark500' onClick={handleDraw}>Ничья</Button>}
      <Button type='button' size='play'  className={styles.button} background='blueGradient500' onClick={() => gameContext.hideModal()}>Назад</Button>

    </div>
    </ChessBoardModalLayout>
  )
}
