import styles from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModals/index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ReactElement} from 'react'
import ChessBoardModalActions from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalActions'
import {ChessGameModalType} from 'components/for_pages/MoneyChess/types/enums'
import ChessBoardModalConfirm from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalConfirm'
import ChessBoardModalError from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalError'

interface Props {
  isOpen?: boolean
  children?: ReactElement
}
export default function ChessBoardModals(props: Props) {
  const gameContext = useChessGameContext()

  return (
    <div className={styles.root}>
        <ChessBoardModalActions open={gameContext.modal === ChessGameModalType.Menu}/>
      <ChessBoardModalConfirm open={gameContext.modal === ChessGameModalType.Confirm}/>
      <ChessBoardModalError open={gameContext.modal === ChessGameModalType.Error}/>
    </div>
  )
}
