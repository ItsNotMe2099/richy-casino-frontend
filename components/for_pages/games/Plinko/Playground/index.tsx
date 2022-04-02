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
  const createGame = () => {
    gameRef.current?.clear()
    gameRef.current = new Game({
      element: rootRef.current,
      size: { width: 800, height: 600 },
      backgroundColor: 'rgb(39, 45, 57)',
      pegsRows: pegsRowsRef.current,
    })
    gameRef.current.start()
  }

  useEffect(() => {
    if ((rootRef.current && !gameRef.current) || (pegsRowsRef.current != props.pegsRows)) {
      pegsRowsRef.current = props.pegsRows
      createGame()
    }
  }, [rootRef.current, props.pegsRows])

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

