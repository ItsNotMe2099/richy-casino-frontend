import {createContext, useContext, useEffect, useState} from 'react'
import {Subject} from 'rxjs'
import io from 'socket.io-client'
import {
  ICasinoGame,
  ICasinoGameFinishEvent,
  ICasinoGameTurnEvent
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import CasinoGameRepository from 'components/for_pages/games/data/reposittories/CasinoGameRepository'
import {CasinoGameType} from 'components/for_pages/games/data/enums'

interface IState {
  game?: ICasinoGame | null
  gameState$: Subject<ICasinoGameFinishEvent>
  turnState$: Subject<ICasinoGameTurnEvent>
  startGame: (data: any) => void
  clear: () => void
}

const gameState$ = new Subject<ICasinoGameFinishEvent>()
const turnState$ = new Subject<ICasinoGameTurnEvent>()

const defaultValue: IState = {
  gameState$: gameState$,
  turnState$: turnState$,
  startGame: (data: any) => null,
  clear: () => null,
}

const GameContext = createContext<IState>(defaultValue)

interface Props {
  gameType: CasinoGameType
  children: React.ReactNode
  token: string
}

export function GameWrapper(props: Props) {
  const [socket, setSocket] = useState(null)
  const [startError, setStartError] = useState(null)
  const [game, setGame] = useState<ICasinoGame | null>(null)
  useEffect(() => {
    console.log('InitSocket')
    const s = io('http://localhost:3000', {
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
      console.log('[unmounted]')
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
      console.log('onConnect11', socket)
      // setSocket(socket)

    }
    const onDisConnect = () => {
      console.log('[received] disconnect')

      socket.once('reconnect', () => {
        console.log('[reconnected]')
        setSocket(socket)
      })
    }
    const onGameFinish = (data: ICasinoGameFinishEvent) => {
      console.log('OnGameFinish', data)
      gameState$.next(data)
    }
    socket.on('connect', onConnect)
    socket.on('reconnect', onConnect)
    socket.on('disconnect', onDisConnect)
    socket.on('game:finish', onGameFinish)
    return () => {
      socket.off('connect', onConnect)
      socket.off('reconnect', onConnect)
      socket.off('disconnect', onDisConnect)
      socket.on('game:finish', onGameFinish)
    }
  }, [socket])

  const loadGame = async () => {
    const game = await CasinoGameRepository.findByType(props.gameType, props.token)
    setGame(game)
  }
  const clear = async () => {
    gameState$.next(null)
  }
  console.log('game', game)
  const value: IState = {
    ...defaultValue,
    game,
    clear,
    startGame: async (data?: ICasinoGameDataDto) => {
      try {
        await clear()
        socket.emit('game:start', data)
      } catch (e) {
        setStartError(e)
      }
    },

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
