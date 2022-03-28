import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'

import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType,
  ICasinoGameFinishEvent,
  ICasinoGameHiloTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import Deck from './Deck'
import Stat from './Stat'
import styles from './index.module.scss'
interface Props{
  startCard: number
}
export default function Board(props: Props) {
  const {startCard} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameHiloTurn>(null)
  useEffect(() => {

  const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
    setResult(data)
    gameContext.setShowResultModal(true)
  })
  const subscriptionRound = gameContext.turnState$.subscribe((data: ICasinoGameHiloTurn) => {
    setTurn(data)
    switch (data?.type) {
      case CasinoGameRoundTurnType.Continue:
        gameSound.play(GameSound.Guessed)
        break
      case CasinoGameRoundTurnType.Fail:
        gameSound.play(GameSound.Lose)
        break
      case CasinoGameRoundTurnType.Finish:
        gameSound.play(GameSound.Win)
        break
      case CasinoGameRoundTurnType.Lose:
        gameSound.play(GameSound.Lose)
        break
    }
  })
  return () => {
    subscriptionGame.unsubscribe()
    subscriptionRound.unsubscribe()
  }

  }, [])



  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
      <Deck card={turn?.grid[turn?.grid.length - 1] ?? startCard}/>
      <div className={styles.tip}>King is highest · Ace is Lowest</div>
      <Stat multipliers={turn?.multipliers ?? []} grid={turn?.grid ?? [startCard]} history={turn?.history ?? []} isLose={turn?.type === CasinoGameRoundTurnType.Lose}hasResult={!!result}/>
      </div>
    </GamePageBoardLayout>
  )
}


