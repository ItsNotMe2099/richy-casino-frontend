import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import dynamic from 'next/dynamic'
import { CANVAS_ASPECT_RATIO } from './constants'
import { StateMachineInput } from 'rive-react'
import Plane from './Plane'
import { ISize } from 'types/interfaces'
import Game, { GameTickData } from './Game'
import FloatResult, { FloatResultStyleType } from 'components/ui/FloatResult'
import { useAppContext } from 'context/state'

interface Props {}

const CanvasBackground = dynamic(() => import('./CanvasBackground'), { ssr: false })

export default function Board(props: Props) {
  const appContext = useAppContext()
  const canvasSize: ISize = {
    width: appContext.isMobile ? 320 : 800,
    height: appContext.isMobile ? 320 * CANVAS_ASPECT_RATIO : 800 / CANVAS_ASPECT_RATIO,
  }
  const gameContext = useGameContext()
  const [tickData, setTickData] = useState<GameTickData>()
  const resultRef = useRef<ICasinoGameFinishEvent>(null)
  const inputPlaneRef = useRef<StateMachineInput>(null)
  const handleProgress = (data) => {
    setTickData(data)
  }
  const gameRef = useRef(new Game({
    resultRef,
    inputPlaneRef,
    onProgress: handleProgress,
    size: canvasSize,
  }))

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((e) => {
      gameRef.current.start()
      // if (e) {
      //   resultRef.current = e
      //   gameRef.current.start()
      // }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const progress = tickData?.progress ?? gameRef.current.progress

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <CanvasBackground
          startPosition={gameRef.current.startPosition}
          progress={progress}
          planePosition={tickData?.planePosition ?? gameRef.current.planePosition}
          size={canvasSize}
          track={gameRef.current.track}
          factor={tickData?.factor}
        />
        <Plane
          progress={progress > 1 ? 1 : progress}
          planePosition={tickData?.planePosition ?? gameRef.current.planePosition}
          inputRef={inputPlaneRef}
        />
        {tickData && (
          <div className={styles.messageLayer}>
            <FloatResult className={styles.message} styleType={FloatResultStyleType.idle}>
              {`${tickData.factor}x`}
            </FloatResult>
          </div>
        )}
      </div>
    </GamePageBoardLayout>
  )
}

