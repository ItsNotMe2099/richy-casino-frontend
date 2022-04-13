import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import dynamic from 'next/dynamic'
import { CANVAS_ASPECT_RATIO } from './constants'
import { StateMachineInput } from 'rive-react'
import Plane from './Plane'
import { IPosition, ISize } from 'types/interfaces'
import Game from './Game'

interface Props {}

const CanvasBackground = dynamic(() => import('./CanvasBackground'), { ssr: false })

export default function Board(props: Props) {
  const canvasSize: ISize = {
    width: 800,
    height: 800 / CANVAS_ASPECT_RATIO,
  }
  const gameContext = useGameContext()
  const [position, setPosition] = useState<IPosition>()
  const resultRef = useRef<ICasinoGameFinishEvent>(null)
  const inputPlaneRef = useRef<StateMachineInput>(null)
  const handleProgress = (position: IPosition, progress: number) => {
    setPosition(position)
  }
  const gameRef = useRef(new Game({
    resultRef,
    inputPlaneRef,
    onProgress: handleProgress,
    size: canvasSize,
  }))

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((e) => {
      if (e) {
        resultRef.current = e
        gameRef.current.start()
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <CanvasBackground
          startPosition={gameRef.current.startPosition}
          position={position ?? gameRef.current.position}
          size={canvasSize}
          track={gameRef.current.track}
        />
        <Plane
          progress={gameRef.current.progress}
          position={position ?? gameRef.current.position}
          inputRef={inputPlaneRef}
        />
      </div>
    </GamePageBoardLayout>
  )
}

