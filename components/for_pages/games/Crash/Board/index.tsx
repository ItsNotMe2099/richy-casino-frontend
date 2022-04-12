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

interface Props {}

const CanvasBackground = dynamic(() => import('./CanvasBackground'), { ssr: false })

export default function Board(props: Props) {
  const canvasSize: ISize = {
    width: 800,
    height: 800 / CANVAS_ASPECT_RATIO,
  }
  const startPosition: IPosition = {
    x: canvasSize.width / 10,
    y: canvasSize.height - canvasSize.height / 10,
  }
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const stateMachineInputRef = useRef<StateMachineInput>(null)
  const progressRef = useRef(0) // from 0 to 1
  const positionRef = useRef<IPosition>(startPosition)
  const animationId = useRef<number>()
  const dotsRef = useRef<IPosition[]>([])
  const [position, setPosition] = useState<IPosition>(positionRef.current)

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      start()
      if (data && stateMachineInputRef.current) {
        setResult(data)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const animate = () => {
    progressRef.current = progressRef.current + 0.002
    positionRef.current = progressToPosition(progressRef.current)
    if (progressRef.current < 1) {
      dotsRef.current.push(positionRef.current)
      setPosition(positionRef.current)
      requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animationId.current)
      stateMachineInputRef.current.fire()
    }
  }

  const start = () => {
    dotsRef.current = []
    animationId.current = requestAnimationFrame(animate)
  }

  const progressToPosition = (progress: number): IPosition => {
    const x = startPosition.x + (canvasSize.width - startPosition.x) * progress
    const max = Math.log(startPosition.y - startPosition.y / 10)
    const y = startPosition.y - Math.exp(max * progress)
    return {x, y}
  }

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <CanvasBackground
          startPosition={startPosition}
          position={positionRef.current}
          size={canvasSize}
          dots={dotsRef.current}
        />
        <Plane
          progress={progressRef.current}
          position={positionRef.current}
          inputRef={stateMachineInputRef}
        />
      </div>
    </GamePageBoardLayout>
  )
}

