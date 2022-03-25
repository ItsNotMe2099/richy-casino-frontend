import {Form, FormikProvider, useFormik} from 'formik'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import GFieldAutoAction from 'components/for_pages/games/components/inputs/GFieldAutoAction'
import {CheckBox} from 'components/ui/Inputs/CheckBox'
import HiddenXs from 'components/ui/HiddenXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetButton from 'components/for_pages/games/components/GamePageBetButton'
import GFieldMode from 'components/for_pages/games/components/inputs/GFieldMode'
import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import {CasinoGameModeType} from 'components/ui/Tabs'
import {LimboGameLevel} from 'components/for_pages/games/Limbo/data/enums'
import GFieldInfinite from 'components/for_pages/games/components/inputs/GFieldInfinite'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'

interface Props {
    onSubmit: (data: ICasinoGameDataDto) => void
}

export default function Sidebar(props: Props) {

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
  const options = [
    {label: 'Low', value: LimboGameLevel.Low},
    {label: 'Medium', value: LimboGameLevel.Medium},
    {label: 'High', value: LimboGameLevel.High},
  ]
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
          <GField name={'target'} type={'number'} label={'Коэффициент'} suffix={'clear'}/>
          {gameMode ===CasinoGameModeType.Auto && <>
            <GFieldInfinite name={'countGames'} label={'Кол-во игр'}/>
            <GFieldAutoAction typeName={'onWinType'} valueName={'onWinValue'}/>
            <GFieldAutoAction typeName={'onLooseType'} valueName={'onLooseValue'}/>
            <CheckBox size={'normal'} name={'stopOnWin'} label={'Stop on win'}/>
          </>}

          <HiddenXs>
            <GamePageBetButton/>
          </HiddenXs>

          <VisibleXs>
            <>
              <GFieldMode/>
              <GamePageBetMobileLayout>
                <GFieldBet/>
                <GamePageBetButton/>
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>

  )
}


