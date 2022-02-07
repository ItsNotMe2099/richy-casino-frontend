import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from 'components/for_pages/games/Mines/Board'
import Sidebar from 'components/for_pages/games/Mines/Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'

interface Props{

}
export default function GameMines(props: Props) {
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Mines'} icon={''}/>}
      sideBar={<Sidebar/>}
      board={<Board/>} history={<GameHistory items={history}/>}/>
  )
}


