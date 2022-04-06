import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import Tower from './StairItem'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType,
  ICasinoGameFinishEvent, ICasinoGameTowersTurn,
  ICasinoGameTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {abbreviate} from 'components/for_pages/games/utils/game'
import {StairItemStatus} from 'components/for_pages/games/Stairs/data/enums'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
const rows = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
interface Props {
  minesCount: number
}

export default function Board(props: Props) {
  const {minesCount} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [turn, setTurn] = useState<ICasinoGameTowersTurn>(null)

  useEffect(() => {
    const subscriptionGame = gameContext.gameState$.subscribe((data: ICasinoGameFinishEvent) => {
      setResult(data)
      gameContext.setShowResultModal(true)
    })
    const subscriptionRound = gameContext.turnState$.subscribe((data: ICasinoGameTurn) => {
      setTurn(data)
      switch (data?.type){
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
  const handleClick = (row, key) => {
    if ((turn && [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn?.type)) || !gameContext.roundId || (row !== (turn?.turn ?? 0))) {
      return
    }
    gameContext.newTurn({cell: key})
  }
  const getItemStatus = (row, item) => {
    if(!gameContext.roundId){
      return StairItemStatus.Disabled
    }
    const isSelected = turn?.roundData?.history[row] === item
    const isMine = turn?.grid[row]?.includes(item)
    const isFinished = turn && [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn?.type)
    if(isFinished){
      if(row >= (turn?.turn || 0)){
        return StairItemStatus.Disabled
      }else if(isMine && isSelected){
        return StairItemStatus.MineSelected
      }else if(turn.grid[row].includes(item)){
         return StairItemStatus.Mine
      }else if(isSelected){
        return StairItemStatus.Stair
      }else{
        return StairItemStatus.Active
      }
    }

    if(row === turn?.turn || (row === 0 && !turn?.turn)){
      //active
      return StairItemStatus.Active
    }else if(row > (turn?.turn || 0)){
      //disabled
      return StairItemStatus.Disabled
    }else if(row < (turn?.turn || 0)) {
      //history
      if(isMine){
        return StairItemStatus.Mine
      }else if(isSelected){
        return StairItemStatus.Stair
      }else{
        return StairItemStatus.Active
      }
    }

    if (!turn || turn.type === CasinoGameRoundTurnType.Continue) {
      return isSelected ? StairItemStatus.Stair : StairItemStatus.Disabled
    }
    return StairItemStatus.Disabled
  }
  const renderMultiplier = (rowIndex: number) => {
    return (  <div className={styles.multiplier}>{gameContext.game?.multipliers ? `${abbreviate(gameContext.game.multipliers[minesCount && minesCount > 0 ? (minesCount < 7 ? minesCount : 7) : 1][rowIndex])}×` : ''}</div>)
  }
  const renderRow = (row, index) => {
    const rowIndex = rows.length - index - 1
    return (<div key={rowIndex} className={styles.row}>
      <HiddenXs>
        {renderMultiplier(rowIndex)}
      </HiddenXs>
        <div className={styles.squares}>
        {row.map((col, colIndex) => col === 0 ? <div className={styles.hiddenStair}/> : <Tower key={`${rowIndex}_${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} status={getItemStatus(rowIndex, colIndex)}
                                                                                               onClick={() => handleClick(rowIndex, colIndex)}/>)}
      </div>
    </div>)
  }
  return (
    <GamePageBoardLayout>
      <div className={styles.root}>
      <VisibleXs>
        <div className={styles.multipliersMobile}>
        {[...rows].reverse().map((row, index) => renderMultiplier(rows.length - index - 1))}
        </div>
      </VisibleXs>

      <div className={styles.mines}>
        {[...rows].reverse().map(renderRow)}
      </div>
      </div>
    </GamePageBoardLayout>
  )
}


