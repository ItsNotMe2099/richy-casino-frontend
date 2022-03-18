import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'


interface Props{

}
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

  const handleClick = (key) => {
    console.log(key)
  }

  return (
    <GamePageBoardLayout>
      {result?.data?.number || ''}
    </GamePageBoardLayout>
  )
}


