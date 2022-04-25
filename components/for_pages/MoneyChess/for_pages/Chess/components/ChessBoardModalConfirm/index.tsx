import styles from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalConfirm/index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ReactElement} from 'react'
import {ChessGameConfirmModalArguments} from 'components/for_pages/MoneyChess/types/types'
import {useAppContext} from 'context/state'
import ChessBoardModalLayout from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalLayout'
import Button from 'components/ui/Button'

interface Props {
  open?: boolean
  children?: ReactElement
}
export default function ChessBoardModalConfirm(props: Props) {
  const appContext = useAppContext()
  const gameContext = useChessGameContext()
  const args = gameContext.modalArguments as ChessGameConfirmModalArguments
  const handleClose = () => {
    return args?.onCancel ? args.onCancel() : gameContext.hideModal()
  }
  return (
    <ChessBoardModalLayout open={props.open} fade onClose={handleClose} fixed={appContext.isMobile}>
      <div className={styles.root}>
        <div className={styles.title}>{args?.title}</div>

        <div className={styles.btnWrapper}>
          <Button type='button' size='play'  className={styles.button} background='pink' onClick={args?.onConfirm}>Выйти из игры</Button>
          <Button type='button' size='play'  className={styles.button} background='blueGradient500' onClick={handleClose}>Назад</Button>

        </div>
      </div>
    </ChessBoardModalLayout>

  )
}
