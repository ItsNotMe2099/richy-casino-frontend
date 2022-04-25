import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useState} from 'react'
import { ICasinoGameRouletteDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {useGameContext} from 'components/for_pages/games/context/state'
import {IRouletteChip, RouletteBets, RouletteChipList} from 'components/for_pages/games/Roulette/data/enums'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'

interface Props{

}
export default function GameRoulette(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const history = [
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
    {user: 'Иван иванов', wins: 1.332, cof: 1.323, id: 23223 },
  ]
  const [chip, setChip] = useState<IRouletteChip>(RouletteChipList[0])
  const [bets, setBets] = useState<RouletteBets>({})

  const handleSubmit = async (data: ICasinoGameRouletteDto) => {
    if(Object.keys(bets).length === 0){
      return
    }

    gameSound.play(GameSound.Spin, 300)
    const betsKeys = Object.keys(bets)
    const formattedBets = {}
    for(const key of betsKeys){
      formattedBets[key] = bets[key].reduce((a, b) => a + b, 0)
    }
    await gameContext.startGame({...data, bets: formattedBets, gameType: CasinoGameType.Roulette} as ICasinoGameRouletteDto)
  }
  const handleBet = (key: string, chip: IRouletteChip) => {
    gameSound.play(GameSound.Click)
    console.log('SetBets', {...bets, [key]: [...bets[key] ?? [], chip.value]})
    setBets({...bets, [key]: [...bets[key] ?? [], chip.value]})
  }
  const handleClear = () => {
    setBets({})
  }
  const handleUndo = () => {
    const newBets = {...bets}
    const keys = Object.keys(bets)
    if(keys.length === 0){
      return
    }
    if(newBets[keys[0]]?.length > 1){
      newBets[keys[0]] = newBets[keys[0]].splice(0, newBets[keys[0]]?.length - 1)
    }else {
      delete newBets[keys[0]]
    }
    setBets(newBets)
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Wheel of Fortune'} icon={''}/>}
      sideBar={<Sidebar initialChip={chip} onChangeChip={setChip} onSubmit={handleSubmit}/>}
      board={<Board initialChip={chip} onChangeChip={setChip} chip={chip} bets={bets} onBet={handleBet} onClear={handleClear} onUndo={handleUndo}/>} history={<GameHistory items={history}/>}/>
  )
}


