import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import { useEffect, useRef, useState } from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import { StateMachineInput } from 'rive-react'
import Rocket from './Rocket'

interface Props{}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const stateMachineInputRef = useRef<StateMachineInput>(null)

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      if (data && stateMachineInputRef.current) {
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
        <Rocket inputRef={stateMachineInputRef} className={styles.rocket} />
      </div>
    </GamePageBoardLayout>
  )
}


