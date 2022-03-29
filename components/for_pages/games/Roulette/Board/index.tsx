import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {useEffect, useState} from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {useGameContext} from 'components/for_pages/games/context/state'
import styles from './index.module.scss'
import BetBoard from './BetBoard'
import Toolbar from './Toolbar'
import {IRouletteChip, RouletteBets} from 'components/for_pages/games/Roulette/data/enums'
import WheelCanvas from './Wheel'
interface Props{
  chip: IRouletteChip
  bets: RouletteBets
  onBet: (key: string, chip: IRouletteChip) => void
  onClear: () => void,
  onUndo: () => void
}
export default function Board(props: Props) {
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const gameSound = useGameSound()

  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {


      if(data){
        setTimeout(() => {
          setResult(data)
        }, 300)
        setTimeout(() => {
          gameSound.play(data.win ? GameSound.Win : GameSound.Lose)
          gameContext.setShowResultModal(true)
        }, 2700)


      }else{
        setResult(null)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
        <WheelCanvas width={'600px'} height={'600px'} number={result?.data.slot} hasResult={!!result}/>
        <div className={styles.totalBet}>Общая ставка <span className={styles.bet}>{Object.keys(props.bets).map(i => props.bets[i]).reduce((a, b) => a + b, 0).toFixed(8)}</span> {gameContext.user?.currency ?? ''}</div>
        <BetBoard chip={props.chip} bets={props.bets} onBet={props.onBet}/>
        <Toolbar onUndo={props.onUndo} onClear={props.onClear} bets={props.bets}/>
      </div>
    </GamePageBoardLayout>
  )
}


