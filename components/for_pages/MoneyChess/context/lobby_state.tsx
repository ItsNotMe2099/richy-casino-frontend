import {createContext, useContext, useEffect, useState} from 'react'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import GameUserRepository from 'components/for_pages/games/data/reposittories/GameUserRepository'
import ReactModal from 'react-modal'
import {ChessGameLobbyModalType} from 'components/for_pages/MoneyChess/types/enums'
import io from 'socket.io-client'
import {runtimeConfig} from 'config/runtimeConfig'
import {Subject} from 'rxjs'
import {IChessTableActionEvent} from 'components/for_pages/MoneyChess/data/types'

interface IState {
  auth: boolean
  user: IGameUser
  modalArguments?: any
  modal: ChessGameLobbyModalType | null
  showModal: (type: ChessGameLobbyModalType, data?: any) => void
  hideModal: () => void
  tableState$: Subject<IChessTableActionEvent>
}
const tableState$ = new Subject<IChessTableActionEvent>()
const defaultValue: IState = {
  auth: false,
  user: null,
  modalArguments: null,
  modal: null,
  showModal: (type, data) => null,
  hideModal: () => null,
  tableState$: tableState$,
}

const ChessGameLobbyContext = createContext<IState>(defaultValue)

interface Props {
  children?: React.ReactNode
  token: string
}

export function ChessGameLobbyWrapper(props: Props) {
  const [modal, setModal] = useState<ChessGameLobbyModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any | null>(null)
  const [socket, setSocket] = useState(null)
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState<IGameUser | null>(null)

  useEffect(() => {
    const s = io(runtimeConfig.GAMES_HOST, {
      path: '/api/chess-game-ws',
      reconnectionDelayMax: 10000,
      reconnection: true,
      transports: ['websocket'],
      query: {
        token: props.token,
      },
    })
    setSocket(s)
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])


  useEffect(() => {
    if (!socket) {
      return
    }
    const onConnect = () => {
      // setSocket(socket)
    socket.emit('lobby:join')
    }
    const onDisConnect = () => {
      socket.once('reconnect', () => {
        setSocket(socket)
      })
    }
    const onGameTableAction = (data: IChessTableActionEvent) => {
      tableState$.next(data)
    }

    socket.on('connect', onConnect)
    socket.on('reconnect', onConnect)
    socket.on('disconnect', onDisConnect)

    socket.on('table:action', onGameTableAction)
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onConnect)
      socket.off('disconnect', onDisConnect)
      socket.off('table:action', onGameTableAction)
    }
  }, [socket])

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
