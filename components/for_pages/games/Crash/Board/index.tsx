import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import { useGameContext } from 'components/for_pages/games/context/state'
import { useEffect, useState } from 'react'
import { ICasinoGameFinishEvent } from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props {}

export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      setResult(data)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        Board
      </div>
    </GamePageBoardLayout>
  )
}

