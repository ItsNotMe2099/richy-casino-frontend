import GamePageLayout from 'components/for_pages/games/components/layout/GamePageLayout'
import Board from './Board'
import Sidebar from './Sidebar'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import GameHistory from 'components/for_pages/games/components/layout/GameHistory'
import {useState} from 'react'
import {useGameContext} from 'components/for_pages/games/context/state'
import {CasinoGameType} from 'components/for_pages/games/data/enums'
import {
  ICasinoGameBlackjackDto
} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GameSound, useGameSound} from 'components/for_pages/games/context/game_sound'
import CardsDeck from 'components/for_pages/games/utils/deck'
import {BlackjackBetType} from 'components/for_pages/games/BlackJack/data/enums'

interface Props{

}
export default function GameBlackJack(props: Props) {
  const gameContext = useGameContext()
  const gameSound = useGameSound()

  const [startCard, setStartCard] = useState<number | null>(null)
  const handleSubmit = async (data: ICasinoGameBlackjackDto) => {
    const startCard = CardsDeck.getRandomCard()
    gameSound.play(GameSound.Roll)
    setStartCard(startCard)
    await gameContext.startGame({...data, starting: startCard,  gameType: CasinoGameType.Blackjack} as any)
  }
  const handleBet = async (action: BlackjackBetType) => {
    await gameContext.newTurn({action})
  }
  return (
    <GamePageLayout
      header={<GamePageHeader title={'Blackjack'} icon={''}/>}
      sideBar={<Sidebar startCard={startCard} onSubmit={handleSubmit} onBet={handleBet} />}
      board={<Board startCard={startCard}/>} history={<GameHistory/>}/>
  )
}


