import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import {TowerStatus} from 'components/for_pages/games/Towers/data/enums'
import Tower from './Tower'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {
  CasinoGameRoundTurnType,
  ICasinoGameFinishEvent, ICasinoGameTowersTurn,
  ICasinoGameTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import TowerArrowSvg from 'components/for_pages/games/components/svg/TowerArrowSvg'
import {abbreviate} from 'components/for_pages/games/utils/game'
import classNames from 'classnames'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

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
      if(data) {
        gameContext.setShowResultModal(true)
      }
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
  const handleClick = (key) => {
    if ((turn && [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn?.type)) || !gameContext.roundId || !gameContext.started) {
      return
    }
    gameContext.newTurn({cell: key})
  }
  const getItemStatus = (row, item) => {
    if(!gameContext.roundId){
      return TowerStatus.Disabled
    }
    if(turn && [CasinoGameRoundTurnType.Finish, CasinoGameRoundTurnType.Lose].includes(turn?.type)){
      if(turn.grid[row].includes(item)){
        return TowerStatus.Mine
      }else{
        return TowerStatus.Bonus
      }
    }

    if(row === turn?.turn || (row === 0 && !turn?.turn)){
      //active
      return TowerStatus.Active
    }else if(row > (turn?.turn || 0)){
      //disabled

      return TowerStatus.Disabled
    }else if(row < (turn?.turn || 0)) {
      //history
      if(turn.grid[row].includes(item)){
        return TowerStatus.Mine
      }else{
        return TowerStatus.Bonus
      }

    }

    return TowerStatus.Disabled
  }
  const isArrowVisible = (row) => {

    if(gameContext.started && gameContext.roundId && (row === turn?.turn || (row === 0 && !turn?.turn))){
      return true
    }
  }

  const rowsCount = 10
  return (
    <GamePageBoardLayout className={styles.root}>
      <div className={styles.mines}>
        {[...Array(rowsCount).keys()].map(row => <div key={row} className={styles.row}>
          <div className={styles.multiplier}>{gameContext.game?.multipliers ? `${abbreviate(gameContext.game.multipliers[minesCount && minesCount > 0 ? (minesCount < 4 ? minesCount : 4) : 1][row])}×` : ''}</div>
          <div className={styles.squares}>
          {[...Array(5).keys()].map(col => <Tower key={col} status={getItemStatus(row, col)}
                                                  onClick={() => handleClick(col)}/>)}
          </div>
          {<div className={classNames(styles.arrow, {[styles.visible]: isArrowVisible(row)})}><TowerArrowSvg color={'blue'}/></div>}
        </div>)}
      </div>
    </GamePageBoardLayout>
  )
}


