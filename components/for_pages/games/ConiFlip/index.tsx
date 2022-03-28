import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {ICasinoGameCoinFlipDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
import {useState} from 'react'

interface Props{

}
export default function GameCoinFlip(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [userSide, setUserSide] = useState<CoinType>(CoinType.Tail)

  const handleSubmit = async (data: ICasinoGameCoinFlipDto) => {
    gameSound.play(GameSound.Roll)
    await gameContext.startGame({...data,  gameType: CasinoGameType.Coinflip} as ICasinoGameCoinFlipDto)
  }
  const handleBet = async (side: CoinType) => {
    setUserSide(side)
    await gameContext.newTurn({side}, true)
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Keno'} icon={''}/>}
      sideBar={<Sidebar userSide={userSide} onSubmit={handleSubmit} onBet={handleBet} />}
      board={<Board userSide={userSide}/>} history={<GameHistory items={history}/>}/>
  )
}


