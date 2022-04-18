import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import Sidebar from './Sidebar'
import Board from './Board'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import { CasinoGameType } from 'components/for_pages/games/data/enums'
import { useGameContext } from 'components/for_pages/games/context/state'

interface Props {}

export default function Crash(props: Props) {
  const gameContext = useGameContext()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]

  const handleSubmit = async (data) => {
    await gameContext.startGame({...data, gameType: CasinoGameType.Aviator})
  }

  return (
    <GamePageLayout
      header={<GamePageHeader title="Crash" icon={''} />}
      sideBar={<Sidebar onSubmit={handleSubmit} />}
      board={<Board />}
      history={<GameHistory items={history} />}
    />
  )
}

