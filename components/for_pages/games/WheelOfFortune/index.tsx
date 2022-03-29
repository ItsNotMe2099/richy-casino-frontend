import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useState} from 'react'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {useGameContext} from 'components/for_pages/games/context/state'

interface Props{

}
export default function GameWheelOfFortune(props: Props) {
  const gameContext = useGameContext()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [mode, setMode] = useState<'double' | 'x50'>('double')
  const handleSubmit = async (data: ICasinoGameDiceDto) => {
    await gameContext.startGame({...data, gameType: CasinoGameType.Wheel})
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Wheel of Fortune'} icon={''}/>}
      sideBar={<Sidebar onChangeMode={setMode} onSubmit={handleSubmit}/>}
      board={<Board mode={mode}/>} history={<GameHistory items={history}/>}/>
  )
}


