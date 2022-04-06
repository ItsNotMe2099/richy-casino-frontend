import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useEffect, useState} from 'react'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import { ICasinoGameVideoPokerDto
} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import {
  ICasinoGameVideoPokerTurn
} from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props{

}
export default function GameVideoPoker(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()
  const [hold, setHold] = useState([])
  useEffect(() => {

    const subscriptionRound = gameContext.turnState$.subscribe(async (data: ICasinoGameVideoPokerTurn) => {
      setHold([])
    })
    return () => {
      subscriptionRound.unsubscribe()
    }

  }, [gameContext])
  const handleSubmit = async (data: ICasinoGameVideoPokerDto) => {
   // setHold([])
    gameSound.play(GameSound.Roll)
    await gameContext.startGame({...data, gameType: CasinoGameType.VideoPoker} as any)
  }
  const handleHold = (item: number)=>{
    gameSound.play(GameSound.Click)

    if(hold.includes(item)){
      setHold((selected) => selected.filter(i => i !== item))
    }else{
      setHold((selected) => [...selected, item])
    }
  }
  const handleBet = async () => {
    await gameContext.newTurn({hold})
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Blackjack'} icon={''}/>}
      sideBar={<Sidebar  onSubmit={handleSubmit} onBet={handleBet} />}
      board={<Board hold={hold} onHold={handleHold} />} history={<GameHistory/>}/>
  )
}


