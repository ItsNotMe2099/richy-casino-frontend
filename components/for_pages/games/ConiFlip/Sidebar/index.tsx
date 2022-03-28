import styles from './index.module.scss'
import {Form, FormikProvider, useFormik} from 'formik'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import HiddenXs from 'components/ui/HiddenXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {ICasinoGameCoinFlipDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import GamePageTakeActionButton from 'components/for_pages/games/components/GamePageFinishButton'
import {useGameContext} from 'components/for_pages/games/context/state'
import GFieldLabel from 'components/for_pages/games/components/inputs/GFieldLabel'
import CoinBetButton from './CoinBetButton'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
import {ICasinoGameCoinFlipTurn} from 'components/for_pages/games/data/interfaces/ICasinoGame'

interface Props {
  userSide: CoinType
  onSubmit: (data: ICasinoGameCoinFlipDto) => void
  onBet: (type: CoinType) => void
}

export default function Sidebar(props: Props) {

  const gameContext = useGameContext()
  const turn = gameContext.turn as ICasinoGameCoinFlipTurn
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

  const renderBetButton = () => {
    return !gameContext.started ? <GamePageBetButton/> : <GamePageTakeActionButton/>
  }
  return (
    <GamePageSidebarLayout>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldBet/>
            </>
          </HiddenXs>
          {gameContext.started && <div className={styles.sideField}>
            <GFieldLabel label={'Сторона'}/>
            <div className={styles.sides}>
              <CoinBetButton type={CoinType.Eagle} active={(turn?.side ?? props.userSide) === CoinType.Eagle} onClick={props.onBet}/>
              <CoinBetButton type={CoinType.Tail} active={(turn?.side ?? props.userSide) === CoinType.Tail} onClick={props.onBet}/>
            </div>
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


