import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useState} from 'react'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {getRandom} from 'components/for_pages/games/utils/rand'
import {chain} from 'components/for_pages/games/utils/chain'

interface Props{

}
export default function GameKeno(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [selected, setSelected] = useState([])
  const [isAutoSelect, setSsAutoSelect] = useState(false)
  const handleSubmit = async (data: ICasinoGameDiceDto) => {
    gameSound.play(GameSound.Roll)
    await gameContext.startGame({...data, tiles: selected, gameType: CasinoGameType.Keno} as ICasinoGameDiceDto)
    console.log('gameStart')
  }
  const handleSelect = (item)=>{
    if(isAutoSelect){
      return
    }
    if(selected.length >= 10 && !selected.includes(item)){
      return
    }
    gameSound.play(GameSound.Click)
    if(selected.includes(item)){
      setSelected((selected) => selected.filter(i => i !== item))
    }else{
      setSelected((selected) => [...selected, item])
    }
  }
  const handleClear = () => {
    gameContext.clear()
    setSelected([])
  }
  const handleAutoSelect = () => {
    gameContext.clear()
    setSsAutoSelect(true)
    setSelected([])
    const picked = []
    while(picked.length < 10) {
      let rand = getRandom(1, 40)
      if(picked.includes(rand)) continue
      picked.push(rand)
    }
    console.log('Picked', picked.length, picked)
    chain(picked.length, 100, (i) => {
      gameSound.play(GameSound.Click)
      setSelected((selected) => [...selected, picked[i]])
      if(i === picked.length - 1){
        setSsAutoSelect(false)
      }
    })


  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Keno'} icon={''}/>}
      sideBar={<Sidebar onSubmit={handleSubmit} onClear={handleClear} onAutoSelect={handleAutoSelect}/>}
      board={<Board onSelect={handleSelect} selected={selected}/>} history={<GameHistory items={history}/>}/>
  )
}


