import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useRef } from 'react'
import Game from './Game'

interface Props {
  pegsRows: number
  difficulty: string
}

export default function Playground(props: Props) {
  const gameContext = useGameContext()
  const rootRef = useRef<HTMLDivElement>()
  const gameRef = useRef<Game>()
  const pegsRowsRef = useRef<number>(props.pegsRows)
  const difficultyRef = useRef<string>(props.difficulty)
  const createGame = () => {
    const multiplier = gameContext.game.multipliers[difficultyRef.current][pegsRowsRef.current] as number[]
    gameRef.current?.clear()
    gameRef.current = new Game({
      element: rootRef.current,
      width: 800,
      pegsRows: pegsRowsRef.current,
      multiplier: multiplier
    })
    gameRef.current.start()
  }

  useEffect(() => {
    if (
      (rootRef.current && !gameRef.current)
      || (pegsRowsRef.current != props.pegsRows)
      || (difficultyRef.current != props.difficulty)
    ) {
      pegsRowsRef.current = props.pegsRows
      difficultyRef.current = props.difficulty
      createGame()
    }
  }, [rootRef.current, props.pegsRows, props.difficulty])

  useEffect(() => {
    createGame()
    const subscriptionGame = gameContext.gameState$.subscribe((e) => {
      if(!e){
        return null
      }
      createGame()
      gameRef.current.dropPlinkoByEvent(e)
    })

    return () => {
      subscriptionGame.unsubscribe()
      gameRef.current?.clear()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div ref={rootRef} className={styles.root} />
    </GamePageBoardLayout>
  )
}

