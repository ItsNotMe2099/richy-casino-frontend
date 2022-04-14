import styles from 'components/for_pages/MoneyChess/for_pages/Lobby/CreateGameModal/index.module.scss'
import CreateGameForm from 'components/for_pages/MoneyChess/for_pages/Lobby/CreateGameModal/Form'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'

interface Props {

}

export default function CreateGameModal(props: Props) {
  const lobbyContext = useChessGameLobbyContext()

    return (
        <div className={styles.root}>
          <div className={styles.title}>
            Создание игры
          </div>
          <CreateGameForm onRequestClose={lobbyContext.hideModal}/>
        </div>
    )
}
