import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import dynamic from 'next/dynamic'
import { CANVAS_ASPECT_RATIO } from 'components/for_pages/games/Crash/Board/constants'
import { StateMachineInput } from 'rive-react'
import Plane from './Plane'

interface Props {}

const CanvasBackground = dynamic(() => import('./CanvasBackground'), { ssr: false })

export default function Board(props: Props) {
  const canvasWidth = 800
  const canvasHeight = canvasWidth / CANVAS_ASPECT_RATIO
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const stateMachineInputRef = useRef<StateMachineInput>(null)

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      stateMachineInputRef.current.fire()
      if (data && stateMachineInputRef.current) {
        setResult(data)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <CanvasBackground width={canvasWidth} height={canvasHeight} />
        <Plane inputRef={stateMachineInputRef} className={styles.plane} />
      </div>
    </GamePageBoardLayout>
  )
}

