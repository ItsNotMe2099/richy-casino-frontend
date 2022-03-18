import styles from './index.module.scss'
import GamePageBoardLayout from 'components/for_pages/games/components/layout/GamePageBoardLayout'
import Item from './Item'
import GameImageGround from 'components/for_pages/games/components/layout/GameImageGround'
import {KenoItemStatus} from 'components/for_pages/games/Keno/data/enums'
import EmptyStat from 'components/for_pages/games/Keno/Board/EmptyStat'
import Stat from 'components/for_pages/games/Keno/Board/Stat'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useEffect, useState} from 'react'
import {ICasinoGameFinishEvent} from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props{
  selected: number[]
  onSelect: (item: number) => void
}
export default function Board(props: Props) {
  const {selected} = props
  const gameContext = useGameContext()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      console.log('GameRes', data)
      setResult(data)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  const handleClick = (key) => {
    console.log(key)
    props.onSelect(key)
  }
  const generateBoard = (cols: number, rows: number) => {
    const board = []
    for(let i = 0; i < rows; ++i){
      for(let a = 0; a < cols; ++a){
        board.push()
      }
    }
  }
  const board = {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,

    8: 1,
    9: 6,
    10: 11,
    11: 16,
    12: 21,
    13: 26,
    14: 31,
    15: 36,

    16: 2,
    17: 7,
    18: 12,
    19: 17,
    20: 22,
    21: 27,
    22: 32,
    23: 37,

    24: 3,
    25: 8,
    26: 13,
    27: 18,
    28: 23,
    29: 28,
    30: 33,
    31: 38,

    32: 4,
    33: 9,
    34: 14,
    35: 19,
    36: 24,
    37: 29,
    38: 34,
    39: 39,
  }
  console.log('Game', gameContext.game)
  const getItemStatus = (item) => {
    const isSelected = selected.includes(item)
    if(!result){
      return isSelected ? KenoItemStatus.Active : KenoItemStatus.UnActive
    }
    if(isSelected && result.data?.tiles.includes(item)){
      return KenoItemStatus.Win
    }else if(result.data?.tiles.includes(item)){
      return KenoItemStatus.Lose
    }else if(isSelected){
      return KenoItemStatus.Active
    }else{
      return KenoItemStatus.Disabled
    }
  }
  return (
    <GamePageBoardLayout>
      <div className={styles.mines}>
        {Array.from({length: 40}, (_, i) => i + 1).map(i => <Item key={i} id={i} status={getItemStatus(i)} onClick={() => handleClick(i)}/>)}
      </div>
      {selected.length === 0 && <EmptyStat/>}
      {selected.length > 0 && <Stat hasResult={!!result} hits={result?.data?.hits} selected={selected} multipliers={gameContext.game?.multipliers ?? []}/>}
      <GameImageGround/>
    </GamePageBoardLayout>
  )
}


