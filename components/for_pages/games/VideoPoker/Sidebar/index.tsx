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

interface Props {
  onSubmit: (data: ICasinoGameDataDto) => void
  onBet: () => void
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
    return !gameContext.started ? <GamePageBetButton/> : <GamePageBetButton type={'button'} onClick={props.onBet}>Раздать</GamePageBetButton>
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


