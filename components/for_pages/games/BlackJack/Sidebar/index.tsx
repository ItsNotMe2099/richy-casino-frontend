import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import HiddenXs from 'components/ui/HiddenXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {useGameContext} from 'components/for_pages/games/context/state'
import {ICasinoGameBlackjackTurn, ICasinoGameHiloTurn} from 'components/for_pages/games/data/interfaces/ICasinoGame'
import {BlackjackBetType} from 'components/for_pages/games/BlackJack/data/enums'
import BlackjackBetButton from 'components/for_pages/games/BlackJack/Sidebar/BlackjackBetButton'

interface Props {
  onSubmit: (data: ICasinoGameDataDto) => void
  onBet: (type: BlackjackBetType) => void
  startCard: number
}

export default function Sidebar(props: Props) {

  const gameContext = useGameContext()
  const turn = gameContext.turn as ICasinoGameBlackjackTurn
  const onSubmit = (data) => {
    props.onSubmit(data)
  }

  const formik = useFormik({
    initialValues: {
      gameMode: CasinoGameModeType.Manual,
      bet: null,
      betAmount: null,
      onWinType: null,
      onWinValue: null,
      onLooseType: null,
      onLooseValue: null,
    },
    onSubmit,
  })

  const {values} = formik
  const {gameMode} = values
  const renderBetButton = () => {
    return !gameContext.started ? <GamePageBetButton/> :  null
  }
  const grid = (gameContext.turn as ICasinoGameHiloTurn)?.grid
  const startingCardIndex = grid?.length > 1 ? grid[grid.length - 1] : props.startCard
  const renderStartedBetButtons = () => {
    if(gameContext.started && turn){
      return (<div className={styles.buttons}>
        <BlackjackBetButton active type={BlackjackBetType.Stand} onClick={props.onBet}>Stand</BlackjackBetButton>
        <BlackjackBetButton type={BlackjackBetType.Hit} onClick={props.onBet}>Hit</BlackjackBetButton>
        <BlackjackBetButton type={BlackjackBetType.Double} disabled={turn.hasDouble  /* || ![9, 10, 11].includes(getBlackjackScore(turn.player)) */} onClick={props.onBet}>Double</BlackjackBetButton>
        <BlackjackBetButton type={BlackjackBetType.Split} disabled={turn.split?.length > 0 || turn.player[0].blackjackValue !== turn.player[1].blackjackValue || turn.player.length !== 2} onClick={props.onBet}>Split</BlackjackBetButton>
      </div>)
    }
    return null
  }
  return (
    <GamePageSidebarLayout className={styles.root}>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldBet/>
            </>
          </HiddenXs>
          <HiddenXs>
            <>
            {renderBetButton()}
            {renderStartedBetButtons()}
            </>
          </HiddenXs>

          <VisibleXs>
            <>
              <GamePageBetMobileLayout>
                <GFieldBet/>
                {renderBetButton()}
                {renderStartedBetButtons()}
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>

  )
}


