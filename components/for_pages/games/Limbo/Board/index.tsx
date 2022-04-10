import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import RiveStateMachine from 'components/ui/RiveStateMachine'

interface Props{}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const inputRocketRef = useRef<StateMachineInput>(null)
  const inputPlanetsRef = useRef<StateMachineInput>(null)

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      if (data && inputRocketRef.current) {
        setResult(data)
        inputRocketRef.current.fire()
        inputPlanetsRef.current.fire()
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <RiveStateMachine
          src="/animations/limbo/planets.riv"
          inputRef={inputPlanetsRef}
          className={styles.planets}
        />
        <RiveStateMachine
          src="/animations/limbo/rocket.riv"
          inputRef={inputRocketRef}
          className={styles.rocket}
        />
      </div>
    </GamePageBoardLayout>
  )
}


