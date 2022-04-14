import styles from './index.module.scss'
import {useChessGameContext} from 'components/for_pages/MoneyChess/context/game_state'
import {ReactElement} from 'react'
import { ChessGameErrorModalArguments} from 'components/for_pages/MoneyChess/types/types'
import {useAppContext} from 'context/state'
import ChessBoardModalLayout from 'components/for_pages/MoneyChess/for_pages/Chess/components/ChessBoardModalLayout'

interface Props {
  open?: boolean
  children?: ReactElement
}
export default function ChessBoardModalError(props: Props) {
  const appContext = useAppContext()
  const gameContext = useChessGameContext()
  const args = gameContext.modalArguments as ChessGameErrorModalArguments
  const handleClose = () => {
    return args?.onCancel ? args.onCancel() : gameContext.hideModal()
  }
  return (
    <ChessBoardModalLayout open={props.open} fade onClose={handleClose} fixed={appContext.isMobile}>
      {(!!args?.error && props.open) && <div className={styles.root} onClick={handleClose}>
        <img src='/img/icons/error.svg' alt=''/>
        <div className={styles.list}>
          {Array.isArray(args.error)
            ? args.error.map((error, index) => <div className={styles.errorListItem} key={index}>{error}</div>)
            : args.error}
        </div>
      </div>}
    </ChessBoardModalLayout>

  )
}
