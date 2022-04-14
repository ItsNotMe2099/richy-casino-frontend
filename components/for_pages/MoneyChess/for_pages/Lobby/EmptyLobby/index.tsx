import Button from 'components/ui/Button'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/EmptyLobby/index.module.scss'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'

interface Props {
  onClick?: () => void
}

export default function EmptyLobby(props: Props) {
  const lobbyContext = useChessGameLobbyContext()
  const context = useAppContext()

  return (
      <div className={styles.root}>
        <HiddenXs>
          <div className={styles.statistics}>
            <Button background='dark500' onClick={props.onClick}>Статистика</Button>
          </div>
        </HiddenXs>
        <div className={styles.own}>
          <div className={styles.opponents}>
            There are no opponets now.
          </div>
          <div className={styles.game}>
            Create your own game!
          </div>
          <HiddenXs>
            <Button className={styles.create} background='blueGradient500' onClick={() => lobbyContext.showModal(ChessGameLobbyModalType.createGame)}>Создать игру</Button>
          </HiddenXs>
        </div>
        <div className={styles.money}>
          <img src='/img/Chess/money-chess.svg' alt=''/>
        </div>
        <VisibleXs>
          <div className={styles.btns}>
          <div className={styles.statistics}>
            <Button background='dark500' onClick={props.onClick}>Статистика</Button>
          </div>
          <Button className={styles.create} background='blueGradient500' onClick={() => context.showModal(ModalType.createGame)}>Создать игру</Button>
          </div>
        </VisibleXs>
      </div>
  )
}
