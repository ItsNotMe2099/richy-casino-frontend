import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'
import CreateGameModal from 'components/for_pages/MoneyChess/for_pages/Lobby/CreateGameModal'
import ReactModal from 'react-modal'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'
import OpponentsModal from 'components/for_pages/MoneyChess/for_pages/Lobby/OpponentsModal'
import { RemoveScroll } from 'react-remove-scroll'
interface Props {

}

export default function ChessGameLobbyModalContainer(props: Props) {
  const lobbyContext = useChessGameLobbyContext()
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '20',
    },
    content: {
      width: '42.9rem',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
      overflow: 'hidden',
      background: 'none',
    },
  }
  const handleClose = () => {
    lobbyContext.hideModal
  }
  console.log('lobbyContext.modal', lobbyContext.modal)
  return (
    <RemoveScroll enabled={!!lobbyContext.modal}>
      <div aria-hidden="true">
     <ReactModal style={modalStyles} isOpen={lobbyContext.modal === ChessGameLobbyModalType.createGame} onRequestClose={handleClose}>
       <CreateGameModal/>
     </ReactModal>
     <ReactModal style={modalStyles} isOpen={lobbyContext.modal === ChessGameLobbyModalType.Opponents} onRequestClose={handleClose}>
       <OpponentsModal/>
     </ReactModal>
      </div>
    </RemoveScroll>
  )
}
