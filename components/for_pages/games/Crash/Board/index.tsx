import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { CANVAS_ASPECT_RATIO, MAX_TIME } from './constants'
import { StateMachineInput } from 'rive-react'
import Plane from './Plane'
import { ISize } from 'types/interfaces'
import Game, { GameTickData } from './Game'
import FloatResult, { FloatResultStyleType } from 'components/ui/FloatResult'
import { useAppContext } from 'context/state'
import { isMdMax } from 'utils/media'
import {
  AviatorEventType,
  AviatorRoundStatus,
  IAviatorEvent,
  IAviatorRound,
  IBet,
} from 'data/interfaces/IAviatorEvent'
import { useTimer } from 'react-timer-hook'
import { pad } from 'utils/formatter'
import BackgroundImage from './BackgroundImage'
import FinishedPlayers from './FinishedPlayers'

interface Props {}

const startEvent: IAviatorRound = {
  plannedStartAfter: 0,
  status: AviatorRoundStatus.created,
  plannedStartAt: '',
  id: 1,
  startedDuration: 0,
}

const CanvasBackground = dynamic(() => import('./CanvasBackground'), { ssr: false })

export default function Board(props: Props) {
  const appContext = useAppContext()
  const canvasSize: ISize = {
    width: appContext.isMobile ? 330 : isMdMax() ? 600 : 800,
    height: appContext.isMobile ? 400 : 800 / CANVAS_ASPECT_RATIO,
  }
  const isSmallScreen = canvasSize.width < 500
  const [lastFinishedBet, setLastFinishedBet] = useState<IBet>()
  const gameContext = useGameContext()
  const [tickData, setTickData] = useState<GameTickData>(null)
  const [messageType, setMessageType] = useState<FloatResultStyleType>(FloatResultStyleType.idle)
  const inputPlaneRef = useRef<StateMachineInput>(null)
  const [roundStatus, setRoundStatus] = useState<IAviatorRound>(startEvent)
  const roundStatusRef = useRef<IAviatorRound>(null)
  const timer = useTimer({expiryTimestamp: new Date(), autoStart: false})
  const startTimeRef = useRef<Date>(null)
  const gameRef = useRef(new Game({
    startTimeRef,
    roundStatusRef,
    inputPlaneRef,
    isSmallScreen,
    onProgress: (data) => {
      setTickData(data)
    },
    size: canvasSize,
  }))

  useEffect(() => {
    const aviatorSubscription = gameContext.aviatorState$.subscribe(handleServerEvent)
    const gameSubscription = gameContext.gameState$.subscribe((e) => {
      if (e) {
        if (e.win) {
          setMessageType(FloatResultStyleType.success)
        } else {
          setMessageType(FloatResultStyleType.fail)
        }
      }
    })
    return () => {
      aviatorSubscription.unsubscribe()
      gameSubscription.unsubscribe()
    }
  }, [])

  const handleServerEvent = (e: IAviatorEvent) => {
    if (e.round) {
      roundStatusRef.current = e.round
      setRoundStatus(e.round)

      // Timer to start
      if (e.round.status === AviatorRoundStatus.created && e.round.plannedStartAfter > 0) {
        if (!timer.isRunning) {
          timer.restart(new Date(Date.now() + e.round.plannedStartAfter))
        }
      } else {
        if (timer.isRunning) {
          timer.pause()
        }
      }
    }

    if (e.type === AviatorEventType.planned) {
      gameRef.current.clear()
      setMessageType(FloatResultStyleType.idle)
      setTickData(null)
    }

    if (e.type === AviatorEventType.started) {
      startTimeRef.current = new Date()
      gameRef.current.start()
    }

    if (e.type === AviatorEventType.finished) {
      startTimeRef.current = null
      gameRef.current.stop()
    }

    if (e.type === AviatorEventType.betFinished && e.bet) {
      setLastFinishedBet(e.bet)
    }
  }

  const factor = roundStatus.status === AviatorRoundStatus.finished ? roundStatus.multiplier : tickData?.factor ?? 0

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <BackgroundImage factor={factor} size={canvasSize} />
        <FinishedPlayers
          bet={lastFinishedBet}
          size={canvasSize}
          time={gameRef.current.time}
        />
        <CanvasBackground
          size={canvasSize}
          track={gameRef.current.track}
          factor={factor}
          time={tickData?.time ?? 0}
        />
        <Plane
          position={tickData?.currentPosition || gameRef.current.currentPosition}
          progress={gameRef.current.time > MAX_TIME ? 1 : gameRef.current.time / MAX_TIME}
          inputRef={inputPlaneRef}
          isSmallScreen={isSmallScreen}
        />
        <div className={styles.messageLayer}>
          {tickData && (
            <FloatResult styleType={messageType}>
              {`${Math.round(factor * 100) / 100}x`}
            </FloatResult>
          )}
          {roundStatus.status === AviatorRoundStatus.created && timer.isRunning && (
            <FloatResult styleType={FloatResultStyleType.idle}>
              <div className={styles.startMessage}>
                <div className={styles.startMessageTitle}>
                  Старт через
                </div>
                <div>
                  {pad('00', timer.minutes)}:{pad('00', timer.seconds)}
                </div>
              </div>
            </FloatResult>
          )}
        </div>
      </div>
    </GamePageBoardLayout>
  )
}

