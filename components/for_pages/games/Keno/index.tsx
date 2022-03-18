import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useState} from 'react'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'

interface Props{

}
export default function GameKeno(props: Props) {
  const gameContext = useGameContext()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [selected, setSelected] = useState([])
  const handleSubmit = async (data: ICasinoGameDiceDto) => {
    await gameContext.startGame({...data, tiles: selected, gameType: CasinoGameType.Keno})
    console.log('gameStart')
  }
  const handleSelect = (item)=>{
    if(selected.length >= 10 && !selected.includes(item)){
      return
    }
    if(selected.includes(item)){
      setSelected((selected) => selected.filter(i => i !== item))
    }else{
      setSelected((selected) => [...selected, item])
    }
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Keno'} icon={''}/>}
      sideBar={<Sidebar onSubmit={handleSubmit}/>}
      board={<Board onSelect={handleSelect} selected={selected}/>} history={<GameHistory items={history}/>}/>
  )
}


