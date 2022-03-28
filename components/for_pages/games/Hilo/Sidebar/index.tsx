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
import HiloBetButton from 'components/for_pages/games/Hilo/Sidebar/HiloBetButton'
import {HiloBetType} from 'components/for_pages/games/Hilo/data/enums'
import GamePageTakeActionButton from 'components/for_pages/games/components/GamePageFinishButton'
import {useGameContext} from 'components/for_pages/games/context/state'
import {getHiloPercent} from 'components/for_pages/games/Hilo/utils/multiplier'
import {ICasinoGameHiloTurn} from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props {
  onSubmit: (data: ICasinoGameDataDto) => void
  onBet: (type: HiloBetType) => void
  startCard: number
}

export default function Sidebar(props: Props) {

  const gameContext = useGameContext()
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
    return !gameContext.started ? <GamePageBetButton/> : <GamePageTakeActionButton/>
  }
  const grid = (gameContext.turn as ICasinoGameHiloTurn)?.grid
  const startingCardIndex = grid?.length > 1 ? grid[grid.length - 1] : props.startCard
  return (
    <GamePageSidebarLayout>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldBet/>
            </>
          </HiddenXs>
          {gameContext.started && <div className={styles.buttons}>
            <HiloBetButton type={HiloBetType.Higher} percent={getHiloPercent(HiloBetType.Higher, startingCardIndex)} onClick={props.onBet}/>
            <HiloBetButton type={HiloBetType.Lower} percent={getHiloPercent(HiloBetType.Lower, startingCardIndex)} onClick={props.onBet}/>
            <HiloBetButton type={HiloBetType.Same} percent={getHiloPercent(HiloBetType.Same, startingCardIndex)} onClick={props.onBet}/>
            <HiloBetButton type={HiloBetType.Skip} onClick={props.onBet}/>
          </div>}
          <HiddenXs>
            {renderBetButton()}
          </HiddenXs>

          <VisibleXs>
            <>
              <GamePageBetMobileLayout>
                <GFieldBet/>
                {renderBetButton()}
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>

  )
}


