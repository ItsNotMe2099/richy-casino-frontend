import {Form, FormikProvider, useFormik} from 'formik'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import GFieldBetAmount from 'components/for_pages/games/components/inputs/GFieldBetAmount'
import GFieldAutoAction from 'components/for_pages/games/components/inputs/GFieldAutoAction'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import HiddenXs from 'components/ui/HiddenXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
import GFieldMode from 'components/for_pages/games/components/inputs/GFieldMode'
import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import Validator from 'utils/validator'
import {useGameContext} from 'components/for_pages/games/context/state'
import GamePageTakeActionButton from 'components/for_pages/games/components/GamePageFinishButton'

interface Props {
  onSubmit: (data: ICasinoGameDataDto) => void
  onChangeMinesCount: (count: number) => void
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
      mines: 1
    },
    onSubmit,
  })

  const {values} = formik
  const {gameMode} = values
  const validateMines = (val) => {
    return val < 0 || val > 24 ? 'Значение от 1 до 24' : undefined
  }

  const renderBetButton = () => {
    return !gameContext.started ? <GamePageBetButton/> : <GamePageTakeActionButton/>
  }
  return (
    <GamePageSidebarLayout>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldMode/>
              <GFieldBet/>
            </>
          </HiddenXs>
          <GField name={'mines'}  label={'Mines'} suffix={'arrow'} type={'number'} validate={Validator.combine([Validator.required, validateMines])} onChange={(val) => props.onChangeMinesCount(val as number)}/>
          {gameMode ===CasinoGameModeType.Auto && <>
            <GFieldBetAmount name={'betAmount'}/>
            <GFieldAutoAction typeName={'onWinType'} valueName={'onWinValue'}/>
            <GFieldAutoAction typeName={'onLooseType'} valueName={'onLooseValue'}/>
            <CheckBox size={'normal'} name={'stopOnWin'} label={'Stop on win'}/>
          </>}

          <HiddenXs>
            {renderBetButton()}
          </HiddenXs>

          <VisibleXs>
            <>
              <GFieldMode/>
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


