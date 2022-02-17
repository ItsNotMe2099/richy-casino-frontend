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
import {IGameModeType} from 'components/ui/Tabs'

interface Props {

}

export default function Sidebar(props: Props) {

  const onSubmit = (data) => {

  }

  const formik = useFormik({
    initialValues: {
      mode: IGameModeType.Manual,
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
  const {mode} = values
  return (
    <GamePageSidebarLayout>
      <FormikProvider value={formik}>
        <Form>
          <HiddenXs>
            <>
              <GFieldMode/>
              <GFieldBet balance={'0.0s0ds0d0sd BTC'}/>
            </>
          </HiddenXs>
          <GField name={'mines'} label={'Mines'} suffix={'arrow'}/>
          {mode === IGameModeType.Auto && <>
            <GFieldBetAmount name={'betAmount'}/>
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
                <GFieldBet balance={'0.0s0ds0d0sd BTC'}/>
                <GamePageBetButton/>
              </GamePageBetMobileLayout>
            </>
          </VisibleXs>
        </Form>
      </FormikProvider>
    </GamePageSidebarLayout>

  )
}


