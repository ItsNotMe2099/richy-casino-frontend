import {Form, FormikProvider, useFormik} from 'formik'
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
import {GFieldSelectTabs} from 'components/for_pages/games/components/inputs/GFieldSelectTabs'
import styles from 'components/for_pages/games/components/inputs/GFieldMode/index.module.scss'
import Validator from 'utils/validator'
import {ICasinoGameDataDto} from 'components/for_pages/games/data/interfaces/ICasinoGameData'
import {GFieldSelectColorTabs} from './GFieldSelectColorTabs'

interface Props {
  onChangeMode: (mode) => void
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
      mode: 'double',
      target: 'red'
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
          <GFieldSelectTabs label={'Game Mode'} style={'small'} fluid className={styles.field}  name={'mode'} options={[
            {value: 'double', label: 'Double'},
            {value: 'x50', label: '50x'},
          ]} onChange={props.onChangeMode}  validate={Validator.required}/>
          <GFieldSelectColorTabs label={'Цвет'} style={'small'} fluid className={styles.field}  name={'target'} options={
            values.mode === 'double' ?
              [
                {label: '2.00x', value: 'red', color: 'blue'},
                {label: '14.00x', value: 'green', color: 'yellow'},
                {label: '2.00x', value: 'black', color: 'darkBlue'}
              ] : [
                {label: '2.00x', value: 'black', color: 'darkBlue'},
                {label: '3.00x', value: 'red', color: 'blue'},
                {label: '5.00x', value: 'green', color: 'red'},
                {label: '50.00x', value: 'yellow', color: 'yellow'}
              ]} validate={Validator.required}/>

          {gameMode ===CasinoGameModeType.Auto && <>
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


