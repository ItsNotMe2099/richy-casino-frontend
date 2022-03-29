import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'

import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType, ICasinoGameCoinFlipTurn,
  ICasinoGameFinishEvent
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import styles from './index.module.scss'
import Coin from './Coin'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
interface Props{
  userSide: CoinType
}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameCoinFlipTurn>(null)
  const [showCoinLabel, setShowCoinLabel] = useState<boolean>(true)
  useEffect(() => {

  const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
    setResult(data)
    setShowCoinLabel(true)
    gameContext.setShowResultModal(true)
  })
  const subscriptionRound = gameContext.turnState$.subscribe((data: ICasinoGameCoinFlipTurn) => {
    setTurn(data)
    if(data) {
      setTimeout(() => {
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
        setShowCoinLabel(true)
      }, 3000)

    }else{
      setShowCoinLabel(false)
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
      <Coin type={turn?.side ?? props.userSide } hasResult={!!turn} showLabel={showCoinLabel}/>
     </div>
    </GamePageBoardLayout>
  )
}


