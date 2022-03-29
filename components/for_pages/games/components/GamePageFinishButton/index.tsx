import bitcoin from 'bitcoin-units'
import {useGameContext} from 'components/for_pages/games/context/state'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
interface Props{

  onClick?: (e) => void
}
export default function GamePageTakeActionButton({}: Props) {
  const gameContext = useGameContext()
  const renderFinishButtonContent = () => {
    if(gameContext.started && gameContext.turn?.turn > 0){
      const currency = gameContext.user.currency || 'btc'
      const value = bitcoin(gameContext.gameData?.bet * gameContext.turn.multiplier, 'btc').to(currency).value().toFixed(currency === 'satoshi' ? 0 : 8)
      return `Забрать ${value}`
    }else if(gameContext.started){
      return 'Отменить'
    }
  }
    return <GamePageBetButton type={'button'} onClick={() => gameContext.finish()}>{renderFinishButtonContent()}</GamePageBetButton>
}
GamePageTakeActionButton.defaultProps = {
  type: 'button'
}

