import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {MineStatus} from 'components/for_pages/games/Mines/data/enums'
import Mine from './Mine'
import Stat from './Stat'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType,
  ICasinoGameFinishEvent,
  ICasinoGameMinesTurn,
  ICasinoGameTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{
  minesCount: number
}
export default function Board(props: Props) {
  const {minesCount} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameMinesTurn>(null)
  useEffect(() => {
    const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)
      gameContext.setShowResultModal(true)
    })
    const subscriptionRound = gameContext.turnState$.subscribe((data: ICasinoGameTurn) => {
      switch (data?.type){
        case CasinoGameRoundTurnType.Continue:
          gameSound.play(GameSound.Open)
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
      setTurn(data)
    })
    return () => {
      subscriptionGame.unsubscribe()
      subscriptionRound.unsubscribe()
    }
  }, [])
  const handleClick = (key) => {
    if((turn && [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn?.type)) || !gameContext.roundId){
      return
    }
    gameContext.newTurn({id: key})
  }
  const getItemStatus = (item) => {
    const isSelected = turn?.roundData?.history?.includes(item)
    if(!turn || turn.type === CasinoGameRoundTurnType.Continue){
      return isSelected ? MineStatus.Bonus : MineStatus.Disabled
    }else if([CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn.type)){
      return turn.grid[item] === 1 ? MineStatus.Mine : isSelected  ? MineStatus.Bonus : MineStatus.Disabled

    }
    return MineStatus.Disabled
  }
  return (
    <GamePageBoardLayout>
      <Stat count={minesCount} turn={turn?.turn ? ( [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn.type) ? turn?.turn -1 : turn?.turn ) : 0} multipliers={gameContext.game?.multipliers ?? []}/>
      <div className={styles.mines}>
      {[...Array(25).keys()].map(i => <Mine key={i} status={getItemStatus(i)} onClick={() => handleClick(i)}/>)}
      </div>
      <GameImageGround/>
    </GamePageBoardLayout>
  )
}


