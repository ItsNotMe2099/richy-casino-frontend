import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'

import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType, ICasinoGameBlackjackTurn,
  ICasinoGameFinishEvent
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import Deck from './Deck'
import styles from './index.module.scss'
import classNames from 'classnames'
import {getBlackjackScore} from 'components/for_pages/games/BlackJack/utils/score'
import {BlackjackBetType} from 'components/for_pages/games/BlackJack/data/enums'
interface Props{
  startCard: number
}
export default function Board(props: Props) {
  const {startCard} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameBlackjackTurn>(null)
  useEffect(() => {

  const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
    setResult(data)
    console.log('ShowResult1111', data)
    gameContext.setShowResultModal(true)
  })
  const subscriptionRound = gameContext.turnState$.subscribe(async (data: ICasinoGameBlackjackTurn) => {
    setTurn(data)
    switch (data?.type) {
      case CasinoGameRoundTurnType.Continue:
        const dealerScore = getBlackjackScore(data.dealer ?? [])
        const playerScore = getBlackjackScore(data.player ?? [])
          /*
           Would you like insurance?
           It allows you to insure against a possible dealer hand with blackjack.
           Insurance costs half your bet.
           To accepr refuce
           */
        //TODO set splitted
        const splitted = false
       // (splitted ? split : player).getScore
        if(playerScore >= 21){
          console.log('new Score' ,gameContext)
          await gameContext.newTurn({action: BlackjackBetType.Stand})
        }

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



  return (
    <GamePageBoardLayout className={styles.layout}>
      <div className={styles.bg}>
        <div className={styles.top}/>
        <div className={styles.bottom}/>
      </div>
      <div className={styles.board}>
        <div className={styles.deckWrapper}>
        {turn?.dealer?.length > 0 && <div className={classNames(styles.deck, styles.dealer)}>
          <Deck cards={[...turn.dealer.map( i => i.index), ...(turn.dealer.length === 1 ? [0] : [])]} number={getBlackjackScore(turn.dealer)}/>
        </div>}
        <div className={styles.playerDeck}>
        {turn?.split?.length > 0 && <div className={classNames(styles.deck, styles.split)}>
          <Deck cards={turn.split.map( i => i.index)} number={getBlackjackScore(turn.split)}/>
        </div>}
        {turn?.player?.length > 0 && <div className={classNames(styles.deck, styles.player)}>
          <Deck cards={turn.player.map( i => i.index)} number={getBlackjackScore(turn.player)}/>
        </div>}
        </div>
        </div>

      </div>
    </GamePageBoardLayout>
  )
}


