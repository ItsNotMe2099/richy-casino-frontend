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
import {chain} from 'components/for_pages/games/utils/chain'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{
  selected: number[]
  onSelect: (item: number) => void
}
export default function Board(props: Props) {
  const {selected} = props
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [result, setResult] = useState<ICasinoGameFinishEvent>(null)
  const [resultTiles, setResultTiles] = useState([])
  useEffect(() => {
    const subscription = gameContext.gameState$.subscribe((data) => {
      if(!data){
        setResultTiles([])
        setResult(null)
        return
      }
      chain(data.data.tiles.length, 100, (i) => {
         if(selected.includes(data.data.tiles[i])){
         gameSound.play(GameSound.Open)
        }else{
         gameSound.play(GameSound.Empty)
        }
        setResultTiles(tiles => [...tiles, data.data.tiles[i]])
        if(i === data.data.tiles.length - 1){
          setResult(data)
          gameContext.setShowResultModal(true)

        }
      })



    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  const handleClick = (key) => {
    props.onSelect(key)
  }
  const getItemStatus = (item) => {
    const isSelected = selected.includes(item)
    if(!result && resultTiles.length === 0){
      return isSelected ? KenoItemStatus.Active : KenoItemStatus.UnActive
    }
    if(isSelected && resultTiles.includes(item)){
      return KenoItemStatus.Win
    }else if(resultTiles.includes(item)){
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


