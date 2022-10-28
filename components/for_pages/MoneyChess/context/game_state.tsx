import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import GameUserRepository from 'components/for_pages/games/data/reposittories/GameUserRepository'
import ReactModal from 'react-modal'
import {ChessGameModalType} from 'components/for_pages/MoneyChess/types/enums'
import io from 'socket.io-client'
import {runtimeConfig} from 'config/runtimeConfig'
import {Subject} from 'rxjs'
import {IChessGameAction} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameAction'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {IChessGameBoardPlayer} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoardPlayer'
import {
  ChessGameSide,
  ChessGameSquare,
  ChessGameTableActionType,
  GameActionType
} from 'components/for_pages/MoneyChess/data/enums'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import { IChessTableActionEvent} from 'components/for_pages/MoneyChess/data/types'
import {ChessGameBoardStatus} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameBoard'
import {ChessGameErrorModalArguments} from 'components/for_pages/MoneyChess/types/types'

interface IState {
  auth: boolean
  user: IGameUser
  modalArguments?: any
  modal: ChessGameModalType | null
  showModal: (type: ChessGameModalType, data?: any) => void
  hideModal: () => void
  actionState$: Subject<IChessGameAction>
  gameState$: Subject<IChessGame>
  game: IChessGame,
  isMyTurn: boolean,
  actionError: any
  selectedSquare: ChessGameSquare,
  setSelectedSquare: (square: ChessGameSquare) => void
  move: (squareTo: ChessGameSquare) => void
  possibleMoves: ChessGameSquare[],
  actionLoading: boolean
  askDraw: () => void,
  acceptDraw: () => void,
  rejectDraw: () => void,
  askReplay: () => void,
  acceptReplay: () => void,
  rejectReplay: () => void,
  exit: () => void
}

const actionState$ = new Subject<IChessGameAction>()
const gameState$ = new Subject<IChessGame>()
const defaultValue: IState = {
  auth: false,
  user: null,
  modalArguments: null,
  modal: null,
  showModal: (type, data) => null,
  hideModal: () => null,
  actionState$: actionState$,
  gameState$: gameState$,
  game: null,
  isMyTurn: false,
  selectedSquare: null,
  possibleMoves: [],
  actionLoading: false,
  actionError: null,
  setSelectedSquare: (square) => null,
  move: (squareTo) => null,
  askDraw: () => null,
  acceptDraw: () => null,
  rejectDraw: () => null,
  askReplay: () => null,
  acceptReplay: () => null,
  rejectReplay: () => null,
  exit: () => null,
}

const ChessGameContext = createContext<IState>(defaultValue)

interface Props {
  children?: React.ReactNode
  token: string
  gameId: number
  initialGame: IChessGame
  initialUser: IGameUser

}

const getIsMyTurn = (currentTurn: number, currentPlayer: IChessGameBoardPlayer): boolean => {
  const sides = [ChessGameSide.WHITE, ChessGameSide.BLACK]
  const currentSide = sides[currentTurn % 2]
  return currentSide === currentPlayer.side
}

export function ChessGameWrapper(props: Props) {
  const [modal, setModal] = useState<ChessGameModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any | null>(null)
  const [socket, setSocket] = useState(null)
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState<IGameUser | null>(props.initialUser)
  const [game, setGame] = useState<IChessGame | null>(props.initialGame)
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [selectedSquare, setSelectedSquare] = useState<ChessGameSquare | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<ChessGameSquare[]>([])
  const [actionError, setActionError] = useState(null)
  const gameRef = useRef<IChessGame>(props.initialGame)
  const connectedRef = useRef<boolean>(false)
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
    const onConnect = async () => {
      if(connectedRef.current){
       const game = await ChessGameRepository.findById(props.gameId, props.token)
        setGame(game)
        gameRef.current = game
      }
      socket.emit('game:table:join', {tableId: props.gameId})
      connectedRef.current = true
    }
    const onDisConnect = () => {
      socket.once('reconnect', () => {
        setSocket(socket)
      })
    }
    const onGameAction = (data: IChessGameAction) => {
      actionState$.next(data)
      const board = gameRef.current.currentBoard
      if(board.id !== data.boardId){
        return
      }
      if (typeof data.setPieceCapture !== 'undefined') {
        const square = data.setPieceCapture.square
        const side = data.setPieceCapture.side
        const index = board.pieces.findIndex(i => i.square.row === square.row && i.square.column === square.column && i.side === side)

        if (index > -1) {
          board.pieces.splice(index, 1)
        }
      }
      if (typeof data.setPieceSquare !== 'undefined') {
        const squareFrom = data.setPieceSquare.squareFrom
        board.pieces = board.pieces.map(i => {
          return (i.square.row === squareFrom.row && i.square.column === squareFrom.column ? {
            ...i,
            square: data.setPieceSquare.squareTo
          } : i)

        })
      }
      if (typeof data.setBoardStatus !== 'undefined') {
        board.status = data.setBoardStatus
      }
      if (typeof data.setBoardTurn !== 'undefined') {
        board.currentTurn = data.setBoardTurn
        //  board.dices = []
        //  board.currentDices = []
      }

      if (typeof data.setDices !== 'undefined') {
        board.dices = data.setDices
      }
      if (typeof data.setCurrentDices !== 'undefined') {
        board.currentDices = data.setCurrentDices
      }
      if (typeof data.setWinAmount !== 'undefined') {
        board.winAmount = data.setWinAmount
      }
      if (typeof data.setLoseAmount !== 'undefined') {
        board.loseAmount = data.setLoseAmount
      }
      if (typeof data.setWinnerUserId !== 'undefined') {
        board.winnerUserId = data.setWinnerUserId
      }
      if (typeof data.setOfferDrawUserId !== 'undefined') {
        board.offerDrawUserId = data.setOfferDrawUserId
        board.countDrawOffers += 1
      }
      if (typeof data.setActionWaitExpiredAt !== 'undefined') {
        board.actionWaitExpiredAt = data.setActionWaitExpiredAt
        board.actionWaitStartedAt = (new Date()).toISOString()
      }
      if (typeof data.setActionDrawExpiredAt !== 'undefined') {
        board.actionDrawExpiredAt = data.setActionDrawExpiredAt
      }
      if(data.type === GameActionType.AcceptDraw){
        board.actionDrawExpiredAt = null
        board.offerDrawUserId = null
      }
      setGame((game) => ({...game, currentBoard: board}))
      gameRef.current = {...gameRef.current, currentBoard: board}
      setIsMyTurn(getIsMyTurn(board.currentTurn, board.players.find(i => i.userId === user.id)))
    }
    const onGameTableAction = (data: IChessTableActionEvent) => {
      const table = gameRef.current

      if (!table || table.id !== data.tableId) {
        return
      }

      if(data.type === ChessGameTableActionType.NewBoard){

        setGame((game) => ({...game,
          status: data.table.status,
          currentBoard: {...game.currentBoard,
            status: ChessGameBoardStatus.WaitingAccept,
            actionWaitExpiredAt: data.board.actionWaitExpiredAt,
            actionWaitStartedAt: data.board.actionWaitStartedAt,
            ownerUserId: data.board.ownerUserId}}))
      }else {
        setGame((game) => ({ ...data.table, currentBoard: data.board}))
        gameRef.current = {...data.table, currentBoard: data.board}
        setIsMyTurn(getIsMyTurn(data.board.currentTurn, data.board.players.find(i => i.userId === user.id)))
      }
    }
    socket.on('connect', onConnect)
    socket.on('reconnect', onConnect)
    socket.on('disconnect', onDisConnect)

    socket.on('game:action', onGameAction)
    socket.on('table:action', onGameTableAction)
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onConnect)
      socket.off('disconnect', onDisConnect)
      socket.off('game:action', onGameAction)
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
    setIsMyTurn(getIsMyTurn(game.currentBoard.currentTurn, game.currentBoard.players.find(i => i.userId === res.id)))
  }
  const showModal =  (type, props: any) => {
      ReactModal.setAppElement('body')
      setModalArguments(props)
      setModal(type)

    }
  const showModalError = (error) => {
    showModal(ChessGameModalType.Error, {error} as ChessGameErrorModalArguments)
  }
  const value: IState = {
    ...defaultValue,
    user,
    modal,
    modalArguments,
    game,
    isMyTurn,
    selectedSquare,
    possibleMoves,
    actionLoading,
    actionError,
    showModal,
    hideModal: () => {
      setModal(null)
    },
    setSelectedSquare: async (square) => {

      setSelectedSquare(square)
      const action = await ChessGameRepository.selectPiece(game.id, square)
      setPossibleMoves(action?.setPossibleMoves ?? [])
    },
    move: async (squareTo) => {

      try {
        const action = await ChessGameRepository.move(game.id, selectedSquare, squareTo)
      } catch (e) {
       showModalError(e)
      }
      setPossibleMoves([])
      setSelectedSquare(null)
    },
    askDraw: async () => {

      try {
        const action = await ChessGameRepository.askDraw(game.id)
      } catch (e) {
      }
      setPossibleMoves([])
      setSelectedSquare(null)
    },
    acceptDraw: async () => {

      try {
        const action = await ChessGameRepository.acceptDraw(game.id)
      } catch (e) {
       showModalError(e)
      }
      setPossibleMoves([])
      setSelectedSquare(null)
    },
    rejectDraw: async () => {

      try {
        const action = await ChessGameRepository.rejectDraw(game.id)
      } catch (e) {
       showModalError(e)
      }
      setPossibleMoves([])
      setSelectedSquare(null)
    },
    askReplay: async () => {

      setActionLoading(true)
      try {
        const gameTable = await ChessGameRepository.resetGame(game.id)
      } catch (e) {
        setActionLoading(false)
        throw e
      }
      setActionLoading(false)
    },
    exit: async () => {

      setActionLoading(true)
      try {
        const gameTable = await ChessGameRepository.exit(game.id)
      } catch (e) {
       showModalError(e)
      }
      setActionLoading(false)
    },
    acceptReplay: async () => {

      setActionLoading(true)
      try {
        const gameTable = await ChessGameRepository.acceptReset(game.id)
      } catch (e) {
       showModalError(e)
      }
      setActionLoading(false)
    }
  }

  return (
    <ChessGameContext.Provider value={value}>
      {props.children}
    </ChessGameContext.Provider>
  )
}

export function useChessGameContext() {
  return useContext(ChessGameContext)
}
