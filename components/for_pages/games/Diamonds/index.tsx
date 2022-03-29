import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {ICasinoGameDiceDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{

}
export default function GameDiamonds(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]

  const handleSubmit = async (data: ICasinoGameDiceDto) => {
    gameSound.play(GameSound.Roll)
    await gameContext.startGame({...data,  gameType: CasinoGameType.Diamonds} as ICasinoGameDiceDto)

  }

  return (
    <GamePageLayout
      header={<GamePageHeader title={'Diamonds'} icon={''}/>}
      sideBar={<Sidebar onSubmit={handleSubmit}/>}
      board={<Board/>} history={<GameHistory items={history}/>}/>
  )
}


