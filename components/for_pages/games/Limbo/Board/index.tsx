import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import RiveStateMachine from 'components/ui/RiveStateMachine'
import { GameStage } from './constants'

interface Props{}

interface EventData {
  target: number
  number: number
}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const inputRocketRef = useRef<StateMachineInput>(null)
  const inputPlanetsRef = useRef<StateMachineInput>(null)
  const [gameStage, setGameStage] = useState(GameStage.idle)
  const gameStageRef = useRef<GameStage>(gameStage)

  useEffect(() => {
    gameStageRef.current = gameStage
  }, [gameStage])

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((e) => {
      if (e && inputRocketRef.current && gameStageRef.current === GameStage.idle) {
        const data = e.data as EventData
        console.log('log: ', data)
        setResult(e)
        setGameStage(GameStage.inProgress)
        inputPlanetsRef.current.fire()
        setTimeout(() => {
          inputRocketRef.current.fire()
          setTimeout(() => {
            setGameStage(GameStage.idle)
            inputPlanetsRef.current.fire()
            inputRocketRef.current.fire()
          }, 2000)
        }, 1000)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <div className={styles.planetsLayer}>
          <RiveStateMachine
            src="/animations/limbo/planets.riv"
            inputRef={inputPlanetsRef}
            className={styles.planets}
          />
        </div>
        <div className={styles.rocketLayer}>
          <RiveStateMachine
            src="/animations/limbo/rocket.riv"
            inputRef={inputRocketRef}
            className={styles.rocket}
          />
        </div>
      </div>
    </GamePageBoardLayout>
  )
}


