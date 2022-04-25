import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import RiveStateMachine from 'components/ui/RiveStateMachine'
import Game, { EventData, GameStage } from './Game'
import FloatResult, { FloatResultStyleType } from 'components/ui/FloatResult'

interface Props{}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const resultRef = useRef<ICasinoGameFinishEvent<EventData>>(null)
  const inputRocketRef = useRef<StateMachineInput>(null)
  const inputPlanetsRef = useRef<StateMachineInput>(null)
  const [resultCounter, setResultCounter] = useState(0)
  const [messageStyleType, setMessageStyleType] = useState(FloatResultStyleType.progress)
  const gameRef = useRef(new Game({
    resultRef,
    inputRocketRef,
    inputPlanetsRef,
    onStageChanged(stage) {
      if (stage === GameStage.idle) {
        setResultCounter(0)
        setMessageStyleType(FloatResultStyleType.progress)
      }
      if (stage === GameStage.finish) {
        if (resultRef.current.win) {
          setMessageStyleType(FloatResultStyleType.success)
        } else {
          setMessageStyleType(FloatResultStyleType.fail)
        }
      }
    },
    onTick(stage, progress) {
      if (stage === GameStage.inProgress) {
        setResultCounter(Math.round(resultRef.current.data.number * progress * 100) / 100)
      }
    }
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
        {resultCounter > 0 && (
          <div className={styles.messageLayer}>
            <FloatResult styleType={messageStyleType}>
              {`${resultCounter}x`}
            </FloatResult>
          </div>
        )}
      </div>
    </GamePageBoardLayout>
  )
}


