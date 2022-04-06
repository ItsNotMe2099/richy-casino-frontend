import {createContext, useContext, useEffect, useState} from 'react'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import GameUserRepository from 'components/for_pages/games/data/reposittories/GameUserRepository'
import ReactModal from 'react-modal'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'

interface IState {
  auth: boolean
  user: IGameUser
  modalArguments?: any
  modal: ChessGameLobbyModalType | null
  showModal: (type: ChessGameLobbyModalType, data?: any) => void
  hideModal: () => void
}
const defaultValue: IState = {
  auth: false,
  user: null,
  modalArguments: null,
  modal: null,
  showModal: (type, data) => null,
  hideModal: () => null,
}

const ChessGameLobbyContext = createContext<IState>(defaultValue)

interface Props {
  children?: React.ReactNode
  token: string
}

export function ChessGameLobbyWrapper(props: Props) {
  const [modal, setModal] = useState<ChessGameLobbyModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any | null>(null)

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState<IGameUser | null>(null)

  useEffect(() => {
    if (props.token) {
      setAuth(true)

      updateUserDetails()
    }

  }, [props.token])

  const updateUserDetails = async () => {
    const res = await GameUserRepository.getUser(props.token)

    setUser(res)
  }
  const value: IState = {
    ...defaultValue,
    user,
    modal,
    modalArguments,
    showModal: (type, props: any) => {
      ReactModal.setAppElement('body')
      setModalArguments(props)
      setModal(type)

    },
    hideModal: () => {
      setModal(null)
    },
  }

  return (
    <ChessGameLobbyContext.Provider value={value}>
      {props.children}
    </ChessGameLobbyContext.Provider>
  )
}

export function useChessGameLobbyContext() {
  return useContext(ChessGameLobbyContext)
}
