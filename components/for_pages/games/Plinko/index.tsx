import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {useGameContext} from 'components/for_pages/games/context/state'
import {useState} from 'react'

interface Props{

}
export default function GamePlinko(props: Props) {
  const gameContext = useGameContext()
  const [pinsCount, setPinsCount] = useState(8)
  const [difficulty, setDifficulty] = useState('low')
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [selected, setSelected] = useState([])
  const handleSubmit = async (data: ICasinoGameDiceDto) => {
    await gameContext.startGame({...data, gameType: CasinoGameType.Plinko})
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Mines'} icon={''}/>}
      sideBar={<Sidebar onChangePinsCount={(val) => setPinsCount(val)} onChangeDifficulty={(val) => setDifficulty(val)} onSubmit={handleSubmit}/>}
      board={gameContext.game?.multipliers && <Board pinsCount={pinsCount} difficulty={difficulty}/>} history={<GameHistory items={history}/>}/>
  )
}


