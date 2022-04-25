import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'

import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType,
  ICasinoGameFinishEvent, ICasinoGameVideoPokerTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import styles from './index.module.scss'
import classNames from 'classnames'
import VideoPokerCard from 'components/for_pages/games/VideoPoker/Board/VideoPokerCard'
import Stat from './Stat'

interface Props {
  onHold: (card: number) => void
  hold: number[]
}

export default function Board(props: Props) {

  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameVideoPokerTurn>(null)
  useEffect(() => {
    const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)

      gameContext.setShowResultModal(true)
    })
    const subscriptionRound = gameContext.turnState$.subscribe(async (data: ICasinoGameVideoPokerTurn) => {
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

  }, [gameContext])

  console.log('turn?.deck', turn?.deck)

  return (
    <GamePageBoardLayout className={styles.layout} toolbarColor={'green'}>
      <div>
      <div className={styles.bg}>
        <div className={styles.top}/>
        <div className={styles.bottom}/>
      </div>
      <div className={styles.board}>
        <div className={classNames(styles.deck)}>
          {(turn?.deck ?? Array.from({length: 5}, i => -1)).map((i, index) =>
            <VideoPokerCard key={index} card={i + 1} onClick={() => props.onHold(index)} disabled={i === -1 || !!result || gameContext.turnLoading } isHold={props.hold.includes(index)} active={turn?.rankCards?.includes(i)}/>)}
        </div>
        <Stat resultMultiplier={result?.multiplier}/>

      </div>
      </div>
    </GamePageBoardLayout>
  )
}


