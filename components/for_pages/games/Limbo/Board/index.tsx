import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput, useRive, useStateMachineInput } from 'rive-react'
import { STATE_MACHINE_NAME, INPUT_NAME } from './constants'

interface Props{}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const stateMachineInputRef = useRef<StateMachineInput>(null)

  const { RiveComponent, rive } = useRive({
    src: '/animations/limbo/rocket.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    onLoad: () => {
      setAnimationLoaded(true)
    }
  })

  const stateMachineInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  )

  useEffect(() => {
    if (!stateMachineInputRef.current && stateMachineInput) {
      stateMachineInputRef.current = stateMachineInput
    }
  }, [stateMachineInput])

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      if (data) {
        setResult(data)
        stateMachineInputRef.current.fire()
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <RiveComponent />
      </div>
    </GamePageBoardLayout>
  )
}


