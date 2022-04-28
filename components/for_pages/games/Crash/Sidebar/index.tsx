import GamePageSidebarLayout from 'components/for_pages/games/components/layout/GamePageSidebarLayout'
import { ICasinoGameDataDto } from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import { Form, FormikProvider, useFormik } from 'formik'
import { CasinoGameModeType } from 'components/ui/Tabs'
import HiddenXs from 'components/ui/HiddenXS'
import GFieldMode from 'components/for_pages/games/components/inputs/GFieldMode'
import GFieldBet from 'components/for_pages/games/components/inputs/GFieldBet'
import GField from 'components/for_pages/games/components/inputs/GField'
import GFieldInfinite from 'components/for_pages/games/components/inputs/GFieldInfinite'
import GFieldAutoAction from 'components/for_pages/games/components/inputs/GFieldAutoAction'
import { CheckBox } from 'components/ui/Inputs/CheckBox'
import VisibleXs from 'components/ui/VisibleXS'
import GamePageBetMobileLayout from 'components/for_pages/games/components/layout/GamePageBetMobileLayout'
import AviatorBetButton from './AviatorBetButton'

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
          <GField name={'autoStopMultiplier'} type={'number'} label={'Коэффициент'} suffix={'clear'}/>
          {gameMode ===CasinoGameModeType.Auto && <>
            <GFieldInfinite name={'countGames'} label={'Кол-во игр'}/>
            <GFieldAutoAction typeName={'onWinType'} valueName={'onWinValue'}/>
            <GFieldAutoAction typeName={'onLooseType'} valueName={'onLooseValue'}/>
            <CheckBox size={'normal'} name={'stopOnWin'} label={'Stop on win'}/>
          </>}

          <HiddenXs>
            <AviatorBetButton />
          </HiddenXs>

          <VisibleXs>
            <>
              <GFieldMode/>
              <GamePageBetMobileLayout>
                <GFieldBet/>
                <AviatorBetButton/>
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>
  )
}

