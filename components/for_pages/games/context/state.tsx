import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Subject} from 'rxjs'
import io from 'socket.io-client'
import {
  CasinoGameErrorCode,
  CasinoGameRoundTurnType,
  ICasinoGame,
  ICasinoGameErrorEvent,
  ICasinoGameFinishEvent,
  ICasinoGameTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import CasinoGameRepository from 'components/for_pages/games/data/reposittories/CasinoGameRepository'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import GameUserRepository from 'components/for_pages/games/data/reposittories/GameUserRepository'
import {runtimeConfig} from 'config/runtimeConfig'
import {ICasinoGameRound} from 'components/for_pages/games/data/interfaces/ICasinoGameRound'
import {IAviatorEvent} from 'data/interfaces/IAviatorEvent'

interface IState {
  auth: boolean
  user: IGameUser
  game?: ICasinoGame | null
  gameState$: Subject<ICasinoGameFinishEvent>
  turnState$: Subject<ICasinoGameTurn>
  historyState$: Subject<ICasinoGameRound>
  aviatorState$: Subject<IAviatorEvent>
  newTurn: (data: any, shouldClear?: boolean) => void
  startGame: (data: ICasinoGameDataDto, shouldClear?: boolean) => void
  finish: () => void
  roundId: number
  setShowResultModal: (show: boolean) => void
  turn: ICasinoGameTurn
  result: ICasinoGameFinishEvent
  gameData: ICasinoGameDataDto
  showResultModal: boolean
  startLoading: boolean
  started: boolean
  turnLoading: boolean
  error?: string
  clear: () => void
  hideError: () => void
}

const gameState$ = new Subject<ICasinoGameFinishEvent>()
const turnState$ = new Subject<ICasinoGameTurn>()
const historyState$ = new Subject<ICasinoGameRound>()
const aviatorState$ = new Subject<IAviatorEvent>()

const defaultValue: IState = {
  auth: false,
  user: null,
  gameState$: gameState$,
  turnState$: turnState$,
  historyState$: historyState$,
  aviatorState$: aviatorState$,
  roundId: null,
  turn: null,
  result: null,
  showResultModal: false,
  startLoading: false,
  turnLoading: false,
  error: null,
  started: false,
  gameData: null,
  setShowResultModal: (show: boolean) => null,
  startGame: (data: ICasinoGameDataDto, shouldClear?: boolean) => null,
  clear: () => null,
  newTurn: (data: any, shouldClear?: boolean) => null,
  finish: () => null,
  hideError: () => null
}

const GameContext = createContext<IState>(defaultValue)

interface Props {
  gameType: CasinoGameType
  children: React.ReactNode
  token: string
}

export function GameWrapper(props: Props) {
  const [socket, setSocket] = useState(null)
  const [roundId, setRoundId] = useState(null)
  const [error, setError] = useState(null)
  const [gameData, setGameData] = useState<ICasinoGameDataDto>(null)
  const [auth, setAuth] = useState<boolean>(!!props.token)
  const [user, setUser] = useState<IGameUser | null>(null)
  const [game, setGame] = useState<ICasinoGame | null>(null)
  const [result, setResult] = useState<ICasinoGameFinishEvent | null>(null)
  const [turn, setTurn] = useState<ICasinoGameTurn | null>(null)
  const [showResultModal, setShowResultModal] = useState<boolean>(false)
  const [startLoading, setStartLoading] = useState<boolean>(false)
  const [started, setStarted] = useState<boolean>(false)
  const [turnLoading, setTurnLoading] = useState<boolean>(false)
  const showResultHideRef = useRef(null)
  useEffect(() => {
    const s = io(runtimeConfig.GAMES_HOST, {
      path: '/api/casino-game-ws',
      reconnectionDelayMax: 10000,
      reconnection: true,
      transports: ['websocket'],
      query: {
        token: props.token,
      },
    })
    setSocket(s)
    return () => {
      if (socket && socket.connected) {
        socket.disconnect()
      }
    }
  }, [])
  useEffect(() => {
    loadGame()
  }, [props.gameType])


  useEffect(() => {
    if (!socket) {
      return
    }
    const onConnect = () => {
      // setSocket(socket)
      socket.emit('game:join', {type: props.gameType})
      socket.emit('game:state', {type: props.gameType})
    }
    const onDisConnect = () => {
      socket.once('reconnect', () => {
        setSocket(socket)
      })
    }
    const onGameFinish = (data: ICasinoGameFinishEvent) => {
      socket.off('game:continue')
      setTimeout( () => setStartLoading(false), 300)
      setTimeout( () => setTurnLoading(false), 300)
      gameState$.next(data)
      setResult(data)
      setStarted(false)
    }
    const onGameTurn = (data: ICasinoGameTurn) => {
      turnState$.next(data)
      setTurn(data)
      setTimeout( () => setTurnLoading(false), 300)
      if([CasinoGameRoundTurnType.Lose, CasinoGameRoundTurnType.Finish].includes(data.type)){
        setStarted(false)
      }
    }
    const onGameError = (data: ICasinoGameErrorEvent) => {
      switch (data.errorCode){
        case CasinoGameErrorCode.Balance:
          setError(data.errorName || 'Balance error')
          setStartLoading(false)
          setTurnLoading(false)
          break

      }
      setTimeout( () => setStartLoading(false), 300)
      setTimeout( () => setTurnLoading(false), 300)
    }
    const onUserBalance = ({balance}) => {
      if(user){
        setUser((user) => ({...(user as IGameUser), balance}))
      }
    }
    const onGameHistory = (data: ICasinoGameRound) => {
      historyState$.next(data)
    }
    const onAviatorEvent = (data: IAviatorEvent) => {
      aviatorState$.next(data)
    }
    socket.on('connect', onConnect)
    socket.on('reconnect', onConnect)
    socket.on('disconnect', onDisConnect)
    socket.on('game:finish', onGameFinish)
    socket.on('game:turn', onGameTurn)
    socket.on('aviator', onAviatorEvent)
    socket.on('game:error', onGameError)
    socket.on('game:history', onGameHistory)
    socket.on('user:balance', onUserBalance)
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onConnect)
      socket.off('disconnect', onDisConnect)
      socket.off('game:finish', onGameFinish)
      socket.off('aviator')
      socket.off('game:round')
      socket.off('game:turn')
    }
  }, [socket])

  const loadGame = async () => {
    const game = await CasinoGameRepository.findByType(props.gameType, props.token)
    setGame(game)
  }
  const clear = async () => {

    setGameData(null)
    gameState$.next(null)
    turnState$.next(null)
    setRoundId(null)
    setResult(null)
    setTurn(null)
    setShowResultModal(false)
    setStartLoading(false)
    setError(null)
    setStarted(false)
  }
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
    game,
    clear,
    roundId,
    setShowResultModal: (value: boolean) => {
      setShowResultModal(value)
      if(showResultHideRef.current ) {
        clearTimeout(showResultHideRef.current)
      }
      if(value){
        showResultHideRef.current = setTimeout(() => {
          setShowResultModal(false)
        }, 2000)
      }else{

      }
    },
    showResultModal,
    turn,
    result,
    startLoading,
    turnLoading,
    error,
    user,
    started,
    gameData,
    startGame: async (data?: ICasinoGameDataDto, shouldClear: boolean = true) => {
      try {
        if(shouldClear) {
          await clear()
        }
        setGameData(data)
        setStarted(true)
        setError(null)
        socket.off('game:round')
        socket.once('game:round', ({id}) => {
          setStartLoading(false)
          setRoundId(id)
        })
        setStartLoading(true)
       const dat =  await CasinoGameRepository.startGame({...data, currency: data.currency || 'btc'})
        setStartLoading(false)

      } catch (e) {
        console.error(e)
        setError(e)
      }
    },
    newTurn: async (data?: any, shouldClear: boolean = false) => {
      try {
        if(shouldClear){
          setTurn(null)
          turnState$.next(null)
        }
        setError(null)
        setTurnLoading(true)
        socket.emit('game:turn', {...data, roundId})

      } catch (e) {
        setError(e)
      }
    },
    finish: async () => {
      socket.emit('game:finish', { roundId})
    },
    hideError: () => {
      setError(null)
    }

  }

  return (
    <GameContext.Provider value={value}>
      {props.children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
